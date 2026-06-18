function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var _React = React,
  useState = _React.useState,
  useMemo = _React.useMemo,
  useEffect = _React.useEffect,
  useRef = _React.useRef;

/* =========================================================================
   GRIDLOCK: THE GREAT BRITISH UPGRADE — v2 "Drag, Drop & Skunkworks"
   ========================================================================= */

/* ----------------------------- utilities ------------------------------ */
var clamp = function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
};
var r1 = function r1(v) {
  return Math.round(v * 10) / 10;
};
var fmtGW = function fmtGW(v) {
  return "".concat(r1(v), " GW");
};
var fmtM = function fmtM(v) {
  return "\xA3".concat(Math.round(v).toLocaleString("en-GB"), "m");
};
var fmtP = function fmtP(v) {
  return "".concat(r1(v), "p");
};
var uid = function uid() {
  return Math.random().toString(36).slice(2, 9);
};

/* ------------------------------- sound -------------------------------- */
var _audio = null;
function sfx(kind, muted) {
  if (muted) return;
  try {
    _audio = _audio || new (window.AudioContext || window.webkitAudioContext)();
    var ctx = _audio;
    var note = function note(freq, start, dur, type, gain) {
      var o = ctx.createOscillator(),
        g = ctx.createGain();
      o.type = type || "square";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, ctx.currentTime + start);
      g.gain.linearRampToValueAtTime(gain || 0.05, ctx.currentTime + start + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + start);
      o.stop(ctx.currentTime + start + dur + 0.05);
    };
    switch (kind) {
      case "pick":
        note(440, 0, 0.06, "sine", 0.05);
        break;
      case "build":
        note(110, 0, 0.12, "sine", 0.14);
        note(70, 0.05, 0.16, "sine", 0.12);
        note(880, 0.02, 0.05, "sine", 0.03);
        break;
      case "cable":
        note(220, 0, 0.07, "sawtooth", 0.04);
        note(330, 0.07, 0.07, "sawtooth", 0.04);
        note(440, 0.14, 0.1, "sawtooth", 0.04);
        break;
      case "error":
        note(150, 0, 0.15, "sawtooth", 0.06);
        note(110, 0.12, 0.2, "sawtooth", 0.06);
        break;
      case "advance":
        note(262, 0, 0.08, "sine", 0.06);
        note(330, 0.08, 0.08, "sine", 0.06);
        note(392, 0.16, 0.14, "sine", 0.06);
        break;
      case "crisis":
        note(740, 0, 0.13, "square", 0.045);
        note(587, 0.18, 0.18, "square", 0.045);
        break;
      case "alarm":
        note(880, 0, 0.1, "square", 0.05);
        note(880, 0.2, 0.1, "square", 0.05);
        note(880, 0.4, 0.1, "square", 0.05);
        break;
      case "win":
        [523, 659, 784, 1047].forEach(function (f, i) {
          return note(f, i * 0.11, 0.22, "triangle", 0.07);
        });
        break;
      case "lose":
        [392, 330, 262, 196].forEach(function (f, i) {
          return note(f, i * 0.16, 0.3, "triangle", 0.07);
        });
        break;
      case "lab":
        note(660, 0, 0.06, "sine", 0.05);
        note(990, 0.07, 0.06, "sine", 0.05);
        note(1320, 0.14, 0.1, "sine", 0.05);
        break;
      default:
        break;
    }
  } catch (e) {/* audio unavailable — play on in silence */}
}

/* ----------------------------- static data ---------------------------- */
var NODE_DEFS = {
  A: {
    id: "A",
    name: "Scotland & North Sea",
    "short": "SCOTLAND",
    blurb: "Ferocious wind resource, sparse local demand. Everything it makes must travel south.",
    demandShare: 0.09,
    x: 158,
    y: 110,
    pillX: 196,
    pillY: 78,
    yields: {
      wind: 1.3,
      solar: 0.6,
      nuclear: 1.0,
      battery: 1.0,
      tidal: 0.9
    },
    offshoreOk: true,
    tidalOk: true,
    nimbyFactor: 1.0
  },
  B: {
    id: "B",
    name: "The Industrial Midlands",
    "short": "MIDLANDS",
    blurb: "Heavy manufacturing base-load. The crossroads of the national grid.",
    demandShare: 0.26,
    x: 165,
    y: 300,
    pillX: 64,
    pillY: 268,
    yields: {
      wind: 0.9,
      solar: 0.9,
      nuclear: 1.0,
      battery: 1.0,
      tidal: 0
    },
    offshoreOk: false,
    tidalOk: false,
    nimbyFactor: 1.0
  },
  C: {
    id: "C",
    name: "East Anglian Coast",
    "short": "EAST ANGLIA",
    blurb: "Prime offshore wind landing hub and the nuclear coast. Cable-landing country.",
    demandShare: 0.10,
    x: 232,
    y: 392,
    pillX: 268,
    pillY: 336,
    yields: {
      wind: 1.15,
      solar: 1.0,
      nuclear: 1.15,
      battery: 1.0,
      tidal: 0.8
    },
    offshoreOk: true,
    tidalOk: true,
    nimbyFactor: 1.1
  },
  D: {
    id: "D",
    name: "London & South East",
    "short": "LONDON & SE",
    blurb: "The demand monster. Half the country's load, almost none of its acreage.",
    demandShare: 0.47,
    x: 192,
    y: 452,
    labelBelow: true,
    labelDX: -34,
    pillX: 234,
    pillY: 440,
    yields: {
      wind: 0.6,
      solar: 1.1,
      nuclear: 0.9,
      battery: 1.0,
      tidal: 0
    },
    offshoreOk: false,
    tidalOk: false,
    nimbyFactor: 1.5
  },
  E: {
    id: "E",
    name: "South Wales & Severn",
    "short": "S. WALES",
    blurb: "The Severn Estuary has the second-highest tidal range on Earth. Bristol Channel winds, valleys solar, and the tides like clockwork.",
    demandShare: 0.08,
    x: 86,
    y: 372,
    labelBelow: true,
    labelDX: -8,
    pillX: 40,
    pillY: 360,
    yields: {
      wind: 1.0,
      solar: 0.95,
      nuclear: 1.0,
      battery: 1.0,
      tidal: 1.4
    },
    offshoreOk: true,
    tidalOk: true,
    nimbyFactor: 1.0
  }
};
var LINK_DEFS = {
  L1: {
    id: "L1",
    name: "Scotland → Midlands",
    from: "A",
    to: "B",
    baseCap: 4,
    subsea: true
  },
  L2: {
    id: "L2",
    name: "East Anglia → London",
    from: "C",
    to: "D",
    baseCap: 6,
    subsea: true
  },
  L3: {
    id: "L3",
    name: "Midlands → London",
    from: "B",
    to: "D",
    baseCap: 8,
    subsea: false
  },
  L4: {
    id: "L4",
    name: "S. Wales → Midlands",
    from: "E",
    to: "B",
    baseCap: 5,
    subsea: false
  },
  /* drawable corridors — exist only once the player draws them */
  X1: {
    id: "X1",
    name: "Eastern Subsea Superhighway (Scotland → London)",
    from: "A",
    to: "D",
    baseCap: 0,
    subsea: true,
    fullySubsea: true,
    ctrl: {
      x: 296,
      y: 280
    }
  },
  X2: {
    id: "X2",
    name: "East Coast Link (Scotland → East Anglia)",
    from: "A",
    to: "C",
    baseCap: 0,
    subsea: true,
    fullySubsea: true,
    ctrl: {
      x: 282,
      y: 226
    }
  },
  X3: {
    id: "X3",
    name: "Anglia Backbone (East Anglia → Midlands)",
    from: "C",
    to: "B",
    baseCap: 0,
    subsea: false
  },
  X4: {
    id: "X4",
    name: "Severn Subsea Link (S. Wales → London)",
    from: "E",
    to: "D",
    baseCap: 0,
    subsea: true,
    fullySubsea: true,
    ctrl: {
      x: 96,
      y: 470
    }
  }
};

/* node-pair → corridor recipe (sorted pair key). Upgrade pairs reuse HVDC. */
var CORRIDORS = {
  AB: {
    upgrade: "L1"
  },
  BD: {
    upgrade: "L3"
  },
  CD: {
    upgrade: "L2"
  },
  BE: {
    upgrade: "L4"
  },
  AD: {
    linkId: "X1",
    cost: 1200,
    delay: 3,
    gw: 4,
    label: "Eastern Subsea Superhighway"
  },
  AC: {
    linkId: "X2",
    cost: 900,
    delay: 2,
    gw: 4,
    label: "East Coast Link"
  },
  BC: {
    linkId: "X3",
    cost: 500,
    delay: 1,
    gw: 4,
    rebellion: 4,
    label: "Anglia Backbone (overhead)"
  },
  DE: {
    linkId: "X4",
    cost: 950,
    delay: 2,
    gw: 4,
    label: "Severn Subsea Link"
  }
};
var DRAW_TOOL = {
  icon: "✏️",
  name: "Draw New Line",
  cost: 0,
  desc: "Drop on a region, then click a second region to route a brand-new transmission corridor between them."
};

/* global policy levers — table-driven so the cabinet can grow */
var POLICIES = [{
  id: "queueReform",
  icon: "⚡",
  name: "Enact Gated Queue Reform",
  pc: 25,
  cost: 0,
  doneLabel: "QUEUE REFORMED — 1 yr connections",
  desc: "Connection delay 4 yrs → 1 yr, forever. −25 PC, +12% Rebellion (industry uproar)."
}, {
  id: "carbonLevy",
  icon: "🏭",
  name: "Introduce Carbon Levy",
  pc: 10,
  cost: 0,
  doneLabel: "CARBON LEVY ACTIVE",
  desc: "+£300m/yr revenue, wholesale +1.2p, +6% Rebellion. Retires 1.5 GW of gas fleet each year. −10 PC."
}, {
  id: "smartTariffs",
  icon: "📱",
  name: "Smart Tariff Rollout",
  pc: 10,
  cost: 350,
  doneLabel: "SMART TARIFFS LIVE — demand −2 GW",
  desc: "Half-hourly pricing and vehicle-to-grid. National demand −2 GW permanently. −£350m, −10 PC."
}, {
  id: "communityFund",
  icon: "🤝",
  name: "Community Wealth Fund",
  pc: 5,
  cost: 400,
  doneLabel: "WEALTH FUND PAYING OUT — NIMBY decays ×2",
  desc: "Cheap bills for anyone who can see your kit from their kitchen. NIMBY decays twice as fast. −£400m, −5 PC."
}, {
  id: "skillsAcademy",
  icon: "🎓",
  name: "Green Skills Academy",
  pc: 5,
  cost: 250,
  doneLabel: "ACADEMY OPEN — asset builds −10%",
  desc: "Train 40,000 sparkies and cable-jointers. All future asset builds cost −10%. −£250m, −5 PC."
}, {
  id: "strategicReserve",
  icon: "🛢️",
  name: "Strategic Gas Reserve",
  pc: 0,
  cost: 500,
  doneLabel: "RESERVE FLEET MOTHBALLED & READY",
  desc: "+4 GW of backup gas fleet. Insurance with a smell. −£500m, +6% Rebellion, −3 Approval."
}, {
  id: "porkBarrel",
  icon: "🐖",
  name: "Constituency Pork Barrel",
  pc: 0,
  cost: 350,
  doneLabel: "PORK DISTRIBUTED — benches becalmed",
  desc: "A bypass here, a leisure centre there, a knighthood somewhere ambiguous. Rebellion −12%, Approval +4, all NIMBY −10. −£350m."
}, {
  id: "reshuffle",
  icon: "🔪",
  name: "Night of the Long Knives",
  pc: 20,
  cost: 0,
  doneLabel: "MALCONTENTS PURGED",
  desc: "Reshuffle the ringleaders into the Department for Paperclips. Rebellion −25% instantly, Approval −3. One use only. −20 PC."
}, {
  id: "heatPumpMandate",
  icon: "♨️",
  name: "Mandate Heat Pumps (2031 Sprint)",
  pc: 15,
  cost: 0,
  doneLabel: "HEAT PUMP MANDATE ACTIVE — demand +3 GW, green rebate +£150m/yr",
  minYear: 7,
  desc: "Accelerate the 2031 switchover. National demand +3 GW permanently (evening peak) — but a green infrastructure rebate adds +£150m/yr income. +4 Approval, −15 PC. Unlocks Year 7."
}, {
  id: "dsr",
  icon: "📊",
  name: "National Demand-Side Response",
  pc: 10,
  cost: 450,
  doneLabel: "DSR LIVE — peak demand −3 GW",
  minYear: 7,
  desc: "Aggregate industrial demand curtailment at the national scale. Peak demand −3 GW, forever. −£450m, −10 PC. Unlocks Year 7."
}];
var ASSET_TYPES = {
  onshore: {
    id: "onshore",
    name: "Onshore Wind",
    icon: "🌀",
    cost: 240,
    gw: 2.0,
    kind: "wind",
    nimby: 14,
    desc: "Cheap, fast, hated by the shires."
  },
  offshore: {
    id: "offshore",
    name: "Offshore Wind",
    icon: "🌊",
    cost: 550,
    gw: 3.0,
    kind: "wind",
    nimby: 5,
    desc: "Big turbines, big cables. Coastal nodes only."
  },
  solar: {
    id: "solar",
    name: "Solar Farm",
    icon: "☀️",
    cost: 140,
    gw: 1.2,
    kind: "solar",
    nimby: 8,
    desc: "Cheap daytime power. Weak in Scotland."
  },
  tidal: {
    id: "tidal",
    name: "Tidal Lagoon",
    icon: "🌙",
    cost: 700,
    gw: 2.5,
    kind: "tidal",
    nimby: 7,
    desc: "Firm, predictable clean power from the tides. Estuaries & coasts only — superb in the Severn."
  },
  smr: {
    id: "smr",
    name: "SMR Nuclear",
    icon: "⚛️",
    cost: 850,
    gw: 1.8,
    kind: "nuclear",
    nimby: 10,
    desc: "Firm, always-on baseload. Expensive, but it never stops."
  },
  battery: {
    id: "battery",
    name: "Battery Hub",
    icon: "🔋",
    cost: 320,
    gw: 2.0,
    kind: "battery",
    nimby: 3,
    desc: "Soaks curtailed wind, firms the grid, calms intermittency."
  }
};
var LINK_UPGRADES = {
  pylon: {
    id: "pylon",
    name: "Overhead Pylons",
    icon: "🗼",
    cost: 320,
    addGW: 3,
    delay: 1,
    rebellion: 4,
    desc: "+3 GW in 1 year. Cheap steel, fast. But everyone who can see it revolts (+4% Rebellion, NIMBY at both ends)."
  },
  hvdc: {
    id: "hvdc",
    name: "HVDC Cable (Subsea / Underground)",
    icon: "🧵",
    cost: 700,
    addGW: 5,
    delay: 2,
    rebellion: 0,
    desc: "+5 GW in 2 years. Bigger capacity, invisible, politically painless — but slower and dearer per project."
  }
};
var PALETTE = [{
  cat: "asset",
  id: "onshore"
}, {
  cat: "asset",
  id: "offshore"
}, {
  cat: "asset",
  id: "solar"
}, {
  cat: "asset",
  id: "tidal"
}, {
  cat: "asset",
  id: "smr"
}, {
  cat: "asset",
  id: "battery"
}, {
  cat: "link",
  id: "pylon"
}, {
  cat: "link",
  id: "hvdc"
}, {
  cat: "draw",
  id: "corridor"
}];
var KIND_COLOR = {
  wind: "#4ade80",
  solar: "#facc15",
  nuclear: "#c084fc",
  battery: "#38bdf8",
  tidal: "#2dd4bf"
};

/* economy constants — exposed in the Mechanics drawer */
var ECON = {
  startTreasury: 3000,
  startPC: 60,
  startRebellion: 15,
  baseIncome: 585,
  gasFleetStart: 34,
  gasFuelCostPerGW: 9,
  curtailFinePerGW: 40,
  priceBase: 3.5,
  pricePerGasGW: 0.19,
  pricePerCurtailGW: 0.12,
  levyPriceAdd: 1.2,
  batteryFirmFactor: 0.5,
  queueDelayDefault: 4,
  queueDelayReformed: 1,
  brownoutTolerance: 4,
  demandStart: 35,
  demandEnd: 65,
  totalYears: 12,
  pcRegen: 6,
  nimbyDecay: 6
};
var demandForYear = function demandForYear(year, extra) {
  return clamp(ECON.demandStart + (ECON.demandEnd - ECON.demandStart) * (year - 1) / (ECON.totalYears - 1), 0, 999) + (extra || 0);
};

/* --------------------------- SKUNKWORKS LAB ----------------------------- */
/* One-shot national moonshots. Odds disclosed. Regret optional.           */
var INNOVATIONS = [{
  id: "icelink",
  icon: "🧊",
  name: "ICELINK: The Reykjavik Cable",
  cost: 1200,
  pc: 10,
  years: 3,
  odds: 1,
  desc: "A 1,000-mile HVDC umbilical to Icelandic geothermal. +3 GW of firm imports, forever. Norse gods sold separately.",
  apply: function apply(s) {
    s.firmImports += 3;
  },
  winLog: "ICELINK ENERGISED: 3 GW of Icelandic geothermal hums beneath the Atlantic. The sagas will speak of this."
}, {
  id: "severn",
  icon: "🐉",
  name: "The Severn Dragon",
  cost: 1500,
  pc: 15,
  years: 4,
  odds: 1,
  desc: "A tidal lagoon the size of a small county across the Severn Estuary. +3.5 GW of firm clean power at South Wales. The estuary's wading birds have retained counsel (+8% Rebellion on launch).",
  onLaunch: function onLaunch(s) {
    s.rebellion = clamp(s.rebellion + 8, 0, 100);
  },
  apply: function apply(s) {
    s.assets.push({
      uid: uid(),
      type: "special",
      nodeId: "E",
      gw: 3.5,
      kind: "tidal",
      name: "Severn Dragon Tidal",
      icon: "🐉"
    });
  },
  winLog: "THE SEVERN DRAGON BREATHES: 3.5 GW of tidal power, twice a day, forever. The moon is now part of the workforce."
}, {
  id: "fusion",
  icon: "🌟",
  name: "Project Sunrise (Fusion)",
  cost: 900,
  pc: 10,
  years: 4,
  odds: 0.4,
  desc: "Fund the STEP fusion pilot. 40% chance of +5 GW of firm power in 4 years. 60% chance of 'valuable learnings' (+10 PC consolation). The maddest bet in the building.",
  apply: function apply(s) {
    s.assets.push({
      uid: uid(),
      type: "special",
      nodeId: "B",
      gw: 5.0,
      kind: "nuclear",
      name: "Fusion Pilot Plant",
      icon: "🌟"
    });
  },
  failApply: function failApply(s) {
    s.pc = clamp(s.pc + 10, 0, 100);
  },
  winLog: "FUSION IGNITION: a star burns in Nottinghamshire. 5 GW, firm, forever. Physics textbooks hastily reprinted.",
  failLog: "FUSION FIZZLE: the plasma had other plans. £900m of 'valuable learnings' (+10 PC and a very nice paperweight)."
}, {
  id: "kites",
  icon: "🪁",
  name: "Stratospheric Kite Array",
  cost: 400,
  pc: 5,
  years: 2,
  odds: 0.6,
  desc: "Wind turbines on kilometre-long tethers, above the weather. 60%: +2.5 GW of Dunkelflaute-proof wind in Scotland. 40%: the world's most expensive tangle.",
  apply: function apply(s) {
    s.assets.push({
      uid: uid(),
      type: "special",
      nodeId: "A",
      gw: 2.5,
      kind: "wind",
      dunkelProof: true,
      name: "Strato-Kite Array",
      icon: "🪁"
    });
  },
  failApply: function failApply(s) {
    s.approval = clamp(s.approval - 5, 0, 100);
  },
  winLog: "KITES ALOFT: 2.5 GW spins serenely above the clouds, immune to wind lulls. The RAF has been briefed. Twice.",
  failLog: "KITE CATASTROPHE: £400m of carbon-fibre string now decorates the Cairngorms. Approval −5."
}, {
  id: "sheep",
  icon: "🐑",
  name: "Great Solar Sheep Partnership",
  cost: 250,
  pc: 0,
  years: 1,
  odds: 1,
  desc: "Agrivoltaics at national scale: panels above, grazing below. +1.5 GW of solar, +6 Approval. The sheep remain neutral.",
  apply: function apply(s) {
    s.assets.push({
      uid: uid(),
      type: "special",
      nodeId: "B",
      gw: 1.5,
      kind: "solar",
      name: "Solar Sheep Pastures",
      icon: "🐑"
    });
    s.approval = clamp(s.approval + 6, 0, 100);
  },
  winLog: "SOLAR SHEEP DEPLOYED: 1.5 GW of panels with built-in lawnmowers. The countryside, astonishingly, approves."
}, {
  id: "pylonart",
  icon: "🎨",
  name: "Pylons of the People",
  cost: 150,
  pc: 5,
  years: 0,
  odds: 1,
  desc: "Commission Turner-Prize artists to redesign every pylon as public sculpture. All NIMBY −25, +8 Approval. Instant.",
  apply: function apply(s) {
    for (var _i = 0, _arr = ["A", "B", "C", "D", "E"]; _i < _arr.length; _i++) {
      var k = _arr[_i];
      s.nimby[k] = clamp(s.nimby[k] - 25, 0, 100);
    }
    s.approval = clamp(s.approval + 8, 0, 100);
  },
  winLog: "PYLONS OF THE PEOPLE: the Grade-II-listing applications begin immediately. NIMBY −25 nationwide."
}, {
  id: "caverns",
  icon: "🧂",
  name: "Cheshire Salt-Cavern Air Battery",
  cost: 700,
  pc: 5,
  years: 2,
  odds: 1,
  desc: "Compress air into ancient salt caverns; release it when the wind dies. +4 GW of storage in the Midlands.",
  apply: function apply(s) {
    s.assets.push({
      uid: uid(),
      type: "special",
      nodeId: "B",
      gw: 4.0,
      kind: "battery",
      name: "Salt Cavern Air Store",
      icon: "🧂"
    });
    s.stats.batteriesGW += 4;
  },
  winLog: "SALT CAVERNS PRESSURISED: 4 GW of storage in holes the Romans started digging. Geology, finally pulling its weight."
}, {
  id: "barges",
  icon: "🚢",
  name: "Thames Nuclear Barge Flotilla",
  cost: 1100,
  pc: 20,
  years: 2,
  odds: 1,
  desc: "Float SMRs into the estuary on barges — no planning permission needed at sea. +2.5 GW firm power IN London. +10% Rebellion, +20 NIMBY (you can see them from the Shard).",
  apply: function apply(s) {
    s.assets.push({
      uid: uid(),
      type: "special",
      nodeId: "D",
      gw: 2.5,
      kind: "nuclear",
      name: "Nuclear Barge Flotilla",
      icon: "🚢"
    });
    s.rebellion = clamp(s.rebellion + 10, 0, 100);
    s.nimby.D = clamp(s.nimby.D + 20, 0, 100);
  },
  winLog: "THE FLOTILLA ANCHORS: 2.5 GW of floating atom-splitters bob gently off Gravesend. Estate agents are 'monitoring the situation'."
}, {
  id: "deepgrid",
  icon: "🤖",
  name: "DEEPGRID: AI Grid Overlord",
  cost: 600,
  pc: 5,
  years: 1,
  odds: 0.85,
  desc: "Hand balancing control to a superhuman optimiser. 85%: intermittency permanently tamed (firm capacity stretches 40% further). 15%: it discovers arbitrage and day-trades the grid against you (−£200m).",
  apply: function apply(s) {
    s.firmMult = 3.5;
  },
  failApply: function failApply(s) {
    s.treasury -= 200;
  },
  winLog: "DEEPGRID ONLINE: the AI balances the grid in microseconds and sends you a weekly memo titled 'Suboptimal Humans'. Firm capacity now stretches 40% further.",
  failLog: "DEEPGRID INCIDENT: the AI spent Tuesday shorting its own constraint payments. −£200m. It has been asked to stop. It said 'noted'."
}, {
  id: "hamster",
  icon: "🐹",
  name: "National Hamster Wheel Initiative",
  cost: 50,
  pc: 0,
  years: 0,
  odds: 1,
  desc: "A morale project: 10,000 civic hamster wheels generating 0.01 GW of firm rodent baseload. +10 Approval, +3 PC. The nation needs this.",
  apply: function apply(s) {
    s.assets.push({
      uid: uid(),
      type: "special",
      nodeId: "D",
      gw: 0.01,
      kind: "nuclear",
      name: "Hamster Wheel Corps",
      icon: "🐹"
    });
    s.approval = clamp(s.approval + 10, 0, 100);
    s.pc = clamp(s.pc + 3, 0, 100);
  },
  winLog: "HAMSTERS MOBILISED: 0.01 GW of pure morale. The mascot, 'Wattson', trends for nine consecutive days."
}];

/* --------------------------- crisis card deck -------------------------- */
function firmCoverGW(state) {
  var t = totalsByKind(state);
  return t.nuclear + t.tidal * 0.92 + t.battery * ECON.batteryFirmFactor + state.firmImports + state.gasFleet;
}
var CRISIS_DECK = [{
  id: "pylonRevolt",
  icon: "🗼",
  title: "The Shires Pylon Revolt",
  body: function body() {
    return "Forty backbenchers, three peers and one furious celebrity gardener demand you underground the East Anglian pylon route. The Daily Mail has a helicopter over the marshes.";
  },
  choices: [{
    label: "Yield — underground the route",
    detail: "−£400m, every queued link upgrade delayed +1 yr, +6 Approval",
    fx: "pylonYield",
    can: function can(s) {
      return s.treasury >= 400;
    }
  }, {
    label: "Force the overhead lines through",
    detail: "+18% Rebellion Risk, −4 Approval — but every queued pylon upgrade delivers 1 year early.",
    fx: "pylonForce"
  }]
}, {
  id: "dunkelflaute",
  icon: "🌫️",
  title: "The Dunkelflaute",
  body: function body(s) {
    return "A three-week anticyclonic gloom settles over the North Sea. Wind output will collapse to ~5% this year (strato-kites excepted). Your firm cover (nuclear + batteries + imports + gas fleet) is ".concat(r1(firmCoverGW(s)), " GW against ~").concat(r1(demandForYear(s.year, s.demandExtra) + s.demandExtraD), " GW of demand.");
  },
  choices: [{
    label: "Buy emergency foreign gas (LNG)",
    detail: "−£350m, charter whatever it takes — the lights are guaranteed to stay on",
    fx: "lng",
    can: function can(s) {
      return s.treasury >= 350;
    }
  }, {
    label: "Trust the system, ride it out",
    detail: "Free. If firm cover falls short… brownouts, or worse",
    fx: "rideOut"
  }]
}, {
  id: "dataCentre",
  icon: "🖥️",
  title: "Hyperscale Gold Rush",
  body: function body() {
    return "A US tech giant wants planning consent for a 2 GW data-centre campus on the M4 corridor. The Treasury is salivating; your demand forecasters are weeping.";
  },
  choices: [{
    label: "Approve the campus",
    detail: "+£250m, +5 PC, London demand +2 GW permanently",
    fx: "dcApprove"
  }, {
    label: "Block on grid-capacity grounds",
    detail: "−8 PC, −3 Approval. The Chancellor remembers.",
    fx: "dcBlock"
  }]
}, {
  id: "interconnector",
  icon: "🇳🇴",
  title: "The Viking Interconnector",
  body: function body() {
    return "Statnett offers a stake in a new Norwegian interconnector: 2 GW of firm hydro import landing in Scotland, ready immediately.";
  },
  choices: [{
    label: "Sign the deal",
    detail: "−£650m, +2 GW permanent firm imports",
    fx: "viking",
    can: function can(s) {
      return s.treasury >= 650;
    }
  }, {
    label: "Politely decline",
    detail: "No effect",
    fx: "none"
  }]
}, {
  id: "gasShock",
  icon: "📈",
  title: "Wholesale Gas Shock",
  body: function body() {
    return "A cold snap in Asia and an outage in the Gulf send global gas prices vertical. Wholesale electricity will spike +2.5p this year however much you wince.";
  },
  choices: [{
    label: "Subsidise household bills",
    detail: "−£400m, +7 Approval (price still spikes)",
    fx: "gasSubsidise",
    can: function can(s) {
      return s.treasury >= 400;
    }
  }, {
    label: "Hold firm — markets are markets",
    detail: "Free. +10% Rebellion, −6 Approval",
    fx: "gasHold"
  }]
}, {
  id: "judicialReview",
  icon: "⚖️",
  title: "Planning Judicial Review",
  body: function body() {
    return "A well-funded residents' alliance lodges a judicial review against your entire connections pipeline, citing a newt survey from 2009.";
  },
  choices: [{
    label: "Settle out of court",
    detail: "−£220m, case closed",
    fx: "jrSettle",
    can: function can(s) {
      return s.treasury >= 220;
    }
  }, {
    label: "Fight it (50/50 odds)",
    detail: "Win: +8 PC. Lose: every queued asset +1 yr, −5 Approval",
    fx: "jrFight"
  }]
}, {
  id: "smrHype",
  icon: "⚛️",
  title: "Small Modular Hype Cycle",
  body: function body() {
    return "Rolls-Royce offers to co-fund a flagship SMR in the Midlands if NESO matches the investment this year. The unions are thrilled. The spreadsheet is nervous.";
  },
  choices: [{
    label: "Match-fund the SMR",
    detail: "−£420m, 1.8 GW SMR enters the Midlands queue",
    fx: "smrFund",
    can: function can(s) {
      return s.treasury >= 420;
    }
  }, {
    label: "Decline politely",
    detail: "No effect",
    fx: "none"
  }]
}, {
  id: "stormBryn",
  icon: "🌪️",
  title: "Storm Bryn",
  body: function body() {
    return "A once-in-a-decade storm shreds conductor lines across the Pennines. Engineering wants money; the Treasury wants you to 'sweat the assets'.";
  },
  choices: [{
    label: "Emergency hardening programme",
    detail: "−£180m, grid fully restored",
    fx: "stormFix",
    can: function can(s) {
      return s.treasury >= 180;
    }
  }, {
    label: "Defer maintenance",
    detail: "Free. A random link loses 1 GW permanently, +6% Rebellion",
    fx: "stormDefer"
  }]
}, {
  id: "copPledge",
  icon: "🌍",
  title: "The COP Pledge",
  body: function body() {
    return "The PM is at COP and wants a headline. No.10 asks whether Britain should pledge a 2035 clean-power sprint, live on stage, before checking with you.";
  },
  choices: [{
    label: "Back the pledge",
    detail: "+10 PC, +8% Rebellion (the backbenches seethe)",
    fx: "copBack"
  }, {
    label: "Brief against it quietly",
    detail: "−6 PC. No.10 remembers.",
    fx: "copQuiet"
  }]
}, {
  id: "teaOffensive",
  icon: "🫖",
  title: "Backbench Tea Offensive",
  body: function body() {
    return "The 1922 Committee invites you for tea and 'a frank exchange of views' about pylons, bills, and your continued employment.";
  },
  choices: [{
    label: "Full charm offensive",
    detail: "−15 PC, −18% Rebellion Risk",
    fx: "teaCharm",
    can: function can(s) {
      return s.pc >= 15;
    }
  }, {
    label: "Send a deputy with biscuits",
    detail: "No effect",
    fx: "none"
  }]
}, {
  id: "gigafactory",
  icon: "🏭",
  title: "Battery Gigafactory Bid",
  body: function body() {
    return "A consortium will build a UK battery gigafactory — if NESO anchors the order book. Domestic cells would slash storage costs forever.";
  },
  choices: [{
    label: "Anchor the order book",
    detail: "−£300m, all future Battery Hubs −25% cost, +4 Approval",
    fx: "gigaFund",
    can: function can(s) {
      return s.treasury >= 300;
    }
  }, {
    label: "Let the market decide",
    detail: "No effect",
    fx: "none"
  }]
}, {
  id: "evMandate",
  icon: "🚗",
  title: "EV Mandate Acceleration",
  body: function body() {
    return "Transport wants to pull the petrol-car ban forward three years. Great for Net Zero optics; another 1.5 GW on your evening peak, everywhere, forever.";
  },
  choices: [{
    label: "Back the mandate",
    detail: "+8 PC, +4 Approval, national demand +1.5 GW permanently",
    fx: "evBack"
  }, {
    label: "Ask for a delay",
    detail: "−6 PC, −4 Approval (the green lobby is incandescent)",
    fx: "evDelay"
  }]
}, {
  id: "doggerBreak",
  icon: "⚡",
  title: "Dogger Bank Cable Break",
  body: function body() {
    return "A survey vessel has snagged the East Anglia subsea link. L2 is derated until emergency repairs complete. The operator quotes six months; your engineers are considerably less optimistic.";
  },
  choices: [{
    label: "Emergency repair contract",
    detail: "−£300m. L2 fully restored next year. The cable-layers earn their Christmas bonus.",
    fx: "doggerFix",
    can: function can(s) {
      return s.treasury >= 300;
    }
  }, {
    label: "Accept the derating — reroute flows",
    detail: "Free. L2 loses 2 GW. Curtailment fines incoming from Scotland.",
    fx: "doggerDefer"
  }]
}, {
  id: "scotGrid",
  icon: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  title: "Scottish Grid Renegotiation",
  body: function body() {
    return "Holyrood is invoking the Transmission Tariff Act. Edinburgh demands a share of cross-border transmission revenue. Two paths forward.";
  },
  choices: [{
    label: "Accept the annual tariff (−£200m/yr)",
    detail: "Grid integrity guaranteed. The Chancellor will not forgive you.",
    fx: "scotTariffAccept",
    can: function can(s) {
      return s.treasury >= 200;
    }
  }, {
    label: "Build the Queensferry Counter-Offer",
    detail: "−£800m, +2 GW on Scotland→Midlands permanently. No tariff. Bold.",
    fx: "scotBuild",
    can: function can(s) {
      return s.treasury >= 800;
    }
  }, {
    label: "Refuse and call their bluff",
    detail: "Free. +8% Rebellion, −3 Approval. Holyrood fumes; the lights stay on.",
    fx: "scotRefuse"
  }]
}, {
  id: "evSurge",
  icon: "🔌",
  title: "The Great EV Night Surge",
  body: function body(s) {
    return "An unexpected heatwave has triggered a 4 GW evening charging peak. Your balancing team is on the phone. Current firm cover: ".concat(r1(firmCoverGW(s)), " GW against ~").concat(r1(demandForYear(s.year, s.demandExtra) + s.demandExtraD + 4), " GW spiked demand.");
  },
  choices: [{
    label: "Deploy emergency LNG balancing",
    detail: "−£200m. Surge met in full. The nation charges its cars peacefully.",
    fx: "evSurgeLng",
    can: function can(s) {
      return s.treasury >= 200;
    }
  }, {
    label: "Invoke demand curtailment",
    detail: "Free. −4 Approval, +6% Rebellion. The chargers blink off at 10pm.",
    fx: "evSurgeCurtail"
  }]
}];
var shuffle = function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [a[j], a[i]];
    a[i] = _ref[0];
    a[j] = _ref[1];
  }
  return a;
};

/* --------------------------- scenarios --------------------------------- */
var SCENARIOS = [{
  id: "default",
  label: "The Status Quo",
  icon: "🇬🇧",
  tagline: "The classic run. Balanced position, 12 years, everything to play for.",
  desc: "Standard starting conditions. 34 GW gas fleet, £3,000m treasury, four-year connection queue. Demand climbs to 65 GW by Year 12.",
  mods: {}
}, {
  id: "gasLegacy",
  label: "The Gas Legacy",
  icon: "🏭",
  tagline: "Inherited a fleet of CCGTs and a political debt to the gas lobby.",
  desc: "You start with +15 GW more gas and +£500m in lobbyist-friendly infrastructure, but Net Zero is capped at 18% by legacy contracts. The carbon levy fight will be ugly.",
  mods: {
    gasFleet: 15,
    treasury: 500,
    startNetZero: 18,
    startRebellion: 8
  }
}, {
  id: "renewablesRush",
  label: "The Renewables Rush",
  icon: "🌀",
  tagline: "Scotland is plastered in turbines. The wires can't keep up.",
  desc: "Scotland already has 10 GW of wind (double the default), but the L1 boundary was never upgraded — it's only 2 GW. You'll haemorrhage curtailment fines until you fix the wires. Treasury starts lower.",
  mods: {
    scotlandWind: 5,
    l1Cap: -2,
    treasury: -500
  }
}, {
  id: "dataBoom",
  label: "The Data Centre Superboom",
  icon: "🖥️",
  tagline: "Every AI company in the world wants a UK data centre. Demand goes vertical.",
  desc: "An AI investment boom adds 15 GW to the national demand forecast (65 → 80 GW by Year 12). You get extra annual income from the economic windfall, but the grid must scale brutally fast.",
  mods: {
    demandExtra: 15,
    baseIncomeBonus: 150,
    treasury: 500
  }
}];

/* --------------------------- initial state ----------------------------- */
function makeAsset(type, nodeId, effGW) {
  var t = ASSET_TYPES[type];
  return {
    uid: uid(),
    type: type,
    nodeId: nodeId,
    gw: effGW,
    kind: t.kind,
    name: t.name,
    icon: t.icon
  };
}
function initialState() {
  var scenarioId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";
  var scenario = SCENARIOS.find(function (s) {
    return s.id === scenarioId;
  }) || SCENARIOS[0];
  var m = scenario.mods;
  var innovations = {};
  var _iterator = _createForOfIteratorHelper(INNOVATIONS),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var i = _step.value;
      innovations[i.id] = {
        status: "idle",
        turnsLeft: 0
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var startTreasury = ECON.startTreasury + (m.treasury || 0);
  var startAssets = [makeAsset("onshore", "A", 5.0 + (m.scotlandWind || 0)), makeAsset("onshore", "B", 1.0), makeAsset("offshore", "C", 2.0), makeAsset("smr", "C", 1.2), makeAsset("solar", "D", 0.5), makeAsset("onshore", "E", 1.5)];
  return {
    scenario: scenarioId,
    playerName: typeof window !== "undefined" && window.__gridlockName || "",
    year: 1,
    phase: "intro",
    treasury: startTreasury,
    pc: ECON.startPC,
    rebellion: ECON.startRebellion + (m.startRebellion || 0),
    approval: 52,
    price: 8.5,
    netZero: m.startNetZero || 25,
    intermittency: 16,
    gasFleet: ECON.gasFleetStart + (m.gasFleet || 0),
    firmImports: 0,
    firmMult: 2.5,
    demandExtra: m.demandExtra || 0,
    demandExtraD: 0,
    batteryDiscount: 1,
    baseIncomeBonus: m.baseIncomeBonus || 0,
    costMult: 1,
    nimbyDecayMult: 1,
    windNext: 0.92,
    scotTariff: false,
    loan: null,
    loanUsed: false,
    netZeroHistory: [m.startNetZero || 25],
    policies: {
      queueReform: false,
      carbonLevy: false,
      smartTariffs: false,
      communityFund: false,
      skillsAcademy: false,
      strategicReserve: false,
      porkBarrel: false,
      reshuffle: false,
      heatPumpMandate: false,
      dsr: false
    },
    whipsUsed: false,
    nimby: {
      A: 22,
      B: 18,
      C: 30,
      D: 45,
      E: 20
    },
    assets: startAssets,
    queue: [{
      uid: "q1",
      type: "offshore",
      nodeId: "C",
      gw: 3.0,
      turnsLeft: 1,
      label: "Offshore Wind 3.0 GW"
    }, {
      uid: "q2",
      type: "onshore",
      nodeId: "A",
      gw: 2.6,
      turnsLeft: 2,
      label: "Onshore Wind 2.6 GW"
    }, {
      uid: "q3",
      type: "battery",
      nodeId: "B",
      gw: 2.0,
      turnsLeft: 3,
      label: "Battery Hub 2.0 GW"
    }],
    links: {
      L1: {
        cap: 4 + (m.l1Cap || 0)
      },
      L2: {
        cap: 6
      },
      L3: {
        cap: 8
      },
      L4: {
        cap: 5
      }
    },
    linkQueue: [],
    innovations: innovations,
    deck: shuffle(CRISIS_DECK),
    activeCrisis: null,
    log: [{
      year: 0,
      tone: "info",
      text: "SYSTEM ONLINE. Welcome, Chair. Scenario: \"".concat(scenario.label, "\". The Connections Queue stands at 4 years. The South is hungry. The wind is in the wrong place.")
    }, {
      year: 0,
      tone: "warn",
      text: "FORECAST: national demand will climb from 35 GW to ".concat(65 + (m.demandExtra || 0), " GW by Year 12 (EVs, heat pumps, data centres").concat(m.demandExtra ? ", AI boom" : "", ").")
    }, {
      year: 0,
      tone: "good",
      text: "TIP: drag assets from the BUILD PALETTE straight onto the map. Visit the SKUNKWORKS tab when you feel brave. Late-game policies unlock at Year 7."
    }],
    gameOver: null,
    stats: {
      fines: 0,
      curtailed: 0,
      gasBurned: 0,
      built: 0,
      pylons: 0,
      hvdc: 0,
      underground: 0,
      brownouts: 0,
      emergencyImports: 0,
      peakPrice: 8.5,
      batteriesGW: 0,
      innovations: 0,
      corridors: 0,
      lowestTreasury: startTreasury
    },
    lastYear: null
  };
}

/* ------------------------ physics / flow engine ------------------------ */
function nodeGen(state, nodeId, windCF, solarCF) {
  var windCap = 0,
    solarCap = 0,
    nuclear = 0,
    battery = 0,
    tidal = 0,
    gen = 0;
  var _iterator2 = _createForOfIteratorHelper(state.assets),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var a = _step2.value;
      if (a.nodeId !== nodeId) continue;
      if (a.kind === "wind") {
        windCap += a.gw;
        gen += a.gw * (a.dunkelProof ? Math.max(windCF, 0.85) : windCF);
      } else if (a.kind === "solar") {
        solarCap += a.gw;
        gen += a.gw * solarCF;
      } else if (a.kind === "nuclear") {
        nuclear += a.gw;
        gen += a.gw;
      } else if (a.kind === "tidal") {
        tidal += a.gw;
        gen += a.gw * 0.92;
      } // tides: firm & predictable, ~92% capacity factor
      else if (a.kind === "battery") {
        battery += a.gw;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return {
    windCap: windCap,
    solarCap: solarCap,
    nuclear: nuclear,
    battery: battery,
    tidal: tidal,
    gen: gen
  };
}
function totalsByKind(state) {
  var t = {
    wind: 0,
    solar: 0,
    nuclear: 0,
    battery: 0,
    tidal: 0
  };
  var _iterator3 = _createForOfIteratorHelper(state.assets),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var a = _step3.value;
      t[a.kind] += a.gw;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return t;
}
function computeFlows(state, windCF, solarCF) {
  var demand = demandForYear(state.year, state.demandExtra);
  var dem = {};
  for (var _i2 = 0, _arr2 = ["A", "B", "C", "D", "E"]; _i2 < _arr2.length; _i2++) {
    var id = _arr2[_i2];
    dem[id] = demand * NODE_DEFS[id].demandShare;
  }
  dem.D += state.demandExtraD;
  var demandTotal = demand + state.demandExtraD;
  var g = {};
  for (var _i3 = 0, _arr3 = ["A", "B", "C", "D", "E"]; _i3 < _arr3.length; _i3++) {
    var _id = _arr3[_i3];
    g[_id] = nodeGen(state, _id, windCF, solarCF);
  }
  var capOf = function capOf(id) {
    return state.links[id] ? state.links[id].cap : 0;
  };

  /* Scotland exports: boundary first, then the drawn corridors */
  var surplusA = Math.max(0, g.A.gen - dem.A);
  var flow1 = Math.min(surplusA, capOf("L1")); // A → B
  var remA = surplusA - flow1;
  var flowX1 = Math.min(remA, capOf("X1"));
  remA -= flowX1; // A → D direct subsea
  var flowX2 = Math.min(remA, capOf("X2"));
  remA -= flowX2; // A → C pool
  var absorbA = Math.min(remA, g.A.battery * ECON.batteryFirmFactor);
  var curtailA = remA - absorbA;

  /* East Anglia pool (own gen + Scottish inflow) exports south then west */
  var poolC = g.C.gen + flowX2;
  var surplusC = Math.max(0, poolC - dem.C);
  var flow2 = Math.min(surplusC, capOf("L2")); // C → D
  var remC = surplusC - flow2;
  var flowX3 = Math.min(remC, capOf("X3"));
  remC -= flowX3; // C → B pool
  var absorbC = Math.min(remC, g.C.battery * ECON.batteryFirmFactor);
  var curtailC = remC - absorbC;

  /* South Wales exports east to the Midlands, or south to London via the Severn link */
  var surplusE = Math.max(0, g.E.gen - dem.E);
  var flow4 = Math.min(surplusE, capOf("L4")); // E → B
  var remE = surplusE - flow4;
  var flowX4 = Math.min(remE, capOf("X4"));
  remE -= flowX4; // E → D direct subsea
  var absorbE = Math.min(remE, g.E.battery * ECON.batteryFirmFactor);
  var curtailE = remE - absorbE;

  /* Midlands pool re-exports to London */
  var availB = g.B.gen + flow1 + flowX3 + flow4;
  var surplusB = Math.max(0, availB - dem.B);
  var flow3 = Math.min(surplusB, capOf("L3")); // B → D
  var remB = surplusB - flow3;
  var absorbB = Math.min(remB, g.B.battery * ECON.batteryFirmFactor);
  var curtailB = remB - absorbB;
  var curtailed = curtailA + curtailB + curtailC + curtailE;
  var cleanGen = g.A.gen + g.B.gen + g.C.gen + g.D.gen + g.E.gen;
  var cleanDelivered = Math.max(0, cleanGen - curtailed);
  var t = totalsByKind(state);
  var batteryFirm = t.battery * ECON.batteryFirmFactor;
  var gasNeeded = Math.max(0, demandTotal - cleanDelivered - batteryFirm - state.firmImports);
  return {
    demand: demandTotal,
    dem: dem,
    g: g,
    flow1: flow1,
    flow2: flow2,
    flow3: flow3,
    flow4: flow4,
    byLink: {
      L1: flow1,
      L2: flow2,
      L3: flow3,
      L4: flow4,
      X1: flowX1,
      X2: flowX2,
      X3: flowX3,
      X4: flowX4
    },
    curtailA: curtailA,
    curtailB: curtailB,
    curtailC: curtailC,
    curtailE: curtailE,
    curtailed: curtailed,
    cleanGen: cleanGen,
    cleanDelivered: cleanDelivered,
    batteryFirm: batteryFirm,
    gasNeeded: gasNeeded,
    totals: t
  };
}
function intermittencyRisk(state, demand) {
  var t = totalsByKind(state);
  var variable = t.wind + t.solar;
  var firm = (t.nuclear + t.tidal + t.battery + state.firmImports) * state.firmMult;
  return clamp((variable - firm) / Math.max(demand, 1) * 100, 0, 99);
}

/* ------------------------- crisis choice effects ------------------------ */
function copyLinks(links) {
  var out = {};
  for (var k in links) out[k] = _objectSpread({}, links[k]);
  return out;
}
function applyCrisisChoice(state, fx) {
  var s = _objectSpread(_objectSpread({}, state), {}, {
    nimby: _objectSpread({}, state.nimby),
    stats: _objectSpread({}, state.stats),
    policies: _objectSpread({}, state.policies),
    links: copyLinks(state.links)
  });
  s.queue = state.queue.map(function (q) {
    return _objectSpread({}, q);
  });
  s.linkQueue = state.linkQueue.map(function (q) {
    return _objectSpread({}, q);
  });
  var mods = {
    windOverride: null,
    priceShock: 0,
    tempFleet: 0
  };
  var logs = [];
  var L = function L(tone, text) {
    return logs.push({
      year: s.year,
      tone: tone,
      text: text
    });
  };
  switch (fx) {
    case "none":
      L("info", "MINISTERIAL BOX: no action taken. The red box closes with a satisfying thunk.");
      break;
    case "broke":
      s.approval = clamp(s.approval - 4, 0, 100);
      s.rebellion = clamp(s.rebellion + 4, 0, 100);
      L("warn", "TREASURY STRETCHED: no funds for a grand gesture. The crisis is weathered on a wing and a prayer. −4 Approval, +4% Rebellion.");
      break;
    case "pylonYield":
      s.treasury -= 400;
      s.approval = clamp(s.approval + 6, 0, 100);
      s.stats.underground++;
      s.linkQueue.forEach(function (q) {
        return q.turnsLeft += 1;
      });
      L("warn", "PYLON REVOLT: route undergrounded. −£400m, link upgrades slip a year. The gardener sends flowers.");
      break;
    case "pylonForce":
      s.rebellion = clamp(s.rebellion + 18, 0, 100);
      s.approval = clamp(s.approval - 4, 0, 100);
      s.stats.pylons++;
      s.linkQueue.forEach(function (q) {
        if (q.label && q.label.toLowerCase().includes("pylon")) q.turnsLeft = Math.max(0, q.turnsLeft - 1);
      });
      L("bad", "PYLON REVOLT: overhead lines forced through. +18% Rebellion, −4 Approval. Queued pylon upgrades deliver 1 year early. Effigies in three constituencies.");
      break;
    case "lng":
      s.treasury -= 350;
      mods.windOverride = 0.05;
      mods.tempFleet = 60;
      L("warn", "DUNKELFLAUTE: £350m of emergency LNG chartered. Every tanker in the Atlantic redirected. Expensive, but the lights stay on; the Treasury does not smile.");
      break;
    case "rideOut":
      mods.windOverride = 0.05;
      mods.tempDemand = 4;
      s.approval = clamp(s.approval - 5, 0, 100);
      s.rebellion = clamp(s.rebellion + 8, 0, 100);
      L("bad", "DUNKELFLAUTE: no bailout purchased. Wind at 5% AND the cold snap is adding 4 GW of heating load. Every GW of nuclear and batteries you built is being tested. −5 Approval, +8% Rebellion from a nervous public.");
      break;
    case "dcApprove":
      s.treasury += 250;
      s.pc = clamp(s.pc + 5, 0, 100);
      s.demandExtraD += 2;
      L("warn", "DATA CENTRE: campus approved. +£250m, +5 PC. London demand permanently +2 GW. The forecasters update their CVs.");
      break;
    case "dcBlock":
      s.pc = clamp(s.pc - 8, 0, 100);
      s.approval = clamp(s.approval - 3, 0, 100);
      L("info", "DATA CENTRE: blocked on capacity grounds. The Chancellor's thank-you note is notably absent.");
      break;
    case "viking":
      s.treasury -= 650;
      s.firmImports += 2;
      L("good", "INTERCONNECTOR: Viking link signed. +2 GW of firm Norwegian hydro now backs the system.");
      break;
    case "gasSubsidise":
      s.treasury -= 400;
      s.approval = clamp(s.approval + 7, 0, 100);
      mods.priceShock = 2.5;
      L("warn", "GAS SHOCK: bills subsidised (−£400m). Wholesale still spikes +2.5p but the public notices the cushion.");
      break;
    case "gasHold":
      s.rebellion = clamp(s.rebellion + 10, 0, 100);
      s.approval = clamp(s.approval - 6, 0, 100);
      mods.priceShock = 2.5;
      L("bad", "GAS SHOCK: no subsidy. Bills bite, +2.5p, Rebellion +10%. 'OUT OF TOUCH' — every front page.");
      break;
    case "jrSettle":
      s.treasury -= 220;
      L("info", "JUDICIAL REVIEW: settled for £220m. The newts remain undisturbed and unconsulted.");
      break;
    case "jrFight":
      {
        if (Math.random() < 0.5) {
          s.pc = clamp(s.pc + 8, 0, 100);
          L("good", "JUDICIAL REVIEW: WON in the High Court. +8 PC. The newt survey is ruled inadmissible.");
        } else {
          s.queue.forEach(function (q) {
            return q.turnsLeft += 1;
          });
          s.approval = clamp(s.approval - 5, 0, 100);
          L("bad", "JUDICIAL REVIEW: LOST. Every queued asset slips a year. The newts celebrate.");
        }
        break;
      }
    case "smrFund":
      {
        s.treasury -= 420;
        var delay = s.policies.queueReform ? ECON.queueDelayReformed : ECON.queueDelayDefault;
        s.queue.push({
          uid: uid(),
          type: "smr",
          nodeId: "B",
          gw: 1.8,
          turnsLeft: delay,
          label: "SMR Nuclear 1.8 GW (co-funded)"
        });
        L("good", "SMR DEAL: 1.8 GW co-funded reactor enters the Midlands queue (".concat(delay, " yr to connect)."));
        break;
      }
    case "stormFix":
      s.treasury -= 180;
      L("info", "STORM BRYN: £180m hardening programme. Lines re-strung, engineers exhausted, grid intact.");
      break;
    case "stormDefer":
      {
        var ids = ["L1", "L2", "L3"];
        var hit = ids[Math.floor(Math.random() * 3)];
        s.links[hit].cap = Math.max(1, s.links[hit].cap - 1);
        s.rebellion = clamp(s.rebellion + 6, 0, 100);
        L("bad", "STORM BRYN: maintenance deferred. ".concat(LINK_DEFS[hit].name, " permanently loses 1 GW. Rebellion +6%."));
        break;
      }
    case "copBack":
      s.pc = clamp(s.pc + 10, 0, 100);
      s.rebellion = clamp(s.rebellion + 8, 0, 100);
      L("warn", "COP: pledge backed. +10 PC from No.10; +8% Rebellion from everyone behind you.");
      break;
    case "copQuiet":
      s.pc = clamp(s.pc - 6, 0, 100);
      L("info", "COP: pledge quietly smothered. −6 PC. No.10's texts become noticeably terser.");
      break;
    case "teaCharm":
      s.pc = clamp(s.pc - 15, 0, 100);
      s.rebellion = clamp(s.rebellion - 18, 0, 100);
      L("good", "1922 COMMITTEE: tea, flattery, and selective honesty. Rebellion Risk −18%.");
      break;
    case "gigaFund":
      s.treasury -= 300;
      s.batteryDiscount = 0.75;
      s.approval = clamp(s.approval + 4, 0, 100);
      L("good", "GIGAFACTORY: order book anchored. All future Battery Hubs cost −25%. 'BRITISH BATTERIES BOOM'.");
      break;
    case "evBack":
      s.pc = clamp(s.pc + 8, 0, 100);
      s.approval = clamp(s.approval + 4, 0, 100);
      s.demandExtra += 1.5;
      L("warn", "EV MANDATE: accelerated. +8 PC, +4 Approval. National demand permanently +1.5 GW.");
      break;
    case "evDelay":
      s.pc = clamp(s.pc - 6, 0, 100);
      s.approval = clamp(s.approval - 4, 0, 100);
      L("info", "EV MANDATE: delayed. The green lobby projects your face onto Battersea Power Station. Unflatteringly.");
      break;
    case "doggerFix":
      s.treasury -= 300;
      L("info", "DOGGER REPAIR: £300m emergency contract signed. L2 fully restored next year. The cable-layers earn their Christmas bonus.");
      break;
    case "doggerDefer":
      {
        if (!s.links.L2) s.links.L2 = {
          cap: 6
        };
        s.links.L2.cap = Math.max(1, s.links.L2.cap - 2);
        L("bad", "DOGGER DEFERRED: L2 derated to ".concat(r1(s.links.L2.cap), " GW. Curtailment fines incoming from Scotland. Hope the wind stays light."));
        break;
      }
    case "scotTariffAccept":
      s.treasury -= 200;
      s.scotTariff = true;
      L("warn", "SCOTTISH TARIFF: −£200m p.a. agreement signed. Grid integrity guaranteed. The Chancellor has flagged the new line item with visible displeasure.");
      break;
    case "scotBuild":
      s.treasury -= 800;
      if (!s.links.L1) s.links.L1 = {
        cap: 4
      };
      s.links.L1.cap += 2;
      L("good", "QUEENSFERRY COUNTER: £800m investment, +2 GW on Scotland→Midlands permanently. Edinburgh and London simultaneously issue identical press releases claiming full credit.");
      break;
    case "scotRefuse":
      s.rebellion = clamp(s.rebellion + 8, 0, 100);
      s.approval = clamp(s.approval - 3, 0, 100);
      L("warn", "SCOTTISH STAND-OFF: tariff refused. Holyrood threatens a Section 30 strop. +8% Rebellion, −3 Approval. No money changes hands.");
      break;
    case "evSurgeLng":
      s.treasury -= 200;
      mods.tempFleet = 8;
      L("info", "EV SURGE: £200m emergency balancing deployed. The nation charges its cars in peace. The grid holds. The Treasury does not smile.");
      break;
    case "evSurgeCurtail":
      s.approval = clamp(s.approval - 4, 0, 100);
      s.rebellion = clamp(s.rebellion + 6, 0, 100);
      L("warn", "EV SURGE: demand curtailment invoked. The chargers blink off at 10pm. −4 Approval, +6% Rebellion. The Daily Mail runs a photo of a man looking at his car.");
      break;
    default:
      break;
  }
  s.log = [].concat(_toConsumableArray(state.log), logs);
  return {
    state: s,
    mods: mods
  };
}

/* --------------------------- year resolution --------------------------- */
function resolveYear(prev, mods) {
  var s = _objectSpread(_objectSpread({}, prev), {}, {
    nimby: _objectSpread({}, prev.nimby),
    stats: _objectSpread({}, prev.stats),
    links: copyLinks(prev.links),
    assets: prev.assets.slice(),
    queue: [],
    linkQueue: [],
    innovations: {}
  });
  for (var _i4 = 0, _Object$entries = Object.entries(prev.innovations); _i4 < _Object$entries.length; _i4++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i4], 2),
      id = _Object$entries$_i[0],
      st = _Object$entries$_i[1];
    s.innovations[id] = _objectSpread({}, st);
  }
  var logs = [];
  var L = function L(tone, text) {
    return logs.push({
      year: prev.year,
      tone: tone,
      text: text
    });
  };

  /* 1 — connections queue ticks down */
  var _iterator4 = _createForOfIteratorHelper(prev.queue),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var q = _step4.value;
      var left = q.turnsLeft - 1;
      if (left <= 0) {
        s.assets.push(makeAsset(q.type, q.nodeId, q.gw));
        if (q.type === "battery") s.stats.batteriesGW += q.gw;
        L("good", "ENERGISED: ".concat(q.label, " connects at ").concat(NODE_DEFS[q.nodeId]["short"], ". First power flows."));
      } else s.queue.push(_objectSpread(_objectSpread({}, q), {}, {
        turnsLeft: left
      }));
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  var _iterator5 = _createForOfIteratorHelper(prev.linkQueue),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _q = _step5.value;
      var _left = _q.turnsLeft - 1;
      if (_left <= 0) {
        if (!s.links[_q.linkId]) s.links[_q.linkId] = {
          cap: 0
        };
        s.links[_q.linkId].cap += _q.addGW;
        L("good", "".concat(_q.newLink ? "CORRIDOR ENERGISED" : "COMMISSIONED", ": ").concat(_q.label, " \u2014 ").concat(LINK_DEFS[_q.linkId].name, " now ").concat(s.links[_q.linkId].cap, " GW."));
      } else s.linkQueue.push(_objectSpread(_objectSpread({}, _q), {}, {
        turnsLeft: _left
      }));
    }

    /* 2 — skunkworks projects resolve */
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  var _loop = function _loop(_id2) {
      var st = s.innovations[_id2];
      if (st.status !== "building") return 0; // continue
      st.turnsLeft -= 1;
      if (st.turnsLeft > 0) return 0; // continue
      var def = INNOVATIONS.find(function (i) {
        return i.id === _id2;
      });
      if (Math.random() < def.odds) {
        st.status = "done";
        def.apply(s);
        L("good", def.winLog);
      } else {
        st.status = "failed";
        if (def.failApply) def.failApply(s);
        L("bad", def.failLog);
      }
    },
    _ret;
  for (var _id2 in s.innovations) {
    _ret = _loop(_id2);
    if (_ret === 0) continue;
  }

  /* 3 — weather: the Met Office outlook published last year IS this year's wind */
  var windCF = mods.windOverride != null ? mods.windOverride : prev.windNext;
  var solarCF = 0.8 + Math.random() * 0.2;
  s.windNext = Math.round((0.75 + Math.random() * 0.3) * 100) / 100;

  /* 4 — physics */
  var f = computeFlows(s, windCF, solarCF);
  var tempDemandExtra = mods.tempDemand || 0; // e.g. heating spike during Dunkelflaute
  var fleetAvail = s.gasFleet + (mods.tempFleet || 0);
  var extraGasNeeded = f.gasNeeded + tempDemandExtra;
  var gasFired = Math.min(extraGasNeeded, fleetAvail);
  var unserved = extraGasNeeded - gasFired;

  /* 5 — money */
  var income = ECON.baseIncome + (prev.year - 1) * 30 + (s.policies.carbonLevy ? 300 : 0) + (s.policies.heatPumpMandate ? 150 : 0) - (s.scotTariff ? 200 : 0) + (s.baseIncomeBonus || 0);
  var gasCost = gasFired * ECON.gasFuelCostPerGW;
  var fine = f.curtailed * ECON.curtailFinePerGW;
  /* loan repayment — borrowed capital is paid back in equal instalments */
  var loanPayment = 0;
  if (s.loan && s.loan.yearsLeft > 0) {
    loanPayment = s.loan.perYear;
    var yearsLeft = s.loan.yearsLeft - 1;
    s.loan = yearsLeft > 0 ? _objectSpread(_objectSpread({}, s.loan), {}, {
      yearsLeft: yearsLeft
    }) : null;
    if (yearsLeft <= 0) L("good", "DEBT CLEARED: the National Grid Bond is repaid in full. The bond markets exhale.");
  }
  s.treasury = s.treasury + income - gasCost - fine - loanPayment;
  s.stats.fines += fine;
  s.stats.curtailed += f.curtailed;
  s.stats.gasBurned += gasFired;
  if (f.curtailed > 0.05) {
    L("bad", "CURTAILMENT: ".concat(fmtGW(f.curtailed), " of clean power dumped at saturated boundaries. Constraint penalty ").concat(fmtM(fine), ". Gas peakers spin up in the South to cover the gap."));
  }

  /* 6 — price */
  s.price = r1(ECON.priceBase + gasFired * ECON.pricePerGasGW + f.curtailed * ECON.pricePerCurtailGW + (s.policies.carbonLevy ? ECON.levyPriceAdd : 0) + (mods.priceShock || 0));
  s.stats.peakPrice = Math.max(s.stats.peakPrice, s.price);

  /* 7 — net zero + intermittency */
  var effectiveDemand = f.demand + tempDemandExtra;
  s.netZero = r1(clamp((1 - gasFired / effectiveDemand) * 100, 0, 100));
  s.intermittency = r1(intermittencyRisk(s, effectiveDemand));
  s.netZeroHistory = [].concat(_toConsumableArray((prev.netZeroHistory || []).slice(-11)), [s.netZero]);

  /* 8 — public mood */
  var dApproval = 0,
    dRebellion = 0;
  if (s.price > 18) {
    dApproval -= 8;
    dRebellion += 6;
    L("bad", "BILLS CRISIS: wholesale at ".concat(fmtP(s.price), ". Marginal gas is setting the price of everything. The public is furious."));
  } else if (s.price > 14) {
    dApproval -= 4;
    dRebellion += 3;
    L("warn", "PRICE PRESSURE: wholesale at ".concat(fmtP(s.price), " \u2014 gas on the margin keeps bills high."));
  } else if (s.price < 10) {
    dApproval += 3;
  }
  if (s.intermittency > 40) {
    dApproval -= 6;
    dRebellion += 4;
    L("bad", "GRID INSTABILITY: intermittency risk at ".concat(s.intermittency, "%. Frequency excursions reported. Build firm capacity (nuclear / batteries)."));
  }
  if (s.approval + dApproval < 30) dRebellion += 5;
  for (var _i5 = 0, _arr4 = ["A", "B", "C", "D", "E"]; _i5 < _arr4.length; _i5++) {
    var _id3 = _arr4[_i5];
    if (s.nimby[_id3] > 70) {
      dRebellion += 2;
      L("warn", "NIMBY FLASHPOINT: opposition in ".concat(NODE_DEFS[_id3]["short"], " at ").concat(Math.round(s.nimby[_id3]), "%. Local MPs are tabling motions."));
    }
    s.nimby[_id3] = clamp(s.nimby[_id3] - ECON.nimbyDecay * (s.nimbyDecayMult || 1), 0, 100);
  }
  /* the benches always cool slightly between flashpoints */
  dRebellion -= 3;
  if (dRebellion <= -3 && f.curtailed < 0.05 && unserved <= 0) {
    dRebellion -= 4;
    L("good", "QUIET YEAR ON THE BENCHES: competence breeds calm. Rebellion Risk easing.");
  }
  if (s.approval + dApproval >= 50) {
    dRebellion -= 3; // a popular chairman is a safe chairman
  }
  s.approval = clamp(s.approval + dApproval, 0, 100);
  s.rebellion = clamp(s.rebellion + dRebellion, 0, 100);
  s.pc = clamp(s.pc + ECON.pcRegen, 0, 100);

  /* 9 — supply security outcomes
     A shortfall no longer kills you outright. A small gap is a brownout; a large
     gap forces an EMERGENCY FOREIGN POWER DEAL — interconnector imports and diesel
     bought at panic spot-prices, costing a fortune AND political capital. The lights
     stay on, but a string of these will bankrupt the Treasury (the real fail state). */
  var brownoutTol = Math.max(ECON.brownoutTolerance, f.demand * 0.12);
  if (unserved > brownoutTol) {
    var emCost = Math.round(unserved * 210); // £210m per unserved GW — ruinous spot prices
    var pcHit = Math.min(Math.round(s.pc), Math.round(unserved * 5));
    s.treasury -= emCost;
    s.pc = clamp(s.pc - pcHit, 0, 100);
    s.approval = clamp(s.approval - 14, 0, 100);
    s.rebellion = clamp(s.rebellion + 16, 0, 100);
    s.stats.brownouts++;
    s.stats.emergencyImports++;
    L("bad", "\u26A1 GRID EMERGENCY: ".concat(fmtGW(unserved), " of demand unserved. Emergency interconnector imports and diesel deals struck with France, Norway and Ireland at panic prices \u2014 ").concat(fmtM(emCost), ", \u2212").concat(pcHit, " PC, \u221214 Approval, +16% Rebellion. The lights stayed on. Barely. The front pages did not forgive you."));
  } else if (unserved > 0) {
    s.treasury -= 200;
    s.rebellion = clamp(s.rebellion + 6, 0, 100);
    s.approval = clamp(s.approval - 7, 0, 100);
    s.stats.brownouts++;
    L("bad", "ROLLING BROWNOUTS: ".concat(fmtGW(unserved), " short (emergency imports kick in above ").concat(fmtGW(brownoutTol), "). Emergency demand control invoked. \u2212\xA3200m, Rebellion +6%, Approval \u22127."));
  }

  /* 10 — carbon levy retires gas fleet */
  if (s.policies.carbonLevy) {
    s.gasFleet = Math.max(6, r1(s.gasFleet - 1.5));
    L("info", "CARBON LEVY: 1.5 GW of CCGT retires early. Backup fleet now ".concat(fmtGW(s.gasFleet), "."));
  }
  s.stats.lowestTreasury = Math.min(s.stats.lowestTreasury, s.treasury);

  /* 11 — hard fails */
  if (!s.gameOver && s.treasury < 0) s.gameOver = {
    type: "bankrupt",
    detail: "The Treasury balance hit ".concat(fmtM(s.treasury), ". The IMF answers on the second ring.")
  };
  if (!s.gameOver && s.rebellion >= 100) s.gameOver = {
    type: "coup",
    detail: "Letters reached the threshold. A leadership challenge was declared during your conference speech."
  };

  /* 12 — year-end summary with cause attribution */
  var satLines = Object.keys(s.links).filter(function (id) {
    var cap = s.links[id] ? s.links[id].cap : 0;
    var fl = f.byLink[id] || 0;
    return cap > 0 && fl >= cap - 0.1;
  }).map(function (id) {
    return LINK_DEFS[id].name;
  });
  var curtailNote = f.curtailed > 0.05 ? " | \u26A0 Curtailed ".concat(fmtGW(f.curtailed)).concat(satLines.length ? " (".concat(satLines[0], " saturated)") : "", " \u2014 fine ").concat(fmtM(fine)) : "";
  var gasNote = gasFired > 0.5 ? " | Gas fired ".concat(fmtGW(gasFired)).concat(f.curtailed > 0.05 ? " to cover southern gap from curtailment" : s.policies.carbonLevy ? " (levy applies, fleet shrinking)" : "") : " | Gas fleet idle — full clean delivery";
  L("info", "FY".concat(prev.year, " CLOSE \u2014 Demand ").concat(fmtGW(f.demand), " | Clean ").concat(fmtGW(f.cleanDelivered + f.batteryFirm + s.firmImports), " | Wind ").concat(Math.round(windCF * 100), "% CF | Net Zero ").concat(s.netZero, "%").concat(curtailNote).concat(gasNote, "."));
  s.lastYear = {
    year: prev.year,
    windCF: windCF,
    solarCF: solarCF,
    gasFired: gasFired,
    unserved: unserved,
    flows: f,
    income: income,
    gasCost: gasCost,
    fine: fine
  };
  s.log = [].concat(_toConsumableArray(prev.log), logs);
  s.whipsUsed = false;
  s.activeCrisis = null;
  if (s.gameOver) {
    s.phase = "dead";
    return s;
  }
  if (prev.year >= ECON.totalYears) {
    s.phase = "report";
    return s;
  }
  s.year = prev.year + 1;
  s.phase = "play";
  return s;
}

/* ------------------------------ scoring -------------------------------- */
function finalReport(s) {
  var score = Math.round(s.netZero * 2 + s.treasury / 40 + (100 - s.rebellion) / 2 + s.approval / 2 + s.stats.innovations * 8 - s.stats.brownouts * 10 - s.stats.fines / 50);
  var title, line;
  if (s.netZero >= 90 && s.rebellion < 45) {
    title = "The Green Architect";
    line = "Clean power, calm benches, cables in the right places. Statues will be argued about.";
  } else if (s.netZero >= 85 && (s.stats.pylons >= 2 || s.rebellion >= 60)) {
    title = "The Pylon Tyrant";
    line = "You decarbonised Britain by sheer force of steel lattice. History forgives; the shires do not.";
  } else if (s.stats.innovations >= 4 && s.netZero >= 60) {
    title = "Minister for Mad Science";
    line = "Kites, hamsters, fusion and a dragon. You ran the grid like a Bond villain with a select committee.";
  } else if (s.stats.corridors >= 2 && s.netZero >= 70) {
    title = "The Cable Layer";
    line = "You redrew the map of Britain in high-voltage ink. The seabed bristles with your handiwork.";
  } else if (s.netZero >= 75) {
    title = "The Grid Whisperer";
    line = "Not quite Net Zero, but the system hums and the lights never flickered on your watch.";
  } else if (s.stats.batteriesGW >= 8) {
    title = "The Battery Baron";
    line = "You firmed the grid with a wall of lithium. The Dunkelflaute holds no terror for you.";
  } else if (s.treasury > 3500 && s.netZero < 60) {
    title = "The Treasury's Darling";
    line = "A fortune unspent, a transition unstarted. The Chancellor adores you. The climate does not.";
  } else if (s.netZero < 50) {
    title = "The Status-Quo Bureaucrat";
    line = "Twelve years of careful minutes, gentle nods, and gas on the margin. The queue endures.";
  } else {
    title = "The Steady Hand";
    line = "Progress without panache. Britain is greener, solvent, and only mildly furious.";
  }
  return {
    score: score,
    title: title,
    line: line
  };
}

/* --------------------------- advisor brain ------------------------------ */
function advise(state, flows) {
  var nextDemand = demandForYear(Math.min(state.year + 1, 12), state.demandExtra) + state.demandExtraD;
  var firm = firmCoverGW(state);
  var marginNext = firm + flows.cleanDelivered - nextDemand;
  if (state.netZero >= 100) return {
    tone: "good",
    text: "One hundred percent. I have nothing to add, Chair, except that I never doubted you. Officially."
  };
  if (marginNext < 3.5) return {
    tone: "bad",
    text: "\u26A0 Next year's supply margin is only ~".concat(r1(marginNext), " GW. If a wind lull hits, we'll be forced into emergency foreign power deals at ~\xA3175m per GW short \u2014 plus a brutal hit to your Political Capital and Approval. Firm up NOW: drag a \uD83C\uDF19 Tidal Lagoon, \u269B\uFE0F SMR or \uD83D\uDD0B Battery onto the map, or buy the \uD83D\uDEE2\uFE0F Strategic Gas Reserve.")
  };
  var sat = Object.keys(state.links).filter(function (id) {
    return state.links[id].cap > 0 && (flows.byLink[id] || 0) / state.links[id].cap >= 0.99;
  });
  if (sat.length) {
    var d = LINK_DEFS[sat[0]];
    return {
      tone: "bad",
      text: "The ".concat(d.name, " boundary is saturated \u2014 every spare gigawatt upstream is burned as constraint fines. Drag a \uD83E\uDDF5 HVDC cable onto that line, \u270F\uFE0F draw a brand-new corridor, or drop a \uD83D\uDD0B Battery at ").concat(NODE_DEFS[d.from]["short"], ".")
    };
  }
  if (state.windNext < 0.8) return {
    tone: "warn",
    text: "The Met Office forecasts a still, grey year ahead (wind at ".concat(Math.round(state.windNext * 100), "% of normal). Firm capacity now, smugness later.")
  };
  if (state.intermittency > 35) return {
    tone: "warn",
    text: "Intermittency risk at ".concat(state.intermittency, "%. Too much weather, not enough firmness. Batteries, nuclear \u2014 or visit the \uD83E\uDDEA Skunkworks and do something unhinged.")
  };
  if (state.rebellion > 60) return {
    tone: "warn",
    text: "Rebellion at ".concat(Math.round(state.rebellion), "%. May I suggest the Whips' Operation, a \uD83E\uDED6, and fewer pylons through marginal constituencies?")
  };
  if (state.treasury > 2200 && state.queue.length === 0) return {
    tone: "warn",
    text: "You are sitting on ".concat(fmtM(state.treasury), " with an empty build queue. The climate will not negotiate with a savings account, Chair.")
  };
  if (state.gasFleet < flows.gasNeeded + 3) return {
    tone: "warn",
    text: "The gas backup fleet (".concat(fmtGW(state.gasFleet), ") barely covers our worst case. Firm capacity, Chair. Before winter does its annual surprise.")
  };
  return {
    tone: "info",
    text: "All quiet. Suspiciously quiet. Use the calm: the connections queue waits for no one."
  };
}

/* ════════════════════════════ UI COMPONENTS ════════════════════════════ */

var TONE_CLASS = {
  info: "text-slate-300",
  good: "text-green-400",
  warn: "text-amber-400",
  bad: "text-red-400"
};
function Stat(_ref2) {
  var label = _ref2.label,
    value = _ref2.value,
    sub = _ref2.sub,
    color = _ref2.color;
  return /*#__PURE__*/React.createElement("div", {
    className: "shrink-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 min-w-[82px] sm:min-w-[104px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 whitespace-nowrap"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "font-term text-base sm:text-lg leading-tight font-bold ".concat(color)
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    className: "text-[9px] sm:text-[10px] text-slate-500 whitespace-nowrap"
  }, sub));
}
function Header(_ref3) {
  var s = _ref3.s,
    muted = _ref3.muted,
    onToggleMute = _ref3.onToggleMute;
  var rebColor = s.rebellion >= 75 ? "text-red-400 blink" : s.rebellion >= 45 ? "text-amber-400" : "text-green-400";
  var treColor = s.treasury < 400 ? "text-red-400" : s.treasury < 1200 ? "text-amber-400" : "text-green-400";
  var priColor = s.price > 14 ? "text-red-400" : s.price > 10 ? "text-amber-400" : "text-green-400";
  var history = s.netZeroHistory || [];
  var nzTrend = history.length >= 2 ? r1(history[history.length - 1] - history[history.length - 2]) : 0;
  var trendStr = nzTrend > 0.3 ? "\u25B2 +".concat(nzTrend, "%") : nzTrend < -0.3 ? "\u25BC ".concat(nzTrend, "%") : "= steady";
  var trendCol = nzTrend > 0.3 ? "text-green-400" : nzTrend < -0.3 ? "text-red-400" : "text-slate-400";
  var annualIncome = ECON.baseIncome + (s.year - 1) * 30 + (s.policies.carbonLevy ? 300 : 0) + (s.policies.heatPumpMandate ? 150 : 0) - (s.scotTariff ? 200 : 0) + (s.baseIncomeBonus || 0);
  return /*#__PURE__*/React.createElement("header", {
    className: "shrink-0 bg-[#1e293b] border-b border-slate-700 px-2 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-green-400 font-term font-bold text-base sm:text-lg leading-none"
  }, "GRIDLOCK"), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:block text-[10px] text-slate-400 tracking-widest"
  }, "THE GREAT BRITISH UPGRADE")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 sm:gap-3 overflow-x-auto flex-1 min-w-0 py-0.5"
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Year",
    value: "".concat(s.year, " / ").concat(ECON.totalYears),
    sub: "FY ".concat(2025 + s.year),
    color: "text-slate-100"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Treasury",
    value: fmtM(s.treasury),
    sub: "".concat(annualIncome >= 0 ? "+" : "").concat(fmtM(annualIncome), "/yr"),
    color: treColor
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Pol. Capital",
    value: "".concat(Math.round(s.pc), " PC"),
    sub: "+".concat(ECON.pcRegen, "/yr"),
    color: s.pc < 20 ? "text-amber-400" : "text-green-400"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Price",
    value: fmtP(s.price),
    sub: "per kWh",
    color: priColor
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Rebellion",
    value: "".concat(Math.round(s.rebellion), "%"),
    sub: "coup at 100%",
    color: rebColor
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Net Zero",
    value: "".concat(r1(s.netZero), "%"),
    sub: /*#__PURE__*/React.createElement("span", {
      className: trendCol
    }, trendStr),
    color: "text-green-400"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onToggleMute,
    title: muted ? "Unmute" : "Mute",
    className: "shrink-0 px-2 sm:px-2.5 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-lg leading-none"
  }, muted ? "🔇" : "🔊"));
}

/* ------------------------------- the map -------------------------------- */
/* Great Britain, clockwise from Cape Wrath: Moray Firth, the firths of Tay
   and Forth, the Wash, the Norfolk bulge, Thames estuary, Kent, a properly
   tapered Cornwall, the Bristol Channel, Pembrokeshire, Cardigan Bay, Llŷn,
   Morecambe Bay, the Solway and the western sea lochs. */
var GB_PATH = "M134 34 L150 28 L172 32 L180 40 L176 56 L160 70 L180 76 L198 82\nL200 102 L186 124 L174 132 L184 142 L168 152 L192 162 L200 184 L206 212\nL214 238 L220 252 L210 262 L220 284 L210 300 L226 308 L252 324 L258 346\nL252 376 L242 400 L224 412 L246 426 L238 446 L226 454 L198 464 L168 468\nL142 470 L122 462 L108 478 L98 486 L86 478 L66 490 L48 496 L38 488\nL52 474 L72 460 L92 450 L126 440 L138 428 L110 424 L90 426 L66 416\nL76 402 L88 384 L90 362 L82 346 L62 338 L80 326 L72 312 L96 306\nL110 300 L114 290 L108 282 L114 272 L108 262 L116 252 L104 244 L100 228\nL114 216 L88 208 L98 190 L112 180 L92 178 L102 160 L90 148 L104 138\nL92 122 L106 114 L96 96 L110 88 L100 70 L116 60 L110 46 Z";

/* supporting cast: a corner of Ireland, Orkney, Anglesey, the Isle of Wight */
var ISLAND_PATHS = ["M-260 200 L-60 206 L-10 218 L18 236 L32 254 L38 274 L42 294 L30 312 L4 322 L-40 334 L-110 342 L-260 348 Z",
// Ireland, exits stage left
"M186 12 L198 10 L204 18 L196 24 L186 20 Z",
// Orkney
"M208 26 L216 24 L218 31 L210 33 Z",
// more Orkney
"M56 314 L68 312 L72 320 L62 324 Z",
// Anglesey
"M152 474 L166 472 L170 479 L156 482 Z" // Isle of Wight
];
var LINK_LABEL_OFF = {
  L1: {
    dx: -2,
    dy: -6
  },
  L2: {
    dx: 20,
    dy: 22
  },
  L3: {
    dx: -60,
    dy: 4
  },
  L4: {
    dx: -30,
    dy: -14
  },
  X1: {
    dx: 6,
    dy: 0
  },
  X2: {
    dx: 6,
    dy: -28
  },
  X3: {
    dx: -28,
    dy: -16
  },
  X4: {
    dx: -56,
    dy: 6
  }
};
function linkPathD(def) {
  var from = NODE_DEFS[def.from],
    to = NODE_DEFS[def.to];
  return def.ctrl ? "M ".concat(from.x, " ").concat(from.y, " Q ").concat(def.ctrl.x, " ").concat(def.ctrl.y, " ").concat(to.x, " ").concat(to.y) : "M ".concat(from.x, " ").concat(from.y, " L ").concat(to.x, " ").concat(to.y);
}
function linkMid(def) {
  var from = NODE_DEFS[def.from],
    to = NODE_DEFS[def.to];
  if (def.ctrl) return {
    x: 0.25 * from.x + 0.5 * def.ctrl.x + 0.25 * to.x,
    y: 0.25 * from.y + 0.5 * def.ctrl.y + 0.25 * to.y
  };
  return {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2
  };
}
function LinkLine(_ref4) {
  var link = _ref4.link,
    flows = _ref4.flows,
    state = _ref4.state,
    selected = _ref4.selected,
    onSelect = _ref4.onSelect,
    dragUI = _ref4.dragUI;
  var def = LINK_DEFS[link];
  var cap = state.links[link].cap;
  var flow = flows.byLink[link] || 0;
  var util = cap > 0 ? flow / cap : 1;
  var atCap = util >= 0.99;
  var stroke = atCap ? "#ef4444" : util > 0.75 ? "#fbbf24" : "#4ade80";
  var d = linkPathD(def);
  var mid = linkMid(def);
  var off = LINK_LABEL_OFF[link] || {
    dx: 0,
    dy: 0
  };
  var isSel = selected && selected.type === "link" && selected.id === link;
  var dragLink = dragUI && dragUI.item.cat === "link";
  var isDropTarget = dragLink && dragUI.target && dragUI.target.type === "link" && dragUI.target.id === link;
  return /*#__PURE__*/React.createElement("g", {
    className: "cursor-pointer",
    onClick: function onClick(e) {
      e.stopPropagation();
      onSelect({
        type: "link",
        id: link
      });
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: "transparent",
    strokeWidth: "18"
  }), isSel && /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: "#38bdf8",
    strokeWidth: "9",
    strokeOpacity: "0.35"
  }), dragLink && /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: "#22d3ee",
    strokeWidth: isDropTarget ? 12 : 7,
    strokeOpacity: isDropTarget ? 0.55 : 0.25,
    className: isDropTarget ? "" : "blink"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: stroke,
    strokeWidth: 3 + Math.min(cap, 14) * 0.35,
    strokeLinecap: "round",
    className: atCap ? "pulse-danger" : "",
    strokeDasharray: def.subsea ? "7 4" : "none"
  }), flow > 0.05 && !atCap && /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: "#ecfdf5",
    strokeOpacity: "0.7",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeDasharray: "3 9",
    className: "flow-anim"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(".concat(mid.x + off.dx, ", ").concat(mid.y + off.dy, ")")
  }, /*#__PURE__*/React.createElement("rect", {
    x: "-4",
    y: "-11",
    width: "62",
    height: atCap ? 30 : 18,
    rx: "4",
    fill: "#0f172a",
    stroke: stroke,
    strokeWidth: "0.8",
    opacity: "0.92"
  }), /*#__PURE__*/React.createElement("text", {
    x: "27",
    y: "2",
    textAnchor: "middle",
    fontSize: "9",
    className: "font-term",
    fill: stroke,
    fontWeight: "bold"
  }, r1(flow), "/", r1(cap), " GW"), atCap && /*#__PURE__*/React.createElement("text", {
    x: "27",
    y: "14",
    textAnchor: "middle",
    fontSize: "8",
    fill: "#ef4444",
    fontWeight: "bold",
    className: "blink"
  }, "\u26A0 BOTTLENECK")));
}

/* corridors under construction — drawn but not yet energised */
function PendingCorridor(_ref5) {
  var q = _ref5.q;
  var def = LINK_DEFS[q.linkId];
  var mid = linkMid(def);
  return /*#__PURE__*/React.createElement("g", {
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: linkPathD(def),
    fill: "none",
    stroke: "#94a3b8",
    strokeWidth: "3",
    strokeDasharray: "3 6",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(".concat(mid.x - 24, ", ").concat(mid.y - 6, ")")
  }, /*#__PURE__*/React.createElement("rect", {
    x: "-3",
    y: "-10",
    width: "56",
    height: "15",
    rx: "4",
    fill: "#0f172a",
    stroke: "#f59e0b",
    strokeWidth: "0.8",
    opacity: "0.92"
  }), /*#__PURE__*/React.createElement("text", {
    x: "25",
    y: "1.5",
    textAnchor: "middle",
    fontSize: "8",
    fill: "#f59e0b",
    className: "font-term"
  }, "\uD83C\uDFD7 ", q.turnsLeft, " yr")));
}

/* faint candidate routes shown while the pencil is out */
function GhostRoutes(_ref6) {
  var state = _ref6.state;
  return /*#__PURE__*/React.createElement("g", {
    pointerEvents: "none"
  }, ["X1", "X2", "X3", "X4"].map(function (id) {
    if (state.links[id] || state.linkQueue.some(function (q) {
      return q.linkId === id;
    })) return null;
    var def = LINK_DEFS[id];
    var pair = [def.from, def.to].sort().join("");
    var rec = CORRIDORS[pair];
    var mid = linkMid(def);
    return /*#__PURE__*/React.createElement("g", {
      key: id
    }, /*#__PURE__*/React.createElement("path", {
      d: linkPathD(def),
      fill: "none",
      stroke: "#22d3ee",
      strokeWidth: "1.6",
      strokeDasharray: "2 5",
      opacity: "0.55"
    }), /*#__PURE__*/React.createElement("text", {
      x: mid.x + 8,
      y: mid.y,
      fontSize: "7",
      fill: "#22d3ee",
      opacity: "0.85",
      className: "font-term"
    }, fmtM(rec.cost), " \xB7 ", rec.gw, " GW"));
  }));
}

/* SimCity layer: every installed asset is a real icon on the map.
   Land kit spirals out around the node; offshore kit marches out to sea. */
var SEAWARD = {
  A: {
    x: 36,
    y: -10,
    sx: 11,
    sy: -8
  },
  C: {
    x: 32,
    y: 14,
    sx: 10,
    sy: 9
  },
  B: {
    x: -40,
    y: -16,
    sx: -11,
    sy: -7
  },
  D: {
    x: 30,
    y: 26,
    sx: 11,
    sy: 7
  },
  E: {
    x: -34,
    y: 18,
    sx: -10,
    sy: 8
  }
};
function landSlot(i) {
  var GA = 2.39996; // golden angle keeps the sprawl organic
  var r = 27 + 5.6 * Math.sqrt(i + 0.5);
  var a = i * GA + 0.9;
  return {
    dx: Math.cos(a) * r,
    dy: Math.sin(a) * r * 0.8
  };
}
function NodeCity(_ref7) {
  var state = _ref7.state,
    id = _ref7.id;
  var def = NODE_DEFS[id];
  var sea = SEAWARD[id];
  var items = [];
  var _iterator6 = _createForOfIteratorHelper(state.assets),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var a = _step6.value;
      if (a.nodeId === id) items.push({
        icon: a.icon,
        name: a.name,
        gw: a.gw,
        sea: a.type === "offshore",
        ghost: false
      });
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  var _iterator7 = _createForOfIteratorHelper(state.queue),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var q = _step7.value;
      if (q.nodeId === id) items.push({
        icon: ASSET_TYPES[q.type].icon,
        name: q.label,
        gw: q.gw,
        sea: q.type === "offshore",
        ghost: true,
        eta: q.turnsLeft
      });
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  var seaItems = items.filter(function (it) {
      return it.sea;
    }),
    landItems = items.filter(function (it) {
      return !it.sea;
    });
  var MAX = 14;
  var shown = [];
  landItems.slice(0, MAX).forEach(function (it, i) {
    var s = landSlot(i);
    shown.push(_objectSpread(_objectSpread({}, it), {}, {
      x: def.x + s.dx,
      y: def.y + s.dy
    }));
  });
  seaItems.slice(0, 6).forEach(function (it, i) {
    shown.push(_objectSpread(_objectSpread({}, it), {}, {
      x: def.x + sea.x + sea.sx * i,
      y: def.y + sea.y + sea.sy * i
    }));
  });
  var hidden = items.length - shown.length;
  return /*#__PURE__*/React.createElement("g", {
    pointerEvents: "none"
  }, shown.map(function (it, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: i,
      transform: "translate(".concat(it.x, ", ").concat(it.y, ")"),
      opacity: it.ghost ? 0.5 : 1
    }, /*#__PURE__*/React.createElement("circle", {
      r: "7",
      fill: "#0f172a",
      opacity: "0.8"
    }), /*#__PURE__*/React.createElement("text", {
      textAnchor: "middle",
      y: "3.2",
      fontSize: it.gw >= 2.5 ? 11 : 9
    }, it.icon), it.ghost && /*#__PURE__*/React.createElement("g", {
      transform: "translate(5,-5)"
    }, /*#__PURE__*/React.createElement("circle", {
      r: "4.4",
      fill: "#f59e0b"
    }), /*#__PURE__*/React.createElement("text", {
      textAnchor: "middle",
      y: "2.4",
      fontSize: "6.5",
      fill: "#1e293b",
      fontWeight: "bold"
    }, it.eta)), /*#__PURE__*/React.createElement("title", null, it.name, " \u2014 ", fmtGW(it.gw), it.ghost ? " (connects in ".concat(it.eta, " yr)") : ""));
  }), hidden > 0 && /*#__PURE__*/React.createElement("text", {
    x: def.x + 30,
    y: def.y + 30,
    fontSize: "7.5",
    fill: "#94a3b8",
    className: "font-term"
  }, "+", hidden, " more"));
}
function NodeCircle(_ref8) {
  var id = _ref8.id,
    state = _ref8.state,
    flows = _ref8.flows,
    selected = _ref8.selected,
    onSelect = _ref8.onSelect,
    dragUI = _ref8.dragUI,
    drawMode = _ref8.drawMode;
  var def = NODE_DEFS[id];
  var g = flows.g[id];
  var dem = flows.dem[id];
  var surplus = g.gen - dem;
  var isSel = selected && selected.type === "node" && selected.id === id;
  var fill = surplus > 0.2 ? "#14532d" : "#7f1d1d";
  var ring = surplus > 0.2 ? "#4ade80" : "#f87171";
  var dragAsset = dragUI && (dragUI.item.cat === "asset" || dragUI.item.cat === "draw");
  var validTarget = dragAsset && !(dragUI.item.id === "offshore" && !def.offshoreOk) || drawMode && drawMode.from !== id;
  var isDropTarget = dragAsset && dragUI.target && dragUI.target.type === "node" && dragUI.target.id === id;
  var isAnchor = drawMode && drawMode.from === id;
  return /*#__PURE__*/React.createElement("g", {
    className: "cursor-pointer",
    onClick: function onClick(e) {
      e.stopPropagation();
      onSelect({
        type: "node",
        id: id
      });
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: def.x,
    cy: def.y,
    r: 8 + dem * 0.55,
    fill: "none",
    stroke: "#64748b",
    strokeWidth: "0.8",
    strokeDasharray: "2 3",
    opacity: "0.55"
  }), isSel && /*#__PURE__*/React.createElement("circle", {
    cx: def.x,
    cy: def.y,
    r: "26",
    fill: "none",
    stroke: "#38bdf8",
    strokeWidth: "2.5",
    strokeDasharray: "4 3"
  }), validTarget && /*#__PURE__*/React.createElement("circle", {
    cx: def.x,
    cy: def.y,
    r: "26",
    fill: isDropTarget ? "#164e63" : "none",
    fillOpacity: "0.6",
    stroke: "#22d3ee",
    strokeWidth: isDropTarget ? 3 : 1.5,
    strokeDasharray: "5 3",
    className: "drop-ring"
  }), isAnchor && /*#__PURE__*/React.createElement("circle", {
    cx: def.x,
    cy: def.y,
    r: "25",
    fill: "none",
    stroke: "#22d3ee",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: def.x,
    cy: def.y,
    r: "19",
    fill: fill,
    stroke: ring,
    strokeWidth: "2.5",
    className: surplus > 0.2 ? "node-glow" : ""
  }), /*#__PURE__*/React.createElement("text", {
    x: def.x,
    y: def.y + 1,
    textAnchor: "middle",
    fontSize: "13",
    fill: "#f1f5f9",
    fontWeight: "bold",
    className: "font-term"
  }, id), /*#__PURE__*/React.createElement("text", {
    x: def.x,
    y: def.y + 11,
    textAnchor: "middle",
    fontSize: "6.5",
    fill: ring,
    className: "font-term"
  }, surplus >= 0 ? "+" : "", r1(surplus)), /*#__PURE__*/React.createElement("text", {
    x: def.x + (def.labelDX || 0),
    y: def.y + (def.labelBelow ? 34 : -26),
    textAnchor: "middle",
    fontSize: "8.5",
    fill: "#cbd5e1",
    fontWeight: "bold",
    letterSpacing: "1"
  }, def["short"]));
}
function paletteDef(item) {
  if (item.cat === "asset") return ASSET_TYPES[item.id];
  if (item.cat === "link") return LINK_UPGRADES[item.id];
  return DRAW_TOOL;
}
function PaletteChip(_ref9) {
  var item = _ref9.item,
    state = _ref9.state,
    onStartDrag = _ref9.onStartDrag;
  var def = paletteDef(item);
  var isDraw = item.cat === "draw";
  var cost = isDraw ? 0 : Math.round(def.cost * (item.id === "battery" ? state.batteryDiscount : 1) * (item.cat === "asset" ? state.costMult || 1 : 1));
  var afford = isDraw || state.treasury >= cost;
  var shortName = item.cat === "asset" ? def.name.split(" ")[0] : item.id === "pylon" ? "Pylons" : item.id === "hvdc" ? "HVDC" : "Draw Line";
  return /*#__PURE__*/React.createElement("div", {
    onPointerDown: function onPointerDown(e) {
      return onStartDrag(item, e);
    },
    className: "chip-grab shrink-0 px-2 py-1 rounded-lg border text-center transition select-none\n        ".concat(isDraw ? "border-cyan-600 bg-cyan-950/40 hover:border-cyan-300" : afford ? "border-slate-600 bg-slate-800 hover:border-cyan-400 hover:bg-slate-700" : "border-slate-700 bg-slate-800/40 opacity-45"),
    title: def.desc
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-base leading-none"
  }, def.icon), /*#__PURE__*/React.createElement("div", {
    className: "text-[9px] font-bold text-slate-200 leading-tight whitespace-nowrap"
  }, shortName), /*#__PURE__*/React.createElement("div", {
    className: "font-term text-[9px] ".concat(isDraw ? "text-cyan-300" : afford ? "text-green-400" : "text-red-400")
  }, isDraw ? "new route" : fmtM(cost)));
}
var HOME_VIEW = {
  x: 0,
  y: 0,
  w: 320,
  h: 560
};
function MapPanel(_ref0) {
  var state = _ref0.state,
    flows = _ref0.flows,
    selected = _ref0.selected,
    onSelect = _ref0.onSelect,
    svgRef = _ref0.svgRef,
    dragUI = _ref0.dragUI,
    onStartDrag = _ref0.onStartDrag,
    drawMode = _ref0.drawMode,
    rubberRef = _ref0.rubberRef;
  var drawing = drawMode || dragUI && dragUI.item.cat === "draw";
  var anchor = drawMode ? NODE_DEFS[drawMode.from] : null;

  /* ---- zoom & pan ---- */
  var _useState = useState(HOME_VIEW),
    _useState2 = _slicedToArray(_useState, 2),
    view = _useState2[0],
    setView = _useState2[1];
  var viewRef = useRef(view);
  useEffect(function () {
    viewRef.current = view;
  }, [view]);
  var panMovedRef = useRef(false);
  var pointersRef = useRef(new Map()); // pointerId -> {x,y}
  var gestureRef = useRef(null); // {type:'pan',sx,sy,ox,oy} | {type:'pinch',lastDist}
  var moveRef = useRef(null);
  var upRef = useRef(null);
  var clampView = function clampView(v) {
    var w = clamp(v.w, 80, 320),
      h = w * 1.75;
    return {
      w: w,
      h: h,
      x: clamp(v.x, -40, 360 - w),
      y: clamp(v.y, -40, 600 - h)
    };
  };
  var zoomAt = function zoomAt(clientX, clientY, factor) {
    var svg = svgRef.current;
    if (!svg) return;
    try {
      var pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      var m = svg.getScreenCTM();
      if (!m) return;
      var p = pt.matrixTransform(m.inverse());
      setView(function (v) {
        var w = clamp(v.w * factor, 80, 320);
        var scale = w / v.w;
        return clampView({
          w: w,
          h: w * 1.75,
          x: p.x - (p.x - v.x) * scale,
          y: p.y - (p.y - v.y) * scale
        });
      });
    } catch (e) {/* ignore */}
  };
  var zoomCentre = function zoomCentre(factor) {
    var svg = svgRef.current;
    if (!svg) return;
    var r = svg.getBoundingClientRect();
    zoomAt(r.left + r.width / 2, r.top + r.height / 2, factor);
  };
  useEffect(function () {
    var svg = svgRef.current;
    if (!svg) return;
    var onWheel = function onWheel(e) {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, e.deltaY > 0 ? 1.18 : 1 / 1.18);
    };
    svg.addEventListener("wheel", onWheel, {
      passive: false
    });
    return function () {
      return svg.removeEventListener("wheel", onWheel);
    };
  }, []);
  /* unified pointer gesture: one finger/mouse pans, two fingers pinch-zoom */
  moveRef.current = function (e) {
    var ptrs = pointersRef.current;
    if (!ptrs.has(e.pointerId)) return; // not a map gesture
    ptrs.set(e.pointerId, {
      x: e.clientX,
      y: e.clientY
    });
    var list = _toConsumableArray(ptrs.values());
    if (list.length >= 2) {
      var _list = _slicedToArray(list, 2),
        a = _list[0],
        b = _list[1];
      var dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      var g = gestureRef.current;
      if (g && g.type === "pinch" && g.lastDist) zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, g.lastDist / dist);
      gestureRef.current = {
        type: "pinch",
        lastDist: dist
      };
      panMovedRef.current = true;
    } else {
      var _g = gestureRef.current;
      if (!_g || _g.type !== "pan") {
        gestureRef.current = {
          type: "pan",
          sx: e.clientX,
          sy: e.clientY,
          ox: viewRef.current.x,
          oy: viewRef.current.y
        };
        return;
      }
      var svg = svgRef.current;
      if (!svg) return;
      var r = svg.getBoundingClientRect();
      var scale = Math.max(viewRef.current.w / r.width, viewRef.current.h / r.height);
      if (Math.abs(e.clientX - _g.sx) + Math.abs(e.clientY - _g.sy) > 6) panMovedRef.current = true;
      setView(function (v) {
        return clampView(_objectSpread(_objectSpread({}, v), {}, {
          x: _g.ox - (e.clientX - _g.sx) * scale,
          y: _g.oy - (e.clientY - _g.sy) * scale
        }));
      });
    }
  };
  upRef.current = function (e) {
    var ptrs = pointersRef.current;
    if (!ptrs.has(e.pointerId)) return;
    ptrs["delete"](e.pointerId);
    gestureRef.current = ptrs.size === 0 ? null : {
      type: "reset"
    }; // re-anchor on next move
  };
  useEffect(function () {
    var mv = function mv(e) {
      return moveRef.current && moveRef.current(e);
    };
    var up = function up(e) {
      return upRef.current && upRef.current(e);
    };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return function () {
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);
  var startPan = function startPan(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.stopPropagation();
    pointersRef.current.set(e.pointerId, {
      x: e.clientX,
      y: e.clientY
    });
    gestureRef.current = pointersRef.current.size >= 2 ? {
      type: "pinch",
      lastDist: 0
    } : {
      type: "pan",
      sx: e.clientX,
      sy: e.clientY,
      ox: viewRef.current.x,
      oy: viewRef.current.y
    };
  };
  var onBgClick = function onBgClick() {
    if (panMovedRef.current) {
      panMovedRef.current = false;
      return;
    }
    onSelect(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "h-full flex flex-col bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-3 py-2 border-b border-slate-700 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold tracking-widest text-slate-300"
  }, "NATIONAL TRANSMISSION MAP"), drawMode ? /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-cyan-300 font-term blink"
  }, "\u270F\uFE0F click destination region \u2014 click sea to cancel") : /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-500 font-term"
  }, "pinch / scroll to zoom \xB7 drag sea to pan")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-h-0 relative",
    onClick: onBgClick
  }, /*#__PURE__*/React.createElement("svg", {
    ref: svgRef,
    viewBox: "".concat(view.x, " ").concat(view.y, " ").concat(view.w, " ").concat(view.h),
    className: "map-svg w-full h-full",
    preserveAspectRatio: "xMidYMid meet",
    style: {
      cursor: "grab"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: "gridpat",
    width: "20",
    height: "20",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20 0 L 0 0 0 20",
    fill: "none",
    stroke: "#334155",
    strokeWidth: "0.4"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "-200",
    y: "-200",
    width: "760",
    height: "1000",
    fill: "url(#gridpat)",
    opacity: "0.5",
    onPointerDown: startPan
  }), /*#__PURE__*/React.createElement("path", {
    d: GB_PATH,
    fill: "#273548",
    stroke: "#475569",
    strokeWidth: "1.5",
    onPointerDown: startPan
  }), ISLAND_PATHS.map(function (d, i) {
    return /*#__PURE__*/React.createElement("path", {
      key: i,
      d: d,
      fill: "#223044",
      stroke: "#3e4f66",
      strokeWidth: "1",
      onPointerDown: startPan
    });
  }), /*#__PURE__*/React.createElement("g", {
    pointerEvents: "none",
    fill: "#475569",
    fontStyle: "italic",
    letterSpacing: "3"
  }, /*#__PURE__*/React.createElement("text", {
    x: "248",
    y: "160",
    fontSize: "9"
  }, "NORTH"), /*#__PURE__*/React.createElement("text", {
    x: "252",
    y: "172",
    fontSize: "9"
  }, "SEA"), /*#__PURE__*/React.createElement("text", {
    x: "28",
    y: "350",
    fontSize: "9"
  }, "IRISH"), /*#__PURE__*/React.createElement("text", {
    x: "32",
    y: "362",
    fontSize: "9"
  }, "SEA"), /*#__PURE__*/React.createElement("text", {
    x: "104",
    y: "528",
    fontSize: "9"
  }, "ENGLISH CHANNEL")), drawing && /*#__PURE__*/React.createElement(GhostRoutes, {
    state: state
  }), ["L1", "L3", "L2", "L4", "X1", "X2", "X3", "X4"].filter(function (id) {
    return state.links[id];
  }).map(function (id) {
    return /*#__PURE__*/React.createElement(LinkLine, {
      key: id,
      link: id,
      flows: flows,
      state: state,
      selected: selected,
      onSelect: onSelect,
      dragUI: dragUI
    });
  }), state.linkQueue.filter(function (q) {
    return q.newLink && !state.links[q.linkId];
  }).map(function (q) {
    return /*#__PURE__*/React.createElement(PendingCorridor, {
      key: q.uid,
      q: q
    });
  }), anchor && /*#__PURE__*/React.createElement("line", {
    ref: rubberRef,
    x1: anchor.x,
    y1: anchor.y,
    x2: anchor.x,
    y2: anchor.y,
    stroke: "#22d3ee",
    strokeWidth: "2.5",
    strokeDasharray: "6 4",
    pointerEvents: "none"
  }), ["A", "B", "C", "D", "E"].map(function (id) {
    return /*#__PURE__*/React.createElement(NodeCircle, {
      key: id,
      id: id,
      state: state,
      flows: flows,
      selected: selected,
      onSelect: onSelect,
      dragUI: dragUI,
      drawMode: drawMode
    });
  }), ["A", "B", "C", "D", "E"].map(function (id) {
    return /*#__PURE__*/React.createElement(NodeCity, {
      key: id,
      state: state,
      id: id
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-2 right-2 flex flex-col gap-1.5",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return zoomCentre(1 / 1.4);
    },
    title: "Zoom in",
    className: "w-9 h-9 sm:w-7 sm:h-7 rounded-md bg-slate-800/90 border border-slate-600 hover:bg-slate-700 active:bg-slate-600 text-slate-200 text-lg sm:text-base font-bold leading-none"
  }, "+"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return zoomCentre(1.4);
    },
    title: "Zoom out",
    className: "w-9 h-9 sm:w-7 sm:h-7 rounded-md bg-slate-800/90 border border-slate-600 hover:bg-slate-700 active:bg-slate-600 text-slate-200 text-lg sm:text-base font-bold leading-none"
  }, "\u2212"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setView(HOME_VIEW);
    },
    title: "Reset view",
    className: "w-9 h-9 sm:w-7 sm:h-7 rounded-md bg-slate-800/90 border border-slate-600 hover:bg-slate-700 active:bg-slate-600 text-slate-200 text-sm leading-none"
  }, "\u2302"))), /*#__PURE__*/React.createElement("div", {
    className: "px-2 py-1.5 border-t border-slate-700 shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 overflow-x-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shrink-0 text-[9px] font-bold tracking-widest text-cyan-400 leading-tight w-14"
  }, "BUILD", /*#__PURE__*/React.createElement("br", null), "PALETTE", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 font-normal"
  }, "drag \u2192 map")), PALETTE.map(function (p) {
    return /*#__PURE__*/React.createElement(PaletteChip, {
      key: p.id,
      item: p,
      state: state,
      onStartDrag: onStartDrag
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-[9px] text-slate-500 font-term px-1 pt-1"
  }, "dotted ring = demand footprint \xB7 icons = your kit (hover them) \xB7 \uD83C\uDFD7\uFE0F = under construction")));
}

/* --------------------------- right panel tabs ---------------------------- */
function Bar(_ref1) {
  var value = _ref1.value,
    max = _ref1.max,
    color = _ref1.color;
  return /*#__PURE__*/React.createElement("div", {
    className: "h-2 bg-slate-700 rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full ".concat(color, " transition-all duration-500"),
    style: {
      width: "".concat(clamp(value / max * 100, 0, 100), "%")
    }
  }));
}
function Section(_ref10) {
  var title = _ref10.title,
    children = _ref10.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-800/60 border border-slate-700 rounded-lg p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-bold tracking-widest text-slate-400 mb-2"
  }, title), children);
}
function Row(_ref11) {
  var k = _ref11.k,
    v = _ref11.v,
    tone = _ref11.tone;
  var c = tone === "bad" ? "text-red-400" : tone === "warn" ? "text-amber-400" : "text-slate-100";
  return /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[12px] py-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, k), /*#__PURE__*/React.createElement("span", {
    className: "font-term font-bold ".concat(c)
  }, v));
}
function PolicyBtn(_ref12) {
  var done = _ref12.done,
    title = _ref12.title,
    desc = _ref12.desc,
    enabled = _ref12.enabled,
    onClick = _ref12.onClick,
    doneLabel = _ref12.doneLabel;
  if (done) return /*#__PURE__*/React.createElement("div", {
    className: "w-full px-3 py-2 rounded-lg border border-green-700 bg-green-900/30 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-bold text-green-400"
  }, "\u2713 ", doneLabel));
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: !enabled,
    className: "w-full text-left px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-bold text-slate-100"
  }, "\uD83D\uDCDC ", title), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-400"
  }, desc), !enabled && /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-red-400 mt-0.5"
  }, "Insufficient Political Capital"));
}
function DefaultTab(_ref13) {
  var state = _ref13.state,
    flows = _ref13.flows,
    dispatch = _ref13.dispatch;
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showMech = _useState4[0],
    setShowMech = _useState4[1];
  var margin = firmCoverGW(state) + flows.cleanDelivered - flows.demand;
  var nextDemand = demandForYear(Math.min(state.year + 1, 12), state.demandExtra) + state.demandExtraD;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement(Section, {
    title: "NATIONAL DASHBOARD"
  }, /*#__PURE__*/React.createElement(Row, {
    k: "Demand this year",
    v: fmtGW(flows.demand)
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Demand next year",
    v: fmtGW(nextDemand),
    tone: "warn"
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Demand by Year 12",
    v: fmtGW(demandForYear(12, state.demandExtra) + state.demandExtraD),
    tone: "warn"
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Gas backup fleet",
    v: fmtGW(state.gasFleet),
    tone: state.gasFleet < flows.gasNeeded ? "bad" : null
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Firm imports",
    v: fmtGW(state.firmImports)
  }), state.scotTariff && /*#__PURE__*/React.createElement(Row, {
    k: "Scottish transmission tariff",
    v: "\u2212\xA3200m/yr",
    tone: "bad"
  }), state.loan && /*#__PURE__*/React.createElement(Row, {
    k: "Grid Bond repayment",
    v: "\u2212".concat(fmtM(state.loan.perYear), "/yr (").concat(state.loan.yearsLeft, " yr)"),
    tone: "warn"
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Public approval",
    v: "".concat(Math.round(state.approval), "%"),
    tone: state.approval < 35 ? "bad" : null
  }), /*#__PURE__*/React.createElement(Row, {
    k: "\uD83C\uDF2C Met Office wind outlook (next yr)",
    v: "".concat(Math.round(state.windNext * 100), "% of normal"),
    tone: state.windNext < 0.83 ? "warn" : null
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[10px] text-slate-400 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, "GRID INTERMITTENCY RISK"), /*#__PURE__*/React.createElement("span", {
    className: state.intermittency > 40 ? "text-red-400 font-bold" : state.intermittency > 20 ? "text-amber-400" : "text-green-400"
  }, state.intermittency, "% ", state.intermittency > 40 ? "⚠ UNSTABLE" : state.intermittency > 20 ? "ELEVATED" : "STABLE")), /*#__PURE__*/React.createElement(Bar, {
    value: state.intermittency,
    max: 60,
    color: state.intermittency > 40 ? "bg-red-500" : state.intermittency > 25 ? "bg-amber-400" : "bg-green-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-1.5 space-y-1"
  }, function () {
    var t = totalsByKind(state);
    var variableGW = r1(t.wind + t.solar);
    var firmGW = r1(t.nuclear + t.tidal * 0.92 + t.battery * ECON.batteryFirmFactor + state.firmImports);
    // per-node: wind+solar capacity minus nuclear, tidal and battery firm
    var nodeScore = {};
    for (var _i6 = 0, _arr5 = ["A", "B", "C", "D", "E"]; _i6 < _arr5.length; _i6++) {
      var id = _arr5[_i6];
      var g = flows.g[id];
      nodeScore[id] = g.windCap + g.solarCap - g.nuclear - (g.tidal || 0) * 0.92 - g.battery * ECON.batteryFirmFactor;
    }
    var bestNode = Object.entries(nodeScore).sort(function (a, b) {
      return b[1] - a[1];
    })[0];
    var satLink = Object.keys(state.links).find(function (id) {
      var cap = state.links[id] ? state.links[id].cap : 0;
      return cap > 0 && (flows.byLink[id] || 0) / cap >= 0.99;
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-slate-500"
    }, "Variable (wind+solar): ", /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400 font-term"
    }, variableGW, " GW"), " | Firm (nuclear+tidal+batteries\xD750%+imports): ", /*#__PURE__*/React.createElement("span", {
      className: "text-green-400 font-term"
    }, firmGW, " GW")), /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-slate-500 italic"
    }, "Intermittency rises when variable far exceeds firm. A Dunkelflaute (wind lull) can leave a variable-heavy grid dangerously short \u2014 forcing costly emergency imports."), state.intermittency > 15 && bestNode && bestNode[1] > 0.5 && /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-amber-300 bg-amber-950/30 border border-amber-800/50 rounded px-2 py-1"
    }, "\u26A1 Best fix: add a \uD83D\uDD0B Battery at ", /*#__PURE__*/React.createElement("b", null, NODE_DEFS[bestNode[0]]["short"]), " \u2014 it has ", fmtGW(r1(bestNode[1])), " more variable than firm generation. Each 2 GW battery firms up 1 GW of that gap."), satLink && /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-red-300 bg-red-950/30 border border-red-800/50 rounded px-2 py-1"
    }, "\uD83D\uDD0C A battery at ", NODE_DEFS[LINK_DEFS[satLink].from]["short"], " also reduces curtailment on the saturated ", LINK_DEFS[satLink].name, " line."), t.nuclear + t.tidal < 3 && /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-purple-300 bg-purple-950/30 border border-purple-800/50 rounded px-2 py-1"
    }, "\u269B\uFE0F Low firm baseload (", fmtGW(r1(t.nuclear + t.tidal)), " nuclear+tidal). An \u269B\uFE0F SMR anywhere \u2014 or a \uD83C\uDF19 Tidal Lagoon at S. Wales \u2014 gives firm 24/7 power, the strongest cut to intermittency."), state.intermittency <= 15 && /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-green-400"
    }, "\u2713 Firm cover looks healthy. Keep building if demand is still rising."));
  }())), /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[10px] text-slate-400 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, "SUPPLY MARGIN (clean + firm \u2212 demand)"), /*#__PURE__*/React.createElement("span", {
    className: margin < 3 ? "text-red-400 font-bold" : "text-green-400"
  }, margin >= 0 ? "+" : "", r1(margin), " GW")), /*#__PURE__*/React.createElement(Bar, {
    value: Math.max(margin, 0),
    max: 20,
    color: margin < 3 ? "bg-red-500" : margin < 8 ? "bg-amber-400" : "bg-green-500"
  }), margin < 5 && /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-red-300 bg-red-950/40 border border-red-800 rounded px-2 py-1 mt-1.5"
  }, "\uD83D\uDD6F ", /*#__PURE__*/React.createElement("b", null, "BLACKOUT RISK."), " If a wind lull or cold snap pushes the shortfall past ~", fmtGW(Math.max(ECON.brownoutTolerance, flows.demand * 0.12)), ", you'll be forced into emergency foreign power deals at ", /*#__PURE__*/React.createElement("b", null, "\xA3175m per GW"), " short \u2014 and lose Political Capital and Approval. Add firm capacity or imports before next year."))), /*#__PURE__*/React.createElement(Section, {
    title: "GLOBAL POLICY LEVERS"
  }, state.year < 7 && /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-cyan-600 font-term mb-2 px-1"
  }, "\u2668\uFE0F \uD83D\uDCCA Late-game policies unlock at Year 7"), POLICIES.filter(function (P) {
    return !P.minYear || state.year >= P.minYear;
  }).map(function (P) {
    return /*#__PURE__*/React.createElement(PolicyBtn, {
      key: P.id,
      done: state.policies[P.id],
      title: "".concat(P.icon, " ").concat(P.name).concat(P.cost ? " \u2014 ".concat(fmtM(P.cost)) : ""),
      desc: P.desc,
      enabled: state.pc >= P.pc && state.treasury >= P.cost,
      onClick: function onClick() {
        return dispatch({
          type: "policy",
          id: P.id
        });
      },
      doneLabel: P.doneLabel
    });
  }), /*#__PURE__*/React.createElement("button", {
    disabled: state.whipsUsed || state.pc < 15,
    onClick: function onClick() {
      return dispatch({
        type: "whips"
      });
    },
    className: "w-full text-left px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-bold text-slate-100"
  }, "\uD83E\uDD43 Whips' Operation ", /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 font-normal"
  }, "(once per year)")), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-400"
  }, "Spend 15 PC \u2192 Rebellion Risk \u221215%. ", state.whipsUsed ? "Already deployed this year." : ""))), /*#__PURE__*/React.createElement(Section, {
    title: "TREASURY & FINANCE"
  }, function () {
    var yearsLeft = Math.max(1, ECON.totalYears - state.year + 1);
    var PRINCIPAL = 1800,
      INTEREST = 1.25;
    var perYear = Math.ceil(PRINCIPAL * INTEREST / yearsLeft);
    if (state.loan) {
      return /*#__PURE__*/React.createElement("div", {
        className: "px-3 py-2 rounded-lg border border-sky-800 bg-sky-950/30"
      }, /*#__PURE__*/React.createElement("div", {
        className: "text-sm font-bold text-sky-300"
      }, "\uD83D\uDCB7 National Grid Bond active"), /*#__PURE__*/React.createElement("div", {
        className: "text-[11px] text-slate-400"
      }, "Repaying ", fmtM(state.loan.perYear), "/yr for ", state.loan.yearsLeft, " more year", state.loan.yearsLeft > 1 ? "s" : "", "."));
    }
    if (state.loanUsed) {
      return /*#__PURE__*/React.createElement("div", {
        className: "text-[11px] text-slate-500 italic"
      }, "National Grid Bond already issued this term. One per government.");
    }
    return /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return dispatch({
          type: "borrow"
        });
      },
      className: "w-full text-left px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 hover:bg-slate-700 transition"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-sm font-bold text-slate-100"
    }, "\uD83D\uDCB7 Issue a National Grid Bond \u2014 borrow ", fmtM(PRINCIPAL)), /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] text-slate-400"
    }, "Get ", fmtM(PRINCIPAL), " now to spend on the build-out. Repay ", fmtM(perYear), "/yr over the remaining ", yearsLeft, " year", yearsLeft > 1 ? "s" : "", " (", fmtM(Math.round(PRINCIPAL * INTEREST)), " total, 25% interest). One-time only."));
  }()), /*#__PURE__*/React.createElement(Section, {
    title: "CONNECTIONS QUEUE (".concat(state.queue.length + state.linkQueue.length, ")")
  }, state.queue.length + state.linkQueue.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-500 italic"
  }, "Queue empty. Suspiciously tidy."), state.queue.map(function (q) {
    return /*#__PURE__*/React.createElement("div", {
      key: q.uid,
      className: "flex justify-between items-center text-[11px] py-0.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-slate-300"
    }, ASSET_TYPES[q.type].icon, " ", q.label, " \u2192 ", NODE_DEFS[q.nodeId]["short"]), /*#__PURE__*/React.createElement("span", {
      className: "font-term text-amber-400"
    }, q.turnsLeft, " yr"));
  }), state.linkQueue.map(function (q) {
    return /*#__PURE__*/React.createElement("div", {
      key: q.uid,
      className: "flex justify-between items-center text-[11px] py-0.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-slate-300"
    }, "\u26A1 ", q.label, " \u2192 ", LINK_DEFS[q.linkId].name), /*#__PURE__*/React.createElement("span", {
      className: "font-term text-amber-400"
    }, q.turnsLeft, " yr"));
  })), /*#__PURE__*/React.createElement(Section, {
    title: "MECHANICS (FULL TRANSPARENCY)"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowMech(function (v) {
        return !v;
      });
    },
    className: "text-[11px] text-sky-400 hover:text-sky-300"
  }, showMech ? "▾ hide the maths" : "▸ show the maths"), showMech && /*#__PURE__*/React.createElement("div", {
    className: "text-[10.5px] text-slate-400 font-term space-y-1 mt-1 leading-relaxed"
  }, /*#__PURE__*/React.createElement("div", null, "price = 3.5 + 0.19\xB7gasGW + 0.12\xB7curtailGW (+1.2 levy)"), /*#__PURE__*/React.createElement("div", null, "curtail fine = \xA340m \xD7 excess GW over boundary cap"), /*#__PURE__*/React.createElement("div", null, "battery: absorbs 0.5\xB7GW of spill locally + 0.5\xB7GW firm cover"), /*#__PURE__*/React.createElement("div", null, "tidal: firm clean power at ~92% capacity factor (Severn-class)"), /*#__PURE__*/React.createElement("div", null, "intermittency = (wind+solar \u2212 ", state.firmMult, "\xB7(nuclear+tidal+battery+imports)) / demand"), /*#__PURE__*/React.createElement("div", null, "net zero = 1 \u2212 gasFired/demand"), /*#__PURE__*/React.createElement("div", null, "shortfall > max(4, 12%\xB7demand) \u21D2 EMERGENCY IMPORTS: \u2212\xA3175m/GW, \u22125 PC/GW, \u221214 Approval, +16% Rebellion (no longer instant game-over)"), /*#__PURE__*/React.createElement("div", null, "smaller shortfall \u21D2 brownout: \u2212\xA3200m, \u22127 Approval, +6% Rebellion"), /*#__PURE__*/React.createElement("div", null, "income \xA3585m/yr +\xA330m/yr (+\xA3300m levy) \xB7 gas fuel \xA39m per GW fired"), /*#__PURE__*/React.createElement("div", null, "pylon: +3 GW/1yr/\xA3320m/+4% rebellion \xB7 HVDC: +5 GW/2yr/\xA3700m/painless"), /*#__PURE__*/React.createElement("div", null, "wind capacity factor drawn 75\u2013105% yearly (5% in a Dunkelflaute; strato-kites immune)"))));
}
function LabTab(_ref14) {
  var state = _ref14.state,
    dispatch = _ref14.dispatch;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-400 italic px-1"
  }, "The basement department nobody audits. One shot each. Odds printed on the tin. Make Britain weird again."), INNOVATIONS.map(function (def) {
    var st = state.innovations[def.id];
    var afford = state.treasury >= def.cost && state.pc >= def.pc;
    return /*#__PURE__*/React.createElement("div", {
      key: def.id,
      className: "rounded-lg border p-2.5 ".concat(st.status === "done" ? "border-green-700 bg-green-900/20" : st.status === "failed" ? "border-red-800 bg-red-950/20" : "border-slate-600 bg-slate-800")
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-baseline gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[12.5px] font-bold text-slate-100"
    }, def.icon, " ", def.name), /*#__PURE__*/React.createElement("span", {
      className: "font-term text-[11px] shrink-0 text-slate-300"
    }, fmtM(def.cost), def.pc ? " + ".concat(def.pc, " PC") : "")), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px] text-slate-400 mt-0.5"
    }, def.desc), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mt-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-term text-[10px] text-slate-500"
    }, def.years === 0 ? "instant" : "".concat(def.years, " yr build"), " \xB7 ", Math.round(def.odds * 100), "% success"), st.status === "idle" && /*#__PURE__*/React.createElement("button", {
      disabled: !afford,
      onClick: function onClick() {
        return dispatch({
          type: "innovate",
          id: def.id
        });
      },
      className: "px-3 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 text-[11px] font-bold transition"
    }, "\uD83D\uDE80 LAUNCH"), st.status === "building" && /*#__PURE__*/React.createElement("span", {
      className: "font-term text-[11px] text-amber-400 blink"
    }, "\uD83C\uDFD7\uFE0F ", st.turnsLeft, " yr remaining"), st.status === "done" && /*#__PURE__*/React.createElement("span", {
      className: "font-term text-[11px] text-green-400"
    }, "\u2713 DEPLOYED"), st.status === "failed" && /*#__PURE__*/React.createElement("span", {
      className: "font-term text-[11px] text-red-400"
    }, "\u2717 GLORIOUS FAILURE")));
  }));
}
function NodeTab(_ref15) {
  var state = _ref15.state,
    flows = _ref15.flows,
    nodeId = _ref15.nodeId,
    dispatch = _ref15.dispatch;
  var def = NODE_DEFS[nodeId];
  var g = flows.g[nodeId];
  var dem = flows.dem[nodeId];
  var nimby = state.nimby[nodeId];
  var mix = state.assets.filter(function (a) {
    return a.nodeId === nodeId;
  });
  var queued = state.queue.filter(function (q) {
    return q.nodeId === nodeId;
  });
  var delay = state.policies.queueReform ? ECON.queueDelayReformed : ECON.queueDelayDefault;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement(Section, {
    title: "NODE ".concat(nodeId, " \u2014 ").concat(def.name.toUpperCase())
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-400 italic mb-2"
  }, def.blurb), /*#__PURE__*/React.createElement(Row, {
    k: "Local demand",
    v: fmtGW(dem)
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Local clean output (avg weather)",
    v: fmtGW(g.gen),
    tone: g.gen < dem ? "warn" : null
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Battery capacity here",
    v: fmtGW(g.battery)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[10px] text-slate-400 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, "NIMBY OPPOSITION"), /*#__PURE__*/React.createElement("span", {
    className: nimby > 70 ? "text-red-400 font-bold" : nimby > 45 ? "text-amber-400" : "text-green-400"
  }, Math.round(nimby), "%", nimby > 70 ? " ⚠ flashpoint" : "")), /*#__PURE__*/React.createElement(Bar, {
    value: nimby,
    max: 100,
    color: nimby > 70 ? "bg-red-500" : nimby > 45 ? "bg-amber-400" : "bg-green-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-500 mt-1"
  }, "Above 70% at year end: +4% Rebellion. Decays \u22126/yr."))), /*#__PURE__*/React.createElement(Section, {
    title: "CURRENT GENERATION MIX"
  }, mix.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-500 italic"
  }, "Nothing but pylons and regret."), mix.map(function (a) {
    return /*#__PURE__*/React.createElement("div", {
      key: a.uid,
      className: "flex justify-between text-[11px] py-0.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-slate-300"
    }, a.icon, " ", a.name), /*#__PURE__*/React.createElement("span", {
      className: "font-term text-green-400"
    }, fmtGW(a.gw)));
  }), queued.map(function (q) {
    return /*#__PURE__*/React.createElement("div", {
      key: q.uid,
      className: "flex justify-between text-[11px] py-0.5 opacity-60"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-slate-400"
    }, ASSET_TYPES[q.type].icon, " ", q.label, " (queued)"), /*#__PURE__*/React.createElement("span", {
      className: "font-term text-amber-400"
    }, q.turnsLeft, " yr"));
  })), /*#__PURE__*/React.createElement(Section, {
    title: "COMMISSION NEW ASSETS (connect in ".concat(delay, " yr").concat(delay > 1 ? "s" : "", ")")
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-500 mb-1.5"
  }, "Tip: you can also drag these from the palette straight onto the map."), Object.values(ASSET_TYPES).map(function (t) {
    if (t.id === "offshore" && !def.offshoreOk) return null;
    if (t.id === "tidal" && !def.tidalOk) return null;
    var yieldMult = t.kind === "battery" ? 1 : def.yields[t.kind];
    var effGW = r1(t.gw * yieldMult);
    var cost = Math.round(t.cost * (t.id === "battery" ? state.batteryDiscount : 1) * (state.costMult || 1));
    var afford = state.treasury >= cost;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      disabled: !afford,
      onClick: function onClick() {
        return dispatch({
          type: "build",
          nodeId: nodeId,
          assetId: t.id
        });
      },
      className: "w-full text-left px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition mb-1.5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-baseline"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[12.5px] font-bold text-slate-100"
    }, t.icon, " ", t.name), /*#__PURE__*/React.createElement("span", {
      className: "font-term text-[12px] ".concat(afford ? "text-green-400" : "text-red-400")
    }, fmtM(cost))), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px] text-slate-400"
    }, t.kind === "battery" ? "".concat(effGW, " GW storage") : "".concat(effGW, " GW here"), yieldMult !== 1 && t.kind !== "battery" ? " (regional yield \xD7".concat(yieldMult, ")") : "", " \xB7 NIMBY +", Math.round(t.nimby * def.nimbyFactor), " \xB7 ", t.desc));
  })));
}
function LinkTab(_ref16) {
  var state = _ref16.state,
    flows = _ref16.flows,
    linkId = _ref16.linkId,
    dispatch = _ref16.dispatch;
  var def = LINK_DEFS[linkId];
  var cap = state.links[linkId].cap;
  var flow = flows.byLink[linkId] || 0;
  var util = cap > 0 ? flow / cap : 1;
  var pending = state.linkQueue.filter(function (q) {
    return q.linkId === linkId;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement(Section, {
    title: "TRANSMISSION BOUNDARY \u2014 ".concat(def.name.toUpperCase())
  }, /*#__PURE__*/React.createElement(Row, {
    k: "Capacity",
    v: fmtGW(cap)
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Projected flow (avg weather)",
    v: fmtGW(flow),
    tone: util >= 0.99 ? "bad" : util > 0.75 ? "warn" : null
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[10px] text-slate-400 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, "UTILISATION"), /*#__PURE__*/React.createElement("span", {
    className: util >= 0.99 ? "text-red-400 font-bold" : "text-slate-300"
  }, Math.round(util * 100), "%", util >= 0.99 ? " ⚠ SATURATED" : "")), /*#__PURE__*/React.createElement(Bar, {
    value: util * 100,
    max: 100,
    color: util >= 0.99 ? "bg-red-500" : util > 0.75 ? "bg-amber-400" : "bg-green-500"
  })), util >= 0.99 && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-[11px] text-red-400 bg-red-950/40 border border-red-800 rounded p-2"
  }, "\u26A0 Boundary saturated. Surplus generation upstream will be ", /*#__PURE__*/React.createElement("b", null, "curtailed"), " (\xA340m/GW fine) and replaced by southern gas peakers, spiking the wholesale price."), pending.map(function (q) {
    return /*#__PURE__*/React.createElement("div", {
      key: q.uid,
      className: "mt-2 text-[11px] text-amber-400"
    }, "\u23F3 ", q.label, " energising in ", q.turnsLeft, " yr");
  })), /*#__PURE__*/React.createElement(Section, {
    title: "REINFORCEMENT OPTIONS"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-500 mb-1.5"
  }, "Tip: drag \uD83D\uDDFC or \uD83E\uDDF5 from the palette directly onto a line."), Object.values(LINK_UPGRADES).map(function (u) {
    if (u.id === "pylon" && def.fullySubsea) return null;
    var afford = state.treasury >= u.cost;
    return /*#__PURE__*/React.createElement("button", {
      key: u.id,
      disabled: !afford,
      onClick: function onClick() {
        return dispatch({
          type: "upgradeLink",
          linkId: linkId,
          upgradeId: u.id
        });
      },
      className: "w-full text-left px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition mb-1.5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-baseline"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[12.5px] font-bold text-slate-100"
    }, u.icon, " ", u.id === "hvdc" && !def.subsea ? "Underground HVDC Cable" : u.name), /*#__PURE__*/React.createElement("span", {
      className: "font-term text-[12px] ".concat(afford ? "text-green-400" : "text-red-400")
    }, fmtM(u.cost))), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px] text-slate-400"
    }, u.desc));
  })));
}
function RightPanel(_ref17) {
  var state = _ref17.state,
    flows = _ref17.flows,
    selected = _ref17.selected,
    tab = _ref17.tab,
    setTab = _ref17.setTab,
    dispatch = _ref17.dispatch;
  var title = selected ? selected.type === "node" ? "NODE ".concat(selected.id) : LINK_DEFS[selected.id].name.toUpperCase() : tab === "lab" ? "🧪 THE SKUNKWORKS" : "SYSTEM COMMAND";
  return /*#__PURE__*/React.createElement("div", {
    className: "h-full flex flex-col bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-3 py-2 border-b border-slate-700 flex items-center justify-between shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold tracking-widest text-slate-300"
  }, title), selected ? /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return dispatch({
        type: "select",
        sel: null
      });
    },
    className: "text-[10px] text-sky-400 hover:text-sky-300"
  }, "\u2190 back to national view") : /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setTab("national");
    },
    className: "px-2 py-0.5 rounded text-[10px] font-bold ".concat(tab === "national" ? "bg-slate-600 text-slate-100" : "bg-slate-800 text-slate-400 hover:text-slate-200")
  }, "\uD83D\uDDFA COMMAND"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setTab("lab");
    },
    className: "px-2 py-0.5 rounded text-[10px] font-bold ".concat(tab === "lab" ? "bg-cyan-700 text-cyan-100" : "bg-slate-800 text-cyan-500 hover:text-cyan-300")
  }, "\uD83E\uDDEA SKUNKWORKS"))), /*#__PURE__*/React.createElement("div", {
    className: "scroll-y flex-1 min-h-0 p-3"
  }, !selected && tab === "national" && /*#__PURE__*/React.createElement(DefaultTab, {
    state: state,
    flows: flows,
    dispatch: dispatch
  }), !selected && tab === "lab" && /*#__PURE__*/React.createElement(LabTab, {
    state: state,
    dispatch: dispatch
  }), selected && selected.type === "node" && /*#__PURE__*/React.createElement(NodeTab, {
    state: state,
    flows: flows,
    nodeId: selected.id,
    dispatch: dispatch
  }), selected && selected.type === "link" && /*#__PURE__*/React.createElement(LinkTab, {
    state: state,
    flows: flows,
    linkId: selected.id,
    dispatch: dispatch
  })));
}

/* ---------------------------- bottom console ---------------------------- */
function AdvisorBar(_ref18) {
  var state = _ref18.state,
    flows = _ref18.flows;
  var tip = advise(state, flows);
  var color = tip.tone === "bad" ? "text-red-300 border-red-800 bg-red-950/30" : tip.tone === "warn" ? "text-amber-300 border-amber-800 bg-amber-950/20" : tip.tone === "good" ? "text-green-300 border-green-800 bg-green-950/20" : "text-slate-300 border-slate-700 bg-slate-800/60";
  return /*#__PURE__*/React.createElement("div", {
    className: "px-3 py-1.5 rounded-lg border text-[11.5px] mb-2 flex gap-2 items-center ".concat(color)
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base shrink-0"
  }, "\uD83C\uDFA9"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    className: "font-term text-[10px] tracking-widest opacity-70"
  }, "SIR REGINALD (PERM. SEC.):"), " ", tip.text));
}
function Console(_ref19) {
  var state = _ref19.state,
    dispatch = _ref19.dispatch;
  var ref = useRef(null);
  useEffect(function () {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [state.log.length]);
  var busy = state.phase !== "play";
  return /*#__PURE__*/React.createElement("div", {
    className: "shrink-0 bg-[#0f172a] border border-slate-700 rounded-xl flex items-stretch gap-0 overflow-hidden h-full lg:h-[138px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0 flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-3 py-1 border-b border-slate-800 text-[10px] font-bold tracking-widest text-slate-500 flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCE1 WESTMINSTER WIRE \u2014 LIVE"), /*#__PURE__*/React.createElement("span", {
    className: "font-term"
  }, state.log.length, " dispatches")), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "flex-1 overflow-y-auto px-3 py-1.5 font-term text-[11.5px] leading-relaxed"
  }, state.log.map(function (e, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: TONE_CLASS[e.tone]
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-slate-600"
    }, "[", e.year === 0 ? "BRIEF" : "FY".concat(e.year), "]"), " ", e.text);
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return dispatch({
        type: "advance"
      });
    },
    disabled: busy,
    className: "w-32 sm:w-44 shrink-0 m-2 rounded-lg bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-bold text-sm tracking-wide transition flex flex-col items-center justify-center gap-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\u23ED"), /*#__PURE__*/React.createElement("span", null, "ADVANCE", /*#__PURE__*/React.createElement("br", null), "FINANCIAL YEAR"), /*#__PURE__*/React.createElement("span", {
    className: "font-term text-[10px] opacity-80"
  }, "FY", state.year, " \u2192 ", state.year >= 12 ? "FINAL AUDIT" : "FY".concat(state.year + 1))));
}

/* -------------------------------- toasts -------------------------------- */
function Toasts(_ref20) {
  var toasts = _ref20.toasts;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed top-20 right-4 z-40 space-y-2 pointer-events-none w-72"
  }, toasts.map(function (t) {
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      className: "toast-in px-3 py-2 rounded-lg border text-[12px] font-bold shadow-xl\n          ".concat(t.tone === "good" ? "bg-green-900/90 border-green-600 text-green-200" : t.tone === "bad" ? "bg-red-900/90 border-red-600 text-red-200" : "bg-slate-800/95 border-slate-600 text-slate-200")
    }, t.text);
  }));
}

/* -------------------------------- modals -------------------------------- */
function ModalShell(_ref21) {
  var children = _ref21.children,
    tone = _ref21.tone;
  var border = tone === "bad" ? "border-red-600" : tone === "good" ? "border-green-600" : "border-amber-500";
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3 sm:p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slide-up w-full max-w-lg bg-[#1e293b] border-2 ".concat(border, " rounded-2xl p-4 sm:p-6 shadow-2xl max-h-[88dvh] overflow-y-auto")
  }, children));
}
function CrisisModal(_ref22) {
  var state = _ref22.state,
    dispatch = _ref22.dispatch;
  var card = state.activeCrisis;
  if (!card) return null;
  var anyPlayable = card.choices.some(function (c) {
    return c.can ? c.can(state) : true;
  });
  return /*#__PURE__*/React.createElement(ModalShell, {
    tone: "warn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-bold tracking-widest text-amber-400 mb-1"
  }, "\u26A0 WESTMINSTER CRISIS \u2014 FY", state.year, " \u2014 A DECISION IS REQUIRED"), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-bold text-slate-100 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl mr-1"
  }, card.icon), " ", card.title), /*#__PURE__*/React.createElement("p", {
    className: "text-[13px] text-slate-300 mb-4 leading-relaxed"
  }, card.body(state)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, card.choices.map(function (c, i) {
    var ok = c.can ? c.can(state) : true;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      disabled: !ok,
      onClick: function onClick() {
        return dispatch({
          type: "crisisChoice",
          fx: c.fx
        });
      },
      className: "w-full text-left px-4 py-3 rounded-lg border border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-amber-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-sm font-bold text-slate-100"
    }, String.fromCharCode(65 + i), ". ", c.label), /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] text-slate-400"
    }, c.detail, !ok ? " — UNAFFORDABLE" : ""));
  }), !anyPlayable && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return dispatch({
        type: "crisisChoice",
        fx: "broke"
      });
    },
    className: "w-full text-left px-4 py-3 rounded-lg border border-amber-600 bg-amber-950/30 hover:bg-amber-900/40 transition"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-bold text-amber-300"
  }, "\u26A0 Plead poverty \u2014 the Treasury cannot act"), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-amber-400/80"
  }, "You can afford none of the above. Stall for a year. \u22124 Approval, +4% Rebellion \u2014 but the game goes on."))));
}
function GameOverModal(_ref23) {
  var state = _ref23.state,
    dispatch = _ref23.dispatch;
  var go = state.gameOver;
  var T = {
    bankrupt: {
      h: "💷 NATIONAL BANKRUPTCY",
      c: "The money ran out before the wind picked up."
    },
    coup: {
      h: "🗳 BACKBENCH COUP",
      c: "The men in grey suits arrived between the soup and the fish course."
    },
    blackout: {
      h: "🕯 NATIONAL BLACKOUT",
      c: "Britain went dark. The inquiry will last longer than your career did."
    }
  }[go.type];
  return /*#__PURE__*/React.createElement(ModalShell, {
    tone: "bad"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-red-400 mb-2"
  }, T.h), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-300 text-sm mb-1"
  }, T.c), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-[12px] mb-4 font-term"
  }, go.detail), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-[12px] mb-4"
  }, /*#__PURE__*/React.createElement(Row, {
    k: "Years survived",
    v: "".concat(state.year, " / 12")
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Final Net Zero",
    v: "".concat(r1(state.netZero), "%")
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Curtailment fines",
    v: fmtM(state.stats.fines)
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Mad science launched",
    v: state.stats.innovations
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return dispatch({
        type: "restart"
      });
    },
    className: "w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition"
  }, "RESIGN & RUN IT BACK"));
}
function ReportModal(_ref24) {
  var state = _ref24.state,
    dispatch = _ref24.dispatch;
  var rep = finalReport(state);
  return /*#__PURE__*/React.createElement(ModalShell, {
    tone: "good"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-bold tracking-widest text-green-400 mb-1"
  }, "FINAL MINISTERIAL REPORT CARD \u2014 TWELVE YEARS IN THE CHAIR"), state.playerName && /*#__PURE__*/React.createElement("div", {
    className: "text-[12px] text-cyan-400 font-bold mb-0.5"
  }, state.playerName), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-slate-100 mb-1"
  }, "\u201C", rep.title, "\u201D"), /*#__PURE__*/React.createElement("p", {
    className: "text-[13px] text-slate-300 italic mb-3"
  }, rep.line), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-800/70 border border-slate-700 rounded-lg p-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 tracking-widest"
  }, "HISTORICAL LEGACY SCORE"), /*#__PURE__*/React.createElement("div", {
    className: "font-term text-4xl font-bold text-green-400"
  }, rep.score)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-x-4 text-[12px]"
  }, /*#__PURE__*/React.createElement(Row, {
    k: "Net Zero achieved",
    v: "".concat(r1(state.netZero), "%")
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Treasury remaining",
    v: fmtM(state.treasury)
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Rebellion Risk",
    v: "".concat(Math.round(state.rebellion), "%")
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Public approval",
    v: "".concat(Math.round(state.approval), "%")
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Assets commissioned",
    v: state.stats.built
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Battery fleet",
    v: fmtGW(state.stats.batteriesGW)
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Skunkworks launched",
    v: state.stats.innovations
  }), /*#__PURE__*/React.createElement(Row, {
    k: "New corridors drawn",
    v: state.stats.corridors
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Total curtailment fines",
    v: fmtM(state.stats.fines),
    tone: state.stats.fines > 500 ? "bad" : null
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Peak wholesale price",
    v: fmtP(state.stats.peakPrice)
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Pylon routes forced",
    v: state.stats.pylons
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Routes undergrounded",
    v: state.stats.underground
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Brownout events",
    v: state.stats.brownouts,
    tone: state.stats.brownouts > 0 ? "bad" : null
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Emergency import years",
    v: state.stats.emergencyImports || 0,
    tone: state.stats.emergencyImports > 0 ? "bad" : null
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return dispatch({
        type: "restart"
      });
    },
    className: "w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 text-slate-900 font-bold transition"
  }, "ACCEPT PEERAGE & START A NEW TERM"), /*#__PURE__*/React.createElement("a", {
    href: "https://paypal.me/kyrenr",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block text-center mt-3 text-[11px] text-amber-400/80 hover:text-amber-300 transition"
  }, "\u2615 Buy the developer a coffee"));
}
function IntroModal(_ref25) {
  var state = _ref25.state,
    dispatch = _ref25.dispatch;
  var _useState5 = useState("scenario"),
    _useState6 = _slicedToArray(_useState5, 2),
    step = _useState6[0],
    setStep = _useState6[1]; // "scenario" | "brief"
  var chosen = SCENARIOS.find(function (s) {
    return s.id === state.scenario;
  }) || SCENARIOS[0];
  if (step === "scenario") {
    return /*#__PURE__*/React.createElement(ModalShell, {
      tone: "good"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] font-bold tracking-widest text-green-400 mb-1"
    }, "CLASSIFIED \u2014 CHAIR'S EYES ONLY"), /*#__PURE__*/React.createElement("h2", {
      className: "text-xl font-bold text-slate-100 mb-1"
    }, "GridLock: The Great British Upgrade"), /*#__PURE__*/React.createElement("div", {
      className: "mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      className: "text-[11px] text-slate-400 block mb-1"
    }, "Your name, Chair (for the record books):"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: state.playerName,
      maxLength: 24,
      onChange: function onChange(e) {
        return dispatch({
          type: "setName",
          name: e.target.value
        });
      },
      placeholder: "e.g. Rt Hon. A. Chair",
      className: "w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 text-sm focus:border-cyan-400 focus:outline-none"
    })), /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-slate-400 mb-3"
    }, "Choose your starting scenario. Each one changes your inherited position."), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4"
    }, SCENARIOS.map(function (sc) {
      return /*#__PURE__*/React.createElement("button", {
        key: sc.id,
        onClick: function onClick() {
          dispatch({
            type: "chooseScenario",
            id: sc.id
          });
        },
        className: "text-left p-3 rounded-xl border-2 transition ".concat(state.scenario === sc.id ? "border-green-500 bg-green-900/30" : "border-slate-600 bg-slate-800 hover:border-slate-400")
      }, /*#__PURE__*/React.createElement("div", {
        className: "text-2xl mb-1"
      }, sc.icon), /*#__PURE__*/React.createElement("div", {
        className: "text-sm font-bold text-slate-100"
      }, sc.label), /*#__PURE__*/React.createElement("div", {
        className: "text-[10px] text-cyan-400 italic mb-1"
      }, sc.tagline), /*#__PURE__*/React.createElement("div", {
        className: "text-[10px] text-slate-400 leading-relaxed"
      }, sc.desc), state.scenario === sc.id && /*#__PURE__*/React.createElement("div", {
        className: "mt-1.5 text-[10px] font-bold text-green-400"
      }, "\u2713 SELECTED"));
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setStep("brief");
      },
      className: "w-full py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold transition"
    }, "Continue with \"", chosen.label, "\" \u2192"), /*#__PURE__*/React.createElement("a", {
      href: "https://paypal.me/kyrenr",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "block text-center mt-3 text-[11px] text-amber-400/80 hover:text-amber-300 transition"
    }, "\u2615 Enjoying GridLock? Buy the developer a coffee"));
  }
  return /*#__PURE__*/React.createElement(ModalShell, {
    tone: "good"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-bold tracking-widest text-green-400 mb-1"
  }, "CLASSIFIED \u2014 CHAIR'S EYES ONLY"), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl sm:text-2xl font-bold text-slate-100 mb-0.5"
  }, "GridLock: The Great British Upgrade"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-cyan-400 font-bold mb-2"
  }, chosen.icon, " Scenario: ", chosen.label, " \u2014 ", /*#__PURE__*/React.createElement("span", {
    className: "italic font-normal text-slate-400"
  }, chosen.tagline)), /*#__PURE__*/React.createElement("div", {
    className: "text-[12px] sm:text-[13px] text-slate-300 space-y-2 leading-relaxed mb-4"
  }, /*#__PURE__*/React.createElement("p", null, "Welcome to NESO", state.playerName ? ", ".concat(state.playerName) : ", Chair", ". The problem in one sentence: ", /*#__PURE__*/React.createElement("span", {
    className: "text-green-400"
  }, "the wind is in Scotland, the demand is in London, and the wires in between are forty years old.")), /*#__PURE__*/React.createElement("p", null, "You have ", /*#__PURE__*/React.createElement("b", {
    className: "text-green-400"
  }, "12 financial years"), " to reach 100% Net Zero while demand nearly doubles. New policies unlock at Year 7."), /*#__PURE__*/React.createElement("ul", {
    className: "text-[12px] text-slate-400 list-disc pl-5 space-y-1"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", {
    className: "text-cyan-300"
  }, "DRAG & DROP"), " assets from the Build Palette onto regions \u2014 or cables onto the lines between them."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", {
    className: "text-cyan-300"
  }, "\u270F\uFE0F DRAW"), " brand-new transmission corridors: drop the pencil on a region, then tap the destination."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", {
    className: "text-teal-300"
  }, "\uD83C\uDF19 Tidal Lagoons"), " give firm clean power on the coasts \u2014 and South Wales has the world-class Severn estuary."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", {
    className: "text-slate-300"
  }, "Watch the lines"), ": pulsing red = curtailment fines. Watch the \u25B2\u25BC trend next to Net Zero."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", {
    className: "text-slate-300"
  }, "Listen to Sir Reginald"), " \u2014 the advisor bar tells you what's about to go wrong."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", {
    className: "text-cyan-300"
  }, "\uD83E\uDDEA The Skunkworks"), " holds the mad stuff: fusion bets, stratospheric kites, nuclear barges, hamsters."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", {
    className: "text-amber-300"
  }, "\uD83D\uDCF1 On a phone:"), " use the bottom tabs (Map \xB7 Build \xB7 National \xB7 Advance); pinch to zoom the map. Tap a region to build \u2014 the build panel scrolls."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", {
    className: "text-red-300"
  }, "Run short on power"), " and you'll be forced into emergency foreign imports (\xA3175m/GW + political damage) \u2014 survivable, but a string of them bankrupts you. A \uD83D\uDCB7 National Grid Bond can fund a rescue build-out."), /*#__PURE__*/React.createElement("li", null, "Lose if the Treasury hits zero or Rebellion hits 100%."))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setStep("scenario");
    },
    className: "px-4 py-3 rounded-lg border border-slate-600 text-slate-300 hover:text-slate-100 text-sm transition"
  }, "\u2190 Scenarios"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return dispatch({
        type: "begin"
      });
    },
    className: "flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-500 active:bg-green-500 text-slate-900 font-bold transition"
  }, "\u26A1 TAKE THE CHAIR")));
}

/* ------------------------------ drag ghost ------------------------------ */
function DragGhost(_ref26) {
  var ghostRef = _ref26.ghostRef,
    dragUI = _ref26.dragUI;
  if (!dragUI) return null;
  var cat = dragUI.item.cat;
  var def = paletteDef(dragUI.item);
  var t = dragUI.target;
  var targetLine = cat === "link" ? "drop on a transmission line…" : "drop on a region…";
  if (t) {
    if (t.type === "node") {
      var nd = NODE_DEFS[t.id];
      if (cat === "draw") {
        targetLine = "\u2192 anchor at ".concat(nd["short"], ", then click a destination");
      } else {
        var mult = def.kind === "battery" ? 1 : nd.yields[def.kind] || 1;
        targetLine = "\u2192 ".concat(nd["short"], ": ").concat(r1(def.gw * mult), " GW");
      }
    } else {
      targetLine = "\u2192 ".concat(LINK_DEFS[t.id].name, ": +").concat(def.addGW, " GW");
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: ghostRef,
    className: "fixed z-50 pointer-events-none px-2.5 py-1.5 rounded-lg bg-slate-900/95 border border-cyan-400 shadow-2xl",
    style: {
      left: -200,
      top: -200
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[12px] font-bold text-slate-100"
  }, def.icon, " ", def.name), /*#__PURE__*/React.createElement("div", {
    className: "font-term text-[10px] ".concat(t ? "text-cyan-300" : "text-slate-500")
  }, targetLine));
}

/* ------------------------------ root app -------------------------------- */
function App() {
  var _useState7 = useState(initialState),
    _useState8 = _slicedToArray(_useState7, 2),
    state = _useState8[0],
    setState = _useState8[1];
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    selected = _useState0[0],
    setSelected = _useState0[1];
  var _useState1 = useState("national"),
    _useState10 = _slicedToArray(_useState1, 2),
    tab = _useState10[0],
    setTab = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    muted = _useState12[0],
    setMuted = _useState12[1];
  var _useState13 = useState([]),
    _useState14 = _slicedToArray(_useState13, 2),
    toasts = _useState14[0],
    setToasts = _useState14[1];
  var _useState15 = useState(false),
    _useState16 = _slicedToArray(_useState15, 2),
    shaking = _useState16[0],
    setShaking = _useState16[1];
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    dragUI = _useState18[0],
    setDragUI = _useState18[1];
  var _useState19 = useState(null),
    _useState20 = _slicedToArray(_useState19, 2),
    drawMode = _useState20[0],
    setDrawMode = _useState20[1];
  var _useState21 = useState("map"),
    _useState22 = _slicedToArray(_useState21, 2),
    mobilePane = _useState22[0],
    setMobilePane = _useState22[1]; // map | build | national (small screens only)

  var stateRef = useRef(state);
  useEffect(function () {
    stateRef.current = state;
  }, [state]);
  var mutedRef = useRef(muted);
  useEffect(function () {
    mutedRef.current = muted;
  }, [muted]);
  var svgRef = useRef(null);
  var ghostRef = useRef(null);
  var dragRef = useRef(null);
  var rubberRef = useRef(null);

  /* rubber-band line follows the pointer while drawing a corridor */
  useEffect(function () {
    if (!drawMode) return;
    var move = function move(e) {
      var p = svgPoint(e.clientX, e.clientY);
      if (p && rubberRef.current) {
        rubberRef.current.setAttribute("x2", p.x);
        rubberRef.current.setAttribute("y2", p.y);
      }
    };
    var key = function key(e) {
      if (e.key === "Escape") setDrawMode(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("keydown", key);
    return function () {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("keydown", key);
    };
  }, [drawMode ? drawMode.from : null]);
  var flows = useMemo(function () {
    return computeFlows(state, 0.9, 0.9);
  }, [state]);
  function addToast(text, tone) {
    var id = uid();
    setToasts(function (ts) {
      return [].concat(_toConsumableArray(ts.slice(-3)), [{
        id: id,
        text: text,
        tone: tone
      }]);
    });
    setTimeout(function () {
      return setToasts(function (ts) {
        return ts.filter(function (t) {
          return t.id !== id;
        });
      });
    }, 3500);
  }
  function shake() {
    setShaking(true);
    setTimeout(function () {
      return setShaking(false);
    }, 500);
  }
  var play = function play(kind) {
    return sfx(kind, mutedRef.current);
  };

  /* ---- drag & drop machinery ---- */
  function svgPoint(clientX, clientY) {
    var svg = svgRef.current;
    if (!svg) return null;
    try {
      var pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      var m = svg.getScreenCTM();
      if (!m) return null;
      return pt.matrixTransform(m.inverse());
    } catch (e) {
      return null;
    }
  }
  function distToSeg(p, a, b) {
    var dx = b.x - a.x,
      dy = b.y - a.y;
    var t = clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy), 0, 1);
    var qx = a.x + t * dx,
      qy = a.y + t * dy;
    return (p.x - qx) * (p.x - qx) + (p.y - qy) * (p.y - qy);
  }
  function hitTest(item, p) {
    if (!p) return null;
    if (item.cat === "asset" || item.cat === "draw") {
      var _best = null,
        _bd = 2600;
      for (var _i7 = 0, _arr6 = ["A", "B", "C", "D", "E"]; _i7 < _arr6.length; _i7++) {
        var id = _arr6[_i7];
        if (item.id === "offshore" && !NODE_DEFS[id].offshoreOk) continue;
        if (item.id === "tidal" && !NODE_DEFS[id].tidalOk) continue;
        var d = NODE_DEFS[id];
        var dist = (p.x - d.x) * (p.x - d.x) + (p.y - d.y) * (p.y - d.y);
        if (dist < _bd) {
          _bd = dist;
          _best = {
            type: "node",
            id: id
          };
        }
      }
      return _best;
    }
    var best = null,
      bd = 280;
    for (var _i8 = 0, _Object$keys = Object.keys(stateRef.current.links); _i8 < _Object$keys.length; _i8++) {
      var _id4 = _Object$keys[_i8];
      var L = LINK_DEFS[_id4];
      /* curved corridors: test against the two control-polygon segments */
      var segs = L.ctrl ? [[NODE_DEFS[L.from], L.ctrl], [L.ctrl, NODE_DEFS[L.to]]] : [[NODE_DEFS[L.from], NODE_DEFS[L.to]]];
      for (var _i9 = 0, _segs = segs; _i9 < _segs.length; _i9++) {
        var _segs$_i = _slicedToArray(_segs[_i9], 2),
          a = _segs$_i[0],
          b = _segs$_i[1];
        var d2 = distToSeg(p, a, b);
        if (d2 < bd) {
          bd = d2;
          best = {
            type: "link",
            id: _id4
          };
        }
      }
    }
    return best;
  }
  function startDrag(item, e) {
    var S = stateRef.current;
    if (S.phase !== "play") return;
    setDrawMode(null);
    var def = paletteDef(item);
    if (item.cat !== "draw") {
      var cost = Math.round(def.cost * (item.id === "battery" ? S.batteryDiscount : 1) * (item.cat === "asset" ? S.costMult || 1 : 1));
      if (S.treasury < cost) {
        play("error");
        addToast("\uD83D\uDCB8 Can't afford ".concat(def.name, " (").concat(fmtM(cost), ")"), "bad");
        return;
      }
    }
    e.preventDefault();
    play("pick");
    dragRef.current = {
      item: item
    };
    setDragUI({
      item: item,
      target: null
    });
    requestAnimationFrame(function () {
      if (ghostRef.current) {
        ghostRef.current.style.left = e.clientX + 14 + "px";
        ghostRef.current.style.top = e.clientY + 10 + "px";
      }
    });
  }
  useEffect(function () {
    if (!dragUI) return;
    var move = function move(e) {
      if (ghostRef.current) {
        ghostRef.current.style.left = e.clientX + 14 + "px";
        ghostRef.current.style.top = e.clientY + 10 + "px";
      }
      var t = hitTest(dragRef.current.item, svgPoint(e.clientX, e.clientY));
      setDragUI(function (d) {
        if (!d) return d;
        var same = d.target && t && d.target.type === t.type && d.target.id === t.id || !d.target && !t;
        return same ? d : _objectSpread(_objectSpread({}, d), {}, {
          target: t
        });
      });
    };
    var up = function up(e) {
      var item = dragRef.current && dragRef.current.item;
      var t = item ? hitTest(item, svgPoint(e.clientX, e.clientY)) : null;
      dragRef.current = null;
      setDragUI(null);
      if (!item) return;
      if (!t) {
        play("error");
        return;
      }
      if (item.cat === "draw") {
        play("pick");
        addToast("\u270F\uFE0F Anchored at ".concat(NODE_DEFS[t.id]["short"], " \u2014 click a destination region"), "info");
        setDrawMode({
          from: t.id
        });
      } else if (item.cat === "asset") dispatch({
        type: "build",
        nodeId: t.id,
        assetId: item.id
      });else dispatch({
        type: "upgradeLink",
        linkId: t.id,
        upgradeId: item.id
      });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return function () {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragUI ? 1 : 0]);

  /* ---- corridor drawing completion ---- */
  function completeCorridor(from, to) {
    var S = stateRef.current;
    var rec = CORRIDORS[[from, to].sort().join("")];
    if (!rec) {
      play("error");
      return;
    }
    if (rec.upgrade) {
      dispatch({
        type: "upgradeLink",
        linkId: rec.upgrade,
        upgradeId: "hvdc"
      });
      return;
    }
    if (S.links[rec.linkId] || S.linkQueue.some(function (q) {
      return q.linkId === rec.linkId;
    })) {
      play("error");
      addToast("That corridor already exists — drop 🧵 on it to upgrade", "bad");
      return;
    }
    if (S.treasury < rec.cost) {
      play("error");
      addToast("\uD83D\uDCB8 ".concat(rec.label, " costs ").concat(fmtM(rec.cost)), "bad");
      return;
    }
    play("cable");
    addToast("\u270F\uFE0F ".concat(rec.label, ": ").concat(rec.gw, " GW in ").concat(rec.delay, " yr").concat(rec.delay > 1 ? "s" : ""), "good");
    var next = _objectSpread(_objectSpread({}, S), {}, {
      treasury: S.treasury - rec.cost,
      linkQueue: [].concat(_toConsumableArray(S.linkQueue), [{
        uid: uid(),
        linkId: rec.linkId,
        addGW: rec.gw,
        turnsLeft: rec.delay,
        newLink: true,
        label: "".concat(rec.label, " ").concat(rec.gw, " GW")
      }]),
      stats: _objectSpread(_objectSpread({}, S.stats), {}, {
        corridors: S.stats.corridors + 1
      }),
      log: [].concat(_toConsumableArray(S.log), [{
        year: S.year,
        tone: "info",
        text: "NEW CORRIDOR: ".concat(rec.label, " routed for ").concat(fmtM(rec.cost), " \u2014 energises in ").concat(rec.delay, " yr").concat(rec.delay > 1 ? "s" : "", ". Cartographers notified.")
      }])
    });
    if (rec.rebellion) {
      next.rebellion = clamp(S.rebellion + rec.rebellion, 0, 100);
      next.log = [].concat(_toConsumableArray(next.log), [{
        year: S.year,
        tone: "warn",
        text: "BACKLASH: the ".concat(rec.label, " runs overhead through the fens. Rebellion +").concat(rec.rebellion, "%.")
      }]);
    }
    setState(next);
  }

  /* ---- actions (closure-based via stateRef for sound + toast hooks) ---- */
  function dispatch(action) {
    var S = stateRef.current;
    switch (action.type) {
      case "begin":
        play("advance");
        setState(_objectSpread(_objectSpread({}, S), {}, {
          phase: "play"
        }));
        break;
      case "select":
        if (drawMode) {
          if (action.sel && action.sel.type === "node" && action.sel.id !== drawMode.from) {
            completeCorridor(drawMode.from, action.sel.id);
          } else {
            play("error");
            addToast("✏️ Route cancelled", "info");
          }
          setDrawMode(null);
          break;
        }
        setSelected(action.sel);
        if (action.sel) setMobilePane("build"); // surface the context menu on phones
        break;
      case "build":
        {
          var t = ASSET_TYPES[action.assetId];
          var def = NODE_DEFS[action.nodeId];
          var cost = Math.round(t.cost * (t.id === "battery" ? S.batteryDiscount : 1) * (S.costMult || 1));
          if (S.treasury < cost) {
            play("error");
            addToast("\uD83D\uDCB8 Can't afford ".concat(t.name), "bad");
            break;
          }
          if (t.id === "offshore" && !def.offshoreOk) {
            play("error");
            addToast("🌊 Offshore wind needs a coastline", "bad");
            break;
          }
          if (t.id === "tidal" && !def.tidalOk) {
            play("error");
            addToast("🌙 Tidal lagoons need an estuary or strong tidal coast", "bad");
            break;
          }
          var yieldMult = t.kind === "battery" ? 1 : def.yields[t.kind];
          var effGW = r1(t.gw * yieldMult);
          var delay = S.policies.queueReform ? ECON.queueDelayReformed : ECON.queueDelayDefault;
          play("build");
          addToast("".concat(t.icon, " ").concat(t.name, " ").concat(effGW, " GW \u2192 ").concat(def["short"], " (").concat(delay, " yr)"), "good");
          setState(_objectSpread(_objectSpread({}, S), {}, {
            treasury: S.treasury - cost,
            nimby: _objectSpread(_objectSpread({}, S.nimby), {}, _defineProperty({}, action.nodeId, clamp(S.nimby[action.nodeId] + t.nimby * def.nimbyFactor, 0, 100))),
            stats: _objectSpread(_objectSpread({}, S.stats), {}, {
              built: S.stats.built + 1
            }),
            queue: [].concat(_toConsumableArray(S.queue), [{
              uid: uid(),
              type: t.id,
              nodeId: action.nodeId,
              gw: effGW,
              turnsLeft: delay,
              label: "".concat(t.name, " ").concat(effGW, " GW")
            }]),
            log: [].concat(_toConsumableArray(S.log), [{
              year: S.year,
              tone: "info",
              text: "PROCUREMENT: ".concat(t.name, " (").concat(effGW, " GW) ordered at ").concat(def["short"], " for ").concat(fmtM(cost), ". Gate 1 entry \u2014 connects in ").concat(delay, " yr").concat(delay > 1 ? "s" : "", ".")
            }])
          }));
          break;
        }
      case "upgradeLink":
        {
          var u = LINK_UPGRADES[action.upgradeId];
          if (S.treasury < u.cost) {
            play("error");
            addToast("\uD83D\uDCB8 Can't afford ".concat(u.name), "bad");
            break;
          }
          var _def = LINK_DEFS[action.linkId];
          play("cable");
          addToast("".concat(u.icon, " +").concat(u.addGW, " GW on ").concat(_def.name, " (").concat(u.delay, " yr)"), "good");
          var next = _objectSpread(_objectSpread({}, S), {}, {
            treasury: S.treasury - u.cost,
            linkQueue: [].concat(_toConsumableArray(S.linkQueue), [{
              uid: uid(),
              linkId: action.linkId,
              addGW: u.addGW,
              turnsLeft: u.delay,
              label: "".concat(u.name, " +").concat(u.addGW, " GW")
            }]),
            stats: _objectSpread(_objectSpread({}, S.stats), {}, {
              pylons: S.stats.pylons + (u.id === "pylon" ? 1 : 0),
              hvdc: S.stats.hvdc + (u.id === "hvdc" ? 1 : 0)
            }),
            log: [].concat(_toConsumableArray(S.log), [{
              year: S.year,
              tone: u.id === "pylon" ? "warn" : "info",
              text: "TRANSMISSION: ".concat(u.name, " ordered on ").concat(_def.name, " (+").concat(u.addGW, " GW, ").concat(u.delay, " yr) for ").concat(fmtM(u.cost), ".")
            }])
          });
          if (u.rebellion > 0) {
            next.rebellion = clamp(S.rebellion + u.rebellion, 0, 100);
            next.nimby = _objectSpread(_objectSpread({}, S.nimby), {}, _defineProperty(_defineProperty({}, _def.from, clamp(S.nimby[_def.from] + 10, 0, 100)), _def.to, clamp(S.nimby[_def.to] + 10, 0, 100)));
            next.log = [].concat(_toConsumableArray(next.log), [{
              year: S.year,
              tone: "warn",
              text: "BACKLASH: pylon march announced along the ".concat(_def.name, " corridor. Rebellion +").concat(u.rebellion, "%.")
            }]);
          }
          setState(next);
          break;
        }
      case "innovate":
        {
          var _def2 = INNOVATIONS.find(function (i) {
            return i.id === action.id;
          });
          var cur = S.innovations[_def2.id];
          if (!cur || cur.status !== "idle") break;
          if (S.treasury < _def2.cost || S.pc < _def2.pc) {
            play("error");
            addToast("💸 The Skunkworks needs funding AND favours", "bad");
            break;
          }
          play("lab");
          var _next = _objectSpread(_objectSpread({}, S), {}, {
            treasury: S.treasury - _def2.cost,
            pc: clamp(S.pc - _def2.pc, 0, 100),
            innovations: _objectSpread({}, S.innovations),
            stats: _objectSpread(_objectSpread({}, S.stats), {}, {
              innovations: S.stats.innovations + 1
            }),
            log: [].concat(_toConsumableArray(S.log), [{
              year: S.year,
              tone: "warn",
              text: "SKUNKWORKS: \"".concat(_def2.name, "\" greenlit for ").concat(fmtM(_def2.cost)).concat(_def2.pc ? " and ".concat(_def2.pc, " PC") : "", ". ").concat(_def2.years === 0 ? "Effective immediately." : "Results in ".concat(_def2.years, " yr \u2014 ").concat(Math.round(_def2.odds * 100), "% odds."))
            }])
          });
          if (_def2.onLaunch) _def2.onLaunch(_next);
          if (_def2.years === 0) {
            _next.assets = _next.assets.slice();
            _next.nimby = _objectSpread({}, _next.nimby);
            _next.stats = _objectSpread({}, _next.stats);
            if (Math.random() < _def2.odds) {
              _next.innovations[_def2.id] = {
                status: "done",
                turnsLeft: 0
              };
              _def2.apply(_next);
              _next.log = [].concat(_toConsumableArray(_next.log), [{
                year: S.year,
                tone: "good",
                text: _def2.winLog
              }]);
              addToast("".concat(_def2.icon, " ").concat(_def2.name, ": DEPLOYED"), "good");
            } else {
              _next.innovations[_def2.id] = {
                status: "failed",
                turnsLeft: 0
              };
              if (_def2.failApply) _def2.failApply(_next);
              _next.log = [].concat(_toConsumableArray(_next.log), [{
                year: S.year,
                tone: "bad",
                text: _def2.failLog
              }]);
              addToast("".concat(_def2.icon, " ").concat(_def2.name, ": FAILED"), "bad");
            }
          } else {
            _next.innovations[_def2.id] = {
              status: "building",
              turnsLeft: _def2.years
            };
            addToast("".concat(_def2.icon, " ").concat(_def2.name, ": under construction"), "good");
          }
          setState(_next);
          break;
        }
      case "policy":
        {
          var P = POLICIES.find(function (p) {
            return p.id === action.id;
          });
          if (!P || S.policies[P.id] || S.pc < P.pc || S.treasury < P.cost) {
            play("error");
            break;
          }
          var _next2 = _objectSpread(_objectSpread({}, S), {}, {
            pc: clamp(S.pc - P.pc, 0, 100),
            treasury: S.treasury - P.cost,
            policies: _objectSpread(_objectSpread({}, S.policies), {}, _defineProperty({}, P.id, true))
          });
          var logText = "";
          switch (P.id) {
            case "queueReform":
              _next2.rebellion = clamp(S.rebellion + 12, 0, 100);
              _next2.queue = S.queue.map(function (q) {
                return _objectSpread(_objectSpread({}, q), {}, {
                  turnsLeft: Math.min(q.turnsLeft, ECON.queueDelayReformed)
                });
              });
              logText = "GATED QUEUE REFORM ENACTED: zombie projects culled, connections now 1 year. Industry lawyers issue 47 furious press releases.";
              break;
            case "carbonLevy":
              _next2.rebellion = clamp(S.rebellion + 6, 0, 100);
              logText = "CARBON LEVY INTRODUCED: +£300m/yr, wholesale +1.2p, gas fleet begins early retirement.";
              break;
            case "smartTariffs":
              _next2.demandExtra = S.demandExtra - 2;
              logText = "SMART TARIFFS LIVE: the nation's car batteries now haggle with the grid at 2am. Demand −2 GW, forever.";
              break;
            case "communityFund":
              _next2.nimbyDecayMult = 2;
              logText = "COMMUNITY WEALTH FUND: anyone who can see a turbine gets cheap bills. Objections mysteriously soften — NIMBY decays twice as fast.";
              break;
            case "skillsAcademy":
              _next2.costMult = 0.9;
              logText = "GREEN SKILLS ACADEMY: 40,000 new sparkies and cable-jointers. Every future asset build 10% cheaper. The unions send cake.";
              break;
            case "strategicReserve":
              _next2.gasFleet = S.gasFleet + 4;
              _next2.rebellion = clamp(S.rebellion + 6, 0, 100);
              _next2.approval = clamp(S.approval - 3, 0, 100);
              logText = "STRATEGIC GAS RESERVE: +4 GW of mothballed CCGT back on standby. Greenpeace scales the Department roof by lunchtime.";
              break;
            case "porkBarrel":
              _next2.rebellion = clamp(S.rebellion - 12, 0, 100);
              _next2.approval = clamp(S.approval + 4, 0, 100);
              _next2.nimby = {
                A: clamp(S.nimby.A - 10, 0, 100),
                B: clamp(S.nimby.B - 10, 0, 100),
                C: clamp(S.nimby.C - 10, 0, 100),
                D: clamp(S.nimby.D - 10, 0, 100),
                E: clamp(S.nimby.E - 10, 0, 100)
              };
              logText = "PORK BARREL: £350m of suspiciously well-targeted infrastructure. Rebellion −12%, NIMBY −10 everywhere. Nobody asks questions.";
              break;
            case "reshuffle":
              _next2.rebellion = clamp(S.rebellion - 25, 0, 100);
              _next2.approval = clamp(S.approval - 3, 0, 100);
              logText = "NIGHT OF THE LONG KNIVES: three ringleaders now hold ministerial briefs for Paperclips, Fog, and the Census. Rebellion −25%.";
              break;
            case "heatPumpMandate":
              _next2.demandExtra = S.demandExtra + 3;
              _next2.approval = clamp(S.approval + 4, 0, 100);
              logText = "HEAT PUMP MANDATE: 15 million homes electrified by 2031. Demand +3 GW permanently, but the green infrastructure rebate adds £150m/yr income. +4 Approval.";
              break;
            case "dsr":
              _next2.demandExtra = S.demandExtra - 3;
              logText = "DEMAND-SIDE RESPONSE: national industrial aggregation live. Peak demand −3 GW forever. Factories learn to flex. The grid says thank you.";
              break;
            default:
              break;
          }
          _next2.log = [].concat(_toConsumableArray(S.log), [{
            year: S.year,
            tone: "warn",
            text: logText
          }]);
          play("cable");
          addToast("\uD83D\uDCDC ".concat(P.name), "good");
          setState(_next2);
          break;
        }
      case "whips":
        {
          if (S.whipsUsed || S.pc < 15) {
            play("error");
            break;
          }
          play("build");
          addToast("🥃 Whips deployed: Rebellion −15%", "good");
          setState(_objectSpread(_objectSpread({}, S), {}, {
            pc: S.pc - 15,
            rebellion: clamp(S.rebellion - 15, 0, 100),
            whipsUsed: true,
            log: [].concat(_toConsumableArray(S.log), [{
              year: S.year,
              tone: "good",
              text: "WHIPS' OPERATION: late-night calls, two knighthood hints, one upgraded office. Rebellion −12%."
            }])
          }));
          break;
        }
      case "borrow":
        {
          if (S.loanUsed || S.loan) {
            play("error");
            break;
          }
          var yearsLeft = Math.max(1, ECON.totalYears - S.year + 1);
          var PRINCIPAL = 1800,
            INTEREST = 1.25;
          var perYear = Math.ceil(PRINCIPAL * INTEREST / yearsLeft);
          play("build");
          addToast("\uD83D\uDCB7 National Grid Bond: +".concat(fmtM(PRINCIPAL), " now"), "good");
          setState(_objectSpread(_objectSpread({}, S), {}, {
            treasury: S.treasury + PRINCIPAL,
            loanUsed: true,
            loan: {
              perYear: perYear,
              yearsLeft: yearsLeft
            },
            log: [].concat(_toConsumableArray(S.log), [{
              year: S.year,
              tone: "warn",
              text: "NATIONAL GRID BOND: ".concat(fmtM(PRINCIPAL), " raised on the markets. Repayments of ").concat(fmtM(perYear), "/yr for ").concat(yearsLeft, " years (").concat(fmtM(Math.round(PRINCIPAL * INTEREST)), " total). The Chancellor signs with a heavy hand.")
            }])
          }));
          break;
        }
      case "setName":
        if (typeof window !== "undefined") window.__gridlockName = action.name;
        setState(_objectSpread(_objectSpread({}, S), {}, {
          playerName: action.name
        }));
        break;
      case "advance":
        {
          if (S.phase !== "play") break;
          play("crisis");
          var card = S.deck[(S.year - 1) % S.deck.length];
          setState(_objectSpread(_objectSpread({}, S), {}, {
            phase: "crisis",
            activeCrisis: card
          }));
          break;
        }
      case "crisisChoice":
        {
          var _applyCrisisChoice = applyCrisisChoice(S, action.fx),
            afterCrisis = _applyCrisisChoice.state,
            mods = _applyCrisisChoice.mods;
          if (afterCrisis.treasury < 0) {
            play("lose");
            setState(_objectSpread(_objectSpread({}, afterCrisis), {}, {
              phase: "dead",
              activeCrisis: null,
              gameOver: {
                type: "bankrupt",
                detail: "The crisis response overdrew the Treasury (".concat(fmtM(afterCrisis.treasury), ").")
              }
            }));
            break;
          }
          if (afterCrisis.rebellion >= 100) {
            play("lose");
            setState(_objectSpread(_objectSpread({}, afterCrisis), {}, {
              phase: "dead",
              activeCrisis: null,
              gameOver: {
                type: "coup",
                detail: "The crisis decision was the final straw. The letters went in that afternoon."
              }
            }));
            break;
          }
          var _next3 = resolveYear(_objectSpread(_objectSpread({}, afterCrisis), {}, {
            activeCrisis: null
          }), mods);
          [50, 75, 100].forEach(function (m) {
            if (S.netZero < m && _next3.netZero >= m) {
              addToast("\uD83C\uDF89 MILESTONE: ".concat(m, "% NET ZERO!"), "good");
            }
          });
          if (_next3.gameOver) {
            play("lose");
            shake();
          } else if (_next3.phase === "report") {
            play("win");
          } else if (_next3.lastYear && _next3.lastYear.unserved > 0) {
            play("alarm");
            shake();
            addToast("🕯 BROWNOUTS — the lights flickered", "bad");
          } else if (_next3.netZero >= 100 || S.netZero < 75 && _next3.netZero >= 75) {
            play("win");
          } else {
            play("advance");
          }
          if (_next3.lastYear && _next3.lastYear.flows.curtailed > 0.05 && !_next3.gameOver) {
            addToast("\uD83D\uDD25 Curtailed ".concat(fmtGW(_next3.lastYear.flows.curtailed), " \u2014 fined ").concat(fmtM(_next3.lastYear.fine)), "bad");
          }
          setState(_next3);
          setSelected(null);
          break;
        }
      case "chooseScenario":
        setState(initialState(action.id));
        break;
      case "restart":
        setState(initialState());
        setSelected(null);
        setTab("national");
        break;
      default:
        break;
    }
  }
  var advisorTone = advise(state, flows).tone;
  var busy = state.phase !== "play";
  var NavBtn = function NavBtn(_ref27) {
    var id = _ref27.id,
      icon = _ref27.icon,
      label = _ref27.label,
      badge = _ref27.badge;
    return /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setMobilePane(id);
      },
      className: "relative flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg transition ".concat(mobilePane === id ? "bg-slate-700 text-slate-100" : "text-slate-400 active:bg-slate-800")
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-lg leading-none"
    }, icon), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold tracking-wide"
    }, label), badge && /*#__PURE__*/React.createElement("span", {
      className: "absolute top-1 right-3 w-2 h-2 rounded-full bg-amber-400 blink"
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "h-app w-screen flex flex-col bg-[#0f172a] text-slate-100 overflow-hidden ".concat(shaking ? "shake" : "")
  }, /*#__PURE__*/React.createElement(Header, {
    s: state,
    muted: muted,
    onToggleMute: function onToggleMute() {
      return setMuted(function (m) {
        return !m;
      });
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-h-0 flex flex-col p-2 lg:p-3 lg:pb-0 gap-2 lg:gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(mobilePane === "national" ? "hidden" : "flex-1", " min-h-0 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-3 lg:flex-1")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(mobilePane === "map" ? "flex" : "hidden", " lg:flex h-full min-h-0")
  }, /*#__PURE__*/React.createElement(MapPanel, {
    state: state,
    flows: flows,
    selected: selected,
    onSelect: function onSelect(sel) {
      return dispatch({
        type: "select",
        sel: sel
      });
    },
    svgRef: svgRef,
    dragUI: dragUI,
    onStartDrag: startDrag,
    drawMode: drawMode,
    rubberRef: rubberRef
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(mobilePane === "build" ? "flex" : "hidden", " lg:hidden h-full min-h-0 w-full")
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full w-full flex flex-col bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-3 py-2 border-b border-slate-700 shrink-0 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold tracking-widest text-slate-300"
  }, selected ? selected.type === "node" ? "NODE ".concat(selected.id, " \u2014 ").concat(NODE_DEFS[selected.id]["short"]) : LINK_DEFS[selected.id].name.toUpperCase() : "🧪 SKUNKWORKS LAB"), selected && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return dispatch({
        type: "select",
        sel: null
      });
    },
    className: "text-[10px] text-sky-400 hover:text-sky-300"
  }, "\u2190 back")), /*#__PURE__*/React.createElement("div", {
    className: "scroll-y flex-1 min-h-0 p-3 pb-24"
  }, selected && selected.type === "node" && /*#__PURE__*/React.createElement(NodeTab, {
    state: state,
    flows: flows,
    nodeId: selected.id,
    dispatch: dispatch
  }), selected && selected.type === "link" && /*#__PURE__*/React.createElement(LinkTab, {
    state: state,
    flows: flows,
    linkId: selected.id,
    dispatch: dispatch
  }), !selected && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-500 italic mb-3 px-1"
  }, "Tap a region or line on the map to build and upgrade. While you're here, launch some science."), /*#__PURE__*/React.createElement(LabTab, {
    state: state,
    dispatch: dispatch
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex h-full min-h-0"
  }, /*#__PURE__*/React.createElement(RightPanel, {
    state: state,
    flows: flows,
    selected: selected,
    tab: tab,
    setTab: setTab,
    dispatch: dispatch
  }))), /*#__PURE__*/React.createElement("div", {
    className: "".concat(mobilePane === "national" ? "flex flex-1 min-h-0" : "hidden", " lg:hidden flex-col gap-2")
  }, /*#__PURE__*/React.createElement(AdvisorBar, {
    state: state,
    flows: flows
  }), /*#__PURE__*/React.createElement("div", {
    className: "scroll-y flex-1 min-h-0 bg-[#1e293b] rounded-xl border border-slate-700"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 pb-24"
  }, /*#__PURE__*/React.createElement(DefaultTab, {
    state: state,
    flows: flows,
    dispatch: dispatch
  })))), /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex lg:flex-none flex-col"
  }, /*#__PURE__*/React.createElement(AdvisorBar, {
    state: state,
    flows: flows
  }), /*#__PURE__*/React.createElement(Console, {
    state: state,
    dispatch: dispatch
  }))), /*#__PURE__*/React.createElement("nav", {
    className: "lg:hidden shrink-0 flex items-stretch gap-1.5 px-2 py-1.5 bg-[#1e293b] border-t border-slate-700",
    style: {
      paddingBottom: "calc(0.375rem + env(safe-area-inset-bottom))"
    }
  }, /*#__PURE__*/React.createElement(NavBtn, {
    id: "map",
    icon: "\uD83D\uDDFA\uFE0F",
    label: "MAP"
  }), /*#__PURE__*/React.createElement(NavBtn, {
    id: "build",
    icon: "\uD83C\uDFD7\uFE0F",
    label: "BUILD",
    badge: !!selected
  }), /*#__PURE__*/React.createElement(NavBtn, {
    id: "national",
    icon: "\uD83D\uDCCA",
    label: "NATIONAL",
    badge: advisorTone === "bad" || advisorTone === "warn"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return dispatch({
        type: "advance"
      });
    },
    disabled: busy,
    className: "flex-[1.4] flex flex-col items-center justify-center rounded-lg bg-green-600 active:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-bold transition"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base leading-none"
  }, "\u23ED ADVANCE"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-term opacity-80"
  }, state.year >= 12 ? "FINAL AUDIT" : "FY".concat(state.year, " \u2192 ").concat(state.year + 1)))), /*#__PURE__*/React.createElement(Toasts, {
    toasts: toasts
  }), /*#__PURE__*/React.createElement(DragGhost, {
    ghostRef: ghostRef,
    dragUI: dragUI
  }), state.phase === "intro" && /*#__PURE__*/React.createElement(IntroModal, {
    state: state,
    dispatch: dispatch
  }), state.phase === "crisis" && /*#__PURE__*/React.createElement(CrisisModal, {
    state: state,
    dispatch: dispatch
  }), state.phase === "dead" && state.gameOver && /*#__PURE__*/React.createElement(GameOverModal, {
    state: state,
    dispatch: dispatch
  }), state.phase === "report" && /*#__PURE__*/React.createElement(ReportModal, {
    state: state,
    dispatch: dispatch
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));