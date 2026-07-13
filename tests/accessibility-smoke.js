const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

const html = read('index.html');
const app = read('src/app.js');
const css = read('styles/main.css');

const luminance = rgb => {
  const channels = rgb.map(value => {
    const channel = value / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};
const contrast = (foreground, background) => {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
};

assert.match(html, /<meta name="color-scheme" content="dark"\s*\/>/);
assert.match(html, /setAttribute\('data-theme', 'dark'\)/);
assert.match(html, /id="loading" role="status" aria-live="polite"/);

assert.match(app, /"aria-label": "Glowna nawigacja"|"aria-label": "Główna nawigacja"/);
assert.match(app, /"aria-label": t\.l/);
assert.match(app, /React\.createElement\('button', \{/);
assert.match(app, /'aria-selected': visualCenterIndex === i/);
assert.match(app, /tabIndex: visualCenterIndex === i \? 0 : -1/);

assert.match(css, /\.bottom-nav \.nav-label \{[\s\S]*?display: block !important;/);
assert.match(css, /\.infinite-group-scroll > button\.selection-tile[\s\S]*?min-height: 44px !important;/);
assert.match(css, /\.profile-action-btn[\s\S]*?min-height: 44px !important;/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(css, /@media \(prefers-reduced-transparency: reduce\)/);
assert.match(css, /--control-height: 44px;/);
assert.match(css, /--panel-content-padding: var\(--space-large\);/);
assert.match(css, /--screen-horizontal-padding: var\(--space-large\);/);
assert.match(css, /@media \(max-width: 360px\)[\s\S]*?\.next-match-summary[\s\S]*?flex-wrap: wrap !important;/);
assert.match(app, /const base = 'app-control /);
assert.match(app, /className: "login-modal-content overflow-y-auto"/);
assert.doesNotMatch(app, /login-modal-content overflow-y-auto p-4/);
assert.match(css, /\.bracket-page \.bracket-intro:not\(#__panel_padding__\)[\s\S]*?min-height: 0 !important;/);
assert.match(css, /\.admin-login-panel:not\(#__panel_padding__\)[\s\S]*?padding: 0 !important;/);
assert.match(css, /\.bracket-section-unified:not\(#__single_bottom_inset__\)[\s\S]*?padding-bottom: 0 !important;/);
assert.match(css, /\.match-final-result-card:not\(#__single_bottom_inset__\)[\s\S]*?margin-bottom: 0 !important;/);
assert.match(css, /--match-expanded-content-inset: 12px;/);
assert.match(app, /prediction-pin-input/);
assert.match(css, /input\.prediction-pin-input\[type="password"\]:not\(\.profile-pin-input\) \{[\s\S]*?height: 52px !important;[\s\S]*?border-radius: 30px !important;/);
assert.match(css, /\.match-score-rule-note \+ \.space-y-2 \{[\s\S]*?margin-top: 8px !important;/);
assert.match(css, /\.penalty-choice-panel \{[\s\S]*?margin: 14px 0 8px !important;/);
assert.match(css, /\.login-modal-sheet \.admin-login-input,[\s\S]*?\.login-modal-sheet \.admin-login-submit \{[\s\S]*?border-radius: calc\(var\(--ui-corner-radius\) - var\(--panel-content-padding\)\) !important;/);
assert.match(css, /--curve-inset-7: 23px;/);
assert.match(css, /--curve-inset-16: 14px;/);
assert.match(css, /--curve-nested-deep: 999px;/);
assert.match(css, /--curve-rank-detail: 6px;/);
assert.match(css, /\.bottom-nav \.nav-track > button:not\(#__concentric_nav__\),[\s\S]*?\.bottom-nav \.nav-droplet \{[\s\S]*?border-radius: var\(--curve-inset-7\) !important;/);
assert.match(css, /\.match-card\.expanded \.penalty-choice-panel,[\s\S]*?border-radius: var\(--curve-inset-12\) !important;/);
assert.match(css, /\.specials-view \.specials-position-card,[\s\S]*?border-radius: var\(--curve-inset-16\) !important;/);
assert.match(css, /\.profile-choice-shell > \.profile-choice-trigger:not\(#__concentric_profile__\) \{[\s\S]*?border-radius: inherit !important;/);
assert.match(css, /\.profile-choice-shell \.profile-action-btn,[\s\S]*?border-radius: var\(--curve-nested-deep\) !important;/);
assert.match(app, /role: "list"/);
assert.match(app, /draggable: !\(tournamentLocked \|\| specialsLocked\)/);
assert.doesNotMatch(app, /specials-order-move-button/);
assert.match(app, /onPointerMove: onTouchDragMove/);
assert.match(app, /admin-specials-group-order-panel/);
assert.match(app, /onPointerMove: onSpTouchDragMove/);
assert.match(app, /const draftToSave = normalizedSpDraft\(spDraft\)/);
assert.doesNotMatch(app, /const advances = pos < 2;/);
assert.doesNotMatch(app, /k: 'admin',\s*l: 'Wyniki',\s*i: 'settings'/);
assert.match(app, /const matchedActiveIdx = tabs\.findIndex/);

const adminReorderStart = app.indexOf('const reorderSpGroup =');
const adminReorderEnd = app.indexOf('const clearSpDragState =', adminReorderStart);
const adminReorderBlock = app.slice(adminReorderStart, adminReorderEnd);
assert.ok(adminReorderStart >= 0 && adminReorderEnd > adminReorderStart, 'Admin reorder handler is missing');
assert.doesNotMatch(adminReorderBlock, /onSaveSpecialResults|setSpecialResults/);
assert.match(app, /onClick: \(\) => \{\s*const draftToSave = normalizedSpDraft\(spDraft\);[\s\S]*?onSaveSpecialResults\(draftToSave\);/);
assert.match(css, /\.specials-group-order-panel \.specials-order-item \{[\s\S]*?min-height: 56px !important;/);
assert.match(app, /is-shifting-up/);
assert.match(app, /is-shifting-down/);
assert.match(app, /groupDropTargetAt\(e\.currentTarget, e\.clientY\)/);
assert.match(app, /spGroupDropTargetAt\(e\.currentTarget, e\.clientY\)/);
assert.match(app, /is-drop-settling/);
assert.match(css, /\.specials-group-order-panel \.specials-order-list\.is-drop-settling \.specials-order-item \{[\s\S]*?transition: none !important;/);
assert.match(css, /\.specials-group-order-panel \.specials-order-item\.is-shifting-up \{[\s\S]*?translateY\(calc\(-100% - 8px\)\)/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.specials-group-order-panel \.specials-order-item/);
assert.match(css, /\.specials-group-order-panel \.specials-order-drag-handle \{[\s\S]*?touch-action: none !important;/);
assert.match(css, /\.specials-group-order-panel \.specials-order-item\.is-correct \.specials-team-name \{[\s\S]*?#30d158/);
assert.match(css, /\.specials-group-order-panel \.specials-order-item\.is-wrong \.specials-team-name \{[\s\S]*?#ff453a/);
assert.match(app, /className: "specials-order-result-icon"/);
assert.match(css, /\.specials-group-order-panel \.specials-order-item\.is-correct \.specials-order-result-icon \{[\s\S]*?#30d158/);
assert.match(css, /\.specials-group-order-panel \.group-order-filter-row\.pill-scroll-safe \{[\s\S]*?background: transparent !important;/);
assert.match(css, /\.specials-group-order-panel \.specials-order-team \.specials-team-name\.is-overflowing \{[\s\S]*?linear-gradient\(to right/);
assert.doesNotMatch(css, /\.specials-view > \.specials-group-order-panel/);
assert.match(css, /\.match-card\.expanded > div:last-child:not\(#__single_bottom_inset__\)[\s\S]*?padding-bottom: var\(--match-expanded-content-inset\) !important;/);

const card = [28, 28, 30];
const tertiary = [238, 244, 255].map((value, index) =>
  Math.round(value * 0.64 + card[index] * 0.36)
);
assert.ok(contrast(tertiary, card) >= 4.5, 'Tertiary text contrast is below 4.5:1');

assert.doesNotMatch(`${html}\n${app}\n${css}`, /DM Sans/);

// User-facing copy stays consistent and does not expose technical import errors.
assert.match(app, /Typy wszystkich uczestnik/);
assert.match(app, /Panel administratora/);
assert.match(app, /Nie udało się zaimportować danych\. Sprawdź plik i spróbuj ponownie\./);
assert.match(app, /Wprowadzony PIN jest nieprawidłowy\./);
assert.match(app, /Wpisz wynik po 120 minutach, przed rzutami karnymi\./);
assert.doesNotMatch(app, /remis w czasie\s*\/\/ regulaminowym/);
assert.doesNotMatch(app, /Błąd: ['"]? \+ e\.message/);
assert.doesNotMatch(app, /Brak graczy|Złe hasło|PINy się nie zgadzają/);

console.log('Accessibility smoke checks passed.');
