/**
 * Theme Manager
 * To add a new theme:
 *   1. Add an entry to the THEMES array below
 *   2. Add matching [data-theme="your-id"] CSS variables in css/style.css
 */
const THEMES = [
    { id: "cyber", label: "CYBER" },
    // { id: "minimal", label: "MINIMAL" },  // future theme
];

let currentIndex = 0;

function applyTheme(themeId) {
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("resume-theme", themeId);
    const theme = THEMES.find((t) => t.id === themeId);
    if (theme) {
        const label = document.getElementById("theme-label");
        if (label) label.textContent = theme.label;
    }
}

function cycleTheme() {
    currentIndex = (currentIndex + 1) % THEMES.length;
    applyTheme(THEMES[currentIndex].id);
}

function initTheme() {
    const saved = localStorage.getItem("resume-theme") || "cyber";
    const idx = THEMES.findIndex((t) => t.id === saved);
    currentIndex = idx >= 0 ? idx : 0;
    applyTheme(THEMES[currentIndex].id);
}

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    const btn = document.getElementById("theme-btn");
    if (btn) btn.addEventListener("click", cycleTheme);
});
