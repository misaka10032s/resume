/* ============================================================
   THEME MANAGER
   Manages CSS swapping, DOM rebuilding, and theme effects.
   ============================================================ */

const THEMES = [
    window.CyberTheme,
    window.SakuraTheme,
    window.NordTheme,
    window.SpaceTheme,
];

let currentIndex = 0;

/* ── Apply theme ─────────────────────────────────────────── */
function applyTheme(themeId, { animate = true } = {}) {
    const prevTheme = THEMES[currentIndex];
    const nextIdx   = THEMES.findIndex(t => t.id === themeId);
    if (nextIdx < 0) return;

    // Deactivate current effects
    if (prevTheme && prevTheme.deactivate) prevTheme.deactivate();

    currentIndex = nextIdx;
    const theme  = THEMES[currentIndex];

    // Persist
    localStorage.setItem("resume-theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);

    // Update label
    const label = document.getElementById("theme-label");
    if (label) label.textContent = theme.label;

    // Swap CSS
    const cssLink = document.getElementById("theme-css");
    if (cssLink) cssLink.href = `css/themes/${themeId}.css`;

    const app = document.getElementById("app");
    if (!app) return;

    function rebuild() {
        // Rebuild DOM
        app.innerHTML = theme.render(window.RESUME_DATA);
        // Activate effects
        if (theme.activate) theme.activate();
        // Wire smooth expand/collapse
        initExpandables();

        if (animate) {
            app.classList.remove("fading");
        }
    }

    if (animate) {
        app.classList.add("fading");
        setTimeout(rebuild, 320);
    } else {
        rebuild();
    }
}

/* ── Cycle ───────────────────────────────────────────────── */
function cycleTheme() {
    const nextIdx = (currentIndex + 1) % THEMES.length;
    applyTheme(THEMES[nextIdx].id);
}

/* ── Init ────────────────────────────────────────────────── */
function initTheme() {
    const saved  = localStorage.getItem("resume-theme") || "cyber";
    const idx    = THEMES.findIndex(t => t.id === saved);
    currentIndex = idx >= 0 ? idx : 0;
    const themeId = THEMES[currentIndex].id;

    document.documentElement.setAttribute("data-theme", themeId);

    const label = document.getElementById("theme-label");
    if (label) label.textContent = THEMES[currentIndex].label;

    const cssLink = document.getElementById("theme-css");
    if (cssLink) cssLink.href = `css/themes/${themeId}.css`;

    // Render immediately (no fade — boot screen is hiding this)
    applyTheme(themeId, { animate: false });
}

/* ── Smooth expand / collapse for all <details> ──────────── */
function initExpandables() {
    document.querySelectorAll("details").forEach(details => {
        // Avoid double-binding if already initialised
        if (details.dataset.expandInit) return;
        details.dataset.expandInit = "1";

        const summary = details.querySelector("summary");
        if (!summary) return;

        // First non-summary child is the collapsible content
        const content = Array.from(details.children).find(
            c => c.tagName.toLowerCase() !== "summary"
        );
        if (!content) return;

        summary.addEventListener("click", e => {
            e.preventDefault();

            if (details.open) {
                // ── Close ──────────────────────────────────────
                details.dataset.closing = "1";   // CSS hint: rotate hint back now
                const h = content.scrollHeight;
                content.style.height   = h + "px";
                content.style.overflow = "hidden";
                content.offsetHeight;            // force reflow

                content.style.transition = "height 0.35s ease, opacity 0.35s ease";
                content.style.height     = "0";
                content.style.opacity    = "0";

                setTimeout(() => {
                    details.open = false;
                    delete details.dataset.closing;
                    content.style.cssText = "";
                }, 360);

            } else {
                // ── Open ───────────────────────────────────────
                details.open = true;
                const h = content.scrollHeight;
                content.style.cssText = "height:0;opacity:0;overflow:hidden;";
                content.offsetHeight;            // force reflow

                content.style.transition = "height 0.35s ease, opacity 0.35s ease";
                content.style.height     = h + "px";
                content.style.opacity    = "1";

                setTimeout(() => {
                    content.style.cssText = "";
                }, 360);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    const btn = document.getElementById("theme-btn");
    if (btn) btn.addEventListener("click", cycleTheme);
});
