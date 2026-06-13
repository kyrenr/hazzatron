/* ============================================================================
   GRIDLOCK — headless Monte-Carlo balance harness
   Extracts the REAL game logic from index.html (no copy drift) and plays the
   game many times with a "competent player" heuristic to measure win rate.
   Run: node sim.mjs [runs] [scenario]
   ============================================================================ */
import { readFileSync } from "fs";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");

/* pull the babel script body, then slice the pure-logic prefix
   (from the utilities banner up to the UI COMPONENTS banner) */
const scriptBody = html.split('<script type="text/babel"')[1].split("</script>")[0].replace(/^[^>]*>/, "");
const start = scriptBody.indexOf("/* ----------------------------- utilities");
const end = scriptBody.indexOf("UI COMPONENTS");
const logicEnd = scriptBody.lastIndexOf("/*", end);
const logic = scriptBody.slice(start, logicEnd);

const exported = [
  "clamp","r1","demandForYear","ECON","NODE_DEFS","LINK_DEFS","CORRIDORS","POLICIES",
  "ASSET_TYPES","LINK_UPGRADES","INNOVATIONS","CRISIS_DECK","SCENARIOS",
  "initialState","computeFlows","applyCrisisChoice","resolveYear","finalReport",
  "firmCoverGW","totalsByKind","intermittencyRisk","makeAsset","uid",
];
const factory = new Function(logic + `\nreturn { ${exported.join(",")} };`);
const G = factory();

/* ----------------------------- player actions ----------------------------- */
/* Pure mirrors of the React dispatch handlers (sound/toast stripped). */
function buildAsset(S, nodeId, assetId) {
  const t = G.ASSET_TYPES[assetId];
  const def = G.NODE_DEFS[nodeId];
  const cost = Math.round(t.cost * (assetId === "battery" ? S.batteryDiscount : 1) * (S.costMult || 1));
  if (S.treasury < cost) return S;
  if (assetId === "offshore" && !def.offshoreOk) return S;
  const yieldMult = t.kind === "battery" ? 1 : def.yields[t.kind];
  const effGW = G.r1(t.gw * yieldMult);
  const delay = S.policies.queueReform ? G.ECON.queueDelayReformed : G.ECON.queueDelayDefault;
  return {
    ...S, treasury: S.treasury - cost,
    nimby: { ...S.nimby, [nodeId]: G.clamp(S.nimby[nodeId] + t.nimby * def.nimbyFactor, 0, 100) },
    stats: { ...S.stats, built: S.stats.built + 1 },
    queue: [...S.queue, { uid: G.uid(), type: assetId, nodeId, gw: effGW, turnsLeft: delay, label: `${t.name} ${effGW} GW` }],
  };
}
function upgradeLink(S, linkId, upgradeId) {
  const u = G.LINK_UPGRADES[upgradeId];
  if (S.treasury < u.cost) return S;
  const def = G.LINK_DEFS[linkId];
  if (upgradeId === "pylon" && def.fullySubsea) return S;
  const next = {
    ...S, treasury: S.treasury - u.cost,
    linkQueue: [...S.linkQueue, { uid: G.uid(), linkId, addGW: u.addGW, turnsLeft: u.delay, label: `${u.name} +${u.addGW} GW` }],
    stats: { ...S.stats, pylons: S.stats.pylons + (upgradeId === "pylon" ? 1 : 0), hvdc: S.stats.hvdc + (upgradeId === "hvdc" ? 1 : 0) },
  };
  if (u.rebellion > 0) {
    next.rebellion = G.clamp(S.rebellion + u.rebellion, 0, 100);
    next.nimby = { ...S.nimby, [def.from]: G.clamp(S.nimby[def.from] + 10, 0, 100), [def.to]: G.clamp(S.nimby[def.to] + 10, 0, 100) };
  }
  return next;
}
function drawCorridor(S, from, to) {
  const rec = G.CORRIDORS[[from, to].sort().join("")];
  if (!rec) return S;
  if (rec.upgrade) return upgradeLink(S, rec.upgrade, "hvdc");
  if (S.links[rec.linkId] || S.linkQueue.some(q => q.linkId === rec.linkId)) return S;
  if (S.treasury < rec.cost) return S;
  const next = {
    ...S, treasury: S.treasury - rec.cost,
    linkQueue: [...S.linkQueue, { uid: G.uid(), linkId: rec.linkId, addGW: rec.gw, turnsLeft: rec.delay, newLink: true, label: `${rec.label} ${rec.gw} GW` }],
    stats: { ...S.stats, corridors: S.stats.corridors + 1 },
  };
  if (rec.rebellion) next.rebellion = G.clamp(S.rebellion + rec.rebellion, 0, 100);
  return next;
}
function enactPolicy(S, id) {
  const P = G.POLICIES.find(p => p.id === id);
  if (!P || S.policies[P.id] || S.pc < P.pc || S.treasury < P.cost) return S;
  if (P.minYear && S.year < P.minYear) return S;
  const next = { ...S, pc: G.clamp(S.pc - P.pc, 0, 100), treasury: S.treasury - P.cost, policies: { ...S.policies, [P.id]: true } };
  switch (P.id) {
    case "queueReform": next.rebellion = G.clamp(S.rebellion + 12, 0, 100); next.queue = S.queue.map(q => ({ ...q, turnsLeft: Math.min(q.turnsLeft, G.ECON.queueDelayReformed) })); break;
    case "carbonLevy": next.rebellion = G.clamp(S.rebellion + 6, 0, 100); break;
    case "smartTariffs": next.demandExtra = S.demandExtra - 2; break;
    case "communityFund": next.nimbyDecayMult = 2; break;
    case "skillsAcademy": next.costMult = 0.9; break;
    case "strategicReserve": next.gasFleet = S.gasFleet + 4; next.rebellion = G.clamp(S.rebellion + 6, 0, 100); next.approval = G.clamp(S.approval - 3, 0, 100); break;
    case "porkBarrel": next.rebellion = G.clamp(S.rebellion - 12, 0, 100); next.approval = G.clamp(S.approval + 4, 0, 100); next.nimby = { A: G.clamp(S.nimby.A - 10, 0, 100), B: G.clamp(S.nimby.B - 10, 0, 100), C: G.clamp(S.nimby.C - 10, 0, 100), D: G.clamp(S.nimby.D - 10, 0, 100) }; break;
    case "reshuffle": next.rebellion = G.clamp(S.rebellion - 25, 0, 100); next.approval = G.clamp(S.approval - 3, 0, 100); break;
    case "heatPumpMandate": next.demandExtra = S.demandExtra + 3; next.approval = G.clamp(S.approval + 4, 0, 100); break;
    case "dsr": next.demandExtra = S.demandExtra - 3; break;
  }
  return next;
}
function whips(S) {
  if (S.whipsUsed || S.pc < 15) return S;
  return { ...S, pc: S.pc - 15, rebellion: G.clamp(S.rebellion - 15, 0, 100), whipsUsed: true };
}
function innovate(S, id) {
  const def = G.INNOVATIONS.find(i => i.id === id);
  const cur = S.innovations[def.id];
  if (!cur || cur.status !== "idle") return S;
  if (S.treasury < def.cost || S.pc < def.pc) return S;
  const next = { ...S, treasury: S.treasury - def.cost, pc: G.clamp(S.pc - def.pc, 0, 100), innovations: { ...S.innovations }, stats: { ...S.stats, innovations: S.stats.innovations + 1 } };
  if (def.onLaunch) def.onLaunch(next);
  if (def.years === 0) {
    next.assets = next.assets.slice(); next.nimby = { ...next.nimby }; next.stats = { ...next.stats };
    if (Math.random() < def.odds) { next.innovations[def.id] = { status: "done", turnsLeft: 0 }; def.apply(next); }
    else { next.innovations[def.id] = { status: "failed", turnsLeft: 0 }; if (def.failApply) def.failApply(next); }
  } else next.innovations[def.id] = { status: "building", turnsLeft: def.years };
  return next;
}

/* ----------------------------- the strategy ----------------------------- */
const flowsOf = S => G.computeFlows(S, 0.9, 0.9);
const RESERVE = 280; // keep this much treasury in reserve when building

function chooseCrisis(S, card) {
  const playable = card.choices.filter(c => (c.can ? c.can(S) : true));
  const has = fx => card.choices.find(c => c.fx === fx && (c.can ? c.can(S) : true));
  const pick = fx => (has(fx) ? fx : null);
  let fx = null;
  switch (card.id) {
    case "pylonRevolt": fx = (S.rebellion > 50 && S.treasury > 900) ? pick("pylonYield") : pick("pylonForce"); break;
    // Buy LNG (£350m) if affordable; only ride out when firm cover massively exceeds demand+4 GW spike
    case "dunkelflaute": {
      const firm = G.firmCoverGW(S);
      const d = G.demandForYear(S.year, S.demandExtra) + S.demandExtraD;
      fx = firm >= d + 4 + 8 ? pick("rideOut") : (pick("lng") || pick("rideOut")); break;
    }
    case "dataCentre": fx = S.year <= 5 ? pick("dcApprove") : pick("dcBlock"); break;
    case "interconnector": fx = S.treasury > 1300 ? pick("viking") : pick("none"); break;
    case "gasShock": fx = (S.treasury > 900 && S.approval < 55) ? pick("gasSubsidise") : pick("gasHold"); break;
    case "judicialReview": fx = S.treasury > 700 ? pick("jrSettle") : pick("jrFight"); break;
    case "smrHype": fx = S.treasury > 1100 ? pick("smrFund") : pick("none"); break;
    case "stormBryn": fx = pick("stormFix") || pick("stormDefer"); break;
    case "copPledge": fx = S.rebellion < 55 ? pick("copBack") : pick("copQuiet"); break;
    case "teaOffensive": fx = (S.rebellion > 45 && S.pc >= 15) ? pick("teaCharm") : pick("none"); break;
    case "gigafactory": fx = S.treasury > 1000 ? pick("gigaFund") : pick("none"); break;
    case "evMandate": fx = S.year <= 6 ? pick("evBack") : pick("evDelay"); break;
    case "doggerBreak": fx = pick("doggerFix") || pick("doggerDefer"); break;
    case "scotGrid": fx = S.treasury > 1600 ? pick("scotBuild") : (S.treasury > 700 ? pick("scotTariffAccept") : pick("scotRefuse")); break;
    case "evSurge": fx = pick("evSurgeLng") || pick("evSurgeCurtail"); break;
  }
  if (!fx) fx = playable.length ? playable[0].fx : "broke";
  return fx;
}

function planTurn(S) {
  let s = S;
  // 1. Year 1 structural policies
  if (s.year === 1 && !s.policies.queueReform && s.pc >= 25) s = enactPolicy(s, "queueReform");
  if (s.year <= 2 && !s.policies.skillsAcademy && s.treasury - 250 > RESERVE && s.pc >= 5) s = enactPolicy(s, "skillsAcademy");
  if (s.year >= 2 && s.year <= 4 && !s.policies.carbonLevy && s.pc >= 10) s = enactPolicy(s, "carbonLevy");
  if (s.year >= 3 && !s.policies.communityFund && s.treasury - 400 > RESERVE && s.pc >= 5) s = enactPolicy(s, "communityFund");

  // 2. Late-game demand relief
  if (s.year >= 7 && !s.policies.dsr && s.treasury - 450 > RESERVE && s.pc >= 10) s = enactPolicy(s, "dsr");
  if (s.year >= 7 && !s.policies.smartTariffs && s.treasury - 350 > RESERVE && s.pc >= 10) s = enactPolicy(s, "smartTariffs");

  // 3. Rebellion management
  if (s.rebellion > 60) { s = whips(s); if (s.rebellion > 60 && !s.policies.porkBarrel && s.treasury - 350 > RESERVE) s = enactPolicy(s, "porkBarrel"); if (s.rebellion > 70 && !s.policies.reshuffle && s.pc >= 20) s = enactPolicy(s, "reshuffle"); }

  // 4. Build loop — spend down toward reserve, fixing bottlenecks & margin
  for (let guard = 0; guard < 12; guard++) {
    const f = flowsOf(s);
    const nextDemand = G.demandForYear(Math.min(s.year + 1, 12), s.demandExtra) + s.demandExtraD;
    const margin = G.firmCoverGW(s) + f.cleanDelivered - nextDemand;
    const interm = G.intermittencyRisk(s, f.demand);

    // saturated boundary? reinforce the worst one
    let worst = null, worstU = 0.92;
    for (const id of Object.keys(s.links)) {
      const cap = s.links[id] ? s.links[id].cap : 0;
      if (cap <= 0) continue;
      const u = (f.byLink[id] || 0) / cap;
      if (u > worstU) { worstU = u; worst = id; }
    }
    if (worst && s.treasury - 900 > RESERVE) { const ns = upgradeLink(s, worst, "hvdc"); if (ns !== s) { s = ns; continue; } }
    if (worst && s.treasury - 320 > RESERVE) { const ns = upgradeLink(s, worst, "pylon"); if (ns !== s) { s = ns; continue; } }

    // thin margin or unstable grid? add firm capacity
    if ((margin < 5 || interm > 32)) {
      if (s.treasury - 320 > RESERVE) { const ns = buildAsset(s, "B", "battery"); if (ns !== s) { s = ns; continue; } }
      if (s.treasury - 850 > RESERVE) { const ns = buildAsset(s, "C", "smr"); if (ns !== s) { s = ns; continue; } }
    }

    // otherwise grow clean generation cheaply: offshore at coast, solar in south
    if (s.treasury - 550 > RESERVE) { const ns = buildAsset(s, "C", "offshore"); if (ns !== s) { s = ns; continue; } }
    if (s.treasury - 550 > RESERVE) { const ns = buildAsset(s, "A", "offshore"); if (ns !== s) { s = ns; continue; } }
    if (s.treasury - 140 > RESERVE) { const ns = buildAsset(s, "D", "solar"); if (ns !== s) { s = ns; continue; } }
    break;
  }

  // 5. Strategic reserve insurance if margin still scary
  const f2 = flowsOf(s);
  const nd2 = G.demandForYear(Math.min(s.year + 1, 12), s.demandExtra) + s.demandExtraD;
  if (G.firmCoverGW(s) + f2.cleanDelivered - nd2 < 3 && !s.policies.strategicReserve && s.treasury - 500 > 0) s = enactPolicy(s, "strategicReserve");

  return s;
}

/* ------------------------------- one game ------------------------------- */
function playGame(scenarioId) {
  let s = G.initialState(scenarioId);
  s = { ...s, phase: "play" };
  let guard = 0;
  while (s.phase === "play" && guard++ < 40) {
    s = planTurn(s);
    // advance -> crisis -> choice -> resolveYear
    const card = s.deck[(s.year - 1) % s.deck.length];
    const fx = chooseCrisis(s, card);
    const { state: afterCrisis, mods } = G.applyCrisisChoice(s, fx);
    if (afterCrisis.treasury < 0) return { type: "bankrupt", netZero: afterCrisis.netZero, year: s.year };
    if (afterCrisis.rebellion >= 100) return { type: "coup", netZero: afterCrisis.netZero, year: s.year };
    s = G.resolveYear({ ...afterCrisis, activeCrisis: null }, mods);
  }
  if (s.gameOver) return { type: s.gameOver.type, netZero: s.netZero, year: s.year };
  return { type: "report", netZero: s.netZero, year: s.year, rebellion: s.rebellion, treasury: s.treasury, approval: s.approval };
}

/* ------------------------------- harness -------------------------------- */
const RUNS = parseInt(process.argv[2] || "4000", 10);
const SCEN = process.argv[3] || null;
const scenarios = SCEN ? [SCEN] : G.SCENARIOS.map(x => x.id);

for (const sc of scenarios) {
  const outcomes = {};
  let nzSum = 0, survived = 0, win80 = 0, win90 = 0, nzList = [];
  for (let i = 0; i < RUNS; i++) {
    const r = playGame(sc);
    outcomes[r.type] = (outcomes[r.type] || 0) + 1;
    nzSum += r.netZero; nzList.push(r.netZero);
    if (r.type === "report") {
      survived++;
      if (r.netZero >= 80) win80++;
      if (r.netZero >= 90) win90++;
    }
  }
  nzList.sort((a, b) => a - b);
  const median = nzList[Math.floor(nzList.length / 2)];
  const pct = n => `${(100 * n / RUNS).toFixed(1)}%`;
  console.log(`\n=== Scenario: ${sc}  (n=${RUNS}) ===`);
  console.log(`  survived to report : ${pct(survived)}`);
  console.log(`  WIN (report & NZ≥80): ${pct(win80)}   <-- target ~60%`);
  console.log(`  great (report&NZ≥90): ${pct(win90)}`);
  console.log(`  mean NetZero        : ${(nzSum / RUNS).toFixed(1)}%   median: ${median}%`);
  console.log(`  losses: bankrupt ${pct(outcomes.bankrupt||0)} | coup ${pct(outcomes.coup||0)} | blackout ${pct(outcomes.blackout||0)}`);
}
