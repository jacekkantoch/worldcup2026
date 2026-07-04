// ===== Inline script 2 from original index.html =====
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ─── Firebase init ─────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDexi8bjlzHwNyKym-Ok2pBAyb8zpaPTKo",
  authDomain: "mundial2026-35b77.firebaseapp.com",
  databaseURL: "https://mundial2026-35b77-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mundial2026-35b77",
  storageBucket: "mundial2026-35b77.firebasestorage.app",
  messagingSenderId: "980813915500",
  appId: "1:980813915500:web:e75be4f444fa6a971e3f49",
  measurementId: "G-9S0J3KFLVF"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Show "slow connection" message after 4s.
setTimeout(() => {
  const el = document.getElementById('loading-slow');
  if (el) el.style.display = 'block';
}, 4000);

// ─── React hooks ───────────────────────────────────────────────
const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} = React;

// Wspólny powrót na górę po zmianie dowolnej zakładki / podzakładki.
function scrollAppToTop() {
  const reset = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const rootEl = document.getElementById('root');
    if (rootEl) rootEl.scrollTop = 0;
  };
  reset();
  requestAnimationFrame(reset);
  setTimeout(reset, 0);
}

// ─── Ikony (SVG inline) ────────────────────────────────────────
function Ico({
  d,
  size = 16,
  className = '',
  style
}) {
  return React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: `inline-block ${className}`,
    style: style
  }, Array.isArray(d) ? d.map((path, i) => React.createElement("path", {
    key: i,
    d: path
  })) : React.createElement("path", {
    d: d
  }));
}
const ICONS = {
  ball: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M8.6 9.5 12 7l3.4 2.5-1.3 4.1H9.9L8.6 9.5z', 'M3.7 8.4l4.9 1.1', 'M15.4 9.5l4.9-1.1', 'M9.9 13.6l-2.4 5', 'M14.1 13.6l2.4 5'],
  trophy: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M8 21h8', 'M12 21v-6', 'M3 9h18', 'M12 9v6', 'M8 15h8'],
  users: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  user: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8'],
  eye: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6'],
  settings: ['M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4', 'M12 2v2', 'M12 20v2', 'M4.93 4.93l1.41 1.41', 'M17.66 17.66l1.41 1.41', 'M2 12h2', 'M20 12h2', 'M6.34 17.66l-1.41 1.41', 'M19.07 4.93l-1.41 1.41'],
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  trash: ['M3 6h18', 'M19 6l-1 14H6L5 6', 'M8 6V4h8v2'],
  edit: ['M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7', 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'],
  lock: ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  unlock: ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z', 'M7 11V7a5 5 0 0 1 9.9-1'],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
  logout: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9'],
  check: 'M20 6L9 17l-5-5',
  x: 'M18 6L6 18M6 6l12 12',
  chevdown: 'M6 9l6 6 6-6',
  chevup: 'M18 15l-6-6-6 6',
  alert: ['M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01'],
  sparkles: ['M12 3l1.09 3.26L16.5 7.5l-3.41 1.24L12 12l-1.09-3.26L7.5 7.5l3.41-1.24L12 3z', 'M5 17l.55 1.64L7.2 19.5l-1.65.86L5 22l-.55-1.64L2.8 19.5l1.65-.86L5 17z', 'M19 1l.55 1.64L21.2 3.5l-1.65.86L19 6l-.55-1.64L16.8 3.5l1.65-.86L19 1z'],
  calendar: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z'],
  mappin: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6'],
  crown: 'M2 20h20M5 20V10l7-7 7 7v10',
  medal: ['M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z', 'M8.21 13.89L7 23l5-3 5 3-1.21-9.12'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4'],
  save: ['M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z', 'M17 21v-8H7v8', 'M7 3v5h8'],
  arrow: 'M5 12h14M12 5l7 7-7 7',
  reset: 'M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15',
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35'],
  star: 'M12 2l2.9 6.4 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 21l1.6-6.8L2.2 9.6l6.9-.6L12 2z',
  podium: ['M9 21H4V11h5v10z', 'M15 21H9V3h6v18z', 'M20 21h-5V8h5v13z'],
  layers: ['M12 2L2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
  sun: ['M12 2v2', 'M12 20v2', 'M4.93 4.93l1.42 1.42', 'M17.66 17.66l1.41 1.41', 'M2 12h2', 'M20 12h2', 'M4.93 19.07l1.42-1.42', 'M17.66 6.34l1.41-1.41', 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10'],
  moon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'
};
const Icon = React.memo(function Icon({
  name,
  size = 16,
  className = '',
  style
}) {
  return React.createElement(Ico, {
    d: ICONS[name] || 'M12 12',
    size: size,
    className: className,
    style: style
  });
});
// Wypełnione (nie kreskowe) ikony kłódki — spójne z pełnymi ikonami dolnej
// nawigacji (patrz NavIcon), w przeciwieństwie do reszty ikon w Icon/Ico,
// które są rysowane jako kontury (stroke).
const LOCK_ICON_PATHS = {
  lock: 'M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z',
  unlock: 'M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z'
};
const LockIcon = React.memo(function LockIcon({
  name,
  size = 16,
  className = '',
  style
}) {
  return React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none",
    className: `inline-block ${className}`,
    style: style,
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: LOCK_ICON_PATHS[name] || LOCK_ICON_PATHS.lock,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});
const FILLED_THEME_ICONS = {
  sun: 'M11 1h2v3h-2zM11 20h2v3h-2zM1 11h3v2H1zM20 11h3v2h-3zM4.22 5.64l1.41-1.41 2.12 2.12-1.41 1.41zM16.24 17.66l1.41-1.41 2.12 2.12-1.41 1.41zM16.24 6.34l2.12-2.12 1.41 1.41-2.12 2.12zM4.22 18.36l2.12-2.12 1.41 1.41-2.12 2.12zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z',
  moon: 'M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z'
};
const FilledThemeIcon = React.memo(function FilledThemeIcon({
  name,
  size = 16,
  className = '',
  style
}) {
  return React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none",
    className: `inline-block ${className}`,
    style: style,
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: FILLED_THEME_ICONS[name] || FILLED_THEME_ICONS.sun,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});

// Czyste, wypełnione ikony dolnej nawigacji. Każdy symbol jest malowany
// jako jeden kształt, dzięki czemu linie nie nakładają się i nie jaśnieją.
const NAV_ICON_PATHS = {
  calendar: 'M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9ZM5 6a1 1 0 0 0-1 1v1h16V7a1 1 0 0 0-1-1h-1v1a1 1 0 1 1-2 0V6H8v1a1 1 0 1 1-2 0V6H5Z',
  star: 'M12 2.4a1 1 0 0 1 .91.58l2.46 5.18 5.62.72a1 1 0 0 1 .56 1.7l-4.12 3.88 1.05 5.56a1 1 0 0 1-1.47 1.06L12 18.37l-5.01 2.71a1 1 0 0 1-1.47-1.06l1.05-5.56-4.12-3.88a1 1 0 0 1 .56-1.7l5.62-.72 2.46-5.18A1 1 0 0 1 12 2.4Z',
  podium: 'M3 11h4a1 1 0 0 1 1 1v9H2v-9a1 1 0 0 1 1-1Zm7-8h4a1 1 0 0 1 1 1v17H9V4a1 1 0 0 1 1-1Zm7 5h4a1 1 0 0 1 1 1v12h-6V9a1 1 0 0 1 1-1Z',
  user: 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5Z',
  eye: 'M12 4c5.35 0 9.27 3.42 10.82 7.43a1.6 1.6 0 0 1 0 1.14C21.27 16.58 17.35 20 12 20S2.73 16.58 1.18 12.57a1.6 1.6 0 0 1 0-1.14C2.73 7.42 6.65 4 12 4Zm0 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z',
  users: 'M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.87 0-7 2.02-7 4.5V21h14v-3.5C15 15.02 11.87 13 8 13Zm9-2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 2c-.67 0-1.36.08-2.03.24C16.83 14.45 18 15.98 18 17.5V21h5v-3c0-2.76-2.69-5-6-5Z',
  bracket: 'M3 3h5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm0 12h5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Zm13-6h5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1h-3a1 1 0 0 1-1-1V7H9V5h3a1 1 0 0 1 1 1v5h2v-1a1 1 0 0 1 1-1Zm-5 4h2v5a1 1 0 0 1-1 1H9v-2h2v-4Z',
  settings: 'M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.14 7.14 0 0 0-1.62-.94l-.36-2.51A.49.49 0 0 0 13.9 2h-3.8a.49.49 0 0 0-.49.41l-.36 2.54c-.58.24-1.12.55-1.62.94l-2.39-.96a.49.49 0 0 0-.61.22L2.71 8.47a.5.5 0 0 0 .12.64l2.03 1.58c-.05.31-.08.65-.08.98s.03.66.08.98l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.13.23.4.32.61.22l2.39-.96c.5.39 1.04.71 1.62.94l.36 2.54c.04.24.24.41.49.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.58-.24 1.12-.55 1.62-.94l2.39.96c.22.08.48 0 .61-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.04-1.59ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z'
};
const NavIcon = React.memo(function NavIcon({
  name,
  size = 20,
  className = '',
  style
}) {
  const path = NAV_ICON_PATHS[name] || NAV_ICON_PATHS.star;
  return React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    className: `nav-icon ${className}`,
    style: style,
    fill: "currentColor",
    stroke: "none"
  }, React.createElement("path", {
    d: path,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});

// ═══════════════════════════════════════════════════════════════
//  STAŁE
// ═══════════════════════════════════════════════════════════════
const DEFAULT_POINTS = {
  group: {
    exact: 3,
    winner: 1
  },
  knockout: {
    exact: 5,
    winner: 2,
    penBonus: 1
  },
  groupOrderAll: 10,
  groupOrderTwo: 6,
  groupOrderOne: 3,
  champion: 20,
  runnerUp: 10,
  third: 5,
  topScorer: 15,
  mvp: 15
};
function normalizePointsSettings(value) {
  const src = value && typeof value === 'object' ? value : {};
  const number = (candidate, fallback) => {
    if (candidate === '') return 0;
    const parsed = Number(candidate);
    return Number.isFinite(parsed) ? Math.max(0, Math.min(999, Math.round(parsed))) : fallback;
  };
  return {
    group: {
      exact: number(src.group?.exact, DEFAULT_POINTS.group.exact),
      winner: number(src.group?.winner, DEFAULT_POINTS.group.winner)
    },
    knockout: {
      exact: number(src.knockout?.exact, DEFAULT_POINTS.knockout.exact),
      winner: number(src.knockout?.winner, DEFAULT_POINTS.knockout.winner),
      penBonus: number(src.knockout?.penBonus, DEFAULT_POINTS.knockout.penBonus)
    },
    groupOrderAll: number(src.groupOrderAll, DEFAULT_POINTS.groupOrderAll),
    groupOrderTwo: number(src.groupOrderTwo, DEFAULT_POINTS.groupOrderTwo),
    groupOrderOne: number(src.groupOrderOne, DEFAULT_POINTS.groupOrderOne),
    champion: number(src.champion, DEFAULT_POINTS.champion),
    runnerUp: number(src.runnerUp, DEFAULT_POINTS.runnerUp),
    third: number(src.third, DEFAULT_POINTS.third),
    topScorer: number(src.topScorer, DEFAULT_POINTS.topScorer),
    mvp: number(src.mvp, DEFAULT_POINTS.mvp)
  };
}
let POINTS = normalizePointsSettings(DEFAULT_POINTS);
const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

function InfiniteGroupFilter({ selected, onSelect, btnClass }) {
  const ref = React.useRef(null);
  const debounceRef = React.useRef(null);
  const snappingRef = React.useRef(false);
  const didInitRef = React.useRef(false);
  const currentGroupRef = React.useRef(selected);
  const [visualCenter, setVisualCenter] = React.useState(selected);
  const loopCopies = 9;
  const middleCopy = Math.floor(loopCopies / 2);
  const items = Array.from({ length: loopCopies }, () => GROUPS).flat();

  const metrics = React.useCallback(() => {
    const el = ref.current;
    if (!el) return null;
    const oneW = el.scrollWidth / loopCopies;
    const itemW = oneW / GROUPS.length;
    if (!oneW || !itemW) return null;
    return { el, oneW, itemW };
  }, []);

  const snapToIndex = React.useCallback((rawIndex, smooth) => {
    const m = metrics();
    if (!m) return;
    const { el, itemW } = m;
    const target = rawIndex * itemW - el.clientWidth / 2 + itemW / 2;
    if (smooth) {
      snappingRef.current = true;
      el.style.scrollBehavior = 'smooth';
      el.scrollLeft = target;
      setTimeout(() => {
        el.style.scrollBehavior = 'auto';
        snappingRef.current = false;
      }, 360);
    } else {
      el.scrollLeft = target;
    }
  }, [metrics]);

  const centerGroup = React.useCallback((group, smooth = false) => {
    const idx = GROUPS.indexOf(group);
    if (idx < 0) return;
    setVisualCenter(group);
    snapToIndex(middleCopy * GROUPS.length + idx, smooth);
  }, [snapToIndex]);

  const selectGroup = React.useCallback((group, smooth = true) => {
    centerGroup(group, smooth);
    onSelect(group);
  }, [centerGroup, onSelect]);

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => {
      centerGroup(selected, false);
      didInitRef.current = true;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  React.useEffect(() => {
    currentGroupRef.current = visualCenter;
  }, [visualCenter]);

  React.useEffect(() => {
    if (!didInitRef.current) return;
    if (selected !== currentGroupRef.current) centerGroup(selected, false);
  }, [centerGroup, selected]);

  React.useEffect(() => {
    const m = metrics();
    if (!m) return undefined;
    let resizeFrame = null;
    const recenter = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => centerGroup(currentGroupRef.current || selected, false));
    };
    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(entries => {
        if (entries && entries.length) recenter();
      });
      ro.observe(m.el);
    }
    window.addEventListener('resize', recenter);
    return () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', recenter);
      clearTimeout(debounceRef.current);
    };
  }, [centerGroup, metrics, selected]);

  const onScroll = React.useCallback(() => {
    const m = metrics();
    if (!m) return;
    const { el, oneW, itemW } = m;
    if (el.scrollLeft < oneW * 2.15) {
      el.scrollLeft += oneW * 4;
      return;
    }
    if (el.scrollLeft > oneW * (loopCopies - 2.15)) {
      el.scrollLeft -= oneW * 4;
      return;
    }
    const centerXLive = el.scrollLeft + el.clientWidth / 2;
    const rawIndexLive = Math.round(centerXLive / itemW - 0.5);
    const groupIndexLive = ((rawIndexLive % GROUPS.length) + GROUPS.length) % GROUPS.length;
    setVisualCenter(GROUPS[groupIndexLive]);
    if (snappingRef.current) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (snappingRef.current) return;
      const centerX = el.scrollLeft + el.clientWidth / 2;
      const rawIndex = Math.round(centerX / itemW - 0.5);
      const groupIndex = ((rawIndex % GROUPS.length) + GROUPS.length) % GROUPS.length;
      const group = GROUPS[groupIndex];
      currentGroupRef.current = group;
      setVisualCenter(group);
      onSelect(group);
    }, 220);
  }, [metrics, onSelect, snapToIndex]);

  const onKeyDown = React.useCallback(e => {
    const current = GROUPS.indexOf(visualCenter);
    if (current < 0) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      selectGroup(GROUPS[(current + 1) % GROUPS.length]);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      selectGroup(GROUPS[(current - 1 + GROUPS.length) % GROUPS.length]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      selectGroup(GROUPS[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      selectGroup(GROUPS[GROUPS.length - 1]);
    }
  }, [selectGroup, visualCenter]);

  return React.createElement('div', {
    style: { display: 'flex', justifyContent: 'center', width: '100%' }
  }, React.createElement('div', {
    ref,
    onScroll,
    onKeyDown,
    role: 'tablist',
    'aria-label': 'Filtr grup',
    className: 'infinite-group-scroll',
    style: {
      display: 'flex', gap: '4px', overflowX: 'auto', scrollBehavior: 'auto',
      overscrollBehavior: 'none', scrollSnapType: 'none', scrollPaddingInline: '50%',
      maxWidth: '480px', width: '100%',
      maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
    }
  }, items.map((g, i) =>
    React.createElement('button', {
      key: i,
      type: 'button',
      role: 'tab',
      'aria-selected': visualCenter === g,
      'aria-pressed': visualCenter === g,
      'aria-label': `Grupa ${g}`,
      onClick: () => selectGroup(g),
      className: `${btnClass}${visualCenter === g ? ' is-selected' : ''}`,
      style: { scrollSnapAlign: 'center', scrollSnapStop: 'always' }
    }, g)
  )));
}

const PHASE_LABELS = {
  group: 'Faza grupowa',
  r32: '1/16 finału',
  r16: '1/8 finału',
  qf: 'Ćwierćfinał',
  sf: 'Półfinał',
  third: 'Mecz o 3. miejsce',
  final: 'Finał'
};
const PHASE_FILTER_TABS = [{
  k: 'all',
  l: 'Wszystkie'
}, {
  k: 'group',
  l: 'Grupowa'
}, {
  k: 'r32',
  l: '1/16'
}, {
  k: 'r16',
  l: '1/8'
}, {
  k: 'qf',
  l: '1/4'
}, {
  k: 'sf',
  l: '1/2'
}, {
  k: 'third',
  l: '3. miejsce'
}, {
  k: 'final',
  l: 'Finał'
}];
const PHASE_BADGE_LABELS = {
  r32: '1/16',
  r16: '1/8',
  qf: '1/4',
  sf: '1/2',
  third: 'Mecz o 3. miejsce',
  final: 'Finał'
};
function phaseBadgeLabel(match) {
  if (!match) return '';
  return match.phase === 'group' ? `Gr ${match.group}` : PHASE_BADGE_LABELS[match.phase] || PHASE_LABELS[match.phase] || match.phase;
}
const PHASE_ORDER = ['group', 'r32', 'r16', 'qf', 'sf', 'third', 'final'];
const PHASE_RANK = Object.fromEntries(PHASE_ORDER.map((phase, index) => [phase, index]));
function getLatestResultPhase(matches, results) {
  let latest = 'all';
  let latestRank = -1;
  for (const match of matches || []) {
    if (!results?.[match.id]) continue;
    const rank = PHASE_RANK[match.phase] ?? -1;
    if (rank > latestRank) {
      latest = match.phase;
      latestRank = rank;
    }
  }
  return latest;
}
// HOST_CITIES replaced by real match data
const STAR_PLAYERS = ['Kylian Mbappé', 'Erling Haaland', 'Harry Kane', 'Vinícius Júnior', 'Jude Bellingham', 'Lamine Yamal', 'Lionel Messi', 'Cristiano Ronaldo', 'Robert Lewandowski', 'Phil Foden', 'Bukayo Saka', 'Florian Wirtz', 'Pedri', 'Rodri', 'Mohammed Kudus', 'Julián Álvarez', 'Lautaro Martínez', 'Rafael Leão', 'Bruno Fernandes', 'Federico Valverde', 'Antoine Griezmann', 'Ousmane Dembélé', 'Bernardo Silva', 'Victor Osimhen', 'Mohamed Salah', 'Son Heung-min', 'Takefusa Kubo'];
const FB = {
  players: 'mundial2026/players',
  teams: 'mundial2026/teams',
  matches: 'mundial2026/matches',
  predictions: 'mundial2026/predictions',
  results: 'mundial2026/results',
  specialPredictions: 'mundial2026/specialPredictions',
  specialResults: 'mundial2026/specialResults',
  adminPassword: 'mundial2026/adminPassword',
  phaseLocks: 'mundial2026/phaseLocks',
  scoringSettings: 'mundial2026/scoringSettings'
};
function generateInitialTeams() {
  return {
    'A1': {
      id: 'A1',
      name: 'Meksyk',
      group: 'A',
      flag: 'mx'
    },
    'A2': {
      id: 'A2',
      name: 'RPA',
      group: 'A',
      flag: 'za'
    },
    'A3': {
      id: 'A3',
      name: 'Korea Południowa',
      group: 'A',
      flag: 'kr'
    },
    'A4': {
      id: 'A4',
      name: 'Czechy',
      group: 'A',
      flag: 'cz'
    },
    'B1': {
      id: 'B1',
      name: 'Kanada',
      group: 'B',
      flag: 'ca'
    },
    'B2': {
      id: 'B2',
      name: 'Bośnia i Hercegowina',
      group: 'B',
      flag: 'ba'
    },
    'B3': {
      id: 'B3',
      name: 'Katar',
      group: 'B',
      flag: 'qa'
    },
    'B4': {
      id: 'B4',
      name: 'Szwajcaria',
      group: 'B',
      flag: 'ch'
    },
    'C1': {
      id: 'C1',
      name: 'Brazylia',
      group: 'C',
      flag: 'br'
    },
    'C2': {
      id: 'C2',
      name: 'Maroko',
      group: 'C',
      flag: 'ma'
    },
    'C3': {
      id: 'C3',
      name: 'Haiti',
      group: 'C',
      flag: 'ht'
    },
    'C4': {
      id: 'C4',
      name: 'Szkocja',
      group: 'C',
      flag: 'gb-sct'
    },
    'D1': {
      id: 'D1',
      name: 'USA',
      group: 'D',
      flag: 'us'
    },
    'D2': {
      id: 'D2',
      name: 'Paragwaj',
      group: 'D',
      flag: 'py'
    },
    'D3': {
      id: 'D3',
      name: 'Australia',
      group: 'D',
      flag: 'au'
    },
    'D4': {
      id: 'D4',
      name: 'Turcja',
      group: 'D',
      flag: 'tr'
    },
    'E1': {
      id: 'E1',
      name: 'Niemcy',
      group: 'E',
      flag: 'de'
    },
    'E2': {
      id: 'E2',
      name: 'Curaçao',
      group: 'E',
      flag: 'cw'
    },
    'E3': {
      id: 'E3',
      name: 'Wybrz. Kości Słoniowej',
      group: 'E',
      flag: 'ci'
    },
    'E4': {
      id: 'E4',
      name: 'Ekwador',
      group: 'E',
      flag: 'ec'
    },
    'F1': {
      id: 'F1',
      name: 'Holandia',
      group: 'F',
      flag: 'nl'
    },
    'F2': {
      id: 'F2',
      name: 'Japonia',
      group: 'F',
      flag: 'jp'
    },
    'F3': {
      id: 'F3',
      name: 'Szwecja',
      group: 'F',
      flag: 'se'
    },
    'F4': {
      id: 'F4',
      name: 'Tunezja',
      group: 'F',
      flag: 'tn'
    },
    'G1': {
      id: 'G1',
      name: 'Belgia',
      group: 'G',
      flag: 'be'
    },
    'G2': {
      id: 'G2',
      name: 'Egipt',
      group: 'G',
      flag: 'eg'
    },
    'G3': {
      id: 'G3',
      name: 'Iran',
      group: 'G',
      flag: 'ir'
    },
    'G4': {
      id: 'G4',
      name: 'Nowa Zelandia',
      group: 'G',
      flag: 'nz'
    },
    'H1': {
      id: 'H1',
      name: 'Hiszpania',
      group: 'H',
      flag: 'es'
    },
    'H2': {
      id: 'H2',
      name: 'Rep. Ziel. Przylądka',
      group: 'H',
      flag: 'cv'
    },
    'H3': {
      id: 'H3',
      name: 'Arabia Saudyjska',
      group: 'H',
      flag: 'sa'
    },
    'H4': {
      id: 'H4',
      name: 'Urugwaj',
      group: 'H',
      flag: 'uy'
    },
    'I1': {
      id: 'I1',
      name: 'Francja',
      group: 'I',
      flag: 'fr'
    },
    'I2': {
      id: 'I2',
      name: 'Senegal',
      group: 'I',
      flag: 'sn'
    },
    'I3': {
      id: 'I3',
      name: 'Irak',
      group: 'I',
      flag: 'iq'
    },
    'I4': {
      id: 'I4',
      name: 'Norwegia',
      group: 'I',
      flag: 'no'
    },
    'J1': {
      id: 'J1',
      name: 'Argentyna',
      group: 'J',
      flag: 'ar'
    },
    'J2': {
      id: 'J2',
      name: 'Algieria',
      group: 'J',
      flag: 'dz'
    },
    'J3': {
      id: 'J3',
      name: 'Austria',
      group: 'J',
      flag: 'at'
    },
    'J4': {
      id: 'J4',
      name: 'Jordania',
      group: 'J',
      flag: 'jo'
    },
    'K1': {
      id: 'K1',
      name: 'Portugalia',
      group: 'K',
      flag: 'pt'
    },
    'K2': {
      id: 'K2',
      name: 'DR Konga',
      group: 'K',
      flag: 'cd'
    },
    'K3': {
      id: 'K3',
      name: 'Uzbekistan',
      group: 'K',
      flag: 'uz'
    },
    'K4': {
      id: 'K4',
      name: 'Kolumbia',
      group: 'K',
      flag: 'co'
    },
    'L1': {
      id: 'L1',
      name: 'Anglia',
      group: 'L',
      flag: 'gb-eng'
    },
    'L2': {
      id: 'L2',
      name: 'Chorwacja',
      group: 'L',
      flag: 'hr'
    },
    'L3': {
      id: 'L3',
      name: 'Ghana',
      group: 'L',
      flag: 'gh'
    },
    'L4': {
      id: 'L4',
      name: 'Panama',
      group: 'L',
      flag: 'pa'
    }
  };
}
function generateInitialMatches() {
  const matches = [];
  matches.push({
    id: 'M1',
    num: 1,
    phase: 'group',
    group: 'A',
    homeTeamId: 'A1',
    awayTeamId: 'A2',
    date: '2026-06-11T19:00:00Z',
    city: 'Mexico City (Meksyk)'
  });
  matches.push({
    id: 'M2',
    num: 2,
    phase: 'group',
    group: 'A',
    homeTeamId: 'A3',
    awayTeamId: 'A4',
    date: '2026-06-12T02:00:00Z',
    city: 'Guadalajara (Meksyk)'
  });
  matches.push({
    id: 'M3',
    num: 3,
    phase: 'group',
    group: 'B',
    homeTeamId: 'B1',
    awayTeamId: 'B2',
    date: '2026-06-12T19:00:00Z',
    city: 'Toronto (Kanada)'
  });
  matches.push({
    id: 'M4',
    num: 4,
    phase: 'group',
    group: 'D',
    homeTeamId: 'D1',
    awayTeamId: 'D2',
    date: '2026-06-13T01:00:00Z',
    city: 'Los Angeles (USA)'
  });
  matches.push({
    id: 'M5',
    num: 5,
    phase: 'group',
    group: 'B',
    homeTeamId: 'B3',
    awayTeamId: 'B4',
    date: '2026-06-13T19:00:00Z',
    city: 'San Francisco (USA)'
  });
  matches.push({
    id: 'M6',
    num: 6,
    phase: 'group',
    group: 'C',
    homeTeamId: 'C1',
    awayTeamId: 'C2',
    date: '2026-06-13T22:00:00Z',
    city: 'New York/NJ (USA)'
  });
  matches.push({
    id: 'M7',
    num: 7,
    phase: 'group',
    group: 'C',
    homeTeamId: 'C3',
    awayTeamId: 'C4',
    date: '2026-06-14T01:00:00Z',
    city: 'Boston (USA)'
  });
  matches.push({
    id: 'M8',
    num: 8,
    phase: 'group',
    group: 'D',
    homeTeamId: 'D3',
    awayTeamId: 'D4',
    date: '2026-06-14T04:00:00Z',
    city: 'Vancouver (Kanada)'
  });
  matches.push({
    id: 'M9',
    num: 9,
    phase: 'group',
    group: 'E',
    homeTeamId: 'E1',
    awayTeamId: 'E2',
    date: '2026-06-14T17:00:00Z',
    city: 'Houston (USA)'
  });
  matches.push({
    id: 'M10',
    num: 10,
    phase: 'group',
    group: 'F',
    homeTeamId: 'F1',
    awayTeamId: 'F2',
    date: '2026-06-14T20:00:00Z',
    city: 'Dallas (USA)'
  });
  matches.push({
    id: 'M11',
    num: 11,
    phase: 'group',
    group: 'E',
    homeTeamId: 'E3',
    awayTeamId: 'E4',
    date: '2026-06-14T23:00:00Z',
    city: 'Filadelfia (USA)'
  });
  matches.push({
    id: 'M12',
    num: 12,
    phase: 'group',
    group: 'F',
    homeTeamId: 'F3',
    awayTeamId: 'F4',
    date: '2026-06-15T02:00:00Z',
    city: 'Monterrey (Meksyk)'
  });
  matches.push({
    id: 'M13',
    num: 13,
    phase: 'group',
    group: 'H',
    homeTeamId: 'H1',
    awayTeamId: 'H2',
    date: '2026-06-15T16:00:00Z',
    city: 'Atlanta (USA)'
  });
  matches.push({
    id: 'M14',
    num: 14,
    phase: 'group',
    group: 'G',
    homeTeamId: 'G1',
    awayTeamId: 'G2',
    date: '2026-06-15T19:00:00Z',
    city: 'Seattle (USA)'
  });
  matches.push({
    id: 'M15',
    num: 15,
    phase: 'group',
    group: 'H',
    homeTeamId: 'H3',
    awayTeamId: 'H4',
    date: '2026-06-15T22:00:00Z',
    city: 'Miami (USA)'
  });
  matches.push({
    id: 'M16',
    num: 16,
    phase: 'group',
    group: 'G',
    homeTeamId: 'G3',
    awayTeamId: 'G4',
    date: '2026-06-16T01:00:00Z',
    city: 'Los Angeles (USA)'
  });
  matches.push({
    id: 'M17',
    num: 17,
    phase: 'group',
    group: 'I',
    homeTeamId: 'I1',
    awayTeamId: 'I2',
    date: '2026-06-16T19:00:00Z',
    city: 'New York/NJ (USA)'
  });
  matches.push({
    id: 'M18',
    num: 18,
    phase: 'group',
    group: 'I',
    homeTeamId: 'I3',
    awayTeamId: 'I4',
    date: '2026-06-16T22:00:00Z',
    city: 'Boston (USA)'
  });
  matches.push({
    id: 'M19',
    num: 19,
    phase: 'group',
    group: 'J',
    homeTeamId: 'J1',
    awayTeamId: 'J2',
    date: '2026-06-17T01:00:00Z',
    city: 'Kansas City (USA)'
  });
  matches.push({
    id: 'M20',
    num: 20,
    phase: 'group',
    group: 'J',
    homeTeamId: 'J3',
    awayTeamId: 'J4',
    date: '2026-06-17T04:00:00Z',
    city: 'San Francisco (USA)'
  });
  matches.push({
    id: 'M21',
    num: 21,
    phase: 'group',
    group: 'K',
    homeTeamId: 'K1',
    awayTeamId: 'K2',
    date: '2026-06-17T17:00:00Z',
    city: 'Houston (USA)'
  });
  matches.push({
    id: 'M22',
    num: 22,
    phase: 'group',
    group: 'L',
    homeTeamId: 'L1',
    awayTeamId: 'L2',
    date: '2026-06-17T20:00:00Z',
    city: 'Dallas (USA)'
  });
  matches.push({
    id: 'M23',
    num: 23,
    phase: 'group',
    group: 'L',
    homeTeamId: 'L3',
    awayTeamId: 'L4',
    date: '2026-06-17T23:00:00Z',
    city: 'Toronto (Kanada)'
  });
  matches.push({
    id: 'M24',
    num: 24,
    phase: 'group',
    group: 'K',
    homeTeamId: 'K3',
    awayTeamId: 'K4',
    date: '2026-06-18T02:00:00Z',
    city: 'Mexico City (Meksyk)'
  });
  matches.push({
    id: 'M25',
    num: 25,
    phase: 'group',
    group: 'A',
    homeTeamId: 'A4',
    awayTeamId: 'A2',
    date: '2026-06-18T16:00:00Z',
    city: 'Atlanta (USA)'
  });
  matches.push({
    id: 'M26',
    num: 26,
    phase: 'group',
    group: 'B',
    homeTeamId: 'B4',
    awayTeamId: 'B2',
    date: '2026-06-18T19:00:00Z',
    city: 'Los Angeles (USA)'
  });
  matches.push({
    id: 'M27',
    num: 27,
    phase: 'group',
    group: 'B',
    homeTeamId: 'B1',
    awayTeamId: 'B3',
    date: '2026-06-18T22:00:00Z',
    city: 'Vancouver (Kanada)'
  });
  matches.push({
    id: 'M28',
    num: 28,
    phase: 'group',
    group: 'A',
    homeTeamId: 'A1',
    awayTeamId: 'A3',
    date: '2026-06-19T01:00:00Z',
    city: 'Guadalajara (Meksyk)'
  });
  matches.push({
    id: 'M29',
    num: 29,
    phase: 'group',
    group: 'D',
    homeTeamId: 'D1',
    awayTeamId: 'D3',
    date: '2026-06-19T19:00:00Z',
    city: 'Seattle (USA)'
  });
  matches.push({
    id: 'M30',
    num: 30,
    phase: 'group',
    group: 'C',
    homeTeamId: 'C4',
    awayTeamId: 'C2',
    date: '2026-06-19T22:00:00Z',
    city: 'Boston (USA)'
  });
  matches.push({
    id: 'M31',
    num: 31,
    phase: 'group',
    group: 'C',
    homeTeamId: 'C1',
    awayTeamId: 'C3',
    date: '2026-06-20T00:30:00Z',
    city: 'Filadelfia (USA)'
  });
  matches.push({
    id: 'M32',
    num: 32,
    phase: 'group',
    group: 'D',
    homeTeamId: 'D4',
    awayTeamId: 'D2',
    date: '2026-06-20T03:00:00Z',
    city: 'San Francisco (USA)'
  });
  matches.push({
    id: 'M33',
    num: 33,
    phase: 'group',
    group: 'F',
    homeTeamId: 'F1',
    awayTeamId: 'F3',
    date: '2026-06-20T17:00:00Z',
    city: 'Houston (USA)'
  });
  matches.push({
    id: 'M34',
    num: 34,
    phase: 'group',
    group: 'E',
    homeTeamId: 'E1',
    awayTeamId: 'E3',
    date: '2026-06-20T20:00:00Z',
    city: 'Toronto (Kanada)'
  });
  matches.push({
    id: 'M35',
    num: 35,
    phase: 'group',
    group: 'E',
    homeTeamId: 'E4',
    awayTeamId: 'E2',
    date: '2026-06-21T00:00:00Z',
    city: 'Kansas City (USA)'
  });
  matches.push({
    id: 'M36',
    num: 36,
    phase: 'group',
    group: 'F',
    homeTeamId: 'F4',
    awayTeamId: 'F2',
    date: '2026-06-21T04:00:00Z',
    city: 'Monterrey (Meksyk)'
  });
  matches.push({
    id: 'M37',
    num: 37,
    phase: 'group',
    group: 'H',
    homeTeamId: 'H1',
    awayTeamId: 'H3',
    date: '2026-06-21T16:00:00Z',
    city: 'Atlanta (USA)'
  });
  matches.push({
    id: 'M38',
    num: 38,
    phase: 'group',
    group: 'G',
    homeTeamId: 'G1',
    awayTeamId: 'G3',
    date: '2026-06-21T19:00:00Z',
    city: 'Los Angeles (USA)'
  });
  matches.push({
    id: 'M39',
    num: 39,
    phase: 'group',
    group: 'H',
    homeTeamId: 'H4',
    awayTeamId: 'H2',
    date: '2026-06-21T22:00:00Z',
    city: 'Miami (USA)'
  });
  matches.push({
    id: 'M40',
    num: 40,
    phase: 'group',
    group: 'G',
    homeTeamId: 'G4',
    awayTeamId: 'G2',
    date: '2026-06-22T01:00:00Z',
    city: 'Vancouver (Kanada)'
  });
  matches.push({
    id: 'M41',
    num: 41,
    phase: 'group',
    group: 'J',
    homeTeamId: 'J1',
    awayTeamId: 'J3',
    date: '2026-06-22T17:00:00Z',
    city: 'Dallas (USA)'
  });
  matches.push({
    id: 'M42',
    num: 42,
    phase: 'group',
    group: 'I',
    homeTeamId: 'I1',
    awayTeamId: 'I3',
    date: '2026-06-22T21:00:00Z',
    city: 'Filadelfia (USA)'
  });
  matches.push({
    id: 'M43',
    num: 43,
    phase: 'group',
    group: 'I',
    homeTeamId: 'I4',
    awayTeamId: 'I2',
    date: '2026-06-23T00:00:00Z',
    city: 'Toronto (Kanada)'
  });
  matches.push({
    id: 'M44',
    num: 44,
    phase: 'group',
    group: 'J',
    homeTeamId: 'J4',
    awayTeamId: 'J2',
    date: '2026-06-23T03:00:00Z',
    city: 'San Francisco (USA)'
  });
  matches.push({
    id: 'M45',
    num: 45,
    phase: 'group',
    group: 'K',
    homeTeamId: 'K1',
    awayTeamId: 'K3',
    date: '2026-06-23T17:00:00Z',
    city: 'Houston (USA)'
  });
  matches.push({
    id: 'M46',
    num: 46,
    phase: 'group',
    group: 'L',
    homeTeamId: 'L1',
    awayTeamId: 'L3',
    date: '2026-06-23T20:00:00Z',
    city: 'Boston (USA)'
  });
  matches.push({
    id: 'M47',
    num: 47,
    phase: 'group',
    group: 'L',
    homeTeamId: 'L4',
    awayTeamId: 'L2',
    date: '2026-06-23T23:00:00Z',
    city: 'Boston (USA)'
  });
  matches.push({
    id: 'M48',
    num: 48,
    phase: 'group',
    group: 'K',
    homeTeamId: 'K4',
    awayTeamId: 'K2',
    date: '2026-06-24T02:00:00Z',
    city: 'Guadalajara (Meksyk)'
  });
  matches.push({
    id: 'M49',
    num: 49,
    phase: 'group',
    group: 'B',
    homeTeamId: 'B4',
    awayTeamId: 'B1',
    date: '2026-06-24T19:00:00Z',
    city: 'Vancouver (Kanada)'
  });
  matches.push({
    id: 'M50',
    num: 50,
    phase: 'group',
    group: 'B',
    homeTeamId: 'B2',
    awayTeamId: 'B3',
    date: '2026-06-24T19:00:00Z',
    city: 'Seattle (USA)'
  });
  matches.push({
    id: 'M51',
    num: 51,
    phase: 'group',
    group: 'C',
    homeTeamId: 'C2',
    awayTeamId: 'C3',
    date: '2026-06-24T22:00:00Z',
    city: 'Atlanta (USA)'
  });
  matches.push({
    id: 'M52',
    num: 52,
    phase: 'group',
    group: 'C',
    homeTeamId: 'C4',
    awayTeamId: 'C1',
    date: '2026-06-24T22:00:00Z',
    city: 'Miami (USA)'
  });
  matches.push({
    id: 'M53',
    num: 53,
    phase: 'group',
    group: 'A',
    homeTeamId: 'A2',
    awayTeamId: 'A3',
    date: '2026-06-25T01:00:00Z',
    city: 'Monterrey (Meksyk)'
  });
  matches.push({
    id: 'M54',
    num: 54,
    phase: 'group',
    group: 'A',
    homeTeamId: 'A4',
    awayTeamId: 'A1',
    date: '2026-06-25T01:00:00Z',
    city: 'Mexico City (Meksyk)'
  });
  matches.push({
    id: 'M55',
    num: 55,
    phase: 'group',
    group: 'E',
    homeTeamId: 'E2',
    awayTeamId: 'E3',
    date: '2026-06-25T20:00:00Z',
    city: 'Filadelfia (USA)'
  });
  matches.push({
    id: 'M56',
    num: 56,
    phase: 'group',
    group: 'E',
    homeTeamId: 'E4',
    awayTeamId: 'E1',
    date: '2026-06-25T20:00:00Z',
    city: 'New York/NJ (USA)'
  });
  matches.push({
    id: 'M57',
    num: 57,
    phase: 'group',
    group: 'F',
    homeTeamId: 'F4',
    awayTeamId: 'F1',
    date: '2026-06-25T23:00:00Z',
    city: 'Kansas City (USA)'
  });
  matches.push({
    id: 'M58',
    num: 58,
    phase: 'group',
    group: 'F',
    homeTeamId: 'F2',
    awayTeamId: 'F3',
    date: '2026-06-25T23:00:00Z',
    city: 'Dallas (USA)'
  });
  matches.push({
    id: 'M59',
    num: 59,
    phase: 'group',
    group: 'D',
    homeTeamId: 'D4',
    awayTeamId: 'D1',
    date: '2026-06-26T02:00:00Z',
    city: 'Los Angeles (USA)'
  });
  matches.push({
    id: 'M60',
    num: 60,
    phase: 'group',
    group: 'D',
    homeTeamId: 'D2',
    awayTeamId: 'D3',
    date: '2026-06-26T02:00:00Z',
    city: 'San Francisco (USA)'
  });
  matches.push({
    id: 'M61',
    num: 61,
    phase: 'group',
    group: 'I',
    homeTeamId: 'I4',
    awayTeamId: 'I1',
    date: '2026-06-26T19:00:00Z',
    city: 'Boston (USA)'
  });
  matches.push({
    id: 'M62',
    num: 62,
    phase: 'group',
    group: 'I',
    homeTeamId: 'I2',
    awayTeamId: 'I3',
    date: '2026-06-26T19:00:00Z',
    city: 'Toronto (Kanada)'
  });
  matches.push({
    id: 'M63',
    num: 63,
    phase: 'group',
    group: 'H',
    homeTeamId: 'H2',
    awayTeamId: 'H3',
    date: '2026-06-27T00:00:00Z',
    city: 'Houston (USA)'
  });
  matches.push({
    id: 'M64',
    num: 64,
    phase: 'group',
    group: 'H',
    homeTeamId: 'H4',
    awayTeamId: 'H1',
    date: '2026-06-27T00:00:00Z',
    city: 'Guadalajara (Meksyk)'
  });
  matches.push({
    id: 'M65',
    num: 65,
    phase: 'group',
    group: 'G',
    homeTeamId: 'G4',
    awayTeamId: 'G1',
    date: '2026-06-27T03:00:00Z',
    city: 'Vancouver (Kanada)'
  });
  matches.push({
    id: 'M66',
    num: 66,
    phase: 'group',
    group: 'G',
    homeTeamId: 'G2',
    awayTeamId: 'G3',
    date: '2026-06-27T03:00:00Z',
    city: 'Seattle (USA)'
  });
  matches.push({
    id: 'M67',
    num: 67,
    phase: 'group',
    group: 'L',
    homeTeamId: 'L4',
    awayTeamId: 'L1',
    date: '2026-06-27T21:00:00Z',
    city: 'New York/NJ (USA)'
  });
  matches.push({
    id: 'M68',
    num: 68,
    phase: 'group',
    group: 'L',
    homeTeamId: 'L2',
    awayTeamId: 'L3',
    date: '2026-06-27T21:00:00Z',
    city: 'Filadelfia (USA)'
  });
  matches.push({
    id: 'M69',
    num: 69,
    phase: 'group',
    group: 'K',
    homeTeamId: 'K4',
    awayTeamId: 'K1',
    date: '2026-06-27T23:30:00Z',
    city: 'Miami (USA)'
  });
  matches.push({
    id: 'M70',
    num: 70,
    phase: 'group',
    group: 'K',
    homeTeamId: 'K2',
    awayTeamId: 'K3',
    date: '2026-06-27T23:30:00Z',
    city: 'Atlanta (USA)'
  });
  matches.push({
    id: 'M71',
    num: 71,
    phase: 'group',
    group: 'J',
    homeTeamId: 'J2',
    awayTeamId: 'J3',
    date: '2026-06-28T02:00:00Z',
    city: 'Kansas City (USA)'
  });
  matches.push({
    id: 'M72',
    num: 72,
    phase: 'group',
    group: 'J',
    homeTeamId: 'J4',
    awayTeamId: 'J1',
    date: '2026-06-28T02:00:00Z',
    city: 'Dallas (USA)'
  });
  matches.push({ id: 'M73', num: 73, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-06-28T19:00:00Z', city: 'Los Angeles (USA)' });
  matches.push({ id: 'M74', num: 75, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-06-29T20:30:00Z', city: 'Boston (USA)' });
  matches.push({ id: 'M75', num: 76, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-06-30T01:00:00Z', city: 'Monterrey (Meksyk)' });
  matches.push({ id: 'M76', num: 74, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-06-29T17:00:00Z', city: 'Houston (USA)' });
  matches.push({ id: 'M77', num: 77, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-06-30T17:00:00Z', city: 'Dallas (USA)' });
  matches.push({ id: 'M78', num: 78, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-06-30T21:00:00Z', city: 'Nowy Jork/NJ (USA)' });
  matches.push({ id: 'M79', num: 79, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-07-01T01:00:00Z', city: 'Meksyk (Meksyk)' });
  matches.push({ id: 'M80', num: 80, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-07-01T16:00:00Z', city: 'Atlanta (USA)' });
  matches.push({ id: 'M81', num: 81, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-07-01T20:00:00Z', city: 'Seattle (USA)' });
  matches.push({ id: 'M82', num: 82, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-07-02T00:00:00Z', city: 'San Francisco (USA)' });
  matches.push({ id: 'M83', num: 83, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-07-02T19:00:00Z', city: 'Los Angeles (USA)' });
  matches.push({ id: 'M84', num: 84, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-07-02T23:00:00Z', city: 'Toronto (Kanada)' });
  matches.push({ id: 'M85', num: 85, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-07-03T03:00:00Z', city: 'Vancouver (Kanada)' });
  matches.push({ id: 'M86', num: 86, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-07-03T18:00:00Z', city: 'Dallas (USA)' });
  matches.push({ id: 'M87', num: 87, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-07-03T22:00:00Z', city: 'Miami (USA)' });
  matches.push({ id: 'M88', num: 88, phase: 'r32', homeTeamId: null, awayTeamId: null, date: '2026-07-04T01:30:00Z', city: 'Kansas City (USA)' });
  matches.push({
    id: 'M89',
    num: 89,
    phase: 'r16',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-04T21:00:00Z',
    city: 'Filadelfia (USA)'
  });
  matches.push({
    id: 'M90',
    num: 90,
    phase: 'r16',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-04T17:00:00Z',
    city: 'Houston (USA)'
  });
  matches.push({
    id: 'M91',
    num: 91,
    phase: 'r16',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-05T20:00:00Z',
    city: 'New York/NJ (USA)'
  });
  matches.push({
    id: 'M92',
    num: 92,
    phase: 'r16',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-06T00:00:00Z',
    city: 'Mexico City (Meksyk)'
  });
  matches.push({
    id: 'M93',
    num: 93,
    phase: 'r16',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-06T19:00:00Z',
    city: 'Dallas (USA)'
  });
  matches.push({
    id: 'M94',
    num: 94,
    phase: 'r16',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-07T00:00:00Z',
    city: 'Seattle (USA)'
  });
  matches.push({
    id: 'M95',
    num: 95,
    phase: 'r16',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-07T16:00:00Z',
    city: 'Atlanta (USA)'
  });
  matches.push({
    id: 'M96',
    num: 96,
    phase: 'r16',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-07T20:00:00Z',
    city: 'Vancouver (Kanada)'
  });
  matches.push({
    id: 'M97',
    num: 97,
    phase: 'qf',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-09T20:00:00Z',
    city: 'Boston (USA)'
  });
  matches.push({
    id: 'M98',
    num: 98,
    phase: 'qf',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-10T19:00:00Z',
    city: 'Los Angeles (USA)'
  });
  matches.push({
    id: 'M99',
    num: 99,
    phase: 'qf',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-11T21:00:00Z',
    city: 'Miami (USA)'
  });
  matches.push({
    id: 'M100',
    num: 100,
    phase: 'qf',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-12T01:00:00Z',
    city: 'Kansas City (USA)'
  });
  matches.push({
    id: 'M101',
    num: 101,
    phase: 'sf',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-14T19:00:00Z',
    city: 'Dallas (USA)'
  });
  matches.push({
    id: 'M102',
    num: 102,
    phase: 'sf',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-15T19:00:00Z',
    city: 'Atlanta (USA)'
  });
  matches.push({
    id: 'M103',
    num: 103,
    phase: 'third',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-18T21:00:00Z',
    city: 'Miami (USA)'
  });
  matches.push({
    id: 'M104',
    num: 104,
    phase: 'final',
    homeTeamId: null,
    awayTeamId: null,
    date: '2026-07-19T19:00:00Z',
    city: 'New York/NJ (USA)'
  });
  return matches;
}

// ═══════════════════════════════════════════════════════════════
//  FIREBASE STATE HOOK (zamiennik window.storage)
// ═══════════════════════════════════════════════════════════════
function useFirebaseState(path, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [loaded, setLoaded] = useState(false);
  const valueRef = useRef(defaultValue);
  useEffect(() => {
    const ref = db.ref(path);
    const timeout = setTimeout(() => {
      console.warn('Firebase timeout for path:', path, '— using default');
      setLoaded(true);
    }, 8000);
    const handler = ref.on('value', snap => {
      clearTimeout(timeout);
      const data = snap.val();
      if (data !== null && data !== undefined) {
        valueRef.current = data;
        setValue(data);
      } else {
        valueRef.current = defaultValue;
        setValue(defaultValue);
      }
      setLoaded(true);
    }, err => {
      clearTimeout(timeout);
      console.error('Firebase read error:', path, err);
      setLoaded(true);
    });
    return () => {
      clearTimeout(timeout);
      ref.off('value', handler);
    };
  }, [path]);
  const updateValue = useCallback(async next => {
    const previous = valueRef.current;
    const resolved = typeof next === 'function' ? next(previous) : next;
    valueRef.current = resolved;
    setValue(resolved);
    try {
      await db.ref(path).set(resolved);
    } catch (e) {
      valueRef.current = previous;
      setValue(previous);
      console.error('Firebase write error:', path, e);
      throw e;
    }
  }, [path]);
  // Zapis pojedynczego klucza – nie nadpisuje całej kolekcji, więc
  // równoczesne zapisy z różnych urządzeń nie kasują się nawzajem.
  const writeChild = useCallback(async (childKey, childValue) => {
    const cur = valueRef.current;
    const base = cur && typeof cur === 'object' && !Array.isArray(cur) ? cur : {};
    const nextLocal = {
      ...base,
      [childKey]: childValue
    };
    valueRef.current = nextLocal;
    setValue(nextLocal);
    try {
      await db.ref(`${path}/${childKey}`).set(childValue);
    } catch (e) {
      valueRef.current = cur;
      setValue(cur);
      console.error('Firebase child write error:', path, childKey, e);
      throw e;
    }
  }, [path]);
  const removeChild = useCallback(async childKey => {
    const cur = valueRef.current;
    const base = cur && typeof cur === 'object' && !Array.isArray(cur) ? cur : {};
    const nextLocal = {
      ...base
    };
    delete nextLocal[childKey];
    valueRef.current = nextLocal;
    setValue(nextLocal);
    try {
      await db.ref(`${path}/${childKey}`).remove();
    } catch (e) {
      valueRef.current = cur;
      setValue(cur);
      console.error('Firebase child remove error:', path, childKey, e);
      throw e;
    }
  }, [path]);
  return [value, updateValue, loaded, writeChild, removeChild];
}

// ═══════════════════════════════════════════════════════════════
//  PUNKTACJA
// ═══════════════════════════════════════════════════════════════
function scoreGroupMatch(pred, result, points = POINTS) {
  if (!pred || !result) return 0;
  if (pred.home === result.home && pred.away === result.away) return points.group.exact;
  const po = pred.home > pred.away ? 'h' : pred.home < pred.away ? 'a' : 'd';
  const ro = result.home > result.away ? 'h' : result.home < result.away ? 'a' : 'd';
  return po === ro ? points.group.winner : 0;
}
function scoreKnockoutMatch(pred, result, points = POINTS) {
  if (!pred || !result) return 0;
  const exact = pred.home === result.home && pred.away === result.away;
  const predictedPens = pred.home === pred.away;
  const resultPens = !!result.pensHappened;
  const sameResolutionMode = predictedPens === resultPens;
  const predictedAdv = pred.home > pred.away ? 'home' : pred.home < pred.away ? 'away' : pred.penWinner || null;
  const winnerOnly = !exact && sameResolutionMode && predictedAdv && predictedAdv === result.advancingTeam;
  const base = exact ? points.knockout.exact : winnerOnly ? points.knockout.winner : 0;
  const bonus = resultPens && predictedPens && pred.penWinner && pred.penWinner === result.advancingTeam ? points.knockout.penBonus : 0;
  return base + bonus;
}
function scoreMatch(pred, result, phase, points = POINTS) {
  return phase === 'group' ? scoreGroupMatch(pred, result, points) : scoreKnockoutMatch(pred, result, points);
}
function predictionQuality(pred, result, phase, points = POINTS) {
  if (!pred || !result) return null;
  const exact = pred.home === result.home && pred.away === result.away;
  if (exact) return 'exact';
  return scoreMatch(pred, result, phase, points) > 0 ? 'partial' : 'miss';
}
function scoreSpecials(special, results, points = POINTS) {
  if (!special || !results) return {
    groupOrders: 0,
    podium: 0,
    awards: 0,
    total: 0
  };
  let groupOrders = 0,
    podium = 0,
    awards = 0;
  GROUPS.forEach(g => {
    const p = special.groupOrders?.[g] || [],
      r = results.groupOrders?.[g] || [];
    if (!r.some(Boolean)) return;
    const exact = p.filter((t, i) => t && r[i] && t === r[i]).length;
    if (exact === 4) groupOrders += points.groupOrderAll;else if (exact === 2) groupOrders += points.groupOrderTwo;else if (exact === 1) groupOrders += points.groupOrderOne;
  });
  if (special.champion && results.champion && special.champion === results.champion) podium += points.champion;
  if (special.runnerUp && results.runnerUp && special.runnerUp === results.runnerUp) podium += points.runnerUp;
  if (special.third && results.third && special.third === results.third) podium += points.third;
  const n = s => (s || '').trim().toLowerCase();
  if (special.topScorer && results.topScorer && n(special.topScorer) === n(results.topScorer)) awards += points.topScorer;
  if (special.mvp && results.mvp && n(special.mvp) === n(results.mvp)) awards += points.mvp;
  return {
    groupOrders,
    podium,
    awards,
    total: groupOrders + podium + awards
  };
}

// Kolejność rozstrzygania remisów w klasyfikacji:
// 1) liczba dokładnych wyników, 2) punkty za TOP 3,
// 3) punkty za nagrody indywidualne, 4) punkty za miejsca w grupach.
function compareRankingEntries(a, b) {
  const value = (entry, key) => Number(entry?.[key]) || 0;
  const groupPoints = entry => Number(entry?.go ?? entry?.groupOrders ?? 0) || 0;
  const playerName = entry => String(entry?.player?.name || entry?.name || '');
  return value(b, 'total') - value(a, 'total') || value(b, 'exact') - value(a, 'exact') || value(b, 'podium') - value(a, 'podium') || value(b, 'awards') - value(a, 'awards') || groupPoints(b) - groupPoints(a) || playerName(a).localeCompare(playerName(b), 'pl', {
    sensitivity: 'base'
  });
}

// ═══════════════════════════════════════════════════════════════
//  POMOCNICZE
// ═══════════════════════════════════════════════════════════════
function plMecze(n) {
  const a = Math.abs(n) % 100,
    b = a % 10;
  if (a === 1) return 'mecz';
  if (b >= 2 && b <= 4 && (a < 12 || a > 14)) return 'mecze';
  return 'meczów';
}
// Formatter tworzony RAZ (kosztowne) i reużywany przy każdym renderze karty.
const PL_DATE_FMT = (function () {
  try {
    return new Intl.DateTimeFormat('pl-PL', {
      timeZone: 'Europe/Warsaw',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch (e) {
    return null;
  }
})();
function formatDate(iso) {
  // Zawsze wyświetlamy w czasie polskim (Europe/Warsaw, z poprawnym DST przez Intl).
  const d = new Date(iso);
  if (PL_DATE_FMT) {
    try {
      const parts = PL_DATE_FMT.formatToParts(d).reduce((a, {
        type,
        value
      }) => ({
        ...a,
        [type]: value
      }), {});
      return `${parts.weekday} ${parts.day} ${parts.month} • ${parts.hour}:${parts.minute}`;
    } catch (e) {}
  }
  // Fallback bez Intl – przybliżenie strefy Warszawy: CEST (UTC+2) latem, CET (UTC+1) zimą.
  const isSummer = d.getUTCMonth() >= 3 && d.getUTCMonth() <= 9; // kwi–paź ≈ czas letni
  const pl = new Date(d.getTime() + (isSummer ? 2 : 1) * 3600 * 1000);
  const days = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];
  const months = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
  return `${days[pl.getUTCDay()]} ${pl.getUTCDate()} ${months[pl.getUTCMonth()]} • ${String(pl.getUTCHours()).padStart(2, '0')}:${String(pl.getUTCMinutes()).padStart(2, '0')}`;
}
function uid() {
  return 'p_' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
}
const hashPin = hashPwd; // alias — ten sam algorytm
function hashPwd(s) {
  if (!s) return '';
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i) | 0;
  return 'h_' + Math.abs(h).toString(36) + '_' + s.length;
}

// ═══════════════════════════════════════════════════════════════
//  KOMPONENTY UI
// ═══════════════════════════════════════════════════════════════
function Btn({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold disabled:opacity-40 disabled:cursor-not-allowed select-none';
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base'
  };
  const variants = {
    primary: 'bg-[#0d1b5e] hover:bg-[#162570] active:bg-[#060e30] text-white',
    gold: 'bg-amber-500 hover:bg-amber-600 text-stone-900',
    ghost: 'text-stone-700 hover:bg-white/10',
    outline: 'border border-stone-300 text-stone-800 hover:bg-white/10 bg-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    dark: 'bg-stone-900 hover:bg-stone-800 text-stone-50'
  };
  const liquidGlassButtonStyle = {
    borderRadius: '999px',
    transition: 'all .20s var(--ease-out)',
    boxShadow: 'var(--hl), 0 2px 8px rgba(0,0,0,0.30)',
    letterSpacing: '0.01em'
  };
  return React.createElement("button", _extends({
    style: liquidGlassButtonStyle,
    className: `${base} ${sizes[size]} ${variants[variant]} ${className}`
  }, props), children);
}
function ScoreInput({
  value,
  onChange,
  disabled = false,
  label
}) {
  const num = typeof value === 'number' ? value : value === '' || value === null ? null : parseInt(value) || 0;
  const set = n => {
    if (n < 0) n = 0;
    if (n > 99) n = 99;
    onChange(n);
  };
  return React.createElement("div", {
    className: "flex flex-col items-center gap-1"
  }, label && React.createElement("span", {
    className: "text-[10px] uppercase tracking-wider text-stone-500 font-medium"
  }, label), React.createElement("div", {
    className: "flex items-center gap-0 score-input-shell"
  }, React.createElement("button", {
    type: "button",
    onClick: () => set((num ?? 0) - 1),
    disabled: disabled,
    style: {
      width: 44,
      height: 56,
      borderRadius: '22px 0 0 22px',
      background: 'var(--glass-3)',
      border: '1px solid var(--border-2)',
      borderRight: 'none',
      color: 'var(--label-1)',
      fontWeight: 700,
      fontSize: 22,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      transition: 'background .12s'
    }
  }, React.createElement(Icon, { name: "minus", size: 18 })), React.createElement("div", {
    role: "spinbutton",
    "aria-valuemin": 0,
    "aria-valuemax": 99,
    "aria-valuenow": num === null ? 0 : num,
    "aria-disabled": disabled,
    style: {
      width: 62,
      height: 56,
      textAlign: 'center',
      background: 'transparent',
      border: '0',
      borderLeft: 'none',
      borderRight: 'none',
      color: 'white',
      fontFamily: "'Bebas Neue',sans-serif",
      fontSize: 28,
      letterSpacing: '0.04em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      pointerEvents: 'none',
      opacity: disabled ? .5 : 1
    },
    className: "score-value-input text-2xl font-bold font-display"
  }, num === null ? '' : num), React.createElement("button", {
    type: "button",
    onClick: () => set((num ?? 0) + 1),
    disabled: disabled,
    style: {
      width: 44,
      height: 56,
      borderRadius: '0 22px 22px 0',
      background: 'var(--glass-3)',
      border: '1px solid var(--border-2)',
      borderLeft: 'none',
      color: 'var(--label-1)',
      fontWeight: 700,
      fontSize: 22,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      transition: 'background .12s'
    }
  }, React.createElement(Icon, { name: "plus", size: 18 }))));
}
function Badge({
  children,
  variant = 'default'
}) {
  const v = {
    default: 'bg-stone-100 text-stone-700 border-stone-200',
    success: 'bg-emerald-500 text-white border-emerald-600',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    info: 'bg-sky-100 text-sky-800 border-sky-200',
    gold: 'bg-amber-50 text-amber-900 border-amber-300',
    dark: 'bg-stone-800 text-stone-100 border-stone-700'
  };
  return React.createElement("span", {
    className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${v[variant] || v.default}`
  }, children);
}
// Wspólny nagłówek dla wszystkich paneli/modali (tytuł + przycisk X).
// Jedno źródło prawdy dla struktury nagłówka — używane przez Modal,
// więc każdy panel oparty na Modal (lista profili, dodawanie użytkownika,
// zmiana nazwy, panel admina) ma identyczny nagłówek bez powielania kodu.
function PanelHeader({ title, onClose }) {
  return React.createElement("div", {
    className: "flex items-center justify-between p-4 panel-header"
  }, React.createElement("h3", {
    className: "login-modal-title panel-title"
  }, title), React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "modal-close-btn panel-close-btn",
    "aria-label": "Zamknij"
  }, React.createElement(Icon, {
    name: "x",
    size: 18
  })));
}
function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'max-w-md',
  overlayClassName = '',
  panelClassName = ''
}) {
  useEffect(() => {
    if (!open) return;
    const h = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, onClose]);
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const body = document.body;

    // Ten modal blokuje scroll TYLKO jeśli strona nie jest już zablokowana
    // (w tej appce zawsze jest otwarty co najwyżej jeden z tych paneli
    // naraz). Blokada i odblokowanie są symetryczne w obrębie JEDNEGO
    // wywołania efektu — bez dzielonego, globalnego licznika, który
    // wcześniej potrafił się rozjechać z realnym stanem DOM (np. przy
    // panelu admina) i zostawiać stronę trwale niescrollowalną, mimo że
    // żaden modal nie był już otwarty.
    if (root.classList.contains('modal-scroll-locked')) return undefined;

    const scrollY = window.scrollY || window.pageYOffset || 0;

    root.classList.add('modal-scroll-locked');
    body.classList.add('modal-scroll-locked');

    root.style.setProperty('overflow', 'hidden', 'important');
    root.style.setProperty('overscroll-behavior', 'none', 'important');
    body.style.setProperty('position', 'fixed', 'important');
    body.style.setProperty('top', `-${scrollY}px`, 'important');
    body.style.setProperty('left', '0', 'important');
    body.style.setProperty('right', '0', 'important');
    body.style.setProperty('width', '100%', 'important');
    body.style.setProperty('overflow', 'hidden', 'important');
    body.style.setProperty('overscroll-behavior', 'none', 'important');

    return () => {
      root.classList.remove('modal-scroll-locked');
      body.classList.remove('modal-scroll-locked');

      root.style.removeProperty('overflow');
      root.style.removeProperty('overscroll-behavior');
      body.style.removeProperty('position');
      body.style.removeProperty('top');
      body.style.removeProperty('left');
      body.style.removeProperty('right');
      body.style.removeProperty('width');
      body.style.removeProperty('overflow');
      body.style.removeProperty('overscroll-behavior');

      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    let frame = 0;
    let focusTimer = 0;

    const updateModalViewport = () => {
      frame = 0;
      const vv = window.visualViewport;
      const height = vv ? vv.height : window.innerHeight;
      const keyboardInset = vv ? Math.max(0, (window.innerHeight || height) - height) : 0;

      const active = document.activeElement;
      const focusedModalField = active instanceof HTMLElement &&
        active.matches('input, textarea, select, [contenteditable="true"]') &&
        !!active.closest('.login-modal-content');
      const coarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      const likelyKeyboardOpen = keyboardInset > 80 || (focusedModalField && coarsePointer);

      root.style.setProperty('--modal-vh', `${Math.max(0, height)}px`);
      root.style.setProperty('--modal-offset-top', '0px');
      root.style.setProperty('--modal-keyboard-inset', `${keyboardInset}px`);
      root.classList.toggle('modal-keyboard-open', !!likelyKeyboardOpen);
    };

    const scheduleViewportUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateModalViewport);
    };

    const keepFocusedFieldVisible = event => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.matches('input, textarea, select, [contenteditable="true"]')) return;

      window.clearTimeout(focusTimer);
      focusTimer = window.setTimeout(() => {
        scheduleViewportUpdate();
        const content = target.closest('.login-modal-content');
        if (!content) return;
        const targetRect = target.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        const bottomSlack = 24;
        const topSlack = 18;

        if (targetRect.bottom > contentRect.bottom - bottomSlack) {
          content.scrollTop += targetRect.bottom - contentRect.bottom + bottomSlack;
        } else if (targetRect.top < contentRect.top + topSlack) {
          content.scrollTop -= contentRect.top + topSlack - targetRect.top;
        }
      }, 120);
    };

    updateModalViewport();
    window.addEventListener('resize', scheduleViewportUpdate);
    window.addEventListener('orientationchange', scheduleViewportUpdate);
    window.visualViewport && window.visualViewport.addEventListener('resize', scheduleViewportUpdate);
    window.visualViewport && window.visualViewport.addEventListener('scroll', scheduleViewportUpdate);
    document.addEventListener('focusin', keepFocusedFieldVisible, true);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(focusTimer);
      window.removeEventListener('resize', scheduleViewportUpdate);
      window.removeEventListener('orientationchange', scheduleViewportUpdate);
      window.visualViewport && window.visualViewport.removeEventListener('resize', scheduleViewportUpdate);
      window.visualViewport && window.visualViewport.removeEventListener('scroll', scheduleViewportUpdate);
      document.removeEventListener('focusin', keepFocusedFieldVisible, true);
      root.classList.remove('modal-keyboard-open');
      root.style.removeProperty('--modal-vh');
      root.style.removeProperty('--modal-offset-top');
      root.style.removeProperty('--modal-keyboard-inset');
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    let lastTouchY = 0;

    const getScrollableModalContent = target => {
      if (!(target instanceof Element)) return null;
      const content = target.closest('.login-modal-content');
      if (!content) return null;
      return content;
    };

    const canScroll = (content, deltaY) => {
      if (!content || content.scrollHeight <= content.clientHeight + 1) return false;

      const atTop = content.scrollTop <= 0;
      const atBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 1;

      if (deltaY < 0 && atTop) return false;
      if (deltaY > 0 && atBottom) return false;
      return true;
    };

    const onTouchStart = event => {
      if (event.touches && event.touches.length === 1) {
        lastTouchY = event.touches[0].clientY;
      }
    };

    const onTouchMove = event => {
      if (!event.touches || event.touches.length !== 1) {
        event.preventDefault();
        return;
      }

      const currentY = event.touches[0].clientY;
      const fingerDelta = currentY - lastTouchY;
      const scrollDelta = -fingerDelta;
      const content = getScrollableModalContent(event.target);

      if (!canScroll(content, scrollDelta)) {
        event.preventDefault();
      }

      lastTouchY = currentY;
    };

    const onWheel = event => {
      const content = getScrollableModalContent(event.target);
      if (!canScroll(content, event.deltaY)) {
        event.preventDefault();
      }
    };

    document.addEventListener('touchstart', onTouchStart, {
      passive: true,
      capture: true
    });
    document.addEventListener('touchmove', onTouchMove, {
      passive: false,
      capture: true
    });
    document.addEventListener('wheel', onWheel, {
      passive: false,
      capture: true
    });

    return () => {
      document.removeEventListener('touchstart', onTouchStart, true);
      document.removeEventListener('touchmove', onTouchMove, true);
      document.removeEventListener('wheel', onWheel, true);
    };
  }, [open]);

  if (!open) return null;
  return React.createElement("div", {
    className: `fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 ${overlayClassName ? `${overlayClassName}-root` : ''}`
  }, React.createElement("div", {
    className: `absolute inset-0 bg-stone-900/60 backdrop-blur-sm ${overlayClassName}`,
    onClick: onClose
  }), React.createElement("div", {
    className: `relative w-full ${maxWidth} rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col ${panelClassName}`,
    style: {
      background: 'var(--bg-1)',
      border: '1px solid var(--sep)',
      boxShadow: 'var(--shadow-lg), var(--hl)'
    }
  }, React.createElement(PanelHeader, {
    title: title,
    onClose: onClose
  }), React.createElement("div", {
    className: "login-modal-content overflow-y-auto p-4"
  }, children)));
}
const NAME_TO_ABBR = {
  'meksyk': 'MEX',
  'rpa': 'RSA',
  'korea południowa': 'KOR',
  'czechy': 'CZE',
  'kanada': 'CAN',
  'bośnia i hercegowina': 'BIH',
  'katar': 'QAT',
  'szwajcaria': 'SUI',
  'brazylia': 'BRA',
  'maroko': 'MAR',
  'haiti': 'HAI',
  'szkocja': 'SCO',
  'usa': 'USA',
  'paragwaj': 'PAR',
  'australia': 'AUS',
  'turcja': 'TUR',
  'niemcy': 'GER',
  'curaçao': 'CUW',
  'wybrz. kości słoniowej': 'CIV',
  'ekwador': 'ECU',
  'wybrzeże kości słoniowej': 'CIV',
  'wybrzeże': 'CIV',
  'wks': 'CIV',
  'holandia': 'NED',
  'japonia': 'JPN',
  'szwecja': 'SWE',
  'tunezja': 'TUN',
  'belgia': 'BEL',
  'egipt': 'EGY',
  'iran': 'IRI',
  'nowa zelandia': 'NZL',
  'hiszpania': 'ESP',
  'rep. zielonego przylądka': 'CPV',
  'rep. ziel. przylądka': 'CPV',
  'arabia saudyjska': 'KSA',
  'urugwaj': 'URU',
  'francja': 'FRA',
  'senegal': 'SEN',
  'irak': 'IRQ',
  'norwegia': 'NOR',
  'argentyna': 'ARG',
  'algieria': 'ALG',
  'austria': 'AUT',
  'jordania': 'JOR',
  'portugalia': 'POR',
  'dr konga': 'COD',
  'uzbekistan': 'UZB',
  'kolumbia': 'COL',
  'anglia': 'ENG',
  'chorwacja': 'CRO',
  'ghana': 'GHA',
  'panama': 'PAN'
};
const FLAG_ABBR = {
  'mx': 'MEX',
  'za': 'RSA',
  'kr': 'KOR',
  'cz': 'CZE',
  'ca': 'CAN',
  'ba': 'BIH',
  'qa': 'QAT',
  'ch': 'SUI',
  'br': 'BRA',
  'ma': 'MAR',
  'ht': 'HAI',
  'gb-sct': 'SCO',
  'us': 'USA',
  'py': 'PAR',
  'au': 'AUS',
  'tr': 'TUR',
  'de': 'GER',
  'cw': 'CUW',
  'ci': 'CIV',
  'ec': 'ECU',
  'nl': 'NED',
  'jp': 'JPN',
  'se': 'SWE',
  'tn': 'TUN',
  'be': 'BEL',
  'eg': 'EGY',
  'ir': 'IRI',
  'nz': 'NZL',
  'es': 'ESP',
  'cv': 'CPV',
  'sa': 'KSA',
  'uy': 'URU',
  'fr': 'FRA',
  'sn': 'SEN',
  'iq': 'IRQ',
  'no': 'NOR',
  'ar': 'ARG',
  'dz': 'ALG',
  'at': 'AUT',
  'jo': 'JOR',
  'pt': 'POR',
  'cd': 'COD',
  'uz': 'UZB',
  'co': 'COL',
  'gb-eng': 'ENG',
  'hr': 'CRO',
  'gh': 'GHA',
  'pa': 'PAN'
};
function normalizeFlagValue(value) {
  const raw = String(value || '').trim();
  if (!raw) return {
    code: '',
    fallback: ''
  };
  const lower = raw.toLowerCase();
  if (/^[a-z]{2}(?:-[a-z]{2,3})?$/.test(lower)) {
    return {
      code: lower,
      fallback: FLAG_ABBR[lower] || raw.toUpperCase()
    };
  }

  // Flagi jednostek Wielkiej Brytanii używają sekwencji tagów Unicode.
  const subdivisions = {
    ['\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}']: 'gb-eng',
    ['\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}']: 'gb-sct',
    ['\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}']: 'gb-wls'
  };
  if (subdivisions[raw]) {
    const code = subdivisions[raw];
    return {
      code,
      fallback: FLAG_ABBR[code] || raw
    };
  }

  // Zamiana symbolu flagi na kod ISO kraju.
  const chars = Array.from(raw);
  if (chars.length === 2) {
    const points = chars.map(ch => ch.codePointAt(0));
    const regionalA = 0x1F1E6;
    if (points.every(cp => cp >= regionalA && cp <= 0x1F1FF)) {
      const code = points.map(cp => String.fromCharCode(97 + cp - regionalA)).join('');
      return {
        code,
        fallback: FLAG_ABBR[code] || raw
      };
    }
  }

  // Nieznana wartość nie znika — pokaż ją bezpośrednio jako fallback.
  return {
    code: '',
    fallback: raw
  };
}
const FLAG_COLOR_CACHE = {};
function getFlagDominantColor(code) {
  if (!code) return Promise.resolve(null);
  if (FLAG_COLOR_CACHE[code]) return FLAG_COLOR_CACHE[code];
  const promise = new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const size = 24;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);
        const buckets = {};
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 200) continue;
          const brightness = (r + g + b) / 3;
          const max = Math.max(r, g, b), min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;
          if (brightness > 235 || brightness < 20 || saturation < 0.15) continue;
          const key = `${r >> 5}-${g >> 5}-${b >> 5}`;
          if (!buckets[key]) buckets[key] = { count: 0, r: 0, g: 0, b: 0 };
          buckets[key].count++;
          buckets[key].r += r;
          buckets[key].g += g;
          buckets[key].b += b;
        }
        let best = null;
        Object.values(buckets).forEach(bucket => {
          if (!best || bucket.count > best.count) best = bucket;
        });
        if (!best) { resolve(null); return; }
        resolve(`${Math.round(best.r / best.count)}, ${Math.round(best.g / best.count)}, ${Math.round(best.b / best.count)}`);
      } catch (e) {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = `https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@gh-pages/flags/${code}.svg`;
  });
  FLAG_COLOR_CACHE[code] = promise;
  return promise;
}
function useFlagGradient(homeFlag, awayFlag) {
  const [colors, setColors] = React.useState({ home: null, away: null });
  const homeCode = normalizeFlagValue(homeFlag).code;
  const awayCode = normalizeFlagValue(awayFlag).code;
  React.useEffect(() => {
    let alive = true;
    Promise.all([getFlagDominantColor(homeCode), getFlagDominantColor(awayCode)]).then(([home, away]) => {
      if (alive) setColors({ home, away });
    });
    return () => { alive = false; };
  }, [homeCode, awayCode]);
  if (!colors.home && !colors.away) return null;
  const homeRgb = colors.home || colors.away;
  const awayRgb = colors.away || colors.home;
  return `linear-gradient(115deg, rgba(${homeRgb}, 0.24) 0%, rgba(${homeRgb}, 0.05) 32%, rgba(${awayRgb}, 0.05) 68%, rgba(${awayRgb}, 0.24) 100%)`;
}
function FlagImg({
  code,
  size = 34,
  className = '',
  title
}) {
  if (!code) return null;
  const normalized = normalizeFlagValue(code);
  const c = normalized.code;
  const fallback = normalized.fallback || FLAG_ABBR[c] || '';
  const [err, setErr] = React.useState(false);
  React.useEffect(() => setErr(false), [code]);
  const src = c ? `https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@gh-pages/flags/${c}.svg` : '';
  const showImage = Boolean(src) && !err;
  const fallbackIsEmoji = !c;
  return React.createElement("span", {
    title: title || fallback,
    className: className,
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-3)',
      border: '1px solid var(--border-2)',
      boxShadow: 'none',
      filter: 'none',
      overflow: 'hidden'
    }
  }, showImage ? React.createElement("img", {
    src: src,
    width: size,
    height: size,
    style: {
      width: '100%',
      height: '100%',
      display: 'block',
      borderRadius: '50%',
      boxShadow: 'none',
      filter: 'none'
    },
    onError: () => setErr(true),
    alt: fallback,
    loading: "lazy",
    decoding: "async",
    referrerPolicy: "no-referrer"
  }) : React.createElement("span", {
    style: {
      fontSize: Math.round(size * (fallbackIsEmoji ? 0.56 : 0.27)),
      fontWeight: 800,
      color: 'var(--label-1)',
      fontFamily: fallbackIsEmoji ? 'system-ui,sans-serif' : "'DM Sans',system-ui,sans-serif",
      letterSpacing: fallbackIsEmoji ? '0' : '0.02em'
    }
  }, fallback));
}
function TeamLabel({
  team,
  size = 'md',
  placeholderHint = null,
  flagSize = null
}) {
  if (!team) return React.createElement("span", {
    className: `inline-flex items-center gap-1.5 text-stone-400 italic text-${size}`
  }, React.createElement(Icon, {
    name: "alert",
    size: 14
  }), React.createElement("span", null, placeholderHint || 'TBD'));
  const resolvedFlagSize = flagSize || (size === 'lg' ? 22 : size === 'sm' ? 16 : 18);
  return React.createElement("span", {
    className: `inline-flex items-center gap-2 min-w-0 text-stone-800 text-${size}`
  }, React.createElement(FlagImg, {
    code: team.flag,
    size: resolvedFlagSize,
    title: team.name
  }), React.createElement("span", {
    className: `${size === 'lg' ? 'font-semibold' : ''} min-w-0 truncate`
  }, team.name));
}
function TeamPicker({
  value,
  onChange,
  options,
  disabled = false,
  placeholder = '— wybierz drużynę —',
  status = ''
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(t => t.id === value);
  useEffect(() => {
    const close = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close, {
      passive: true
    });
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
    };
  }, []);
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);
  const stateClass = status === 'correct' ? ' is-correct' : status === 'wrong' ? ' is-wrong' : selected ? ' is-selected' : '';
  return React.createElement("div", {
    className: "relative",
    ref: ref
  }, React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => setOpen(v => !v),
    className: `selection-tile${stateClass} w-full px-3 py-2.5 rounded-full border inline-flex items-center gap-2 text-sm font-semibold disabled:opacity-60 min-w-0`
  }, selected ? React.createElement(FlagImg, {
    code: selected.flag,
    size: 20,
    title: selected.name
  }) : React.createElement("span", {
    className: "w-5 h-5 rounded-full border border-stone-300 shrink-0"
  }), React.createElement("span", {
    className: `min-w-0 flex-1 truncate text-left ${selected ? '' : 'text-stone-400 font-medium'}`
  }, selected ? selected.name : placeholder), selected && React.createElement("span", {
    className: "text-[10px] text-stone-400 shrink-0"
  }, "Gr. ", selected.group), status === 'correct' && React.createElement(Icon, {
    name: "check",
    size: 14,
    className: "shrink-0"
  }), status === 'wrong' && React.createElement(Icon, {
    name: "x",
    size: 14,
    className: "shrink-0"
  }), React.createElement(Icon, {
    name: open ? 'chevup' : 'chevdown',
    size: 16,
    className: "shrink-0"
  })), open && !disabled && React.createElement("div", {
    className: "absolute z-40 left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-stone-200 shadow-xl p-1.5",
    style: {
      background: 'linear-gradient(145deg, rgba(31,40,59,.97), rgba(10,15,26,.96))',
      backdropFilter: 'blur(14px) saturate(150%)'
    }
  }, React.createElement("button", {
    type: "button",
    onClick: () => {
      onChange('');
      setOpen(false);
    },
    className: "w-full px-3 py-2 rounded-full text-left text-sm text-stone-400 hover:bg-white/10"
  }, placeholder), options.map(t => React.createElement("button", {
    key: t.id,
    type: "button",
    onClick: () => {
      onChange(t.id);
      setOpen(false);
    },
    className: `w-full px-3 py-2 rounded-full inline-flex items-center gap-2 text-sm text-left hover:bg-white/10 ${value === t.id ? 'bg-white/10' : ''}`
  }, React.createElement(FlagImg, {
    code: t.flag,
    size: 20,
    title: t.name
  }), React.createElement("span", {
    className: "min-w-0 flex-1 truncate"
  }, t.name), React.createElement("span", {
    className: "text-[10px] text-stone-400 shrink-0"
  }, "Gr. ", t.group)))));
}
function AutocompleteInput({
  value,
  onChange,
  suggestions,
  placeholder,
  disabled
}) {
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    if (!value || value.length < 1) {
      setFiltered([]);
      return;
    }
    setFiltered(suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase())).slice(0, 6));
  }, [value, suggestions]);
  useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return React.createElement("div", {
    className: "relative",
    ref: ref
  }, React.createElement("input", {
    type: "text",
    value: value || '',
    onChange: e => {
      onChange(e.target.value);
      setOpen(true);
    },
    onFocus: () => setOpen(true),
    disabled: disabled,
    placeholder: placeholder,
    className: "selection-tile w-full px-3 py-2.5 rounded-full border text-sm font-semibold disabled:opacity-60"
  }), open && filtered.length > 0 && React.createElement("div", {
    className: "absolute z-20 left-0 right-0 mt-1 bg-white border border-stone-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
  }, filtered.map(s => React.createElement("button", {
    key: s,
    type: "button",
    onClick: () => {
      onChange(s);
      setOpen(false);
    },
    className: "block w-full text-left px-3 py-2 text-sm hover:bg-white/10 hover:text-[#0d1b5e]"
  }, s))));
}

// ═══════════════════════════════════════════════════════════════
//  KARTA MECZU
// ═══════════════════════════════════════════════════════════════
const MatchCard = React.memo(function MatchCard({
  match,
  teams,
  prediction,
  result,
  matchPredictions,
  players,
  activePlayerId,
  phaseLocks,
  onSavePrediction,
  expanded,
  onToggleMatch,
  scoringSettings
}) {
  const [draft, setDraft] = useState(prediction || {
    home: null,
    away: null,
    penWinner: null
  });
  const [pin, setPin] = useState('');
  const [pinErr, setPinErr] = useState('');
  useEffect(() => {
    setDraft(prediction || {
      home: null,
      away: null,
      penWinner: null
    });
    setPin('');
    setPinErr('');
  }, [prediction, activePlayerId, expanded]);
  const home = teams[match.homeTeamId],
    away = teams[match.awayTeamId];
  const flagGradient = useFlagGradient(home?.flag, away?.flag);
  const teamsAssigned = !!(home && away);
  const phaseLocked = !!(phaseLocks && phaseLocks[match.phase]);
  const comparisonVisible = !!(phaseLocks && phaseLocks.compareVisible);
  const locked = !!result || phaseLocked;
  const lockReason = result ? 'wynik' : 'faza zablokowana przez admina';
  const activePl = players && players.find && players.find(p => p.id === activePlayerId);
  const needsPin = !!(activePl && activePl.pinHash);
  const isKnockout = match.phase !== 'group';
  const isDraft = draft.home !== null && draft.away !== null;
  const isDraw = isDraft && draft.home === draft.away;
  const needsPen = isKnockout && isDraw;
  const canSave = !locked && teamsAssigned && activePlayerId && isDraft && (!needsPen || draft.penWinner);
  React.useEffect(() => {
    let raf = null;
    const updateOverflow = () => {
      if (expanded) {
        document.querySelectorAll('.match-final-result-card .match-final-result-name').forEach(el => {
          el.classList.toggle('is-overflowing', el.scrollWidth > el.clientWidth + 1);
        });
      }
      document.querySelectorAll('.match-list-team-name').forEach(el => {
        el.classList.toggle('is-overflowing', el.scrollWidth > el.clientWidth + 1);
      });
    };
    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateOverflow);
    };
    schedule();
    window.addEventListener('resize', schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', schedule);
    };
  }, [expanded, result, home?.name, away?.name]);
  const myPoints = useMemo(() => !prediction || !result ? null : scoreMatch(prediction, result, match.phase, scoringSettings), [prediction, result, match.phase, scoringSettings]);
  const quality = predictionQuality(prediction, result, match.phase, scoringSettings);
  const phaseColor = {
    group: 'border',
    r32: 'border',
    r16: 'border',
    qf: 'border',
    sf: 'border',
    third: 'border',
    final: 'border'
  }[match.phase];
  const phaseStyle = {
    group: {
      background: 'rgba(10,132,255,0.16)',
      color: 'rgba(255,255,255,.95)',
      borderColor: 'rgba(10,132,255,0.42)'
    },
    r32: {
      background: 'rgba(10,132,255,0.20)',
      color: 'rgba(255,255,255,.95)',
      borderColor: 'rgba(10,132,255,0.48)'
    },
    r16: {
      background: 'rgba(191,90,242,0.18)',
      color: 'rgba(255,255,255,.95)',
      borderColor: 'rgba(191,90,242,0.46)'
    },
    qf: {
      background: 'rgba(191,90,242,0.24)',
      color: 'rgba(255,255,255,.95)',
      borderColor: 'rgba(191,90,242,0.54)'
    },
    sf: {
      background: 'rgba(255,69,58,0.18)',
      color: 'rgba(255,255,255,.95)',
      borderColor: 'rgba(255,69,58,0.46)'
    },
    third: {
      background: 'rgba(255,159,10,0.18)',
      color: 'rgba(255,255,255,.95)',
      borderColor: 'rgba(255,159,10,0.46)'
    },
    final: {
      background: 'rgba(245,200,66,0.20)',
      color: '#F5C842',
      borderColor: 'rgba(245,200,66,0.52)'
    }
  }[match.phase];
  return React.createElement("div", {
    className: "match-card-enter"
  }, React.createElement("div", {
    className: `match-card${expanded ? ' expanded' : ''}`,
    style: {
      background: flagGradient ? `${flagGradient}, var(--glass-1)` : 'var(--glass-1)',
      '--match-flag-gradient': flagGradient ? `${flagGradient}, var(--tab-match-surface-soft)` : undefined,
      border: '1px solid var(--border-1)',
      borderRadius: 30,
      overflow: 'hidden',
      transition: 'background .18s, border-color .18s',
      boxShadow: 'var(--shadow-sm), var(--hl)'
    }
  }, React.createElement("button", {
    type: "button",
    onClick: () => onToggleMatch(match.id),
    className: "w-full text-left p-3 sm:p-4 transition-colors",
    style: {
      transition: "background .15s"
    }
  }, React.createElement("div", {
    className: "flex items-center justify-between gap-2 mb-2"
  }, React.createElement("div", {
    className: "flex items-center gap-1.5 flex-wrap"
  }, React.createElement("span", {
    style: {
      ...phaseStyle,
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: 999,
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontWeight: 800,
      border: '1px solid',
      lineHeight: 1.25
    }
  }, match.phase === 'group' ? `Grupa ${match.group}` : PHASE_LABELS[match.phase]), React.createElement("span", {
    className: "text-[10px] text-stone-500 font-mono"
  }, "#", match.num)), React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, prediction && !locked && React.createElement(Badge, {
    variant: "warning"
  }, "Typ"), quality === 'exact' && React.createElement("span", {
    className: "match-points-badge exact",
    style: {
      background: 'rgba(0,160,60,.30)',
      border: '1px solid rgba(0,220,80,.45)',
      color: '#30d158',
      borderRadius: '999px',
      padding: 0,
      fontSize: 15,
      fontWeight: 800
    }
  }, "+", myPoints), quality === 'partial' && React.createElement("span", {
    className: "match-points-badge partial",
    style: {
      background: 'rgba(200,100,0,.30)',
      border: '1px solid rgba(220,140,0,.45)',
      color: '#ff9f0a',
      borderRadius: '999px',
      padding: 0,
      fontSize: 15,
      fontWeight: 800
    }
  }, "+", myPoints), quality === 'miss' && React.createElement("span", {
    className: "match-points-badge miss",
    style: {
      background: 'rgba(180,0,0,.28)',
      border: '1px solid rgba(220,0,0,.40)',
      color: '#ff453a',
      borderRadius: '999px',
      padding: 0,
      fontSize: 15,
      fontWeight: 800
    }
  }, "0"), expanded ? React.createElement(Icon, {
    name: "chevup",
    size: 18
  }) : React.createElement(Icon, {
    name: "chevdown",
    size: 18
  }))), React.createElement("div", {
    className: "mt-1"
  }, React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)',
      alignItems: 'center',
      columnGap: 12
    }
  }, React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5
    }
  }, React.createElement(FlagImg, {
    code: home?.flag,
    size: 32,
    title: home?.name
  }), React.createElement("span", {
    className: "match-list-team-name",
    style: {
      fontSize: 11.5,
      fontWeight: 700,
      color: 'rgba(255,255,255,.85)',
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'clip',
      whiteSpace: 'nowrap',
      maxWidth: '100%'
    }
  }, home?.name || 'TBD')), React.createElement("div", {
    style: {
      padding: '8px 18px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--bg-3)',
      border: '1px solid var(--border-2)',
      boxShadow: 'var(--hl), 0 2px 8px rgba(0,0,0,.50)',
      fontFamily: 'Bebas Neue,sans-serif',
      fontSize: 26,
      color: 'white',
      minWidth: 78,
      textAlign: 'center',
      letterSpacing: '0.06em',
      flexShrink: 0,
      justifySelf: 'center',
      transform: 'translateY(-10px)'
    }
  }, prediction ? `${prediction.home}:${prediction.away}` : result ? `${result.home}:${result.away}` : 'vs'), React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5
    }
  }, React.createElement(FlagImg, {
    code: away?.flag,
    size: 32,
    title: away?.name
  }), React.createElement("span", {
    className: "match-list-team-name",
    style: {
      fontSize: 11.5,
      fontWeight: 700,
      color: 'rgba(255,255,255,.85)',
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'clip',
      whiteSpace: 'nowrap',
      maxWidth: '100%'
    }
  }, away?.name || 'TBD')))), React.createElement("div", {
    className: "flex items-center justify-center flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] text-stone-500 text-center w-full"
  }, React.createElement("span", {
    className: "inline-flex items-center justify-center gap-1"
  }, React.createElement(Icon, {
    name: "calendar",
    size: 11
  }), formatDate(match.date)), React.createElement("span", {
    className: "inline-flex items-center justify-center gap-1"
  }, React.createElement(Icon, {
    name: "mappin",
    size: 11
  }), match.city))), expanded && React.createElement("div", {
    className: "px-3 sm:px-4 pb-4 pt-2",
    style: {
      border: "0",
      background: "transparent",
      boxShadow: "none"
    }
  }, !activePlayerId && React.createElement("div", {
    className: "text-center text-sm text-stone-600 bg-amber-50 border border-amber-200 rounded-lg p-3 app-note app-note--warning app-note--compact app-note--center"
  }, React.createElement(Icon, {
    name: "alert",
    size: 16,
    className: "inline mr-1"
  }), "Wybierz uczestnika na g\xF3rze ekranu"), activePlayerId && !teamsAssigned && React.createElement("div", {
    className: "text-center text-sm text-stone-600 bg-stone-100 border border-stone-200 rounded-lg p-3 app-note app-note--info app-note--compact app-note--center"
  }, "Dru\u017Cyny tego meczu nie zosta\u0142y jeszcze przypisane przez admina."), activePlayerId && teamsAssigned && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "my-3"
  }, React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)',
      alignItems: 'end',
      columnGap: 10,
      rowGap: 8,
      width: '100%'
    }
  }, React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
      textAlign: 'center'
    }
  }, React.createElement(FlagImg, {
    code: home.flag,
    size: 30,
    title: home.name
  }), React.createElement("span", {
    style: {
      display: 'block',
      width: '100%',
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: 12,
      fontWeight: 700,
      color: 'rgba(255,255,255,.85)'
    }
  }, home.name)), React.createElement(ScoreInput, {
    value: draft.home,
    onChange: n => setDraft(d => ({
      ...d,
      home: n
    })),
    disabled: locked,
    label: "Gole"
  })), React.createElement("span", {
    style: {
      alignSelf: 'end',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
      paddingBottom: 1,
      fontFamily: 'Bebas Neue,sans-serif',
      fontSize: 28,
      color: 'rgba(255,255,255,.45)'
    }
  }, ":"), React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
      textAlign: 'center'
    }
  }, React.createElement(FlagImg, {
    code: away.flag,
    size: 30,
    title: away.name
  }), React.createElement("span", {
    style: {
      display: 'block',
      width: '100%',
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: 12,
      fontWeight: 700,
      color: 'rgba(255,255,255,.85)'
    }
  }, away.name)), React.createElement(ScoreInput, {
    value: draft.away,
    onChange: n => setDraft(d => ({
      ...d,
      away: n
    })),
    disabled: locked,
    label: "Gole"
  })))), needsPen && React.createElement("div", {
    className: "penalty-choice-panel"
  }, React.createElement("div", {
    className: "penalty-choice-head"
  }, React.createElement("span", null, "Seria rzutów karnych"), React.createElement("strong", null, "+", POINTS.knockout.penBonus, " PKT")), React.createElement("p", {
    className: "penalty-choice-title"
  }, "Kto awansuje po karnych?"), React.createElement("div", {
    className: "penalty-choice-grid"
  }, ['home', 'away'].map(side => {
    const t = side === 'home' ? home : away;
    const sel = draft.penWinner === side;
    return React.createElement("button", {
      key: side,
      type: "button",
      onClick: () => setDraft(d => ({
        ...d,
        penWinner: side
      })),
      disabled: locked,
      className: `penalty-choice-card${sel ? ' is-selected' : ''}`
    }, React.createElement("span", {
      className: "penalty-choice-flag"
    }, React.createElement(FlagImg, {
      code: t.flag,
      size: 26,
      title: t.name
    })), React.createElement("span", {
      className: "penalty-choice-team"
    }, t.name), React.createElement("span", {
      className: "penalty-choice-check"
    }, sel ? "✓" : ""));
  })), React.createElement("p", {
    className: "penalty-choice-note"
  }, "Bonus naliczy się tylko wtedy, gdy mecz faktycznie zakończy się karnymi.")), locked && result && React.createElement("div", {
    className: "match-final-result-card"
  }, React.createElement("div", {
    className: "match-final-result-label"
  }, "Wynik końcowy"), React.createElement("div", {
    className: "match-final-result-main"
  }, React.createElement("div", {
    className: "match-final-result-team"
  }, React.createElement("span", {
    className: "match-final-result-name"
  }, home.name), React.createElement(FlagImg, {
    code: home.flag,
    size: 24,
    title: home.name
  })), React.createElement("div", {
    className: "match-final-result-score"
  }, React.createElement("strong", null, result.home), React.createElement("span", null, ":"), React.createElement("strong", null, result.away)), React.createElement("div", {
    className: "match-final-result-team is-away"
  }, React.createElement(FlagImg, {
    code: away.flag,
    size: 24,
    title: away.name
  }), React.createElement("span", {
    className: "match-final-result-name"
  }, away.name))), result.pensHappened && result.advancingTeam && React.createElement("div", {
    className: "match-final-result-note"
  }, React.createElement("span", null, "Awans po karnych"), React.createElement("strong", null, (result.advancingTeam === 'home' ? home : away).name)), prediction && React.createElement("div", {
    className: "match-final-user-pick"
  }, React.createElement("span", null, "Twój typ"), React.createElement("strong", null, prediction.home, ":", prediction.away), prediction.penWinner && React.createElement("span", {
    className: `match-penalty-badge${result.pensHappened && prediction.penWinner === result.advancingTeam ? ' penalty-hit' : result ? ' penalty-miss' : ''}`
  }, FLAG_ABBR[((prediction.penWinner === 'home' ? home : away).flag || '').toLowerCase()] || (prediction.penWinner === 'home' ? home : away).name.slice(0, 3).toUpperCase()), React.createElement("b", {
    className: `match-final-user-points ${quality === 'exact' ? 'is-exact' : quality === 'partial' ? 'is-partial' : 'is-miss'}`
  }, myPoints > 0 ? `+${myPoints} PKT` : '0 PKT'))), phaseLocked && !result && React.createElement("div", {
    className: "text-center text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-center gap-2 app-note app-note--danger app-note--compact app-note--center"
  }, React.createElement(LockIcon, {
    name: "lock",
    size: 16
  }), React.createElement("span", null, "Typowanie tej fazy zosta\u0142o zamkni\u0119te przez admina.")), !locked && React.createElement("div", {
    className: "space-y-2"
  }, needsPin && React.createElement("div", null, React.createElement("input", {
    type: "password",
    inputMode: "numeric",
    value: pin,
    onChange: e => {
      setPin(e.target.value);
      setPinErr('');
    },
    placeholder: "Wpisz sw\xF3j PIN",
    maxLength: 8,
    className: `w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none text-sm text-center tracking-widest ${pinErr ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-[#0d1b5e]'}`
  }), pinErr && React.createElement("p", {
    className: "text-xs text-red-600 font-semibold mt-1 text-center"
  }, pinErr)), React.createElement(Btn, {
    variant: "primary",
    onClick: () => onSavePrediction(match.id, {
      home: draft.home,
      away: draft.away,
      penWinner: needsPen ? draft.penWinner : null
    }, pin, err => setPinErr(err)),
    disabled: !canSave || needsPin && pin.length < 4,
    className: "w-full",
    size: "lg"
  }, React.createElement(Icon, {
    name: "save",
    size: 16
  }), prediction ? 'Zaktualizuj typ' : 'Zapisz typ')), locked && comparisonVisible && matchPredictions && players && React.createElement("div", {
    className: "prediction-list-wrap mt-4 pt-3 border-t border-stone-200"
  }, React.createElement("p", {
    className: "prediction-list-title text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-2"
  }, "Typy wszystkich graczy"), React.createElement("div", {
    className: "prediction-list space-y-1"
  }, players.map(pl => {
    const pp = matchPredictions[pl.id];
    if (!pp) return React.createElement("div", {
      key: pl.id,
      className: "prediction-row prediction-row-empty flex justify-between text-xs py-1 px-2 rounded bg-stone-100"
    }, React.createElement("span", {
      className: "prediction-player-name text-stone-600"
    }, pl.name), React.createElement("span", {
      className: "prediction-empty-label text-stone-400 italic"
    }, "brak"));
    const q = predictionQuality(pp, result, match.phase, scoringSettings);
    const pts = scoreMatch(pp, result, match.phase, scoringSettings);
    const bgStyle = q === 'exact' ? {
      background: 'rgba(0,160,60,.30)',
      border: '1px solid rgba(0,220,80,.45)',
      color: 'white'
    } : q === 'partial' ? {
      background: 'rgba(200,100,0,.30)',
      border: '1px solid rgba(220,140,0,.45)',
      color: 'white'
    } : result ? {
      background: 'rgba(180,0,0,.28)',
      border: '1px solid rgba(220,0,0,.40)',
      color: 'white'
    } : {
      background: 'rgba(255,255,255,.04)',
      border: '1px solid rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.7)'
    };
    const rowState = q === 'exact' ? 'exact' : q === 'partial' ? 'partial' : result ? 'miss' : 'pending';
    const penaltyHit = !!(result?.pensHappened && pp.penWinner && pp.penWinner === result.advancingTeam);
    const penaltyMiss = !!(result && pp.penWinner && !penaltyHit);
    return React.createElement("div", {
      key: pl.id,
      className: `prediction-row prediction-row-${rowState}`,
      style: {
        ...bgStyle,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 10px',
        borderRadius: 16,
        marginBottom: 3,
        gap: 10
      }
    }, React.createElement("span", {
      className: "prediction-player-name",
      style: {
        fontWeight: 600,
        fontSize: 13,
        minWidth: 0,
        flex: '1 1 auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, pl.name), React.createElement("span", {
      className: "prediction-score-grid",
      style: {
        display: 'grid',
        gridTemplateColumns: '44px 42px 28px',
        alignItems: 'center',
        columnGap: 8,
        minWidth: 122,
        fontFamily: 'monospace',
        fontSize: 13,
        fontVariantNumeric: 'tabular-nums',
        justifyItems: 'end',
        flex: '0 0 auto'
      }
    }, React.createElement("strong", {
      className: "prediction-score-value",
      style: {
        width: '44px',
        textAlign: 'right'
      }
    }, pp.home, ":", pp.away), React.createElement("span", {
      className: `prediction-penalty${penaltyHit ? ' penalty-hit' : penaltyMiss ? ' penalty-miss' : ''}`,
      style: {
        width: '42px',
        textAlign: 'right',
        opacity: pp.penWinner?.length ? 0.8 : 0,
        fontSize: 11,
        whiteSpace: 'nowrap'
      }
    }, pp.penWinner ? FLAG_ABBR[((pp.penWinner === 'home' ? home : away)?.flag || '').toLowerCase()] || ((pp.penWinner === 'home' ? home : away)?.name || '').slice(0, 3).toUpperCase() : ''), React.createElement("span", {
      className: "prediction-points",
      style: {
        width: '28px',
        textAlign: 'right',
        fontWeight: 800,
        color: q === 'exact' ? '#30d158' : q === 'partial' ? '#ff9f0a' : '#ff453a'
      }
    }, pts > 0 ? `+${pts}` : '0')));
  })))))));
});

// ═══════════════════════════════════════════════════════════════
//  WIDOK: MECZE
// ═══════════════════════════════════════════════════════════════
function MatchesView({
  matches,
  teams,
  predictions,
  results,
  players,
  activePlayerId,
  phaseLocks,
  onSavePrediction,
  scoringSettings
}) {
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const autoPhaseFilterRef = useRef('all');
  const phaseFilterTouchedRef = useRef(false);
  const [expandedId, setExpandedId] = useState(null);
  const [compactDevice, setCompactDevice] = useState(() => typeof window !== "undefined" && (window.innerWidth <= 700 || window.matchMedia("(pointer: coarse)").matches));
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setCompactDevice(window.innerWidth <= 700 || window.matchMedia("(pointer: coarse)").matches);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const [visibleCount, setVisibleCount] = useState(() => compactDevice ? 18 : Number.MAX_SAFE_INTEGER);
  const handleToggleMatch = useCallback(id => setExpandedId(prev => prev === id ? null : id), []);
  const defaultResultPhase = useMemo(() => getLatestResultPhase(matches, results), [matches, results]);
  useEffect(() => {
    if (defaultResultPhase === 'all') return;
    const canAutoSelect = !phaseFilterTouchedRef.current || phaseFilter === autoPhaseFilterRef.current;
    if (!canAutoSelect) return;
    autoPhaseFilterRef.current = defaultResultPhase;
    if (phaseFilter !== defaultResultPhase) setPhaseFilter(defaultResultPhase);
    setGroupFilter('all');
  }, [defaultResultPhase, phaseFilter]);
  const handlePhaseFilter = useCallback(phase => {
    phaseFilterTouchedRef.current = true;
    setPhaseFilter(phase);
  }, []);
  const filtered = useMemo(() => {
    return matches.filter(m => {
      if (phaseFilter !== 'all' && m.phase !== phaseFilter) return false;
      if (phaseFilter === 'group' && groupFilter !== 'all' && m.group !== groupFilter) return false;
      if (statusFilter === 'pending' && results[m.id]) return false;
      if (statusFilter === 'done' && !results[m.id]) return false;
      return true;
    }).sort((a, b) => (PHASE_RANK[a.phase] ?? 99) - (PHASE_RANK[b.phase] ?? 99) || a.num - b.num);
  }, [matches, phaseFilter, groupFilter, statusFilter, results]);
  const comparisonVisible = !!(phaseLocks && phaseLocks.compareVisible);
  // Mapa matchId -> { playerId: typ } liczona raz na zmianę `predictions`.
  // Dzięki temu, gdy porównanie jest ukryte, karty nie re-renderują się
  // przy zmianie cudzych typów (przekazujemy null zamiast całego obiektu).
  const predictionsByMatch = useMemo(() => {
    const map = {};
    for (const key in predictions) {
      const i = key.indexOf(':');
      if (i < 0) continue;
      const pid = key.slice(0, i);
      const mid = key.slice(i + 1);
      (map[mid] || (map[mid] = {}))[pid] = predictions[key];
    }
    return map;
  }, [predictions]);
  useEffect(() => {
    setVisibleCount(compactDevice ? 18 : Number.MAX_SAFE_INTEGER);
    setExpandedId(null);
  }, [phaseFilter, groupFilter, statusFilter, compactDevice]);
  const visibleMatches = compactDevice ? filtered.slice(0, visibleCount) : filtered;
  const hasMoreMatches = compactDevice && visibleCount < filtered.length;
  const filterBtns = PHASE_FILTER_TABS;
  const filterPanel = React.createElement("div", {
    className: "phase-filter-panel fixed-filter-portal-panel bg-white border border-[#b0bce8] rounded-xl p-3 filters-sticky shadow-sm"
  }, React.createElement("div", {
    className: "flex flex-col gap-1"
  }, React.createElement("div", {
    className: "chip-scroll-row tight"
  }, filterBtns.map(t => React.createElement("button", {
    key: t.k,
    onClick: () => handlePhaseFilter(t.k),
    className: `selection-tile${phaseFilter === t.k ? ' is-selected' : ''} shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold`
  }, t.l))), phaseFilter === 'group' && React.createElement("div", {
    className: "chip-scroll-row tight"
  }, React.createElement("button", {
    onClick: () => {
      setGroupFilter('all');
    },
    className: `selection-tile${groupFilter === 'all' ? ' is-selected' : ''} shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold`
  }, "Wszystkie"), GROUPS.map(g => React.createElement("button", {
    key: g,
    onClick: () => {
      setGroupFilter(g);
    },
    className: `selection-tile${groupFilter === g ? ' is-selected' : ''} shrink-0 w-8 h-7 rounded-lg text-xs font-bold`
  }, g))), React.createElement("div", {
    className: "edge-safe-row flex gap-1 items-center py-0.5"
  }, [{
    k: 'all',
    l: 'Wszystkie'
  }, {
    k: 'pending',
    l: 'Nadchodzące'
  }, {
    k: 'done',
    l: 'Zakończone'
  }].map(t => React.createElement("button", {
    key: t.k,
    onClick: () => {
      setStatusFilter(t.k);
    },
    className: `selection-tile${statusFilter === t.k ? ' is-selected' : ''} flex-1 px-2 py-1 rounded-lg text-xs font-medium`
  }, t.l)))), React.createElement("div", {
    className: "text-[11px] text-stone-500 mt-1 text-center"
  }, filtered.length, " ", plMecze(filtered.length)));
  return React.createElement("div", {
    className: "matches-view space-y-3"
  }, filterPanel, visibleMatches.map(m => React.createElement(MatchCard, {
    key: m.id,
    match: m,
    teams: teams,
    prediction: predictions[`${activePlayerId}:${m.id}`],
    result: results[m.id],
    matchPredictions: comparisonVisible ? predictionsByMatch[m.id] || {} : null,
    players: players,
    activePlayerId: activePlayerId,
    phaseLocks: phaseLocks,
    onSavePrediction: onSavePrediction,
    scoringSettings: scoringSettings,
    expanded: expandedId === m.id,
    onToggleMatch: handleToggleMatch
  })), hasMoreMatches && React.createElement("button", {
    type: "button",
    onClick: () => setVisibleCount(count => count + 18),
    className: "selection-tile w-full rounded-xl px-4 py-3 text-sm font-semibold"
  }, "Poka\u017C kolejne mecze (", filtered.length - visibleCount, ")"), filtered.length === 0 && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "text-center text-stone-500 app-note app-note--info app-note--center matches-empty-note",
    style: {
      minHeight: 130,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "Brak mecz\xF3w dla wybranych filtr\xF3w"), React.createElement("div", {
    "aria-hidden": "true",
    style: {
      minHeight: "calc(100dvh - var(--header-height, 80px) - 310px)"
    }
  })));
}

// ═══════════════════════════════════════════════════════════════
//  WIDOK: TYPY SPECJALNE
// ═══════════════════════════════════════════════════════════════
function SpecialsView({
  teams,
  players,
  activePlayerId,
  specialPredictions,
  specialResults,
  onSaveSpecial,
  tournamentLocked,
  specialsLocked,
  scoringSettings
}) {
  const mine = specialPredictions[activePlayerId] || {
    groupOrders: {},
    champion: '',
    runnerUp: '',
    third: '',
    topScorer: '',
    mvp: ''
  };
  const [draft, setDraft] = useState(mine);
  const [activeGroup, setActiveGroup] = useState('A');
  const [pin, setPin] = useState('');
  const [pinErr, setPinErr] = useState('');
  const [validErr, setValidErr] = useState('');
  useEffect(() => {
    setDraft(specialPredictions[activePlayerId] || {
      groupOrders: {},
      champion: '',
      runnerUp: '',
      third: '',
      topScorer: '',
      mvp: ''
    });
    setPin('');
    setPinErr('');
    setValidErr('');
  }, [activePlayerId, specialPredictions]);
  const validate = () => {
    // Sprawdź kolejność we wszystkich grupach
    for (const g of GROUPS) {
      const order = draft.groupOrders[g] || [];
      const filled = order.filter(Boolean);
      if (filled.length < 4) return `Uzupełnij kolejność wszystkich 4 drużyn w grupie ${g}`;
      if (new Set(filled).size < 4) return `W grupie ${g} ta sama drużyna jest wybrana więcej niż raz`;
    }
    if (!draft.champion) return 'Wybierz zwycięzcę turnieju';
    if (!draft.runnerUp) return 'Wybierz 2. miejsce turnieju';
    if (!draft.third) return 'Wybierz 3. miejsce turnieju';
    if (draft.champion === draft.runnerUp || draft.champion === draft.third || draft.runnerUp === draft.third) return 'Podium — każde miejsce musi być inną drużyną';
    if (!(draft.topScorer || '').trim()) return 'Wpisz króla strzelców';
    if (!(draft.mvp || '').trim()) return 'Wpisz MVP turnieju';
    return null;
  };
  const activePl = players && players.find && players.find(p => p.id === activePlayerId);
  const needsPin = !!(activePl && activePl.pinHash);
  const teamOptions = useMemo(() => Object.values(teams).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name)), [teams]);
  const teamsOfGroup = g => Object.values(teams).filter(t => t && t.group === g);
  const setGroupOrder = (g, pos, teamId) => {
    setDraft(d => {
      const order = [...(d.groupOrders[g] || [null, null, null, null])];
      for (let i = 0; i < 4; i++) if (order[i] === teamId) order[i] = null;
      order[pos] = teamId;
      return {
        ...d,
        groupOrders: {
          ...d.groupOrders,
          [g]: order
        }
      };
    });
  };
  const myScores = useMemo(() => scoreSpecials(mine, specialResults, scoringSettings), [mine, specialResults, scoringSettings]);
  const hasResults = !!(specialResults?.champion || specialResults?.topScorer || Object.keys(specialResults?.groupOrders || {}).length > 0);
  React.useEffect(() => {
    let raf = null;
    const updateOverflow = () => {
      document.querySelectorAll('.specials-view .specials-team-name').forEach(el => {
        el.classList.toggle('is-overflowing', el.scrollWidth > el.clientWidth + 1);
      });
    };
    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateOverflow);
    };
    schedule();
    window.addEventListener('resize', schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', schedule);
    };
  }, [activeGroup, draft.groupOrders, specialResults, tournamentLocked, specialsLocked]);
  if (!activePlayerId) return React.createElement("div", {
    className: "text-center text-sm text-stone-600 bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4 app-note app-note--warning app-note--center"
  }, "Wybierz uczestnika na g\xF3rze ekranu");
  return React.createElement("div", {
    className: "specials-view space-y-4"
  }, (tournamentLocked || specialsLocked) && React.createElement("div", {
    className: "bg-[#0d1b5e] text-white rounded-lg p-3 text-sm flex items-center gap-2 mb-3 app-note app-note--danger app-note--compact"
  }, React.createElement(LockIcon, {
    name: "lock",
    size: 16,
    className: "text-amber-400"
  }), React.createElement("span", null, specialsLocked && !tournamentLocked ? 'Typowanie specjalne zostało zamknięte przez admina.' : 'Typy specjalne są zablokowane — turniej już się rozpoczął.')), React.createElement("section", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h3", {
    className: "font-display text-lg tracking-wide text-stone-900 mb-1"
  }, "Kolejno\u015B\u0107 w grupach"), React.createElement("p", {
    className: "text-xs text-stone-500 mb-3"
  }, "1 trafione: ", POINTS.groupOrderOne, " PKT \u2022 2 trafione: ", POINTS.groupOrderTwo, " PKT \u2022 wszystkie 4: ", POINTS.groupOrderAll, " PKT"), React.createElement("div", {
    className: "group-order-filter-row pill-scroll-safe flex gap-1 p-2",
    style: { overflow: 'hidden' }
  }, React.createElement(InfiniteGroupFilter, {
    selected: activeGroup,
    onSelect: setActiveGroup,
    btnClass: 'selection-tile shrink-0 w-10 h-10 rounded-lg font-bold'
  })), [0, 1, 2, 3].map(pos => {
    const placeName = ['1. miejsce', '2. miejsce', '3. miejsce', '4. miejsce'][pos];
    const order = draft.groupOrders[activeGroup] || [];
    const selected = order[pos];
    const realOrder = specialResults?.groupOrders?.[activeGroup] || [];
    const isCorrect = hasResults && realOrder[pos] && realOrder[pos] === selected;
    return React.createElement("div", {
      key: pos,
      className: "specials-position-card",
      style: isCorrect ? {
        background: 'rgba(0,160,60,.30)',
        borderColor: 'rgba(0,220,80,.45)'
      } : hasResults && realOrder[pos] && selected && !isCorrect ? {
        background: 'rgba(180,0,0,.28)',
        borderColor: 'rgba(220,0,0,.40)'
      } : {}
    }, React.createElement("div", {
      className: "flex items-center justify-between mb-1.5"
    }, React.createElement("span", {
      className: "text-xs font-bold text-stone-700"
    }, placeName)), React.createElement("div", {
      className: "grid grid-cols-2 sm:grid-cols-4 gap-1.5"
    }, teamsOfGroup(activeGroup).map(t => {
      const sel = selected === t.id;
      const correct = sel && isCorrect;
      const wrong = sel && hasResults && realOrder[pos] && !isCorrect;
      return React.createElement("button", {
        key: t.id,
        onClick: () => setGroupOrder(activeGroup, pos, t.id),
        disabled: tournamentLocked || specialsLocked,
        style: correct ? {
          background: 'rgba(0,160,60,.30)',
          borderColor: 'rgba(0,220,80,.45)',
          color: '#30d158'
        } : wrong ? {
          background: 'rgba(180,0,0,.28)',
          borderColor: 'rgba(220,0,0,.40)',
          color: '#ff453a'
        } : {},
        className: `selection-tile${correct ? ' is-correct' : wrong ? ' is-wrong' : sel ? ' is-selected' : ''} px-2 py-2 rounded-lg text-xs font-semibold border transition-all disabled:opacity-60 inline-flex items-center gap-2 justify-start min-w-0`
      }, React.createElement(FlagImg, {
        code: t.flag,
        size: 16,
        title: t.name
      }), React.createElement("span", {
        className: "specials-team-name min-w-0 truncate"
      }, t.name), correct && React.createElement(Icon, {
        name: "check",
        size: 13,
        className: "shrink-0"
      }), wrong && React.createElement(Icon, {
        name: "x",
        size: 13,
        className: "shrink-0"
      }));
    })));
  })), React.createElement("section", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h3", {
    className: "font-display text-lg tracking-wide text-stone-900 mb-3"
  }, "Podium turnieju"), [{
    key: 'champion',
    label: 'Zwycięzca',
    pts: POINTS.champion
  }, {
    key: 'runnerUp',
    label: '2. miejsce',
    pts: POINTS.runnerUp
  }, {
    key: 'third',
    label: '3. miejsce',
    pts: POINTS.third
  }].map(item => {
    const realVal = specialResults?.[item.key];
    const isCorrect = realVal && draft[item.key] === realVal;
    return React.createElement("div", {
      key: item.key,
      className: "mb-3 last:mb-0"
    }, React.createElement("label", {
      className: "text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1.5"
    }, item.label, " ", React.createElement("span", {
      className: "text-stone-400"
    }, "(", item.pts, " PKT)"), isCorrect && React.createElement(Badge, {
      variant: "success"
    }, "+", item.pts)), React.createElement(TeamPicker, {
      value: draft[item.key] || '',
      onChange: teamId => setDraft(d => ({
        ...d,
        [item.key]: teamId
      })),
      options: teamOptions,
      disabled: tournamentLocked || specialsLocked,
      placeholder: "\u2014 wybierz dru\u017Cyn\u0119 \u2014",
      status: isCorrect ? 'correct' : realVal && draft[item.key] && !isCorrect ? 'wrong' : ''
    }));
  })), React.createElement("section", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h3", {
    className: "font-display text-lg tracking-wide text-stone-900 mb-3"
  }, "Nagrody indywidualne"), React.createElement("div", {
    className: "mb-3"
  }, React.createElement("label", {
    className: "text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1.5"
  }, React.createElement(Icon, {
    name: "target",
    size: 16,
    className: "text-[#0d1b5e]"
  }), "Kr\xF3l strzelc\xF3w ", React.createElement("span", {
    className: "text-stone-400"
  }, "(", POINTS.topScorer, " PKT)")), React.createElement(AutocompleteInput, {
    value: draft.topScorer,
    onChange: v => setDraft(d => ({
      ...d,
      topScorer: v
    })),
    suggestions: STAR_PLAYERS,
    placeholder: "np. Kylian Mbapp\xE9",
    disabled: tournamentLocked || specialsLocked
  })), React.createElement("div", null, React.createElement("label", {
    className: "text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1.5"
  }, React.createElement(Icon, {
    name: "sparkles",
    size: 16,
    className: "text-amber-500"
  }), "MVP turnieju ", React.createElement("span", {
    className: "text-stone-400"
  }, "(", POINTS.mvp, " PKT)")), React.createElement(AutocompleteInput, {
    value: draft.mvp,
    onChange: v => setDraft(d => ({
      ...d,
      mvp: v
    })),
    suggestions: STAR_PLAYERS,
    placeholder: "np. Jude Bellingham",
    disabled: tournamentLocked || specialsLocked
  }))), !(tournamentLocked || specialsLocked) && React.createElement("div", {
    className: "space-y-2 mt-2"
  }, validErr && React.createElement("div", {
    className: "bg-red-50 border-2 border-red-400 rounded-xl p-3 flex items-start gap-2 app-note app-note--danger"
  }, React.createElement(Icon, {
    name: "alert",
    size: 19,
    className: "text-red-500 shrink-0"
  }), React.createElement("div", null, React.createElement("p", {
    className: "text-sm font-bold text-red-700 uppercase tracking-wide"
  }, "Uzupe\u0142nij wszystkie dane"), React.createElement("p", {
    className: "text-xs text-red-600 mt-0.5"
  }, validErr))), needsPin && React.createElement("div", null, React.createElement("input", {
    type: "password",
    inputMode: "numeric",
    value: pin,
    onChange: e => {
      setPin(e.target.value);
      setPinErr('');
    },
    placeholder: "Wpisz sw\xF3j PIN, \u017Ceby zapisa\u0107",
    maxLength: 8,
    className: `w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none text-sm text-center tracking-widest ${pinErr ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-[#0d1b5e]'}`
  }), pinErr && React.createElement("p", {
    className: "text-xs text-red-600 font-semibold mt-1 text-center"
  }, pinErr)), React.createElement(Btn, {
    variant: "primary",
    size: "lg",
    onClick: () => {
      const err = validate();
      if (err) {
        setValidErr(err);
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
        return;
      }
      setValidErr('');
      onSaveSpecial(activePlayerId, draft, pin, err => setPinErr(err));
    },
    disabled: needsPin && pin.length < 4,
    className: "w-full"
  }, React.createElement(Icon, {
    name: "save",
    size: 18
  }), "Zapisz typy specjalne")), hasResults && React.createElement("div", {
    className: "specials-score-banner"
  }, React.createElement("h4", {
    className: "font-display text-base tracking-wide mb-2 text-[#c8d4f4]"
  }, "Twoje punkty specjalne"), React.createElement("div", {
    className: "grid grid-cols-3 gap-2 text-center"
  }, React.createElement("div", null, React.createElement("div", {
    className: "text-2xl font-display"
  }, myScores.groupOrders), React.createElement("div", {
    className: "text-[10px] uppercase text-[#a0b4e8]"
  }, "Grupy")), React.createElement("div", null, React.createElement("div", {
    className: "text-2xl font-display"
  }, myScores.podium), React.createElement("div", {
    className: "text-[10px] uppercase text-[#a0b4e8]"
  }, "Podium")), React.createElement("div", null, React.createElement("div", {
    className: "text-2xl font-display"
  }, myScores.awards), React.createElement("div", {
    className: "text-[10px] uppercase text-[#a0b4e8]"
  }, "Nagrody"))), React.createElement("div", {
    className: "text-center mt-2 pt-2 border-t border-[#162570]"
  }, React.createElement("span", {
    className: "text-3xl font-display"
  }, myScores.total), React.createElement("span", {
    className: "text-sm text-[#a0b4e8] ml-1"
  }, "PKT \u0142\u0105cznie"))));
}

// ═══════════════════════════════════════════════════════════════
//  WIDOK: TYPY SPECJALNE WSZYSTKICH GRACZY
// ═══════════════════════════════════════════════════════════════
function SpecialsAllView({
  players,
  specialPredictions,
  specialResults,
  teams
}) {
  const [selGroup, setSelGroup] = useState('A');
  const hasResults = !!(specialResults?.champion || specialResults?.topScorer || Object.keys(specialResults?.groupOrders || {}).length > 0);
  const teamName = id => teams[id]?.name || id;
  const teamFlag = id => teams[id]?.flag || '';
  const teamAbbr = id => {
    const flag = teamFlag(id);
    if (flag && FLAG_ABBR[flag.toLowerCase()]) return FLAG_ABBR[flag.toLowerCase()];
    // fallback: szukaj po polskiej nazwie
    const name = teamName(id);
    if (name && name !== id) {
      const abbr = NAME_TO_ABBR[name.toLowerCase()];
      if (abbr) return abbr;
    }
    return name && name !== id ? name.slice(0, 3).toUpperCase() : '???';
  };
  return React.createElement("div", {
    className: "allspecials-view space-y-3"
  }, React.createElement("div", {
    className: "bg-white border border-stone-200 rounded-xl overflow-hidden table-card"
  }, React.createElement("div", {
    className: "px-4 py-3 text-sm font-bold tracking-wide text-stone-800 flex items-center justify-between"
  }, React.createElement("span", null, "Kolejno\u015B\u0107 w grupach")), React.createElement("div", {
    className: "group-order-filter-row pill-scroll-safe allspecials-group-filter-centered flex gap-1 py-2 pl-3 pr-2",
    style: { overflow: 'hidden' }
  }, React.createElement(InfiniteGroupFilter, {
    selected: selGroup,
    onSelect: setSelGroup,
    btnClass: 'selection-tile shrink-0 w-10 h-10 rounded-lg font-bold'
  })), React.createElement("div", {
    className: "overflow-x-auto"
  }, React.createElement("table", {
    className: "w-full text-xs"
  }, React.createElement("thead", null, React.createElement("tr", {
    className: "bg-stone-50 border-b border-stone-200"
  }, React.createElement("th", {
    className: "px-3 py-2 text-left font-semibold text-stone-600"
  }, "Gracz"), [1, 2, 3, 4].map(pos => React.createElement("th", {
    key: pos,
    className: "px-2 py-2 text-center font-semibold text-stone-600"
  }, pos, ".")))), React.createElement("tbody", null, players.map(pl => {
    const order = (specialPredictions[pl.id]?.groupOrders || {})[selGroup] || [];
    const real = (specialResults?.groupOrders || {})[selGroup] || [];
    return React.createElement("tr", {
      key: pl.id,
      className: "border-b border-stone-100 last:border-0"
    }, React.createElement("td", {
      className: "px-3 py-2 font-semibold text-stone-800 truncate max-w-[100px]"
    }, pl.name), [0, 1, 2, 3].map(i => {
      const tid = order[i];
      const positionResolved = !!real[i];
      const isOk = positionResolved && !!tid && real[i] === tid;
      const isWrong = positionResolved && !!tid && real[i] !== tid;
      const statusClass = isOk ? 'all-special-status-correct' : isWrong ? 'all-special-status-wrong' : 'all-special-status-neutral';
      return React.createElement("td", {
        key: i,
        className: "px-2 py-2 text-center"
      }, tid ? React.createElement("span", {
        className: `${statusClass} inline-flex items-center justify-center gap-0.5`,
        style: {
          fontSize: 11,
          fontFamily: 'monospace',
          letterSpacing: '0.04em',
          verticalAlign: 'middle'
        },
        title: teamName(tid)
      }, teamAbbr(tid), isOk && React.createElement(Icon, {
        name: "check",
        size: 9
      }), isWrong && React.createElement(Icon, {
        name: "x",
        size: 9
      })) : React.createElement("span", {
        className: "text-stone-300"
      }, "\u2014"));
    }));
  }))))), React.createElement("div", {
    className: "bg-white border border-stone-200 rounded-xl overflow-hidden table-card"
  }, React.createElement("div", {
    className: "px-4 py-3 text-sm font-bold tracking-wide text-stone-800"
  }, "Podium turnieju"), React.createElement("div", {
    className: "overflow-x-auto"
  }, React.createElement("table", {
    className: "w-full text-xs"
  }, React.createElement("thead", null, React.createElement("tr", {
    className: "bg-stone-50 border-b border-stone-200"
  }, React.createElement("th", {
    className: "px-3 py-2 text-left font-semibold text-stone-600"
  }, "Gracz"), React.createElement("th", {
    className: "px-2 py-2 text-center"
  }, "1."), React.createElement("th", {
    className: "px-2 py-2 text-center"
  }, "2."), React.createElement("th", {
    className: "px-2 py-2 text-center"
  }, "3."))), React.createElement("tbody", null, players.map(pl => {
    const sp = specialPredictions[pl.id] || {};
    const chk = key => !!specialResults?.[key] && sp[key] === specialResults[key];
    return React.createElement("tr", {
      key: pl.id,
      className: "border-b border-stone-100 last:border-0"
    }, React.createElement("td", {
      className: "px-3 py-2 font-semibold text-stone-800 truncate max-w-[100px]"
    }, pl.name), ['champion', 'runnerUp', 'third'].map(key => {
      const isOk = chk(key);
      const isWrong = !!specialResults?.[key] && !!sp[key] && sp[key] !== specialResults[key];
      const statusClass = isOk ? 'all-special-status-correct' : isWrong ? 'all-special-status-wrong' : 'all-special-status-neutral';
      return React.createElement("td", {
        key: key,
        className: "px-2 py-2 text-center"
      }, sp[key] ? React.createElement("span", {
        className: `${statusClass} inline-flex items-center justify-center gap-0.5`,
        style: {
          fontSize: 11,
          fontFamily: 'monospace',
          letterSpacing: '0.04em',
          verticalAlign: 'middle'
        },
        title: teamName(sp[key])
      }, teamAbbr(sp[key]), isOk && React.createElement(Icon, {
        name: "check",
        size: 9
      }), isWrong && React.createElement(Icon, {
        name: "x",
        size: 9
      })) : React.createElement("span", {
        className: "text-stone-300"
      }, "\u2014"));
    }));
  }))))), React.createElement("div", {
    className: "bg-white border border-stone-200 rounded-xl overflow-hidden table-card"
  }, React.createElement("div", {
    className: "px-4 py-3 text-sm font-bold tracking-wide text-stone-800"
  }, "Nagrody indywidualne"), React.createElement("div", {
    className: "overflow-x-auto"
  }, React.createElement("table", {
    className: "w-full text-xs"
  }, React.createElement("thead", null, React.createElement("tr", {
    className: "bg-stone-50 border-b border-stone-200"
  }, React.createElement("th", {
    className: "px-3 py-2 text-left font-semibold text-stone-600"
  }, "Gracz"), React.createElement("th", {
    className: "px-3 py-2 text-left font-semibold text-stone-600"
  }, "Kr\xF3l strzelc\xF3w"), React.createElement("th", {
    className: "px-3 py-2 text-left font-semibold text-stone-600"
  }, "MVP"))), React.createElement("tbody", null, players.map(pl => {
    const sp = specialPredictions[pl.id] || {};
    const norm = s => (s || '').trim().toLowerCase();
    const okScorer = !!specialResults?.topScorer && norm(sp.topScorer) === norm(specialResults.topScorer);
    const okMvp = !!specialResults?.mvp && norm(sp.mvp) === norm(specialResults.mvp);
    const scorerWrong = !!specialResults?.topScorer && !!sp.topScorer && !okScorer;
    const mvpWrong = !!specialResults?.mvp && !!sp.mvp && !okMvp;
    return React.createElement("tr", {
      key: pl.id,
      className: "border-b border-stone-100 last:border-0"
    }, React.createElement("td", {
      className: "px-3 py-2 font-semibold text-stone-800 truncate max-w-[80px]"
    }, pl.name), React.createElement("td", {
      className: "px-3 py-2"
    }, React.createElement("span", {
      className: `inline-flex items-center gap-1 ${okScorer ? 'all-special-status-correct' : scorerWrong ? 'all-special-status-wrong' : ''}`
    }, sp.topScorer || React.createElement("span", {
      className: "text-stone-300"
    }, "\u2014"), okScorer && React.createElement(Icon, {
      name: "check",
      size: 11
    }), scorerWrong && React.createElement(Icon, {
      name: "x",
      size: 11
    }))), React.createElement("td", {
      className: "px-3 py-2"
    }, React.createElement("span", {
      className: `inline-flex items-center gap-1 ${okMvp ? 'all-special-status-correct' : mvpWrong ? 'all-special-status-wrong' : ''}`
    }, sp.mvp || React.createElement("span", {
      className: "text-stone-300"
    }, "\u2014"), okMvp && React.createElement(Icon, {
      name: "check",
      size: 11
    }), mvpWrong && React.createElement(Icon, {
      name: "x",
      size: 11
    }))));
  }))))));
}

// ═══════════════════════════════════════════════════════════════
//  WIDOK: RANKING
// ═══════════════════════════════════════════════════════════════

function LeaderboardView({
  players,
  matches,
  predictions,
  results,
  specialPredictions,
  specialResults,
  scoringSettings
}) {
  const ranking = useMemo(() => {
    return players.map(pl => {
      let gm = 0,
        km = 0,
        exact = 0,
        partial = 0,
        incorrect = 0;
      matches.forEach(m => {
        const pred = predictions[`${pl.id}:${m.id}`],
          res = results[m.id];
        if (!pred || !res) return;
        const pts = scoreMatch(pred, res, m.phase, scoringSettings);
        const q = predictionQuality(pred, res, m.phase, scoringSettings);
        if (q === 'exact') exact++;else if (q === 'partial') partial++;else if (q === 'miss') incorrect++;
        if (m.phase === 'group') gm += pts;else km += pts;
      });
      const sp = scoreSpecials(specialPredictions[pl.id], specialResults, scoringSettings);
      return {
        player: pl,
        gm,
        km,
        specials: sp.total,
        go: sp.groupOrders,
        podium: sp.podium,
        awards: sp.awards,
        total: gm + km + sp.total,
        exact,
        partial,
        incorrect
      };
    }).sort(compareRankingEntries);
  }, [players, matches, predictions, results, specialPredictions, specialResults, scoringSettings]);
  const categoryMaximums = useMemo(() => {
    const cfg = normalizePointsSettings(scoringSettings);
    const groupMatchCount = matches.filter(m => m.phase === 'group').length;
    const knockoutMatchCount = matches.filter(m => m.phase !== 'group').length;
    return {
      gm: groupMatchCount * Math.max(cfg.group.exact, cfg.group.winner),
      km: knockoutMatchCount * Math.max(cfg.knockout.exact, cfg.knockout.winner),
      go: GROUPS.length * Math.max(cfg.groupOrderAll, cfg.groupOrderTwo, cfg.groupOrderOne),
      podium: cfg.champion + cfg.runnerUp + cfg.third,
      awards: cfg.topScorer + cfg.mvp
    };
  }, [matches, scoringSettings]);
  const categoryCompletion = useMemo(() => {
    const groupMatches = matches.filter(m => m.phase === 'group');
    const knockoutMatches = matches.filter(m => m.phase !== 'group');
    const completeGroupOrder = group => {
      const order = specialResults?.groupOrders?.[group];
      return Array.isArray(order) && order.length >= 4 && order.slice(0, 4).every(Boolean) && new Set(order.slice(0, 4)).size === 4;
    };
    return {
      gm: groupMatches.length > 0 && groupMatches.every(m => !!results?.[m.id]),
      km: knockoutMatches.length > 0 && knockoutMatches.every(m => !!results?.[m.id]),
      go: GROUPS.length > 0 && GROUPS.every(completeGroupOrder),
      podium: !!(specialResults?.champion && specialResults?.runnerUp && specialResults?.third),
      awards: !!((specialResults?.topScorer || '').trim() && (specialResults?.mvp || '').trim())
    };
  }, [matches, results, specialResults]);
  if (players.length === 0) return React.createElement("div", {
    className: "text-center text-stone-600 bg-stone-100 border border-stone-200 rounded-lg p-6"
  }, "Brak graczy.");
  return React.createElement("div", {
    className: "leaderboard-view space-y-2"
  }, React.createElement("div", {
    className: "leaderboard-header rounded-xl p-4"
  }, React.createElement("h3", {
    className: "font-display text-2xl tracking-wider"
  }, "Klasyfikacja"), React.createElement("p", {
    className: "text-xs mt-1"
  }, "Punktacja na \u017Cywo")), ranking.map((r, idx) => {
    const positionLabel = `#${idx + 1}`;
    return React.createElement("div", {
      key: r.player.id,
      className: `leaderboard-card deferred-card match-card-enter bg-white border rounded-xl overflow-hidden ${idx === 0 && r.total > 0 ? 'border-amber-400 shadow-md' : 'border-stone-200'}`
    }, React.createElement("div", {
      className: "leaderboard-card-body p-3 sm:p-4"
    }, React.createElement("div", {
      className: "leaderboard-card-summary flex items-center justify-between gap-3 mb-2"
    }, React.createElement("div", {
      className: "leaderboard-player-block flex items-center gap-3 min-w-0 flex-1"
    }, React.createElement("div", {
      className: "leaderboard-position-badge",
      style: {
        width: 36,
        height: 36,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: 900,
        flexShrink: 0,
        background: idx === 0 ? 'rgba(217,119,6,.5)' : idx === 1 ? 'rgba(156,163,175,.25)' : idx === 2 ? 'rgba(180,83,9,.35)' : 'rgba(255,255,255,.1)',
        color: idx === 0 ? '#fde68a' : idx === 1 ? '#e5e7eb' : idx === 2 ? '#fdba74' : 'rgba(255,255,255,.6)',
        border: idx === 0 ? '1px solid rgba(253,230,138,.4)' : idx === 1 ? '1px solid rgba(229,231,235,.2)' : idx === 2 ? '1px solid rgba(253,186,116,.3)' : '1px solid rgba(255,255,255,.12)'
      }
    }, positionLabel), React.createElement("div", {
      className: "leaderboard-player-info min-w-0 flex-1"
    }, React.createElement("div", {
      className: "leaderboard-player-name font-semibold text-stone-900 truncate"
    }, r.player.name), React.createElement("div", {
      className: "leaderboard-stats text-[11px] leading-snug",
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2px 6px'
      }
    }, React.createElement("span", {
      className: "rank-stat rank-stat-exact",
      style: {
        color: '#30d158'
      }
    }, "Dok\u0142adne wyniki: ", r.exact), React.createElement("span", {
      className: "rank-stat rank-stat-partial",
      style: {
        color: '#ff9f0a'
      }
    }, "Trafione rozstrzygni\u0119cia: ", r.partial), React.createElement("span", {
      className: "rank-stat rank-stat-miss",
      style: {
        color: '#ff453a'
      }
    }, "Niepoprawne typy: ", r.incorrect)))), React.createElement("div", {
      className: "leaderboard-total text-right shrink-0"
    }, React.createElement("div", {
      className: "leaderboard-total-value font-display text-3xl tracking-wider text-stone-900 leading-none"
    }, r.total), React.createElement("div", {
      className: "leaderboard-total-label text-[10px] uppercase tracking-wider text-stone-500"
    }, "PKT"))), React.createElement("details", {
      className: "leaderboard-phase-details"
    }, React.createElement("summary", {
      className: "leaderboard-phase-summary"
    }, React.createElement("span", {
      className: "leaderboard-phase-summary-label"
    }, "Rozk\u0142ad punkt\xF3w"), React.createElement("span", {
      className: "leaderboard-phase-chevron"
    }, React.createElement(Icon, {
      name: "chevdown",
      size: 16
    }))), React.createElement("div", {
      className: "leaderboard-phase-content"
    }, React.createElement("div", {
      className: "leaderboard-category-grid grid grid-cols-5 gap-1 text-[11px]"
    }, [{
      v: r.gm,
      max: categoryMaximums.gm,
      title: 'Faza grupowa',
      done: categoryCompletion.gm,
      bg: 'rgba(13,27,150,.45)',
      accent: '#93c5fd'
    }, {
      v: r.km,
      max: categoryMaximums.km,
      title: 'Faza pucharowa',
      star: true,
      done: categoryCompletion.km,
      bg: 'rgba(7,89,133,.45)',
      accent: '#7dd3fc'
    }, {
      v: r.go,
      max: categoryMaximums.go,
      title: 'Kolejność w grupach',
      done: categoryCompletion.go,
      bg: 'rgba(88,28,135,.45)',
      accent: '#d8b4fe'
    }, {
      v: r.podium,
      max: categoryMaximums.podium,
      title: 'Podium turnieju',
      done: categoryCompletion.podium,
      bg: 'rgba(146,64,14,.45)',
      accent: '#fcd34d'
    }, {
      v: r.awards,
      max: categoryMaximums.awards,
      title: 'Nagrody indywidualne',
      done: categoryCompletion.awards,
      bg: 'rgba(159,18,57,.45)',
      accent: '#fda4af'
    }].map(({
      v,
      max,
      title,
      star,
      done,
      bg,
      accent
    }) => React.createElement("div", {
      className: "leaderboard-category-card",
      key: title,
      style: {
        background: done ? `linear-gradient(rgba(0,0,0,.20),rgba(0,0,0,.20)), ${bg}` : bg,
        border: `1px solid ${accent}30`,
        borderRadius: 16,
        padding: '7px 3px',
        textAlign: 'center',
        minHeight: done ? 94 : 76,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background .18s ease'
      }
    }, React.createElement("div", {
      className: "leaderboard-category-score",
      style: {
        fontWeight: 800,
        color: done ? 'rgba(255,255,255,.46)' : 'white',
        lineHeight: 1.05,
        whiteSpace: 'nowrap'
      }
    }, React.createElement("span", {
      className: "leaderboard-category-value",
      style: {
        fontSize: 15
      }
    }, v), React.createElement("span", {
      className: "leaderboard-category-max",
      style: {
        fontSize: 10.5,
        fontWeight: 700,
        color: done ? 'rgba(255,255,255,.32)' : 'rgba(255,255,255,.68)'
      }
    }, " / ", max, star ? '*' : '')), React.createElement("div", {
      className: "leaderboard-category-title",
      style: {
        fontSize: 9.5,
        textTransform: 'uppercase',
        letterSpacing: '0.025em',
        color: done ? 'rgba(235,241,255,.34)' : accent,
        marginTop: 5,
        lineHeight: 1.12,
        fontWeight: 700,
        maxWidth: '100%'
      }
    }, title), done && React.createElement("div", {
      className: "leaderboard-category-done",
      style: {
        fontSize: 8.5,
        fontWeight: 900,
        letterSpacing: '0.075em',
        color: '#30d158',
        marginTop: 6,
        lineHeight: 1
      }
    }, "ZAKO\u0143CZONO")))), React.createElement("div", {
      className: "leaderboard-footnote",
      style: {
        fontSize: 9.5,
        color: 'rgba(235,241,255,.48)',
        marginTop: 5,
        textAlign: 'right',
        lineHeight: 1.2
      }
    }, "* bez bonus\xF3w za rzuty karne")))));
  }));
}

// ═══════════════════════════════════════════════════════════════
//  WIDOK: PORÓWNANIE
// ═══════════════════════════════════════════════════════════════
function CompareView({
  matches,
  teams,
  predictions,
  results,
  players,
  scoringSettings
}) {
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const autoPhaseFilterRef = useRef('all');
  const phaseFilterTouchedRef = useRef(false);
  const [expandedMatches, setExpandedMatches] = useState(() => new Set());
  const toggleMatchDetails = useCallback(matchId => {
    setExpandedMatches(prev => {
      const next = new Set(prev);
      if (next.has(matchId)) next.delete(matchId);else next.add(matchId);
      return next;
    });
  }, []);
  const defaultResultPhase = useMemo(() => getLatestResultPhase(matches, results), [matches, results]);
  useEffect(() => {
    if (defaultResultPhase === 'all') return;
    const canAutoSelect = !phaseFilterTouchedRef.current || phaseFilter === autoPhaseFilterRef.current;
    if (!canAutoSelect) return;
    autoPhaseFilterRef.current = defaultResultPhase;
    if (phaseFilter !== defaultResultPhase) setPhaseFilter(defaultResultPhase);
    setGroupFilter('all');
  }, [defaultResultPhase, phaseFilter]);
  const filtered = useMemo(() => {
    return matches.filter(m => {
      if (phaseFilter !== 'all' && m.phase !== phaseFilter) return false;
      if (phaseFilter === 'group' && groupFilter !== 'all' && m.group !== groupFilter) return false;
      if (statusFilter === 'pending' && results[m.id]) return false;
      if (statusFilter === 'done' && !results[m.id]) return false;
      return true;
    }).sort((a, b) => (PHASE_RANK[a.phase] ?? 99) - (PHASE_RANK[b.phase] ?? 99) || a.num - b.num);
  }, [matches, phaseFilter, groupFilter, statusFilter, results]);
  useEffect(() => {
    setExpandedMatches(new Set());
  }, [phaseFilter, groupFilter, statusFilter]);
  if (players.length === 0) return React.createElement("div", {
    className: "text-center text-stone-500 py-12 app-note app-note--info app-note--center"
  }, "Dodaj graczy, \u017Ceby por\xF3wnywa\u0107 typy.");
  return React.createElement("div", {
    className: "compare-view space-y-3"
  }, React.createElement("div", {
    className: "phase-filter-panel bg-white border border-[#b0bce8] rounded-xl p-3 filters-sticky shadow-sm"
  }, React.createElement("div", {
    className: "flex flex-col gap-1"
  }, React.createElement("div", {
    className: "chip-scroll-row tight"
  }, PHASE_FILTER_TABS.map(t => React.createElement("button", {
    key: t.k,
    onClick: () => {
      phaseFilterTouchedRef.current = true;
      setPhaseFilter(t.k);
    },
    className: `selection-tile${phaseFilter === t.k ? ' is-selected' : ''} shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold`
  }, t.l))), phaseFilter === 'group' && React.createElement("div", {
    className: "chip-scroll-row tight"
  }, React.createElement("button", {
    onClick: () => {
      setGroupFilter('all');
    },
    className: `selection-tile${groupFilter === 'all' ? ' is-selected' : ''} shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold`
  }, "Wszystkie"), GROUPS.map(g => React.createElement("button", {
    key: g,
    onClick: () => {
      setGroupFilter(g);
    },
    className: `selection-tile${groupFilter === g ? ' is-selected' : ''} shrink-0 w-8 h-7 rounded-lg text-xs font-bold`
  }, g))), React.createElement("div", {
    className: "edge-safe-row flex gap-1 items-center py-0.5"
  }, [{
    k: 'all',
    l: 'Wszystkie'
  }, {
    k: 'pending',
    l: 'Nadchodzące'
  }, {
    k: 'done',
    l: 'Zakończone'
  }].map(t => React.createElement("button", {
    key: t.k,
    onClick: () => {
      setStatusFilter(t.k);
    },
    className: `selection-tile${statusFilter === t.k ? ' is-selected' : ''} flex-1 px-2 py-1 rounded-lg text-xs font-medium`
  }, t.l)))), React.createElement("div", {
    className: "text-[11px] text-stone-500 mt-1 text-center"
  }, filtered.length, " ", plMecze(filtered.length))), filtered.map(m => {
    const home = teams[m.homeTeamId],
      away = teams[m.awayTeamId],
      result = results[m.id];
    const isExpanded = expandedMatches.has(m.id);
    return React.createElement("div", {
      key: m.id,
      className: `deferred-card compare-match-card match-card-enter${isExpanded ? ' is-expanded' : ''}`
    }, React.createElement("div", {
      className: "compare-match-head"
    }, React.createElement("div", {
      className: "compare-match-meta"
    }, React.createElement(Badge, null, phaseBadgeLabel(m)), React.createElement("span", {
      className: "compare-match-number"
    }, "#", m.num)), result ? React.createElement("div", {
      className: "compare-match-result-pill"
    }, result.home, React.createElement("span", null, ":"), result.away) : React.createElement("span", {
      className: "compare-match-no-result"
    }, "brak wyniku")), React.createElement("button", {
      type: "button",
      onClick: () => toggleMatchDetails(m.id),
      "aria-expanded": isExpanded,
      className: "compare-match-toggle"
    }, React.createElement("span", {
      className: "compare-match-teams"
    }, React.createElement("span", {
      className: "compare-match-team"
    }, React.createElement(FlagImg, {
      code: home?.flag,
      size: 18,
      title: home?.name
    }), React.createElement("span", null, home?.name || '?')), React.createElement("span", {
      className: "compare-match-vs"
    }, "vs"), React.createElement("span", {
      className: "compare-match-team is-away"
    }, React.createElement(FlagImg, {
      code: away?.flag,
      size: 18,
      title: away?.name
    }), React.createElement("span", null, away?.name || '?'))), React.createElement("span", {
      className: "compare-match-chevron"
    }, React.createElement(Icon, {
      name: isExpanded ? 'chevup' : 'chevdown',
      size: 16
    }))), isExpanded && React.createElement("div", {
      className: "compare-player-list",
      style: {
        animation: 'slideIn .24s var(--ease-out) both'
      }
    }, React.createElement("p", {
      className: "compare-player-list-title"
    }, "Typy wszystkich graczy"), players.map(pl => {
      const pp = predictions[`${pl.id}:${m.id}`];
      if (!pp) return React.createElement("div", {
        key: pl.id,
        className: "compare-player-row compare-player-row-empty prediction-row prediction-row-empty",
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }, React.createElement("span", {
        className: "compare-player-name",
        style: {
          fontSize: 13,
          color: 'var(--label-2)'
        }
      }, pl.name), React.createElement("span", {
        style: {
          fontSize: 12,
          color: 'var(--label-3)',
          fontStyle: 'italic'
        }
      }, "brak"));
      const q = predictionQuality(pp, result, m.phase, scoringSettings);
      const pts = result ? scoreMatch(pp, result, m.phase, scoringSettings) : null;
      const rowBg = !result ? {
        background: 'rgba(255,255,255,.04)',
        color: 'rgba(255,255,255,.7)'
      } : q === 'exact' ? {
        background: 'rgba(0,160,60,.30)',
        color: 'white'
      } : q === 'partial' ? {
        background: 'rgba(200,100,0,.30)',
        color: 'white'
      } : {
        background: 'rgba(180,0,0,.28)',
        color: 'white'
      };
      const rowState = !result ? 'pending' : q === 'exact' ? 'exact' : q === 'partial' ? 'partial' : 'miss';
      const penaltyHit = !!(result?.pensHappened && pp.penWinner && pp.penWinner === result.advancingTeam);
      const penaltyMiss = !!(result && pp.penWinner && !penaltyHit);
      const penaltyTeam = pp.penWinner ? pp.penWinner === 'home' ? home : away : null;
      return React.createElement("div", {
        key: pl.id,
        className: `compare-player-row prediction-row prediction-row-${rowState}`,
        style: {
          ...rowBg,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }, React.createElement("span", {
        className: "compare-player-name",
        style: {
          fontSize: 13,
          fontWeight: 600
        }
      }, pl.name), React.createElement("span", {
        className: "compare-player-score",
        style: {
          fontFamily: 'ui-monospace,monospace',
          fontSize: 13
        }
      }, React.createElement("strong", {
        className: "compare-player-score-value"
      }, pp.home, ":", pp.away), React.createElement("span", {
        className: `compare-player-penalty${penaltyHit ? ' penalty-hit' : penaltyMiss ? ' penalty-miss' : ''}`,
        style: {
          opacity: pp.penWinner?.length ? 0.8 : 0
        }
      }, pp.penWinner ? FLAG_ABBR[(penaltyTeam?.flag || '').toLowerCase()] || (penaltyTeam?.name || '').slice(0, 3).toUpperCase() : ''), React.createElement("span", {
        className: "compare-player-points",
        style: {
          fontWeight: 800,
          fontSize: 14,
          color: pts === null ? 'transparent' : q === 'exact' ? '#30d158' : q === 'partial' ? '#ff9f0a' : '#ff453a'
        }
      }, pts === null ? '0' : pts > 0 ? `+${pts}` : '0')));
    })));
  }));
}

// ═══════════════════════════════════════════════════════════════
//  ADMIN
// ═══════════════════════════════════════════════════════════════
// Fresh admin login/setup form. It uses the shared <Modal> shell, but keeps its
// own internal structure so profile-form spacing never leaks into admin login.
function AdminGate({
  adminPassword,
  onUnlock,
  onSetPassword
}) {
  const [input, setInput] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const isSetup = !adminPassword;
  const handleSubmit = event => {
    event.preventDefault();
    const password = input.trim();
    if (isSetup) {
      if (password.length < 3) {
        setError('Hasło musi mieć min. 3 znaki');
        return;
      }
      if (password !== confirm.trim()) {
        setError('Hasła nie pasują');
        return;
      }
      onSetPassword(password);
      return;
    }
    if (!password) {
      setError('Wpisz hasło administratora.');
      return;
    }
    onUnlock(password, err => setError(err));
  };
  const updateInput = setter => event => {
    setter(event.target.value);
    setError('');
  };
  return React.createElement('form', {
    className: 'admin-login-panel' + (isSetup ? ' is-setup' : ' is-login'),
    onSubmit: handleSubmit
  }, React.createElement('div', {
    className: 'admin-login-hero'
  }, React.createElement('div', {
    className: 'admin-login-icon'
  }, React.createElement(LockIcon, {
    name: 'lock',
    size: 22
  })), React.createElement('h4', {
    className: 'admin-login-title'
  }, isSetup ? 'Ustaw hasło admina' : 'Panel administratora'), React.createElement('p', {
    className: 'admin-login-subtitle'
  }, isSetup ? 'Utwórz hasło dostępu do zarządzania wynikami.' : 'Wpisz hasło, żeby zarządzać wynikami.')), React.createElement('label', {
    className: 'admin-login-field'
  }, React.createElement('span', null, isSetup ? 'Nowe hasło' : 'Hasło'), React.createElement('input', {
    type: 'password',
    value: input,
    onChange: updateInput(setInput),
    placeholder: isSetup ? 'Nowe hasło' : 'Hasło',
    className: 'admin-login-input' + (error ? ' has-error' : ''),
    autoFocus: true,
    autoComplete: isSetup ? 'new-password' : 'current-password',
    autoCapitalize: 'off',
    autoCorrect: 'off',
    spellCheck: false
  })), isSetup && React.createElement('label', {
    className: 'admin-login-field'
  }, React.createElement('span', null, 'Powtórz hasło'), React.createElement('input', {
    type: 'password',
    value: confirm,
    onChange: updateInput(setConfirm),
    placeholder: 'Powtórz hasło',
    className: 'admin-login-input' + (error ? ' has-error' : ''),
    autoComplete: 'new-password',
    autoCapitalize: 'off',
    autoCorrect: 'off',
    spellCheck: false
  })), error && React.createElement('p', {
    className: 'admin-login-error'
  }, error), React.createElement('button', {
    type: 'submit',
    className: 'admin-login-submit'
  }, React.createElement(LockIcon, {
    name: isSetup ? 'lock' : 'unlock',
    size: 15
  }), isSetup ? 'Ustaw hasło' : 'Odblokuj'));
}
function AdminMatchRow({
  match,
  teams,
  teamOptions,
  result,
  editing,
  onToggleEdit,
  onSave,
  onDelete,
  onUpdateMatchTeams
}) {
  const home = teams[match.homeTeamId],
    away = teams[match.awayTeamId];
  const isKO = match.phase !== 'group';
  const [draft, setDraft] = useState(result || {
    home: null,
    away: null,
    advancingTeam: null,
    pensHappened: false
  });
  const [homeId, setHomeId] = useState(match.homeTeamId || '');
  const [awayId, setAwayId] = useState(match.awayTeamId || '');
  useEffect(() => {
    setDraft(result || {
      home: null,
      away: null,
      advancingTeam: null,
      pensHappened: false
    });
    setHomeId(match.homeTeamId || '');
    setAwayId(match.awayTeamId || '');
  }, [result, match.homeTeamId, match.awayTeamId, editing]);
  const pairChanged = isKO && (match.homeTeamId !== homeId || match.awayTeamId !== awayId);
  const sameTeam = !!(homeId && awayId && homeId === awayId);
  const pairValid = !!(homeId && awayId && !sameTeam);
  const teamsReady = isKO ? pairValid : !!(homeId && awayId);
  const isDraw = draft.home !== null && draft.away !== null && draft.home === draft.away;
  const ok = teamsReady && (isKO ? draft.home !== null && draft.away !== null && (isDraw ? draft.advancingTeam && draft.pensHappened : true) : draft.home !== null && draft.away !== null);
  const handleSaveTeams = () => {
    if (!isKO || !pairValid || !pairChanged) return;
    onUpdateMatchTeams(homeId, awayId);
  };
  const handleSave = () => {
    if (isKO && pairChanged && pairValid) onUpdateMatchTeams(homeId, awayId);
    const payload = {
      home: draft.home,
      away: draft.away
    };
    if (isKO) {
      payload.advancingTeam = isDraw ? draft.advancingTeam : draft.home > draft.away ? 'home' : 'away';
      payload.pensHappened = isDraw;
    }
    onSave(payload);
  };
  return React.createElement("div", {
    className: `admin-match-card${editing ? ' expanded' : ''} bg-white border rounded-xl overflow-hidden ${result ? 'border-[#7090d8]' : 'border-stone-200'}`
  }, React.createElement("button", {
    onClick: onToggleEdit,
    className: "admin-match-summary-button w-full p-3 text-left hover:bg-white/10"
  }, React.createElement("div", {
    className: "admin-match-summary-row flex items-center justify-between gap-2"
  }, React.createElement("div", {
    className: "admin-match-summary-main flex items-center gap-2 min-w-0 flex-1 text-sm"
  }, React.createElement(Badge, null, phaseBadgeLabel(match)), React.createElement("span", {
    className: "text-stone-500 text-xs"
  }, "#", match.num), React.createElement("span", {
    className: "admin-match-summary-teams flex items-center gap-1 min-w-0 flex-wrap"
  }, React.createElement("span", {
    className: "inline-flex items-center gap-1.5 min-w-0 max-w-full"
  }, home ? React.createElement(FlagImg, {
    code: home.flag,
    size: 18,
    title: home.name
  }) : React.createElement("span", {
    className: "text-stone-400 text-xs"
  }, "TBD"), React.createElement("span", {
    className: "min-w-0 truncate"
  }, home?.name || 'TBD')), React.createElement("span", {
    className: "text-stone-400 mx-1 shrink-0"
  }, "vs"), React.createElement("span", {
    className: "inline-flex items-center gap-1.5 min-w-0 max-w-full"
  }, away ? React.createElement(FlagImg, {
    code: away.flag,
    size: 18,
    title: away.name
  }) : React.createElement("span", {
    className: "text-stone-400 text-xs"
  }, "TBD"), React.createElement("span", {
    className: "min-w-0 truncate"
  }, away?.name || 'TBD')))), React.createElement("div", {
    className: "flex items-center gap-2 shrink-0"
  }, result && React.createElement("div", {
    style: {
      fontFamily: "Bebas Neue,sans-serif",
      fontSize: 16,
      letterSpacing: "0.06em",
      color: "white",
      padding: "3px 10px",
      background: "rgba(0,160,60,.35)",
      border: "1px solid rgba(0,220,80,.45)",
      borderRadius: 16
    }
  }, result.home, ":", result.away), editing ? React.createElement(Icon, {
    name: "chevup",
    size: 18
  }) : React.createElement(Icon, {
    name: "chevdown",
    size: 18
  })))), editing && React.createElement("div", {
    className: "admin-match-details border-t border-stone-100 p-3 bg-stone-50/50"
  }, isKO && React.createElement("div", {
    className: "mb-3 bg-amber-50 border border-amber-200 rounded-lg p-3"
  }, React.createElement("p", {
    className: "text-xs font-semibold text-amber-900 mb-2"
  }, "Przypisz dru\u017Cyny:"), React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, React.createElement("select", {
    value: homeId,
    onChange: e => setHomeId(e.target.value),
    className: "px-2 py-2 border border-stone-200 rounded-lg text-sm bg-white"
  }, React.createElement("option", {
    value: ""
  }, "\u2014 Dru\u017Cyna 1 \u2014"), teamOptions.map(t => React.createElement("option", {
    key: t.id,
    value: t.id
  }, t.name))), React.createElement("select", {
    value: awayId,
    onChange: e => setAwayId(e.target.value),
    className: "px-2 py-2 border border-stone-200 rounded-lg text-sm bg-white"
  }, React.createElement("option", {
    value: ""
  }, "\u2014 Dru\u017Cyna 2 \u2014"), teamOptions.map(t => React.createElement("option", {
    key: t.id,
    value: t.id
  }, t.name)))), sameTeam && React.createElement("p", {
    className: "text-xs text-red-600 mt-2"
  }, "Wybierz dwie r\xF3\u017Cne dru\u017Cyny."), !sameTeam && (!homeId || !awayId) && React.createElement("p", {
    className: "text-xs text-amber-700 mt-2"
  }, "Wybierz obie dru\u017Cyny, aby udost\u0119pni\u0107 mecz do typowania."), React.createElement(Btn, {
    variant: "outline",
    disabled: !pairValid || !pairChanged,
    onClick: handleSaveTeams,
    className: "w-full mt-2"
  }, React.createElement(Icon, {
    name: "save",
    size: 14
  }), pairChanged ? 'Zapisz parę bez wyniku' : 'Para drużyn zapisana'), React.createElement("p", {
    className: "text-[10px] text-amber-300 mt-2 text-center font-semibold"
  }, "Zapisanie pary nie ustawia wyniku ko\u0144cowego. Po zapisaniu gracze mog\u0105 od razu obstawia\u0107 ten mecz.")), teamsReady ? React.createElement(React.Fragment, null, React.createElement("div", {
    className: "admin-score-editor"
  }, React.createElement("div", {
    className: "admin-score-side"
  }, React.createElement("div", {
    className: "admin-score-team"
  }, React.createElement(FlagImg, {
    code: teams[homeId]?.flag,
    size: 30,
    title: teams[homeId]?.name
  }), React.createElement("span", {
    className: "admin-score-team-name"
  }, teams[homeId]?.name)), React.createElement("div", {
    className: "admin-score-controls"
  }, React.createElement(ScoreInput, {
    value: draft.home,
    onChange: n => setDraft(d => ({
      ...d,
      home: n
    })),
    label: "Gole"
  }))), React.createElement("span", {
    className: "admin-score-separator"
  }, ":"), React.createElement("div", {
    className: "admin-score-side"
  }, React.createElement("div", {
    className: "admin-score-team"
  }, React.createElement(FlagImg, {
    code: teams[awayId]?.flag,
    size: 30,
    title: teams[awayId]?.name
  }), React.createElement("span", {
    className: "admin-score-team-name"
  }, teams[awayId]?.name)), React.createElement("div", {
    className: "admin-score-controls"
  }, React.createElement(ScoreInput, {
    value: draft.away,
    onChange: n => setDraft(d => ({
      ...d,
      away: n
    })),
    label: "Gole"
  })))), isKO && React.createElement("div", {
    className: "text-[11px] text-stone-500 text-center mb-2"
  }, "Wpisz wynik ", React.createElement("strong", null, "po 120 minutach"), " (regulaminowy + dogrywka)"), isKO && isDraw && React.createElement("div", {
    className: "penalty-choice-panel admin-penalty-choice-panel"
  }, React.createElement("div", {
    className: "penalty-choice-head"
  }, React.createElement("span", null, "Remis po 120 min"), React.createElement("strong", null, "Awans")), React.createElement("p", {
    className: "penalty-choice-title"
  }, "Kto awansował po karnych?"), React.createElement("div", {
    className: "penalty-choice-grid"
  }, ['home', 'away'].map(side => {
    const t = side === 'home' ? teams[homeId] : teams[awayId];
    const sel = draft.advancingTeam === side;
    return React.createElement("button", {
      key: side,
      type: "button",
      onClick: () => setDraft(d => ({
        ...d,
        advancingTeam: side,
        pensHappened: true
      })),
      className: `penalty-choice-card${sel ? ' is-selected' : ''}`
    }, React.createElement("span", {
      className: "penalty-choice-flag"
    }, t?.flag && React.createElement(FlagImg, {
      code: t.flag,
      size: 26,
      title: t?.name
    })), React.createElement("span", {
      className: "penalty-choice-team"
    }, t?.name || "Drużyna"), React.createElement("span", {
      className: "penalty-choice-check"
    }, sel ? "✓" : ""));
  }))), React.createElement("div", {
    className: "flex gap-2"
  }, result && React.createElement(Btn, {
    variant: "outline",
    onClick: onDelete,
    className: "flex-1"
  }, React.createElement(Icon, {
    name: "trash",
    size: 14
  }), "Cofnij"), React.createElement(Btn, {
    variant: "primary",
    disabled: !ok,
    onClick: handleSave,
    className: "flex-1"
  }, React.createElement(Icon, {
    name: "save",
    size: 14
  }), result ? 'Zaktualizuj' : 'Zapisz wynik'))) : React.createElement("div", {
    className: "text-sm text-stone-600 bg-stone-100 rounded-lg p-3 text-center app-note app-note--info app-note--compact app-note--center"
  }, "Najpierw przypisz dru\u017Cyny do meczu.")));
}
function adminFlagCode(value, teamName = '') {
  const normalized = normalizeFlagValue(value);
  if (normalized.code) return normalized.code;
  const raw = String(value || '').trim().toUpperCase();
  const byAbbr = Object.entries(FLAG_ABBR).find(([, abbr]) => abbr === raw);
  if (byAbbr) return byAbbr[0];
  const nameAbbr = NAME_TO_ABBR[String(teamName || '').trim().toLowerCase()];
  const byName = nameAbbr && Object.entries(FLAG_ABBR).find(([, abbr]) => abbr === nameAbbr);
  return byName ? byName[0] : '';
}
function AdminTeamRow({
  team,
  onSave
}) {
  const [name, setName] = useState(team.name);
  const [flag, setFlag] = useState(() => adminFlagCode(team.flag, team.name));
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setName(team.name);
    setFlag(adminFlagCode(team.flag, team.name));
  }, [team]);
  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 1200);
    return () => clearTimeout(timer);
  }, [saved]);
  const saveTeam = () => {
    const cleanName = name.trim() || team.id;
    const cleanFlag = adminFlagCode(flag, cleanName) || 'xx';
    setName(cleanName);
    setFlag(cleanFlag);
    onSave(cleanName, cleanFlag);
    setSaved(true);
  };
  return React.createElement("div", {
    className: "admin-team-row bg-stone-50 rounded-xl p-2"
  }, React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, React.createElement(FlagImg, {
    code: flag,
    size: 30,
    title: name
  }), React.createElement("input", {
    value: flag,
    onChange: e => setFlag(e.target.value.toLowerCase().replace(/[^a-z-]/g, '')),
    onBlur: () => setFlag(adminFlagCode(flag, name)),
    placeholder: "kod",
    maxLength: 6,
    autoCapitalize: "none",
    spellCheck: false,
    "aria-label": `Kod flagi dla ${name}`,
    className: "w-16 shrink-0 py-1.5 text-center text-xs font-bold uppercase focus:outline-none"
  }), React.createElement("input", {
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Nazwa dru\u017Cyny",
    "aria-label": `Nazwa dru\u017Cyny ${team.id}`,
    className: "flex-1 min-w-0 px-3 py-1.5 text-xs font-bold focus:outline-none"
  }), React.createElement("button", {
    type: "button",
    onClick: saveTeam,
    "aria-label": `Zapisz ${name}`,
    className: "shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform active:scale-95",
    style: {
      background: 'radial-gradient(circle at 24% 0%, rgba(255,255,255,.34), transparent 42%), linear-gradient(145deg, #2b9cff, #1268ee 55%, #5b4df2)',
      border: '1px solid rgba(178,222,255,.38)',
      boxShadow: saved ? '0 0 0 3px rgba(48,209,88,.35), inset 0 1px 0 rgba(255,255,255,.34)' : 'inset 0 1px 0 rgba(255,255,255,.34)'
    }
  }, React.createElement(Icon, {
    name: "check",
    size: 14
  }))));
}
function AdminPlayerRow({
  player,
  onRemove,
  adminPasswordHash
}) {
  const [confirm, setConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const openConfirm = () => {
    setPassword('');
    setError('');
    setConfirm(true);
  };
  const cancelConfirm = () => {
    setConfirm(false);
    setPassword('');
    setError('');
  };
  const confirmRemove = () => {
    if (!password) {
      setError('Wpisz hasło administratora.');
      return;
    }
    if (hashPwd(password) !== adminPasswordHash) {
      setError('Nieprawidłowe hasło administratora.');
      return;
    }
    setConfirm(false);
    setPassword('');
    setError('');
    onRemove();
  };
  return React.createElement("div", {
    className: `bg-white border-2 rounded-xl p-3 transition-all ${confirm ? 'border-red-300' : 'border-stone-200'}`
  }, React.createElement("div", {
    className: "flex items-center gap-3"
  }, React.createElement("div", {
    className: "w-9 h-9 rounded-full bg-[#e8ecf8] flex items-center justify-center text-sm font-bold text-[#162570] shrink-0"
  }, player.name.slice(0, 1).toUpperCase()), React.createElement("div", {
    className: "flex-1 min-w-0"
  }, React.createElement("div", {
    className: "font-semibold text-stone-900 text-sm truncate"
  }, player.name)), !confirm && React.createElement("button", {
    onClick: openConfirm,
    className: "p-2 text-red-500 hover:bg-red-50 rounded-lg",
    title: "Usu\u0144 gracza"
  }, React.createElement(Icon, {
    name: "trash",
    size: 16
  }))), confirm && React.createElement("div", {
    className: "mt-3 pt-3 border-t border-stone-100"
  }, React.createElement("p", {
    className: "text-xs text-red-700 font-semibold mb-2"
  }, "Usun\u0105\u0107 gracza \u201E", player.name, "\" i wszystkie jego typy?"), React.createElement("label", {
    className: "block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1",
    htmlFor: `admin-delete-password-${player.id}`
  }, "Has\u0142o administratora"), React.createElement("input", {
    id: `admin-delete-password-${player.id}`,
    type: "password",
    value: password,
    onChange: e => {
      setPassword(e.target.value);
      setError('');
    },
    onKeyDown: e => {
      if (e.key === 'Enter') confirmRemove();
    },
    placeholder: "Wpisz has\u0142o admina",
    autoComplete: "current-password",
    className: `w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none text-sm mb-2 ${error ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-[#0d1b5e]'}`,
    autoFocus: true
  }), error && React.createElement("p", {
    className: "text-xs text-red-600 font-semibold mb-2",
    role: "alert"
  }, error), React.createElement("div", {
    className: "flex gap-2"
  }, React.createElement(Btn, {
    variant: "outline",
    size: "sm",
    onClick: cancelConfirm,
    className: "flex-1"
  }, "Anuluj"), React.createElement(Btn, {
    variant: "danger",
    size: "sm",
    onClick: confirmRemove,
    disabled: !password,
    className: "flex-1"
  }, React.createElement(Icon, {
    name: "trash",
    size: 14
  }), "Usu\u0144 gracza"))));
}
function AdminScoringField({
  label,
  value,
  onChange,
  note
}) {
  return React.createElement("label", {
    className: "block"
  }, React.createElement("span", {
    className: "text-xs font-semibold text-stone-700"
  }, label), note && React.createElement("span", {
    className: "block text-[10px] text-stone-500 mt-0.5"
  }, note), React.createElement("div", {
    className: "relative mt-1"
  }, React.createElement("input", {
    type: "number",
    inputMode: "numeric",
    min: "0",
    max: "999",
    step: "1",
    value: value,
    onChange: e => onChange(e.target.value),
    className: "w-full px-3 py-2.5 pr-12 border border-stone-200 rounded-lg text-center text-lg font-bold focus:border-[#0d1b5e] focus:outline-none"
  }), React.createElement("span", {
    className: "absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-stone-400"
  }, "PKT")));
}
function AdminScoringPanel({
  scoringSettings,
  onSave
}) {
  const [draft, setDraft] = useState(() => normalizePointsSettings(scoringSettings));
  const [saved, setSaved] = useState(false);
  useEffect(() => setDraft(normalizePointsSettings(scoringSettings)), [scoringSettings]);
  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 1600);
    return () => clearTimeout(timer);
  }, [saved]);
  const setNested = (section, key, value) => setDraft(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [key]: value
    }
  }));
  const setFlat = (key, value) => setDraft(prev => ({
    ...prev,
    [key]: value
  }));
  const save = () => {
    const next = normalizePointsSettings(draft);
    setDraft(next);
    onSave(next);
    setSaved(true);
  };
  return React.createElement("div", {
    className: "space-y-3"
  }, React.createElement("div", {
    className: "bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 app-note app-note--warning"
  }, "Zapisanie zmian natychmiast przeliczy ca\u0142\u0105 klasyfikacj\u0119 na podstawie wszystkich dotychczasowych wynik\xF3w i typ\xF3w."), React.createElement("section", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h4", {
    className: "font-display text-base mb-3"
  }, "Mecze fazy grupowej"), React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, React.createElement(AdminScoringField, {
    label: "Dok\u0142adny wynik",
    value: draft.group.exact,
    onChange: v => setNested('group', 'exact', v),
    note: "Pe\u0142na liczba punkt\xF3w, bez dodatkowego bonusu."
  }), React.createElement(AdminScoringField, {
    label: "Dobry rezultat",
    value: draft.group.winner,
    onChange: v => setNested('group', 'winner', v),
    note: "Zwyci\u0119zca albo poprawnie przewidziany remis."
  }))), React.createElement("section", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h4", {
    className: "font-display text-base mb-3"
  }, "Faza pucharowa"), React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, React.createElement(AdminScoringField, {
    label: "Dok\u0142adny wynik",
    value: draft.knockout.exact,
    onChange: v => setNested('knockout', 'exact', v),
    note: "Wynik po regulaminowym czasie i dogrywce."
  }), React.createElement(AdminScoringField, {
    label: "Dobry rezultat",
    value: draft.knockout.winner,
    onChange: v => setNested('knockout', 'winner', v),
    note: "Zwyci\u0119zca albo poprawnie przewidziany remis."
  }), React.createElement("div", {
    className: "col-span-2"
  }, React.createElement(AdminScoringField, {
    label: "Bonus za karne",
    value: draft.knockout.penBonus,
    onChange: v => setNested('knockout', 'penBonus', v),
    note: "Dodawany, gdy gracz poprawnie wska\u017Ce zwyci\u0119zc\u0119 serii rzut\xF3w karnych."
  })))), React.createElement("section", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h4", {
    className: "font-display text-base mb-3"
  }, "Kolejno\u015B\u0107 w grupach"), React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, React.createElement(AdminScoringField, {
    label: "4 poprawne miejsca",
    value: draft.groupOrderAll,
    onChange: v => setFlat('groupOrderAll', v)
  }), React.createElement(AdminScoringField, {
    label: "2 poprawne miejsca",
    value: draft.groupOrderTwo,
    onChange: v => setFlat('groupOrderTwo', v)
  }), React.createElement(AdminScoringField, {
    label: "1 poprawne miejsce",
    value: draft.groupOrderOne,
    onChange: v => setFlat('groupOrderOne', v)
  }))), React.createElement("section", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h4", {
    className: "font-display text-base mb-3"
  }, "Podium turnieju"), React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, React.createElement(AdminScoringField, {
    label: "Mistrz \u015Bwiata",
    value: draft.champion,
    onChange: v => setFlat('champion', v)
  }), React.createElement(AdminScoringField, {
    label: "2. miejsce",
    value: draft.runnerUp,
    onChange: v => setFlat('runnerUp', v)
  }), React.createElement(AdminScoringField, {
    label: "3. miejsce",
    value: draft.third,
    onChange: v => setFlat('third', v)
  }))), React.createElement("section", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h4", {
    className: "font-display text-base mb-3"
  }, "Nagrody indywidualne"), React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, React.createElement(AdminScoringField, {
    label: "Kr\xF3l strzelc\xF3w",
    value: draft.topScorer,
    onChange: v => setFlat('topScorer', v)
  }), React.createElement(AdminScoringField, {
    label: "MVP turnieju",
    value: draft.mvp,
    onChange: v => setFlat('mvp', v)
  }))), saved && React.createElement("div", {
    className: "bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center text-sm font-semibold app-note app-note--success app-note--compact app-note--center",
    style: {
      color: '#30d158'
    }
  }, "Punktacja zosta\u0142a zapisana."), React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, React.createElement(Btn, {
    variant: "outline",
    size: "lg",
    onClick: () => setDraft(normalizePointsSettings(DEFAULT_POINTS))
  }, React.createElement(Icon, {
    name: "reset",
    size: 16
  }), "Domy\u015Blne"), React.createElement(Btn, {
    variant: "primary",
    size: "lg",
    onClick: save
  }, React.createElement(Icon, {
    name: "save",
    size: 16
  }), "Zapisz punktacj\u0119")));
}
function PhaseLockRow({
  label,
  hint,
  locked,
  onToggle
}) {
  return React.createElement("div", {
    className: "flex items-center justify-between gap-3 py-2.5 border-b border-stone-100 last:border-0"
  }, React.createElement("div", null, React.createElement("div", {
    className: "font-semibold text-sm text-stone-800"
  }, label), hint && React.createElement("div", {
    className: "text-xs text-stone-500"
  }, hint)), React.createElement(Btn, {
    variant: locked ? 'danger' : 'outline',
    size: "sm",
    onClick: onToggle
  }, React.createElement(LockIcon, {
    name: locked ? 'lock' : 'unlock',
    size: 14
  }), locked ? 'Zablokowane' : 'Odblokowane'));
}
function PhaseLockPanel({
  matches,
  phaseLocks,
  onSavePhaseLocks
}) {
  const locks = phaseLocks || {};
  const togglePhase = key => {
    onSavePhaseLocks(prev => ({
      ...(prev || {}),
      [key]: !(prev && prev[key])
    }));
  };
  const phasesWithMatches = PHASE_ORDER.filter(phase => (matches || []).some(m => m.phase === phase));
  return React.createElement("div", {
    className: "space-y-3"
  }, React.createElement("div", {
    className: "bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 app-note app-note--warning"
  }, "Zablokowanie fazy uniemo\u017cliwia graczom zmian\u0119 typ\u00f3w dla mecz\u00f3w z tej fazy. U\u017cyj tego np. tu\u017c przed rozpocz\u0119ciem pierwszego meczu danej rundy."), React.createElement("section", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h4", {
    className: "font-display text-base mb-1"
  }, "Blokady faz mecz\u00f3w"), phasesWithMatches.map(phase => React.createElement(PhaseLockRow, {
    key: phase,
    label: phase === 'group' ? 'Faza grupowa' : PHASE_LABELS[phase] || phase,
    hint: `${(matches || []).filter(m => m.phase === phase).length} mecz\u00f3w`,
    locked: !!locks[phase],
    onToggle: () => togglePhase(phase)
  }))), React.createElement("section", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h4", {
    className: "font-display text-base mb-1"
  }, "Ustawienia dodatkowe"), React.createElement(PhaseLockRow, {
    label: "Typy specjalne",
    hint: "Blokuje typowanie zwyci\u0119zcy, kr\u00f3la strzelc\u00f3w, MVP i kolejno\u015bci w grupach.",
    locked: !!locks.specials,
    onToggle: () => togglePhase('specials')
  }), React.createElement(PhaseLockRow, {
    label: "Por\u00f3wnanie graczy",
    hint: "Udost\u0119pnia graczom zak\u0142adki \u201ePor\u00f3wnanie\u201d i \u201eWszystkie typy specjalne\u201d.",
    locked: !locks.compareVisible,
    onToggle: () => onSavePhaseLocks(prev => ({
      ...(prev || {}),
      compareVisible: !(prev && prev.compareVisible)
    }))
  })));
}
function AdminPanel({
  teams,
  matches,
  results,
  specialResults,
  players,
  predictions,
  specialPredictions,
  phaseLocks,
  scoringSettings,
  adminPasswordHash,
  onSavePhaseLocks,
  onSaveScoringSettings,
  onSaveResult,
  onDeleteResult,
  onUpdateTeam,
  onSaveSpecialResults,
  onResetAll,
  onRemovePlayer,
  onExport,
  onImport,
  onLogout
}) {
  const [tab, setTab] = useState('results');
  const [matchSearch, setMatchSearch] = useState('');
  const [mPhase, setMPhase] = useState('all');
  const autoMPhaseRef = useRef('all');
  const mPhaseTouchedRef = useRef(false);
  const [editingId, setEditingId] = useState(null);
  const [importText, setImportText] = useState('');
  const [importErr, setImportErr] = useState('');
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetPassword, setResetPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetBusy, setResetBusy] = useState(false);
  const fileRef = useRef(null);
  const teamOptions = useMemo(() => Object.values(teams).sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name)), [teams]);
  const defaultResultPhase = useMemo(() => getLatestResultPhase(matches, results), [matches, results]);
  useEffect(() => {
    if (defaultResultPhase === 'all') return;
    const canAutoSelect = !mPhaseTouchedRef.current || mPhase === autoMPhaseRef.current;
    if (!canAutoSelect) return;
    autoMPhaseRef.current = defaultResultPhase;
    if (mPhase !== defaultResultPhase) setMPhase(defaultResultPhase);
  }, [defaultResultPhase, mPhase]);
  const filteredMatches = useMemo(() => {
    const q = matchSearch.trim().toLowerCase();
    return matches.filter(m => {
      if (mPhase !== 'all' && m.phase !== mPhase) return false;
      if (q) {
        const hn = teams[m.homeTeamId]?.name?.toLowerCase() || '',
          an = teams[m.awayTeamId]?.name?.toLowerCase() || '';
        return hn.includes(q) || an.includes(q) || m.id.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => (PHASE_RANK[a.phase] ?? 99) - (PHASE_RANK[b.phase] ?? 99) || a.num - b.num);
  }, [matches, teams, mPhase, matchSearch]);
  const handleExport = () => {
    const data = {
      version: 2,
      exportedAt: new Date().toISOString(),
      players,
      teams,
      matches,
      predictions,
      results,
      specialPredictions,
      specialResults,
      phaseLocks,
      scoringSettings
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mundial2026-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const openResetConfirm = () => {
    setResetPassword('');
    setResetError('');
    setResetConfirm(true);
  };
  const cancelResetConfirm = () => {
    if (resetBusy) return;
    setResetConfirm(false);
    setResetPassword('');
    setResetError('');
  };
  const confirmResetAll = async () => {
    if (resetBusy) return;
    if (!resetPassword) {
      setResetError('Wpisz hasło administratora.');
      return;
    }
    if (hashPwd(resetPassword) !== adminPasswordHash) {
      setResetError('Nieprawidłowe hasło administratora.');
      return;
    }
    setResetBusy(true);
    setResetError('');
    try {
      await onResetAll();
      setResetConfirm(false);
      setResetPassword('');
    } catch (error) {
      setResetError('Nie udało się zresetować danych. Spróbuj ponownie.');
    } finally {
      setResetBusy(false);
    }
  };

  // Specials panel inline
  const [spDraft, setSpDraft] = useState(specialResults || {
    groupOrders: {}
  });
  const [spGroup, setSpGroup] = useState('A');
  useEffect(() => setSpDraft(specialResults || {
    groupOrders: {}
  }), [specialResults]);
  const tabs = [{
    k: 'locks',
    l: 'Blokady faz'
  }, {
    k: 'results',
    l: 'Mecze i wyniki'
  }, {
    k: 'teams',
    l: 'Drużyny'
  }, {
    k: 'specials',
    l: 'Wyniki specjalne'
  }, {
    k: 'scoring',
    l: 'Punktacja',
    span: 2
  }, {
    k: 'players',
    l: 'Gracze'
  }, {
    k: 'data',
    l: 'Dane'
  }];
  return React.createElement("div", {
    className: "admin-panel space-y-3"
  }, React.createElement("div", {
    className: "admin-panel-banner bg-stone-900 text-white rounded-xl p-3 flex items-center justify-between"
  }, React.createElement("div", {
    className: "flex items-center gap-2"
  }, React.createElement(LockIcon, {
    name: "unlock",
    size: 18,
    className: "text-[#6080d0]"
  }), React.createElement("span", {
    className: "font-display text-base tracking-wide"
  }, "Panel admina")), React.createElement(Btn, {
    variant: "ghost",
    size: "sm",
    onClick: onLogout,
    className: "text-stone-300 hover:bg-stone-800 hover:text-white"
  }, "Wyloguj")), React.createElement("div", {
    className: "admin-tabs-shell bg-white border border-stone-200 rounded-xl"
  }, React.createElement("div", {
    className: "admin-tabs-grid"
  }, tabs.map(t => React.createElement("button", {
    key: t.k,
    onClick: () => {
      setTab(t.k);
    },
    className: `selection-tile${tab === t.k ? ' is-selected' : ''} rounded-lg text-xs font-semibold ${t.span === 2 ? 'admin-tab-span-2' : ''}`
  }, t.l)))), tab === 'locks' && React.createElement(PhaseLockPanel, {
    matches: matches,
    phaseLocks: phaseLocks || {},
    onSavePhaseLocks: onSavePhaseLocks
  }), tab === 'results' && React.createElement("div", {
    className: "space-y-2"
  }, React.createElement("div", {
    className: "admin-phase-filters bg-white border border-stone-200 rounded-xl p-3 space-y-2"
  }, React.createElement("div", {
    className: "relative"
  }, React.createElement(Icon, {
    name: "search",
    size: 14,
    className: "absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
  }), React.createElement("input", {
    value: matchSearch,
    onChange: e => setMatchSearch(e.target.value),
    placeholder: "Szukaj dru\u017Cyny / numeru (M5)",
    className: "w-full pl-9 pr-3 py-2 border border-stone-200 rounded-lg focus:border-[#0d1b5e] focus:outline-none text-sm"
  })), React.createElement("div", {
    className: "chip-scroll-row"
  }, PHASE_FILTER_TABS.map(t => React.createElement("button", {
    key: t.k,
    onClick: () => {
      mPhaseTouchedRef.current = true;
      setMPhase(t.k);
    },
    className: `selection-tile${mPhase === t.k ? ' is-selected' : ''} shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold`
  }, t.l)))), filteredMatches.map(m => React.createElement(AdminMatchRow, {
    key: m.id,
    match: m,
    teams: teams,
    teamOptions: teamOptions,
    result: results[m.id],
    editing: editingId === m.id,
    onToggleEdit: () => setEditingId(editingId === m.id ? null : m.id),
    onSave: payload => {
      autoMPhaseRef.current = m.phase;
      mPhaseTouchedRef.current = false;
      setMPhase(m.phase);
      onSaveResult(m.id, payload);
      setEditingId(null);
    },
    onDelete: () => onDeleteResult(m.id),
    onUpdateMatchTeams: (hId, aId) => onUpdateTeam(m.id, hId, aId)
  }))), tab === 'teams' && React.createElement("div", {
    className: "space-y-3"
  }, React.createElement("div", {
    className: "app-note app-note--warning app-note--compact"
  }, "Wpisz nazw\u0119 dru\u017Cyny oraz dwuliterowy kod kraju, np. pl, de lub fr."), GROUPS.map(g => React.createElement("div", {
    key: g,
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, React.createElement("h4", {
    className: "font-display text-lg"
  }, "Grupa ", g), React.createElement("span", {
    className: "text-xs text-stone-400 font-semibold"
  }, "4 dru\u017Cyny")), React.createElement("div", {
    className: "space-y-1.5 mt-1.5"
  }, [1, 2, 3, 4].map(i => {
    const t = teams[`${g}${i}`];
    return t ? React.createElement(AdminTeamRow, {
      key: t.id,
      team: t,
      onSave: (name, flag) => onUpdateTeam(t.id, name, flag)
    }) : null;
  }))))), tab === 'specials' && React.createElement("div", {
    className: "space-y-3"
  }, React.createElement("div", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h4", {
    className: "font-display text-base mb-2"
  }, "Kolejno\u015B\u0107 w grupach"), React.createElement("div", {
    className: "admin-group-order-filter-row flex gap-1 mb-3",
    style: { overflow: 'hidden' }
  }, React.createElement(InfiniteGroupFilter, {
    selected: spGroup,
    onSelect: setSpGroup,
    btnClass: 'selection-tile shrink-0 w-9 h-9 rounded-lg font-bold'
  })), [0, 1, 2, 3].map(pos => {
    const gTeams = Object.values(teams).filter(t => t && t.group === spGroup);
    return React.createElement("div", {
      key: pos,
      className: "mb-2"
    }, React.createElement("label", {
      className: "text-xs font-bold text-stone-700"
    }, ['1.', '2.', '3.', '4.'][pos], " miejsce"), React.createElement("div", {
      className: "grid grid-cols-2 gap-1 mt-1"
    }, gTeams.map(t => {
      const sel = spDraft.groupOrders?.[spGroup]?.[pos] === t.id;
      return React.createElement("button", {
        key: t.id,
        onClick: () => setSpDraft(d => {
          const o = [...(d.groupOrders?.[spGroup] || [null, null, null, null])];
          for (let i = 0; i < 4; i++) if (o[i] === t.id) o[i] = null;
          o[pos] = t.id;
          return {
            ...d,
            groupOrders: {
              ...d.groupOrders,
              [spGroup]: o
            }
          };
        }),
        className: `selection-tile${sel ? ' is-selected' : ''} px-2 py-1.5 rounded-lg text-xs font-semibold border inline-flex items-center gap-2 justify-start min-w-0`
      }, React.createElement(FlagImg, {
        code: t.flag,
        size: 16,
        title: t.name
      }), React.createElement("span", {
        className: "min-w-0 truncate"
      }, t.name));
    })));
  })), React.createElement("div", {
    className: "bg-white border border-stone-200 rounded-xl p-4 space-y-2"
  }, React.createElement("h4", {
    className: "font-display text-base mb-2"
  }, "Podium"), [{
    k: 'champion',
    l: 'Zwycięzca'
  }, {
    k: 'runnerUp',
    l: '2. miejsce'
  }, {
    k: 'third',
    l: '3. miejsce'
  }].map(item => React.createElement("div", {
    key: item.k
  }, React.createElement("label", {
    className: "text-xs font-semibold text-stone-700"
  }, item.l), React.createElement("select", {
    value: spDraft[item.k] || '',
    onChange: e => setSpDraft(d => ({
      ...d,
      [item.k]: e.target.value
    })),
    className: "w-full px-3 py-2 mt-1 border border-stone-200 rounded-lg text-sm bg-white"
  }, React.createElement("option", {
    value: ""
  }, "\u2014"), Object.values(teams).sort((a, b) => a.name.localeCompare(b.name)).map(t => React.createElement("option", {
    key: t.id,
    value: t.id
  }, t.name)))))), React.createElement("div", {
    className: "bg-white border border-stone-200 rounded-xl p-4 space-y-2"
  }, React.createElement("h4", {
    className: "font-display text-base mb-2"
  }, "Nagrody indywidualne"), React.createElement("div", null, React.createElement("label", {
    className: "text-xs font-semibold text-stone-700"
  }, "Kr\xF3l strzelc\xF3w"), React.createElement("input", {
    value: spDraft.topScorer || '',
    onChange: e => setSpDraft(d => ({
      ...d,
      topScorer: e.target.value
    })),
    placeholder: "np. Kylian Mbapp\xE9",
    className: "w-full px-3 py-2 mt-1 border border-stone-200 rounded-lg text-sm"
  })), React.createElement("div", null, React.createElement("label", {
    className: "text-xs font-semibold text-stone-700"
  }, "MVP"), React.createElement("input", {
    value: spDraft.mvp || '',
    onChange: e => setSpDraft(d => ({
      ...d,
      mvp: e.target.value
    })),
    placeholder: "np. Jude Bellingham",
    className: "w-full px-3 py-2 mt-1 border border-stone-200 rounded-lg text-sm"
  }))), React.createElement(Btn, {
    variant: "primary",
    size: "lg",
    onClick: () => onSaveSpecialResults(spDraft),
    className: "w-full"
  }, React.createElement(Icon, {
    name: "save",
    size: 16
  }), "Zapisz wyniki specjalne")), tab === 'scoring' && React.createElement(AdminScoringPanel, {
    scoringSettings: scoringSettings,
    onSave: onSaveScoringSettings
  }), tab === 'players' && React.createElement("div", {
    className: "space-y-3"
  }, React.createElement("div", {
    className: "bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 app-note app-note--warning"
  }, "Usuni\u0119cie gracza wymaga ponownego wpisania has\u0142a administratora. Gracz i wszystkie jego typy zostan\u0105 skasowane bez mo\u017Cliwo\u015Bci cofni\u0119cia."), players.length === 0 && React.createElement("p", {
    className: "text-center text-stone-500 text-sm py-8"
  }, "Brak graczy."), players.map(p => React.createElement(AdminPlayerRow, {
    key: p.id,
    player: p,
    adminPasswordHash: adminPasswordHash,
    onRemove: () => onRemovePlayer(p.id)
  }))), tab === 'data' && React.createElement("div", {
    className: "space-y-3"
  }, React.createElement("div", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h4", {
    className: "font-display text-base mb-2"
  }, "Eksport danych"), React.createElement("p", {
    className: "text-xs text-stone-500 mb-3"
  }, "Pobierz kopi\u0119 zapasow\u0105 wszystkich danych jako plik JSON."), React.createElement(Btn, {
    variant: "primary",
    onClick: handleExport,
    className: "w-full"
  }, React.createElement(Icon, {
    name: "download",
    size: 16
  }), "Pobierz JSON")), React.createElement("div", {
    className: "bg-white border border-stone-200 rounded-xl p-4"
  }, React.createElement("h4", {
    className: "font-display text-base mb-2"
  }, "Import danych"), React.createElement("p", {
    className: "text-xs text-stone-500 mb-3"
  }, "Za\u0142aduj wcze\u015Bniej wyeksportowany plik. ", React.createElement("strong", null, "Nadpisze obecne dane!")), React.createElement(Btn, {
    variant: "outline",
    size: "sm",
    onClick: () => fileRef.current?.click(),
    className: "mb-2 w-full"
  }, React.createElement(Icon, {
    name: "upload",
    size: 14
  }), "Za\u0142aduj plik"), React.createElement("input", {
    type: "file",
    ref: fileRef,
    accept: ".json",
    onChange: e => {
      const f = e.target.files?.[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => setImportText(r.result);
      r.readAsText(f);
    },
    className: "hidden"
  }), React.createElement("textarea", {
    value: importText,
    onChange: e => setImportText(e.target.value),
    rows: 4,
    placeholder: "{\"players\": [...], ...}",
    className: "w-full p-2 border border-stone-200 rounded-lg text-xs font-mono focus:border-[#0d1b5e] focus:outline-none mb-2"
  }), importErr && React.createElement("p", {
    className: "text-xs text-red-600 mb-2"
  }, importErr), React.createElement(Btn, {
    variant: "primary",
    disabled: !importText.trim(),
    onClick: async () => {
      try {
        const data = JSON.parse(importText);
        await onImport(data);
        setImportText('');
        setImportErr('');
        alert('Import zakończony!');
      } catch (e) {
        setImportErr('Błąd: ' + e.message);
      }
    },
    className: "w-full"
  }, "Zaimportuj")), React.createElement("div", {
    className: "bg-red-50 border border-red-200 rounded-xl p-4 app-note app-note--danger app-note--with-actions"
  }, React.createElement("h4", {
    className: "font-display text-base mb-2 text-red-900"
  }, "Strefa niebezpieczna"), React.createElement("p", {
    className: "text-xs text-red-700 mb-3"
  }, "Reset usuwa wszystkie dane. Tej operacji nie da si\u0119 cofn\u0105\u0107."), !resetConfirm ? React.createElement(Btn, {
    variant: "danger",
    onClick: openResetConfirm,
    className: "w-full"
  }, React.createElement(Icon, {
    name: "reset",
    size: 16
  }), "Resetuj wszystkie dane") : React.createElement("div", {
    className: "space-y-2"
  }, React.createElement("p", {
    className: "text-xs font-bold text-red-900 text-center"
  }, "Na pewno? Wpisz has\u0142o administratora, aby usun\u0105\u0107 wszystkie dane."), React.createElement("label", {
    className: "block text-[10px] uppercase tracking-wider font-bold text-stone-500",
    htmlFor: "admin-reset-password"
  }, "Has\u0142o administratora"), React.createElement("input", {
    id: "admin-reset-password",
    type: "password",
    value: resetPassword,
    onChange: e => {
      setResetPassword(e.target.value);
      setResetError('');
    },
    onKeyDown: e => {
      if (e.key === 'Enter') confirmResetAll();
    },
    placeholder: "Wpisz has\u0142o admina",
    autoComplete: "current-password",
    disabled: resetBusy,
    className: `w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none text-sm ${resetError ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-[#0d1b5e]'}`,
    autoFocus: true
  }), resetError && React.createElement("p", {
    className: "text-xs text-red-600 font-semibold",
    role: "alert"
  }, resetError), React.createElement("div", {
    className: "flex gap-2"
  }, React.createElement(Btn, {
    variant: "ghost",
    onClick: cancelResetConfirm,
    disabled: resetBusy,
    className: "flex-1"
  }, "Anuluj"), React.createElement(Btn, {
    variant: "danger",
    onClick: confirmResetAll,
    disabled: !resetPassword || resetBusy,
    className: "flex-1"
  }, resetBusy && React.createElement("span", {
    className: "btn-spinner",
    "aria-hidden": "true"
  }), resetBusy ? 'Resetowanie…' : 'TAK, RESETUJ'))))));
}

// ═══════════════════════════════════════════════════════════════
//  GRACZE
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
//  LOGIN MODAL — wybór gracza
// ═══════════════════════════════════════════════════════════════
function LoginModal({
  open,
  onClose,
  players,
  activePlayer,
  onLogin,
  onRename,
  onManagePlayers
}) {
  const [selected, setSelected] = useState('');
  const [step, setStep] = useState('pick'); // 'pick' | 'pin'
  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');
  const [renamingOpen, setRenamingOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [renamePin, setRenamePin] = useState('');
  const [renameErr, setRenameErr] = useState('');
  useEffect(() => {
    if (open) {
      setSelected('');
      setStep('pick');
      setPin('');
      setErr('');
      setRenamingOpen(false);
      setNewName('');
      setRenamePin('');
      setRenameErr('');
    }
  }, [open, activePlayer]);
  const pl = players.find(p => p.id === selected);
  const hasPinHash = pl && pl.pinHash;
  // Krok PIN pozostaje wąskim, kompaktowym oknem — reszta (lista, zmiana
  // nazwy) zawsze korzysta z tego samego, pełnowymiarowego panelu.
  const isCompactStep = step === 'pin';
  const handlePick = () => {
    if (!selected) {
      setErr('Wybierz gracza');
      return;
    }
    if (hasPinHash) {
      setStep('pin');
      setPin('');
      setErr('');
    } else {
      onLogin(selected);
    }
  };
  const handlePin = () => {
    if (pin.length < 4) {
      setErr('PIN musi mieć co najmniej 4 znaki');
      return;
    }
    if (hashPin(pin) !== pl.pinHash) {
      setErr('Błędny PIN — spróbuj jeszcze raz');
      return;
    }
    onLogin(selected);
  };
  const handleRenameSubmit = () => {
    const name = newName.trim();
    if (!name) {
      setRenameErr('Wpisz imię i nazwisko');
      return;
    }
    if (name === pl.name) {
      setRenameErr('Nowa nazwa jest taka sama jak obecna');
      return;
    }
    if (hasPinHash) {
      if (renamePin.length < 4) {
        setRenameErr('Wpisz PIN użytkownika');
        return;
      }
      if (hashPin(renamePin) !== pl.pinHash) {
        setRenameErr('Błędny PIN — spróbuj jeszcze raz');
        return;
      }
    }
    onRename(selected, name);
    onLogin(selected);
    onClose();
  };
  return React.createElement(Modal, {
    open: open,
    onClose: onClose,
    title: activePlayer ? "Profil i użytkownicy" : "Zaloguj się",
    maxWidth: isCompactStep ? "max-w-xs" : "max-w-sm",
    panelClassName: `login-modal-sheet${isCompactStep ? " login-modal-compact-sheet" : ""}`,
    overlayClassName: "profile-modal-overlay"
  }, React.createElement("div", {
    className: "profile-modal-body"
  }, step === 'pick' && React.createElement(React.Fragment, null,
    !activePlayer && React.createElement("p", {
      className: "profile-modal-hint"
    }, "Wybierz swój profil, żeby typować."),
    React.createElement("button", {
      className: "profile-add-btn",
      onClick: onManagePlayers
    },
      React.createElement(Icon, { name: "plus", size: 15 }),
      players.length === 0 ? "Dodaj pierwszego użytkownika" : "Dodaj użytkownika"
    ),
    React.createElement("div", {
      className: "profile-player-list"
    }, players.length === 0 && React.createElement("p", {
      className: "profile-empty-hint"
    }, "Brak użytkowników. Użyj przycisku powyżej."), players.map(p => {
      const isOpen = selected === p.id;
      const isCurrent = activePlayer && activePlayer === p.id;
      return React.createElement("div", {
        key: p.id,
        className: `profile-choice-shell${isOpen ? ' is-open' : ''}${isCurrent ? ' is-current' : ''}`
      },
        React.createElement("button", {
          onClick: () => {
            setSelected(prev => prev === p.id ? '' : p.id);
            setErr('');
            setRenamingOpen(false);
          },
          className: "profile-choice-trigger"
        },
          React.createElement("div", { className: `profile-row-avatar${isCurrent ? ' is-active' : ''}` },
            p.name.slice(0, 1).toUpperCase()
          ),
          React.createElement("div", { className: "profile-row-info" },
            React.createElement("span", { className: "profile-row-name" }, p.name),
            isCurrent && React.createElement("span", { className: "profile-row-badge" }, "aktywny")
          ),
          React.createElement("div", {
            className: `profile-row-chevron${isOpen ? ' is-open' : ''}`
          }, React.createElement(Icon, { name: "chevdown", size: 16 }))
        ),
        isOpen && React.createElement("div", { className: "profile-choice-actions" },
          isCurrent
            ? React.createElement("button", {
                className: "profile-action-btn profile-action-logout",
                onClick: () => { onLogin(''); onClose(); }
              }, React.createElement(Icon, { name: "logout", size: 14 }), "Wyloguj się")
            : React.createElement("button", {
                className: "profile-action-btn profile-action-login",
                onClick: () => {
                  setSelected(p.id);
                  if (p.pinHash) { setStep('pin'); setPin(''); setErr(''); }
                  else onLogin(p.id);
                }
              }, React.createElement(Icon, { name: p.pinHash ? 'lock' : 'check', size: 14 }), "Zaloguj"),
          React.createElement("button", {
            className: "profile-action-btn profile-action-rename",
            onClick: () => {
              setRenamingOpen(prev => !prev);
              setNewName(p.name || '');
              setRenamePin('');
              setRenameErr('');
            }
          }, React.createElement(Icon, { name: "edit", size: 14 }), "Zmień nazwę"),
          !renamingOpen && React.createElement("button", {
            className: "profile-action-btn profile-action-cancel profile-action-full",
            onClick: () => { setSelected(''); setRenamingOpen(false); }
          }, "Anuluj")
        ),
        isOpen && renamingOpen && React.createElement("div", { className: "profile-inline-rename" },
          React.createElement("div", { className: "profile-field" },
            React.createElement("label", { className: "profile-label" }, "Nowe imię i nazwisko"),
            React.createElement("input", {
              autoFocus: true,
              value: newName,
              onChange: e => { setNewName(e.target.value); setRenameErr(''); },
              onKeyDown: e => { if (e.key === 'Enter' && !hasPinHash) handleRenameSubmit(); },
              placeholder: "np. Jan Kowalski",
              className: `profile-text-input${renameErr ? ' has-error' : ''}`
            })
          ),
          hasPinHash && React.createElement("div", { className: "profile-field" },
            React.createElement("label", { className: "profile-label" }, "PIN użytkownika"),
            React.createElement("input", {
              type: "password",
              inputMode: "numeric",
              value: renamePin,
              onChange: e => { setRenamePin(e.target.value); setRenameErr(''); },
              onKeyDown: e => { if (e.key === 'Enter') handleRenameSubmit(); },
              placeholder: "••••",
              maxLength: 8,
              className: `profile-pin-input${renameErr ? ' has-error' : ''}`
            })
          ),
          renameErr && React.createElement("p", { className: "profile-error" }, renameErr),
          React.createElement("div", { className: "profile-step-actions" },
            React.createElement("button", {
              className: "profile-action-btn profile-action-cancel",
              onClick: () => setRenamingOpen(false)
            }, "Anuluj"),
            React.createElement("button", {
              className: "profile-action-btn profile-action-login",
              onClick: handleRenameSubmit,
              disabled: !newName.trim()
            }, React.createElement(Icon, { name: "check", size: 14 }), "Zapisz nazwę")
          )
        )
      );
    })),
    err && React.createElement("p", { className: "profile-error" }, err),
    React.createElement("button", {
      className: "profile-close-btn",
      onClick: onClose
    }, "Zamknij")
  ), step === 'pin' && React.createElement(React.Fragment, null,
    React.createElement("div", { className: "profile-step-hero" },
      React.createElement("div", { className: "profile-step-avatar" }, pl.name.slice(0, 1).toUpperCase()),
      React.createElement("p", { className: "profile-step-name" }, pl.name),
      React.createElement("p", { className: "profile-step-hint" }, "Wpisz PIN, żeby się zalogować")
    ),
    React.createElement("input", {
      type: "password",
      inputMode: "numeric",
      value: pin,
      autoFocus: true,
      onChange: e => { setPin(e.target.value); setErr(''); },
      onKeyDown: e => e.key === 'Enter' && handlePin(),
      placeholder: "••••",
      maxLength: 8,
      className: `profile-pin-input${err ? ' has-error' : ''}`
    }),
    err && React.createElement("p", { className: "profile-error", style: { textAlign: 'center' } }, err),
    React.createElement("div", { className: "profile-step-actions" },
      React.createElement("button", {
        className: "profile-action-btn profile-action-cancel",
        onClick: () => { setPin(''); setErr(''); setStep('pick'); }
      }, "Anuluj"),
      React.createElement("button", {
        className: "profile-action-btn profile-action-login",
        onClick: handlePin,
        disabled: pin.length < 4
      }, React.createElement(LockIcon, { name: "unlock", size: 14 }), "Zaloguj")
    )
  )));
}
function PlayersManager({
  open,
  onClose,
  onCancel,
  players,
  onAddPlayer
}) {
  const [newName, setNewName] = useState('');
  const [newPin, setNewPin] = useState('');
  const [newPin2, setNewPin2] = useState('');
  const [error, setError] = useState('');
  const reset = () => {
    setNewName('');
    setNewPin('');
    setNewPin2('');
    setError('');
  };
  useEffect(() => {
    if (open) reset();
  }, [open]);
  const closeModal = () => {
    reset();
    onClose();
  };
  // "Anuluj" wraca do listy "Profil i użytkownicy" zamiast całkiem
  // zamykać okno — X i kliknięcie w tło nadal zamykają całkowicie.
  const cancelToList = () => {
    reset();
    (onCancel || onClose)();
  };
  const handleAdd = () => {
    const name = newName.trim();
    if (!name) {
      setError('Wpisz imię');
      return;
    }
    if (players.find(p => p.name.toLowerCase() === name.toLowerCase())) {
      setError('Gracz o tym imieniu już istnieje');
      return;
    }
    if (newPin.length < 4) {
      setError('PIN musi mieć co najmniej 4 znaki');
      return;
    }
    if (newPin !== newPin2) {
      setError('PINy się nie zgadzają');
      return;
    }
    onAddPlayer(name, newPin);
    closeModal();
  };
  return React.createElement(Modal, {
    open: open,
    onClose: closeModal,
    title: "Dodaj u\u017Cytkownika",
    maxWidth: "max-w-sm",
    panelClassName: "login-modal-sheet",
    overlayClassName: "profile-modal-overlay"
  }, React.createElement("div", {
    className: "app-note app-note--warning app-note--compact"
  }, "Zapami\u0119taj PIN \u2014 nie da si\u0119 go odzyska\u0107."), React.createElement("div", {
    className: "profile-field"
  }, React.createElement("label", { className: "profile-label" }, "Imi\u0119 i nazwisko"), React.createElement("input", {
    value: newName,
    onChange: e => {
      setNewName(e.target.value);
      setError('');
    },
    placeholder: "np. Jan Kowalski",
    autoFocus: true,
    className: "profile-text-input"
  })), React.createElement("div", {
    className: "profile-field"
  }, React.createElement("label", { className: "profile-label" }, "PIN (min. 4 znaki)"), React.createElement("input", {
    type: "password",
    inputMode: "numeric",
    value: newPin,
    onChange: e => {
      setNewPin(e.target.value);
      setError('');
    },
    placeholder: "\u2022\u2022\u2022\u2022",
    maxLength: 8,
    className: "profile-text-input"
  })), React.createElement("div", {
    className: "profile-field"
  }, React.createElement("label", { className: "profile-label" }, "Powt\xF3rz PIN"), React.createElement("input", {
    type: "password",
    inputMode: "numeric",
    value: newPin2,
    onChange: e => {
      setNewPin2(e.target.value);
      setError('');
    },
    onKeyDown: e => e.key === 'Enter' && handleAdd(),
    placeholder: "\u2022\u2022\u2022\u2022",
    maxLength: 8,
    className: "profile-text-input"
  })), error && React.createElement("p", { className: "profile-error" }, error), React.createElement("div", {
    className: "profile-step-actions"
  }, React.createElement("button", {
    className: "profile-action-btn profile-action-cancel",
    onClick: cancelToList
  }, "Anuluj"), React.createElement("button", {
    className: "profile-action-btn profile-action-login",
    onClick: handleAdd
  }, React.createElement(Icon, {
    name: "plus",
    size: 14
  }), "Utw\xF3rz konto")));
}

// ═══════════════════════════════════════════════════════════════
//  DRABINKA TURNIEJU
// ═══════════════════════════════════════════════════════════════
// Oficjalna ścieżka fazy pucharowej FIFA World Cup 2026.
// Kolejność wizualna jest celowo inna niż kolejność numerów meczów,
// aby każda para sąsiadujących kart prowadziła do właściwego kolejnego meczu.

// Dokładne przejścia zwycięzców zgodne z kolejnością gałęzi TVP.
const BRACKET_FEEDS = {
  M89: [['M75', 'winner'], ['M78', 'winner']],
  M90: [['M73', 'winner'], ['M76', 'winner']],
  M91: [['M74', 'winner'], ['M77', 'winner']],
  M92: [['M79', 'winner'], ['M80', 'winner']],
  M93: [['M84', 'winner'], ['M83', 'winner']],
  M94: [['M82', 'winner'], ['M81', 'winner']],
  M95: [['M87', 'winner'], ['M86', 'winner']],
  M96: [['M85', 'winner'], ['M88', 'winner']],
  M97: [['M89', 'winner'], ['M90', 'winner']],
  M98: [['M93', 'winner'], ['M94', 'winner']],
  M99: [['M91', 'winner'], ['M92', 'winner']],
  M100: [['M95', 'winner'], ['M96', 'winner']],
  M101: [['M97', 'winner'], ['M98', 'winner']],
  M102: [['M99', 'winner'], ['M100', 'winner']],
  M103: [['M101', 'loser'], ['M102', 'loser']],
  M104: [['M101', 'winner'], ['M102', 'winner']]
};
const BRACKET_LAYOUT = {
  rounds: [{
    label: '1/16 finału',
    ids: ['M75', 'M78', 'M73', 'M76', 'M84', 'M83', 'M82', 'M81', 'M74', 'M77', 'M79', 'M80', 'M87', 'M86', 'M85', 'M88']
  }, {
    label: '1/8 finału',
    ids: ['M89', 'M90', 'M93', 'M94', 'M91', 'M92', 'M95', 'M96']
  }, {
    label: 'Ćwierćfinał',
    ids: ['M97', 'M98', 'M99', 'M100']
  }, {
    label: 'Półfinał',
    ids: ['M101', 'M102']
  }, {
    label: 'Finał',
    ids: ['M104']
  }]
};
const BRACKET_SOURCES = {
  M73: ['2. miejsce grupy A', '2. miejsce grupy B'],
  M74: ['1. miejsce grupy E', '3. miejsce: A/B/C/D/F'],
  M75: ['1. miejsce grupy F', '2. miejsce grupy C'],
  M76: ['1. miejsce grupy C', '2. miejsce grupy F'],
  M77: ['2. miejsce grupy E', '2. miejsce grupy I'],
  M78: ['1. miejsce grupy I', '3. miejsce: C/D/F/G/H'],
  M79: ['1. miejsce grupy A', '3. miejsce: C/E/F/H/I'],
  M80: ['1. miejsce grupy L', '3. miejsce: E/H/I/J/K'],
  M81: ['1. miejsce grupy G', '3. miejsce: A/E/H/I/J'],
  M82: ['1. miejsce grupy D', '3. miejsce: B/E/F/I/J'],
  M83: ['1. miejsce grupy H', '2. miejsce grupy J'],
  M84: ['2. miejsce grupy K', '2. miejsce grupy L'],
  M85: ['1. miejsce grupy B', '3. miejsce: E/F/G/I/J'],
  M86: ['2. miejsce grupy D', '2. miejsce grupy G'],
  M87: ['1. miejsce grupy J', '2. miejsce grupy H'],
  M88: ['1. miejsce grupy K', '3. miejsce: D/E/I/J/L'],
  M89: ['Zwycięzca M75', 'Zwycięzca M78'],
  M90: ['Zwycięzca M73', 'Zwycięzca M76'],
  M91: ['Zwycięzca M74', 'Zwycięzca M77'],
  M92: ['Zwycięzca M79', 'Zwycięzca M80'],
  M93: ['Zwycięzca M84', 'Zwycięzca M83'],
  M94: ['Zwycięzca M82', 'Zwycięzca M81'],
  M95: ['Zwycięzca M87', 'Zwycięzca M86'],
  M96: ['Zwycięzca M85', 'Zwycięzca M88'],
  M97: ['Zwycięzca M89', 'Zwycięzca M90'],
  M98: ['Zwycięzca M93', 'Zwycięzca M94'],
  M99: ['Zwycięzca M91', 'Zwycięzca M92'],
  M100: ['Zwycięzca M95', 'Zwycięzca M96'],
  M101: ['Zwycięzca M97', 'Zwycięzca M98'],
  M102: ['Zwycięzca M99', 'Zwycięzca M100'],
  M103: ['Przegrany M101', 'Przegrany M102'],
  M104: ['Zwycięzca M101', 'Zwycięzca M102']
};
function bracketWinnerSide(result) {
  if (!result) return null;
  if (result.advancingTeam === 'home' || result.advancingTeam === 'away') return result.advancingTeam;
  if (typeof result.home === 'number' && typeof result.away === 'number' && result.home !== result.away) return result.home > result.away ? 'home' : 'away';
  return null;
}
function resolveBracketTeamId(matchId, side, matchesById, results, cache) {
  const key = `${matchId}:${side}`;
  if (Object.prototype.hasOwnProperty.call(cache, key)) return cache[key];
  const matchObj = matchesById[matchId];
  if (matchObj && matchObj.phase === 'r32') {
    const teamId = matchObj[side === 'home' ? 'homeTeamId' : 'awayTeamId'] || null;
    cache[key] = teamId;
    return cache[key];
  }
  const feed = BRACKET_FEEDS[matchId];
  if (feed) {
    const source = feed[side === 'home' ? 0 : 1];
    const [sourceId, outcome] = source;
    const winnerSide = bracketWinnerSide(results[sourceId]);
    if (winnerSide) {
      const selectedSide = outcome === 'loser' ? winnerSide === 'home' ? 'away' : 'home' : winnerSide;
      cache[key] = resolveBracketTeamId(sourceId, selectedSide, matchesById, results, cache);
      return cache[key];
    }
  }
  const fallback = matchObj?.[side === 'home' ? 'homeTeamId' : 'awayTeamId'] || null;
  cache[key] = fallback;
  return fallback;
}
function BracketMatchCard({
  match,
  teams,
  result,
  sourceLabels = ['Do ustalenia', 'Do ustalenia'],
  style,
  large = false
}) {
  if (!match) return null;
  const home = teams[match.homeTeamId];
  const away = teams[match.awayTeamId];
  const winner = bracketWinnerSide(result);
  const finished = !!result;
  const row = (side, team, placeholder) => {
    const isWinner = winner === side;
    const isLoser = finished && winner && winner !== side;
    const score = result && typeof result[side] === 'number' ? result[side] : '–';
    return React.createElement("div", {
      className: `bracket-team-row${isWinner ? ' is-winner' : ''}${isLoser ? ' is-loser' : ''}`
    }, team ? React.createElement(FlagImg, {
      code: team.flag,
      size: large ? 22 : 16,
      title: team.name
    }) : React.createElement("span", null), React.createElement("span", {
      className: `bracket-team-name${team ? '' : ' bracket-placeholder'}`
    }, team?.name || placeholder), React.createElement("span", {
      className: "bracket-score"
    }, score));
  };
  return React.createElement("div", {
    className: `${large ? 'bracket-final-card' : 'bracket-match'}${finished ? ' is-finished' : ''}`,
    style: style
  }, React.createElement("div", {
    className: "bracket-match-head"
  }, React.createElement("span", null, "Mecz ", match.num), React.createElement("span", null, formatDate(match.date))), row('home', home, sourceLabels[0]), row('away', away, sourceLabels[1]));
}
function BracketTree({
  config,
  matchesById,
  teams,
  results
}) {
  const resolvedCache = {};
  const resolvedMatchForId = id => {
    const match = matchesById[id];
    if (!match) return null;
    return {
      ...match,
      homeTeamId: resolveBracketTeamId(id, 'home', matchesById, results, resolvedCache),
      awayTeamId: resolveBracketTeamId(id, 'away', matchesById, results, resolvedCache)
    };
  };
  const groupX = 0;
  const knockoutOffset = 238;
  const xs = [0, 246, 492, 738, 984].map(x => x + knockoutOffset);
  const ys = [[0, 70, 140, 210, 280, 350, 420, 490, 560, 630, 700, 770, 840, 910, 980, 1050], [35, 175, 315, 455, 595, 735, 875, 1015], [105, 385, 665, 945], [245, 805], [525]];
  const cardH = 66;
  const cardW = 192;
  const boardW = 1414;
  const connectorH = 1120;
  const connectorGap = 8;
  const connectorRadius = 8;
  const connectorPaths = [];
  for (let round = 0; round < config.rounds.length - 1; round++) {
    const fromYs = ys[round];
    const toYs = ys[round + 1];
    const xStart = xs[round] + cardW + connectorGap;
    const xEnd = xs[round + 1] - connectorGap;
    const xTurn = (xStart + xEnd) / 2;
    const roundedArm = (yStart, yTarget) => {
      const direction = yTarget >= yStart ? 1 : -1;
      const radius = Math.min(connectorRadius, Math.abs(yTarget - yStart) / 2, Math.max(0, xTurn - xStart));
      if (radius <= 0) return `M${xStart},${yStart} H${xTurn}`;
      return `M${xStart},${yStart} H${xTurn - radius} Q${xTurn},${yStart} ${xTurn},${yStart + direction * radius} V${yTarget}`;
    };
    toYs.forEach((toY, targetIndex) => {
      const firstSource = fromYs[targetIndex * 2];
      const secondSource = fromYs[targetIndex * 2 + 1];
      if (firstSource === undefined || secondSource === undefined) return;
      const yTop = firstSource + cardH / 2;
      const yBottom = secondSource + cardH / 2;
      const yTarget = toY + cardH / 2;
      const d = [roundedArm(yTop, yTarget), roundedArm(yBottom, yTarget), `M${xTurn},${yTarget} H${xEnd}`].join(' ');
      connectorPaths.push(React.createElement("path", {
        key: `${round}-${targetIndex}`,
        d: d
      }));
    });
  }
  const groupTables = buildGroupTables(Object.values(matchesById), teams, results);
  const advancedThirdTeamIds = new Set();
  Object.values(matchesById).forEach(match => {
    if (match?.phase !== 'r32') return;
    ['homeTeamId', 'awayTeamId'].forEach(key => {
      const team = teams[match[key]];
      const groupRows = team?.group ? groupTables[team.group] || [] : [];
      if (groupRows[2]?.team?.id === team?.id) advancedThirdTeamIds.add(team.id);
    });
  });
  const groupCardH = 88;
  const groupGap = 6;
  return React.createElement("section", {
    className: "bracket-section bracket-section-unified"
  }, React.createElement("div", {
    className: "bracket-scroll"
  }, React.createElement("div", {
    className: "bracket-board bracket-board-unified",
    style: {
      width: boardW,
      height: 1174
    }
  }, React.createElement("div", {
    className: "bracket-round-label bracket-group-round-label",
    style: { left: groupX }
  }, "FAZA GRUPOWA"), React.createElement("div", {
    className: "bracket-group-column",
    style: { left: groupX, top: 40, width: cardW }
  }, GROUPS.map((group, idx) => React.createElement("div", {
    key: group,
    className: "bracket-group-compact-card",
    style: { top: idx * (groupCardH + groupGap), height: groupCardH }
  }, React.createElement("div", {
    className: "bracket-group-compact-head"
  }, React.createElement("span", {
    className: "bracket-group-compact-title"
  }, "Grupa ", group), React.createElement("span", {
    className: "bracket-group-compact-stat-head"
  }, "+/-"), React.createElement("span", {
    className: "bracket-group-compact-stat-head"
  }, "PKT")), React.createElement("div", {
    className: "bracket-group-compact-rows"
  }, (groupTables[group] || []).map((row, pos) => React.createElement("div", {
    key: row.team.id,
    className: "bracket-group-compact-row" + (pos < 2 || advancedThirdTeamIds.has(row.team.id) ? " is-advance" : "")
  }, React.createElement("span", {
    className: "bracket-group-compact-pos"
  }, pos + 1), React.createElement(FlagImg, {
    code: row.team.flag,
    size: 13,
    title: row.team.name
  }), React.createElement("span", {
    className: "bracket-group-compact-team"
  }, row.team.name), React.createElement("span", {
    className: "bracket-group-compact-diff"
  }, row.gd > 0 ? "+" + row.gd : row.gd), React.createElement("strong", null, row.pts))))))), config.rounds.map((round, idx) => React.createElement("div", {
    key: round.label,
    className: "bracket-round-label",
    style: {
      left: xs[idx]
    }
  }, round.label)), React.createElement("svg", {
    className: "bracket-connectors bracket-connectors-unified",
    viewBox: `0 0 ${boardW} ${connectorH}`,
    preserveAspectRatio: "none"
  }, connectorPaths), config.rounds.map((round, rIdx) => round.ids.map((id, mIdx) => {
    const match = resolvedMatchForId(id);
    return React.createElement(BracketMatchCard, {
      key: id,
      match: match,
      teams: teams,
      result: results[id],
      sourceLabels: BRACKET_SOURCES[id],
      style: {
        left: xs[rIdx],
        top: 40 + ys[rIdx][mIdx]
      }
    });
  })), React.createElement("div", {
    className: "bracket-third-place-label",
    style: {
      left: xs[4],
      top: 682
    }
  }, "Mecz o 3. miejsce"), React.createElement(BracketMatchCard, {
    match: resolvedMatchForId('M103'),
    teams: teams,
    result: results.M103,
    sourceLabels: BRACKET_SOURCES.M103,
    style: {
      left: xs[4],
      top: 702
    }
  }))));
}
function buildGroupTables(matches, teams, results) {
  const table = Object.fromEntries(GROUPS.map(g => [g, []]));
  Object.values(teams || {}).forEach(team => {
    if (!team || !team.group || !table[team.group]) return;
    table[team.group].push({ team, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 });
  });
  const byGroupTeam = {};
  Object.entries(table).forEach(([group, rows]) => {
    byGroupTeam[group] = Object.fromEntries(rows.map(row => [row.team.id, row]));
  });
  (matches || []).filter(match => match.phase === 'group').forEach(match => {
    const result = results && results[match.id];
    if (!result || typeof result.home !== 'number' || typeof result.away !== 'number') return;
    const group = match.group;
    const home = byGroupTeam[group] && byGroupTeam[group][match.homeTeamId];
    const away = byGroupTeam[group] && byGroupTeam[group][match.awayTeamId];
    if (!home || !away) return;
    home.p += 1; away.p += 1;
    home.gf += result.home; home.ga += result.away;
    away.gf += result.away; away.ga += result.home;
    if (result.home > result.away) { home.w += 1; away.l += 1; home.pts += 3; }
    else if (result.home < result.away) { away.w += 1; home.l += 1; away.pts += 3; }
    else { home.d += 1; away.d += 1; home.pts += 1; away.pts += 1; }
  });
  Object.values(table).forEach(rows => {
    rows.forEach(row => { row.gd = row.gf - row.ga; });
    rows.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.team.name.localeCompare(b.team.name, 'pl'));
  });
  return table;
}

function GroupTablesPanel({ matches, teams, results }) {
  const tables = useMemo(() => buildGroupTables(matches, teams, results), [matches, teams, results]);
  return React.createElement("aside", { className: "bracket-group-tables", "aria-label": "Tabele grup" },
    React.createElement("div", { className: "bracket-group-tables-head" },
      React.createElement("h3", null, "Tabele grup"),
      React.createElement("span", null, "Faza grupowa")
    ),
    GROUPS.map(group => {
      const rows = tables[group] || [];
      return React.createElement("section", { key: group, className: "bracket-group-table-card" },
        React.createElement("div", { className: "bracket-group-table-title" }, "Grupa ", group),
        React.createElement("div", { className: "bracket-group-table" },
          React.createElement("div", { className: "bracket-group-table-row bracket-group-table-row-head" },
            React.createElement("span", null, "#"),
            React.createElement("span", null, "Drużyna"),
            React.createElement("span", null, "M"),
            React.createElement("span", null, "+/-"),
            React.createElement("span", null, "PKT")
          ),
          rows.map((row, idx) => React.createElement("div", {
            key: row.team.id,
            className: "bracket-group-table-row" + (idx < 2 ? " is-advance" : idx === 2 ? " is-third" : "")
          },
            React.createElement("span", { className: "bracket-group-pos" }, idx + 1),
            React.createElement("span", { className: "bracket-group-team" },
              React.createElement(FlagImg, { code: row.team.flag, size: 14, title: row.team.name }),
              React.createElement("span", null, row.team.name)
            ),
            React.createElement("span", null, row.p),
            React.createElement("span", null, row.gd > 0 ? "+" + row.gd : row.gd),
            React.createElement("strong", null, row.pts)
          ))
        )
      );
    })
  );
}

function TournamentBracket({
  matches,
  teams,
  results
}) {
  const matchesById = useMemo(() => Object.fromEntries(matches.map(m => [m.id, m])), [matches]);
  return React.createElement("div", {
    className: "bracket-page"
  }, React.createElement("div", {
    className: "bracket-intro"
  }, React.createElement("h2", null, "Drabinka turnieju"), React.createElement("p", null, "Przeci\u0105gnij drabink\u0119 poziomo, aby zobaczy\u0107 kolejne etapy.")), React.createElement(BracketTree, {
    config: BRACKET_LAYOUT,
    matchesById: matchesById,
    teams: teams,
    results: results
  }));
}

// ═══════════════════════════════════════════════════════════════
//  DOLNA NAWIGACJA — przeciągalna "kropla" w stylu Liquid Glass
// ═══════════════════════════════════════════════════════════════
function BottomNav({
  tabs,
  activeTab,
  onSelect
}) {
  const trackRef = useRef(null);
  const [drop, setDrop] = useState({
    left: 0,
    width: 0
  });
  const [dragging, setDragging] = useState(false);
  const [previewIdx, setPreviewIdx] = useState(null);
  const dragInfo = useRef({
    active: false,
    startX: 0,
    hoverIdx: 0,
    moved: false,
    pointerId: null,
    captured: false
  });
  const suppressClick = useRef(false);
  const moveFrame = useRef(0);
  const selectTimer = useRef(0);
  const lastSelectAt = useRef(0);
  const activeIdx = Math.max(0, tabs.findIndex(t => t.k === activeTab));
  const visualIdx = dragging && previewIdx !== null ? previewIdx : activeIdx;
  const scrollPageTop = useCallback(() => {
    const behavior = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, left: 0, behavior });
    document.scrollingElement?.scrollTo?.({ top: 0, left: 0, behavior });
  }, []);

  // Pozycja pastylki jest liczona z faktycznego prostokąta przycisku.
  const positionFor = useCallback(idx => {
    const track = trackRef.current;
    if (!track) return null;
    const buttons = track.querySelectorAll('button[data-nav-index]');
    const btn = buttons[idx];
    if (!btn) return null;
    const trackRect = track.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const inset = 1;
    return {
      left: btnRect.left - trackRect.left + inset,
      width: Math.max(0, btnRect.width - inset * 2)
    };
  }, []);

  // Dopasowanie po zmianie zakładki i rozmiaru ekranu.
  useEffect(() => {
    if (dragging) return;
    const update = () => {
      const p = positionFor(activeIdx);
      if (p) setDrop(p);
    };
    const frame = requestAnimationFrame(update);
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', update);
    };
  }, [activeIdx, tabs.length, positionFor, dragging]);
  const idxFromX = useCallback(clientX => {
    const track = trackRef.current;
    if (!track) return activeIdx;
    const buttons = Array.from(track.querySelectorAll('button[data-nav-index]'));
    if (!buttons.length) return activeIdx;
    let nearest = 0;
    let nearestDistance = Infinity;
    buttons.forEach((btn, idx) => {
      const rect = btn.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(clientX - center);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = idx;
      }
    });
    return nearest;
  }, [activeIdx]);
  const onPointerDown = e => {
    if (e.button !== undefined && e.button !== 0) return;
    const startIdx = idxFromX(e.clientX);
    dragInfo.current = {
      active: true,
      startX: e.clientX,
      hoverIdx: startIdx,
      moved: false,
      pointerId: e.pointerId,
      captured: false
    };
    suppressClick.current = false;
    // Nie przechwytujemy wskaźnika od razu, bo przechwycenie wskaźnika może blokować zwykły click
    // przycisku. Pointer capture włączamy dopiero po rozpoczęciu przeciągania.
  };
  const onPointerMove = e => {
    const info = dragInfo.current;
    if (!info.active || info.pointerId !== null && e.pointerId !== info.pointerId) return;
    const clientX = e.clientX;
    if (!info.moved && Math.abs(clientX - info.startX) > 6) {
      info.moved = true;
      suppressClick.current = true;
      setDragging(true);
      if (e.currentTarget.setPointerCapture) {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
          info.captured = true;
        } catch (_) {}
      }
    }
    if (!info.moved) return;
    if (e.cancelable) e.preventDefault();
    if (moveFrame.current) cancelAnimationFrame(moveFrame.current);
    moveFrame.current = requestAnimationFrame(() => {
      const idx = idxFromX(clientX);
      dragInfo.current.hoverIdx = idx;
      setPreviewIdx(idx);
      const p = positionFor(idx);
      if (p) setDrop(p);
      moveFrame.current = 0;
    });
  };
  const commitSelect = useCallback(tabKey => {
    if (!tabKey) return;
    scrollPageTop();
    if (tabKey === activeTab) return;
    const run = () => onSelect(tabKey);
    if (React.startTransition) React.startTransition(run);else run();
  }, [activeTab, onSelect, scrollPageTop]);
  const requestSelect = useCallback(tabKey => {
    if (!tabKey || tabKey === activeTab) return;
    const minGap = 180;
    const now = Date.now();
    const wait = Math.max(0, minGap - (now - lastSelectAt.current));
    if (selectTimer.current) {
      clearTimeout(selectTimer.current);
      selectTimer.current = 0;
    }
    if (wait === 0) {
      lastSelectAt.current = now;
      commitSelect(tabKey);
      return;
    }
    selectTimer.current = setTimeout(() => {
      lastSelectAt.current = Date.now();
      selectTimer.current = 0;
      commitSelect(tabKey);
    }, wait);
  }, [activeTab, commitSelect]);
  const finishPointer = (e, commit) => {
    if (moveFrame.current) {
      cancelAnimationFrame(moveFrame.current);
      moveFrame.current = 0;
    }
    const info = dragInfo.current;
    if (!info.active) return;
    if (info.pointerId !== null && e?.pointerId !== undefined && e.pointerId !== info.pointerId) return;
    if (info.captured && e?.currentTarget?.releasePointerCapture && info.pointerId !== null) {
      try {
        e.currentTarget.releasePointerCapture(info.pointerId);
      } catch (_) {}
    }
    const moved = !!info.moved;
    const idx = e?.clientX !== undefined ? idxFromX(e.clientX) : info.hoverIdx;
    dragInfo.current = {
      active: false,
      startX: 0,
      hoverIdx: activeIdx,
      moved: false,
      pointerId: null,
      captured: false
    };
    setDragging(false);
    setPreviewIdx(null);
    if (moved && commit && tabs[idx]) {
      const p = positionFor(idx);
      if (p) setDrop(p);
      if (tabs[idx].k !== activeTab) requestSelect(tabs[idx].k);
      // Klik generowany po przeciągnięciu nie może cofnąć wyboru.
      setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    } else {
      const p = positionFor(activeIdx);
      if (p) setDrop(p);
      if (!moved) suppressClick.current = false;else setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    }
  };
  const onNavClick = (e, tabKey) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (tabKey === activeTab) {
      scrollPageTop();
      return;
    }
    const _dropEl = trackRef.current && trackRef.current.querySelector('.nav-droplet');
    if (_dropEl) {
      _dropEl.classList.add('squishing');
      setTimeout(() => _dropEl.classList.remove('squishing'), 180);
    }
    requestSelect(tabKey);
  };
  useEffect(() => () => {
    if (moveFrame.current) cancelAnimationFrame(moveFrame.current);
    if (selectTimer.current) clearTimeout(selectTimer.current);
  }, []);
  const visualTab = tabs[visualIdx];
  const isAdminVisual = visualTab && visualTab.k === 'admin';
  return React.createElement("nav", {
    className: "bottom-nav"
  }, React.createElement("div", {
    className: "nav-track",
    ref: trackRef,
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: e => finishPointer(e, true),
    onPointerCancel: e => finishPointer(e, false)
  }, React.createElement("div", {
    className: "nav-droplet" + (dragging ? " dragging" : ""),
    style: {
      left: drop.left + 'px',
      width: drop.width + 'px',
      ...(isAdminVisual ? {
        background: 'linear-gradient(145deg,rgba(160,120,255,.40),rgba(124,58,237,.20))',
        borderColor: 'rgba(170,130,255,.5)'
      } : {})
    }
  }), tabs.map((t, i) => {
    const visuallyActive = visualIdx === i;
    return React.createElement("button", {
      key: t.k,
      type: "button",
      "data-nav-index": i,
      className: visuallyActive ? 'active' : '',
      "aria-current": visuallyActive ? 'page' : undefined,
      onClick: e => onNavClick(e, t.k),
      style: t.k === 'admin' && visuallyActive ? {
        color: '#ddd1ff'
      } : {}
    }, React.createElement(NavIcon, {
      name: t.i,
      size: 20,
      style: t.k === 'admin' && visuallyActive ? {
        color: '#ddd1ff'
      } : {}
    }), React.createElement("span", {
      className: "nav-label"
    }, t.l));
  })));
}

// ═══════════════════════════════════════════════════════════════
//  GŁÓWNA APLIKACJA
// ═══════════════════════════════════════════════════════════════
const INITIAL_TEAMS_CACHE = generateInitialTeams();
function Mundial2026() {
  const [players, setPlayers, plLoaded] = useFirebaseState(FB.players, []);
  const [teams, setTeams, tLoaded] = useFirebaseState(FB.teams, generateInitialTeams());
  const [matches, setMatches, mLoaded] = useFirebaseState(FB.matches, generateInitialMatches());
  const [predictions, setPredictions, prLoaded, setPredictionChild] = useFirebaseState(FB.predictions, {});
  const [results, setResults, rLoaded, setResultChild, removeResultChild] = useFirebaseState(FB.results, {});
  const [specialPredictions, setSpecialPredictions, spLoaded, setSpecialChild] = useFirebaseState(FB.specialPredictions, {});
  const [specialResults, setSpecialResults, srLoaded] = useFirebaseState(FB.specialResults, {
    groupOrders: {}
  });
  const [adminPasswordHash, setAdminPasswordHash, apLoaded] = useFirebaseState(FB.adminPassword, '');
  const [phaseLocks, setPhaseLocks, plkLoaded] = useFirebaseState(FB.phaseLocks, {});
  const [scoringSettings, setScoringSettings, scLoaded] = useFirebaseState(FB.scoringSettings, DEFAULT_POINTS);

  // activePlayer — lokalnie (per-urządzenie)
  const [activePlayer, setActivePlayerState] = useState(() => {
    try {
      return localStorage.getItem('wc2026:activePlayer') || '';
    } catch (e) {
      return '';
    }
  });
  const setActivePlayer = useCallback(id => {
    try {
      localStorage.setItem('wc2026:activePlayer', id);
    } catch (e) {}
    setActivePlayerState(id);
  }, []);
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('wc2026:theme');
      if (stored === 'light' || stored === 'dark' || stored === 'auto') return stored;
    } catch (e) {}
    return 'dark';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem('wc2026:theme', theme);
    } catch (e) {}
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', theme === 'light' ? '#f2f2f7' : '#0d2b4a');
  }, [theme]);
  const [activeTab, setActiveTab] = useState('matches');
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const updateViewportMode = () => {
      frame = 0;
      const vv = window.visualViewport;
      const standalone = !!(window.navigator && window.navigator.standalone) || window.matchMedia('(display-mode: standalone)').matches;
      const visualHeight = vv ? vv.height : window.innerHeight;
      const visualWidth = vv ? vv.width : window.innerWidth;
      const mobile = (window.matchMedia('(pointer: coarse)').matches && Math.min(window.innerWidth || 0, window.screen?.width || 0) <= 820) || visualWidth <= 620;
      const topInset = vv ? Math.max(0, vv.offsetTop || 0) : 0;
      const bottomInset = vv ? Math.max(0, (window.innerHeight || visualHeight) - visualHeight - topInset) : 0;
      root.classList.toggle('is-mobile-device', !!mobile);
      root.classList.toggle('is-mobile-browser', !!mobile && !standalone);
      root.classList.toggle('is-mobile-standalone', !!mobile && !!standalone);
      root.style.setProperty('--real-vh', `${visualHeight}px`);
      root.style.setProperty('--real-vw', `${visualWidth}px`);
      root.style.setProperty('--browser-top-ui', `${topInset}px`);
      root.style.setProperty('--browser-bottom-ui', `${bottomInset}px`);
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateViewportMode);
    };
    schedule();
    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);
    window.visualViewport && window.visualViewport.addEventListener('resize', schedule);
    window.visualViewport && window.visualViewport.addEventListener('scroll', schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('orientationchange', schedule);
      window.visualViewport && window.visualViewport.removeEventListener('resize', schedule);
      window.visualViewport && window.visualViewport.removeEventListener('scroll', schedule);
      root.classList.remove('is-mobile-device', 'is-mobile-browser', 'is-mobile-standalone');
      root.style.removeProperty('--real-vh');
      root.style.removeProperty('--real-vw');
      root.style.removeProperty('--browser-top-ui');
      root.style.removeProperty('--browser-bottom-ui');
    };
  }, []);

  // Po każdej zmianie głównej zakładki wróć na samą górę strony.
  useEffect(() => {
    scrollAppToTop();
  }, [activeTab]);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  // Blokada scrolla dla panelu admina jest teraz obsługiwana przez wspólny
  // <Modal> (ten sam mechanizm co pozostałe panele profilu) — osobny,
  // zdublowany mechanizm blokady, który był tu wcześniej (z czasów, gdy
  // AdminGate miał własną, bespoke nakładkę), został usunięty. Dwa
  // niezależne "zamki" na tych samych stylach html/body potrafiły wejść
  // sobie w drogę (jeden przywracał drugiemu już zablokowany stan),
  // zostawiając stronę trwale niescrollowalną albo przewiniętą do
  // nieaktualnej pozycji po przełączeniu zakładki.
  const [playersModal, setPlayersModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const allLoaded = plLoaded && tLoaded && mLoaded && prLoaded && rLoaded && spLoaded && srLoaded && apLoaded && plkLoaded && scLoaded;

  // inicjalizacja domyślnych danych w Firebase jeśli pusta baza
  useEffect(() => {
    if (!allLoaded) return;
    if (!teams || Object.keys(teams).length === 0) setTeams(generateInitialTeams());
    if (!matches || matches.length === 0) setMatches(generateInitialMatches());
    if (!scoringSettings || Object.keys(scoringSettings).length === 0) setScoringSettings(DEFAULT_POINTS);
  }, [allLoaded]);
  useEffect(() => {
    if (allLoaded && !activePlayer && players && players.length > 0) setActivePlayer(players[0].id);
  }, [allLoaded, players]);
  useEffect(() => {
    if (allLoaded) {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('root').style.display = 'block';
    }
  }, [allLoaded]);
  const handleAddPlayer = useCallback((name, pin) => {
    const p = {
      id: uid(),
      name,
      pinHash: hashPin(pin),
      createdAt: Date.now()
    };
    setPlayers(prev => [...(Array.isArray(prev) ? prev : []), p]);
    if (!activePlayer) setActivePlayer(p.id);
  }, [setPlayers, activePlayer, setActivePlayer]);
  const handleRenamePlayer = useCallback((id, newName) => {
    setPlayers(prev => (Array.isArray(prev) ? prev : []).map(p => p.id === id ? {
      ...p,
      name: newName.trim()
    } : p));
  }, [setPlayers]);
  const handleRemovePlayer = useCallback(id => {
    setPlayers(prev => (Array.isArray(prev) ? prev : []).filter(p => p.id !== id));
    if (activePlayer === id) setActivePlayer('');
    setPredictions(prev => {
      const n = {
        ...prev
      };
      Object.keys(n).forEach(k => {
        if (k.startsWith(`${id}:`)) delete n[k];
      });
      return n;
    });
    setSpecialPredictions(prev => {
      const n = {
        ...prev
      };
      delete n[id];
      return n;
    });
  }, [setPlayers, activePlayer, setActivePlayer, setPredictions, setSpecialPredictions]);
  const handleSavePrediction = useCallback(async (matchId, payload, pin, onErr, onSuccess) => {
    if (!activePlayer) return;
    const pl = (Array.isArray(players) ? players : []).find(p => p.id === activePlayer);
    if (pl && pl.pinHash && hashPin(pin) !== pl.pinHash) {
      onErr && onErr('Błędny PIN');
      return;
    }
    try {
      await setPredictionChild(`${activePlayer}:${matchId}`, payload);
      onSuccess && onSuccess();
    } catch (e) {
      onErr && onErr('Nie udało się zapisać. Sprawdź połączenie.');
    }
  }, [activePlayer, players, setPredictionChild]);
  const handleSaveSpecial = useCallback(async (playerId, payload, pin, onErr, onSuccess) => {
    const pl = (Array.isArray(players) ? players : []).find(p => p.id === playerId);
    if (pl && pl.pinHash && hashPin(pin) !== pl.pinHash) {
      onErr && onErr('Błędny PIN');
      return;
    }
    try {
      await setSpecialChild(playerId, payload);
      onSuccess && onSuccess();
    } catch (e) {
      onErr && onErr('Nie udało się zapisać. Sprawdź połączenie.');
    }
  }, [players, setSpecialChild]);
  const handleSaveResult = useCallback(async (matchId, payload) => {
    await setResultChild(matchId, payload);
  }, [setResultChild]);
  const handleDeleteResult = useCallback(async matchId => {
    await removeResultChild(matchId);
  }, [removeResultChild]);
  const handleUpdateTeam = useCallback(async (idOrMatchId, nameOrHomeId, flagOrAwayId) => {
    if (idOrMatchId.startsWith('M')) {
      await setMatches(prev => (prev || []).map(m => m.id === idOrMatchId ? {
        ...m,
        homeTeamId: nameOrHomeId,
        awayTeamId: flagOrAwayId
      } : m));
    } else {
      await setTeams(prev => ({
        ...(prev || {}),
        [idOrMatchId]: {
          ...(prev || {})[idOrMatchId],
          name: nameOrHomeId,
          flag: flagOrAwayId
        }
      }));
    }
  }, [setMatches, setTeams]);
  const handleImport = useCallback(async data => {
    if (data.players) await setPlayers(data.players);
    if (data.teams) await setTeams(data.teams);
    if (data.matches) await setMatches(data.matches);
    if (data.predictions) await setPredictions(data.predictions);
    if (data.results) await setResults(data.results);
    if (data.specialPredictions) await setSpecialPredictions(data.specialPredictions);
    if (data.specialResults) await setSpecialResults(data.specialResults);
    if (data.phaseLocks) await setPhaseLocks(data.phaseLocks);
    if (data.scoringSettings) await setScoringSettings(normalizePointsSettings(data.scoringSettings));
  }, [setPlayers, setTeams, setMatches, setPredictions, setResults, setSpecialPredictions, setSpecialResults, setPhaseLocks, setScoringSettings]);
  const handleResetAll = useCallback(async () => {
    await setPlayers([]);
    await setTeams(generateInitialTeams());
    await setMatches(generateInitialMatches());
    await setPredictions({});
    await setResults({});
    await setSpecialPredictions({});
    await setSpecialResults({
      groupOrders: {}
    });
    await setScoringSettings(DEFAULT_POINTS);
    await setPhaseLocks({});
    setActivePlayer('');
  }, [setPlayers, setTeams, setMatches, setPredictions, setResults, setSpecialPredictions, setSpecialResults, setScoringSettings, setPhaseLocks, setActivePlayer]);
  const compareOn = !!(phaseLocks && phaseLocks['compareVisible']);
  useEffect(() => {
    if (!compareOn && !adminUnlocked && (activeTab === 'compare' || activeTab === 'allspecials')) setActiveTab('matches');
  }, [compareOn, adminUnlocked]);
  const tabs = useMemo(() => [{
    k: 'matches',
    l: 'Mecze',
    i: 'calendar'
  }, {
    k: 'bracket',
    l: 'Drabinka',
    i: 'bracket'
  }, {
    k: 'specials',
    l: 'Specjalne',
    i: 'star'
  }, {
    k: 'leaderboard',
    l: 'Ranking',
    i: 'podium'
  }, ...(compareOn || adminUnlocked ? [{
    k: 'compare',
    l: 'Porównaj',
    i: 'eye'
  }, {
    k: 'allspecials',
    l: 'Wszyscy',
    i: 'users'
  }] : []), ...(adminUnlocked ? [{
    k: 'admin',
    l: 'Wyniki',
    i: 'settings'
  }] : [])], [compareOn, adminUnlocked]);
  const safeTeams = useMemo(() => {
    const init = INITIAL_TEAMS_CACHE;
    const src = teams || init;
    return Object.fromEntries(Object.entries(src).map(([k, v]) => [k, {
      ...(init[k] || {}),
      ...v
    }]));
  }, [teams]);
  const safeMatches = useMemo(() => Array.isArray(matches) ? matches : [], [matches]);
  const safePlayers = useMemo(() => Array.isArray(players) ? players : [], [players]);
  const safePredictions = useMemo(() => predictions || {}, [predictions]);
  const safeResults = useMemo(() => results || {}, [results]);
  const safeSpecialPredictions = useMemo(() => specialPredictions || {}, [specialPredictions]);
  const safeSpecialResults = useMemo(() => specialResults || {
    groupOrders: {}
  }, [specialResults]);
  const safeScoringSettings = useMemo(() => normalizePointsSettings(scoringSettings), [scoringSettings]);
  POINTS = safeScoringSettings;
  const activePlayerData = useMemo(() => safePlayers.find(p => p.id === activePlayer) || null, [safePlayers, activePlayer]);

  // ── install prompt ──
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(0);
  const showToast = useCallback(msg => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast('');
      toastTimer.current = 0;
    }, 1600);
  }, []);
  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);
  const onSavePredictionCb = useCallback((id, p, pin, onErr) => {
    handleSavePrediction(id, p, pin, onErr, () => showToast('Typ zapisany'));
  }, [handleSavePrediction, showToast]);
  const onSaveSpecialCb = useCallback((id, p, pin, onErr) => {
    handleSaveSpecial(id, p, pin, onErr, () => showToast('Typy specjalne zapisane'));
  }, [handleSaveSpecial, showToast]);
  const onSaveResultCb = useCallback(async (id, p) => {
    try {
      await handleSaveResult(id, p);
      showToast('Wynik zapisany');
    } catch (e) {
      showToast('Nie udało się zapisać wyniku');
    }
  }, [handleSaveResult, showToast]);
  const onUpdateTeamCb = useCallback(async (id, a, b) => {
    try {
      await handleUpdateTeam(id, a, b);
      showToast(id.startsWith('M') ? 'Para meczu zapisana' : 'Drużyna zapisana');
    } catch (e) {
      showToast('Nie udało się zapisać zmian');
    }
  }, [handleUpdateTeam, showToast]);
  useEffect(() => {
    const h = e => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', h);
    return () => window.removeEventListener('beforeinstallprompt', h);
  }, []);
  const doInstall = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then(() => {
      setInstallPrompt(null);
      setShowInstall(false);
    });
  };
  return React.createElement("div", {
    className: "min-h-screen pitch-bg"
  }, React.createElement("header", {
    className: "app-header",
    style: {background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%), rgba(14,20,35,0.55)", backdropFilter: "blur(12px) saturate(150%)", WebkitBackdropFilter: "blur(12px) saturate(150%)", borderBottom: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 1px 0 rgba(255,255,255,0.10), 0 4px 24px rgba(0,0,0,0.40)"}
  }, React.createElement("div", {
    className: "logo"
  }, React.createElement("div", {
    className: "title-group"
  }, React.createElement("h1", null, "FIFA WORLD CUP 2026"))), React.createElement("div", {
    className: "player-row"
  }, React.createElement("button", {
    onClick: () => {
      setAdminLoginOpen(false);
      if (activeTab === 'admin') setActiveTab('matches');
      setPlayersModal(false);
      setLoginModal(true);
    },
    className: `login-btn profile-menu-btn${activePlayerData ? ' is-authenticated' : ''}`,
    title: activePlayerData ? `Profil: ${activePlayerData.name}` : 'Zaloguj się lub wybierz użytkownika',
    "aria-label": activePlayerData ? `Otwórz profil użytkownika ${activePlayerData.name}` : 'Zaloguj się lub wybierz użytkownika'
  }, React.createElement("div", {
    className: "profile-avatar",
    "aria-hidden": "true"
  }, activePlayerData ? activePlayerData.name.slice(0, 1).toUpperCase() : React.createElement(NavIcon, {
    name: "user",
    size: 15
  })), activePlayerData ? React.createElement("span", {
    className: "profile-button-label",
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, activePlayerData.name) : React.createElement("span", {
    className: "profile-button-label"
  }, "Zaloguj si\u0119")), React.createElement("button", {
    className: "players-btn",
    onClick: () => {
      setLoginModal(false);
      setPlayersModal(false);
      if (adminUnlocked) setActiveTab('admin');
      else setAdminLoginOpen(true);
    },
    title: "Panel admina (wyniki)",
    style: {
      background: activeTab === 'admin' || adminLoginOpen ? 'rgba(124,58,237,.3)' : 'rgba(0,0,0,.2)',
      borderColor: activeTab === 'admin' || adminLoginOpen ? '#a78bfa' : 'rgba(255,255,255,.25)'
    }
  }, React.createElement(NavIcon, {
    name: "settings",
    size: 17
  })))), toast && React.createElement("div", {
    className: "toast-bar"
  }, toast), React.createElement("div", {
    className: "app-content"
  }, showInstall && React.createElement("div", {
    className: "install-banner"
  }, React.createElement("div", {
    className: "ib-text"
  }, React.createElement("h4", {
    className: "flex items-center gap-1.5"
  }, React.createElement(Icon, {
    name: "download",
    size: 15
  }), "Zainstaluj aplikacj\u0119"), React.createElement("p", null, "Dodaj do ekranu g\u0142\xF3wnego i typuj jak w natywnej apce!")), React.createElement("button", {
    onClick: doInstall
  }, "Zainstaluj")), safePlayers.length === 0 && activeTab !== 'admin' && React.createElement("div", {
    className: "bg-amber-50 border border-amber-300 rounded-xl p-5 mb-4 text-center app-note app-note--warning app-note--with-actions app-note--center"
  }, React.createElement(NavIcon, {
    name: "users",
    size: 32,
    className: "text-amber-700 mx-auto mb-3 block"
  }), React.createElement("p", {
    className: "font-display text-xl tracking-wide text-amber-900 mb-1"
  }, "Brak uczestnik\xF3w"), React.createElement("p", {
    className: "text-sm text-amber-800 mb-4"
  }, "Zacznij od dodania siebie i znajomych."), React.createElement(Btn, {
    variant: "gold",
    size: "lg",
    onClick: () => setPlayersModal(true)
  }, React.createElement(Icon, {
    name: "plus",
    size: 18
  }), "Dodaj pierwszego gracza")), React.createElement("div", {
    className: "tab-view",
    key: activeTab
  }, activeTab === 'matches' && React.createElement(MatchesView, {
    matches: safeMatches,
    teams: safeTeams,
    predictions: safePredictions,
    results: safeResults,
    players: safePlayers,
    activePlayerId: activePlayer,
    phaseLocks: phaseLocks,
    onSavePrediction: onSavePredictionCb,
    scoringSettings: safeScoringSettings
  }), activeTab === 'bracket' && React.createElement(TournamentBracket, {
    matches: safeMatches,
    teams: safeTeams,
    results: safeResults
  }), activeTab === 'specials' && React.createElement(SpecialsView, {
    teams: safeTeams,
    players: safePlayers,
    activePlayerId: activePlayer,
    specialPredictions: safeSpecialPredictions,
    specialResults: safeSpecialResults,
    onSaveSpecial: onSaveSpecialCb,
    tournamentLocked: false,
    specialsLocked: !!(phaseLocks && phaseLocks['specials']),
    scoringSettings: safeScoringSettings
  }), activeTab === 'leaderboard' && React.createElement(LeaderboardView, {
    players: safePlayers,
    matches: safeMatches,
    predictions: safePredictions,
    results: safeResults,
    specialPredictions: safeSpecialPredictions,
    specialResults: safeSpecialResults,
    scoringSettings: safeScoringSettings
  }), activeTab === 'compare' && React.createElement(CompareView, {
    matches: safeMatches,
    teams: safeTeams,
    predictions: safePredictions,
    results: safeResults,
    players: safePlayers,
    scoringSettings: safeScoringSettings
  }), activeTab === 'allspecials' && React.createElement(SpecialsAllView, {
    players: safePlayers,
    specialPredictions: safeSpecialPredictions,
    specialResults: safeSpecialResults,
    teams: safeTeams
  }), activeTab === 'admin' && adminUnlocked && React.createElement(AdminPanel, {
    teams: safeTeams,
    matches: safeMatches,
    results: safeResults,
    specialResults: safeSpecialResults,
    players: safePlayers,
    predictions: safePredictions,
    specialPredictions: safeSpecialPredictions,
    phaseLocks: phaseLocks,
    scoringSettings: safeScoringSettings,
    adminPasswordHash: adminPasswordHash,
    onSavePhaseLocks: setPhaseLocks,
    onSaveScoringSettings: setScoringSettings,
    onRemovePlayer: handleRemovePlayer,
    onSaveResult: onSaveResultCb,
    onDeleteResult: handleDeleteResult,
    onUpdateTeam: onUpdateTeamCb,
    onSaveSpecialResults: s => setSpecialResults(s),
    onResetAll: handleResetAll,
    onExport: () => ({
      version: 2,
      exportedAt: new Date().toISOString(),
      players: safePlayers,
      teams: safeTeams,
      matches: safeMatches,
      predictions: safePredictions,
      results: safeResults,
      specialPredictions: safeSpecialPredictions,
      specialResults: safeSpecialResults,
      phaseLocks,
      scoringSettings: safeScoringSettings
    }),
    onImport: handleImport,
    onLogout: () => { setAdminUnlocked(false); setActiveTab('matches'); }
  }))), React.createElement("div", {
    className: "app-bottom-fade",
    "aria-hidden": "true"
  }), React.createElement(BottomNav, {
    tabs: tabs,
    activeTab: activeTab,
    onSelect: setActiveTab
  }), React.createElement(Modal, {
    open: adminLoginOpen && !adminUnlocked,
    onClose: () => setAdminLoginOpen(false),
    title: adminPasswordHash ? "Panel administratora" : "Ustaw hasło admina",
    maxWidth: "max-w-sm",
    panelClassName: "login-modal-sheet",
    overlayClassName: "profile-modal-overlay"
  }, React.createElement(AdminGate, {
    adminPassword: adminPasswordHash,
    onUnlock: (pwd, onErr) => {
      if (hashPwd(pwd) === adminPasswordHash) {
        setAdminUnlocked(true);
        setAdminLoginOpen(false);
        setActiveTab('admin');
      } else onErr('Złe hasło');
    },
    onSetPassword: pwd => {
      setAdminPasswordHash(hashPwd(pwd));
      setAdminUnlocked(true);
      setAdminLoginOpen(false);
      setActiveTab('admin');
    }
  })), React.createElement(PlayersManager, {
    open: playersModal,
    onClose: () => setPlayersModal(false),
    onCancel: () => { setPlayersModal(false); setLoginModal(true); },
    players: safePlayers,
    onAddPlayer: handleAddPlayer
  }), React.createElement(LoginModal, {
    open: loginModal,
    onClose: () => setLoginModal(false),
    players: safePlayers,
    activePlayer: activePlayer,
    onLogin: id => {
      setActivePlayer(id);
      setLoginModal(false);
    },
    onRename: handleRenamePlayer,
    onManagePlayers: () => {
      setLoginModal(false);
      setPlayersModal(true);
    }
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Mundial2026, null));

// ===== Inline script 3 from original index.html =====
/* Obsługa kółka myszy / gładzika dla poziomo przewijanych filtrów.
   Gdy lista może przesunąć się w danym kierunku, pionowy ruch kółka
   przewija ją poziomo. Po dojściu do końca zwykłe przewijanie strony
   automatycznie działa dalej. */
(function () {
  const selector = [
    '.chip-scroll-row',
    '.pill-scroll-safe',
    '.filters-sticky .overflow-x-auto'
  ].join(',');

  document.addEventListener('wheel', function (event) {
    const origin = event.target;
    const row = origin && origin.closest ? origin.closest(selector) : null;
    if (!row || row.scrollWidth <= row.clientWidth + 1) return;

    const hasHorizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const hasShiftWheelIntent = event.shiftKey && Math.abs(event.deltaY) > 0;

    if (!hasHorizontalIntent && !hasShiftWheelIntent) return;

    const delta = hasHorizontalIntent ? event.deltaX : event.deltaY;

    if (!delta) return;

    const maxScrollLeft = Math.max(0, row.scrollWidth - row.clientWidth);
    const canMoveLeft = delta < 0 && row.scrollLeft > 1;
    const canMoveRight = delta > 0 && row.scrollLeft < maxScrollLeft - 1;

    if (!canMoveLeft && !canMoveRight) return;

    event.preventDefault();
    row.scrollLeft = Math.max(
      0,
      Math.min(maxScrollLeft, row.scrollLeft + delta)
    );
  }, { passive: false });
})();

// ===== Rozmyty brzeg sygnalizujący, że wiersz chipów (filtry faz/statusu)
// albo plansza drabinki da się przewinąć w poziomie dalej — patrz
// main.css: .chip-scroll-row / .bracket-scroll. Klasy has-scroll-start/
// has-scroll-end nadawane tylko, gdy w danym kierunku faktycznie jest
// nadmiar treści. =====
(function () {
  const SELECTOR = '.chip-scroll-row, .bracket-scroll';
  const update = row => {
    const maxScrollLeft = row.scrollWidth - row.clientWidth;
    row.classList.toggle('has-scroll-start', maxScrollLeft > 1 && row.scrollLeft > 1);
    row.classList.toggle('has-scroll-end', maxScrollLeft > 1 && row.scrollLeft < maxScrollLeft - 1);
  };
  const updateAll = () => document.querySelectorAll(SELECTOR).forEach(update);
  document.addEventListener('scroll', event => {
    if (event.target instanceof Element && event.target.matches(SELECTOR)) update(event.target);
  }, { passive: true, capture: true });
  window.addEventListener('resize', updateAll);
  updateAll();
  new MutationObserver(updateAll).observe(document.body, { childList: true, subtree: true });
})();

// ===== Efekt "wyłaniania z głębi" kart meczów: fallback dla przeglądarek
// bez natywnego animation-timeline (patrz main.css: .match-card-enter). =====
(function () {
  if (window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()')) return;
  // Efekt ma działać TYLKO przy wejściu od dołu — u góry karta ma zostać
  // płaska (bez animacji), więc reveal jest jednokierunkowy: raz pokazana
  // karta już nigdy nie wraca do stanu ukrytego (inaczej IntersectionObserver,
  // nieznający kierunku scrolla, chowałby ją też przy wyjściu/wejściu górą).
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  const observe = () => {
    document.querySelectorAll('.match-card-enter:not(.is-revealed)').forEach(el => io.observe(el));
  };
  observe();
  new MutationObserver(observe).observe(document.body, { childList: true, subtree: true });
})();

// ===== Inline script 4 from original index.html =====
/* Automatycznie rozpoznaje, czy nazwy drużyn w panelu administratora
   zajmują jeden czy dwa wiersze. */
(function () {
  function updateAdminMatchAlignment() {
    document.querySelectorAll('.admin-panel .admin-match-summary-row').forEach(function (row) {
      var teams = row.querySelector('.admin-match-summary-teams');
      if (!teams) return;

      var rect = teams.getBoundingClientRect();
      var style = window.getComputedStyle(teams);
      var lineHeight = parseFloat(style.lineHeight);
      if (!Number.isFinite(lineHeight)) {
        lineHeight = parseFloat(style.fontSize) * 1.2 || 16;
      }

      var multiline = rect.height > lineHeight * 1.55;
      row.classList.toggle('is-multiline', multiline);
    });
  }

  var scheduled = false;
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      updateAdminMatchAlignment();
    });
  }

  window.addEventListener('load', scheduleUpdate);
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('orientationchange', scheduleUpdate);

  if (window.ResizeObserver) {
    var resizeObserver = new ResizeObserver(scheduleUpdate);
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.admin-panel .admin-match-summary-teams')
        .forEach(function (el) { resizeObserver.observe(el); });
      scheduleUpdate();
    });
  }

  if (document.body) {
    new MutationObserver(function (mutations) {
      var shouldUpdate = mutations.some(function (mutation) {
        return mutation.type === 'childList' || mutation.type === 'characterData';
      });
      if (shouldUpdate) scheduleUpdate();
    }).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  scheduleUpdate();
})();

// ===== Inline script 5 from original index.html =====
(function () {
  function update() {
    var header = document.querySelector('.app-header');
    if (!header) return;
    var h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', h + 'px');
  }
  function schedule() { requestAnimationFrame(update); }
  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule);
  window.addEventListener('orientationchange', schedule);
  var tries = 0;
  var interval = setInterval(function () {
    update();
    if (++tries >= 20) clearInterval(interval);
  }, 150);
})();
