/* ============================================================
   BOOT SCREEN
   Branches by theme; each theme object provides bootLines.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const bootScreen  = document.getElementById("boot-screen");
    const mainContent = document.getElementById("app");
    const skipBtn     = document.getElementById("skip-btn");

    const themeId = document.documentElement.getAttribute("data-theme") || "cyber";

    bootScreen.style.transition = "opacity 0.6s ease";

    // Mutable skip reference — boot functions reassign this
    let skip = () => {};

    window.addEventListener("keydown", (e) => { if (e.key === "Escape") skip(); });
    if (skipBtn) skipBtn.addEventListener("click", () => skip());

    // ── Reveal: fade boot screen out, show #app ──────────────
    function reveal() {
        // Unhide content BEFORE fading so it's rendered underneath
        if (mainContent) mainContent.style.visibility = "visible";
        bootScreen.style.opacity = "0";
        setTimeout(() => {
            bootScreen.classList.add("hidden");
        }, 650);
    }

    // ── Dispatch by theme ────────────────────────────────────
    const THEMES_MAP = {
        cyber:  window.CyberTheme,
        sakura: window.SakuraTheme,
        nord:   window.NordTheme,
        space:  window.SpaceTheme,
    };
    const theme = THEMES_MAP[themeId];

    if (themeId === "cyber") {
        runTypewriterBoot(theme ? theme.bootLines : []);
    } else {
        runFadeLineBoot(theme ? theme.bootLines : []);
    }

    // ════════════════════════════════════════════════════════
    //  TYPEWRITER — cyber theme
    // ════════════════════════════════════════════════════════
    function runTypewriterBoot(lines) {
        const typewriterEl = document.getElementById("typewriter");
        if (!typewriterEl) { reveal(); return; }

        let lineIdx = 0, charIdx = 0, html = "", skipped = false, timer;

        skip = function () {
            if (skipped) return;
            skipped = true;
            clearTimeout(timer);
            reveal();
        };

        function type() {
            if (skipped) return;
            if (lineIdx < lines.length) {
                if (charIdx < lines[lineIdx].length) {
                    html += lines[lineIdx].charAt(charIdx);
                    typewriterEl.innerHTML = html + '<span class="blink">_</span>';
                    charIdx++;
                    timer = setTimeout(type, Math.random() * 30 + 10);
                } else {
                    html += "<br>";
                    typewriterEl.innerHTML = html + '<span class="blink">_</span>';
                    lineIdx++; charIdx = 0;
                    timer = setTimeout(type, Math.random() * 200 + 100);
                }
            } else {
                timer = setTimeout(reveal, 500);
            }
        }
        timer = setTimeout(type, 500);
    }

    // ════════════════════════════════════════════════════════
    //  FADE-LINE — sakura / nord / space themes
    // ════════════════════════════════════════════════════════
    function runFadeLineBoot(lines) {
        const textEl = document.getElementById("typewriter");
        if (!textEl) { reveal(); return; }
        textEl.innerHTML = "";

        let skipped = false, autoTimer;

        skip = function () {
            if (skipped) return;
            skipped = true;
            clearTimeout(autoTimer);
            reveal();
        };

        const els = lines.map((l) => {
            const div = document.createElement("div");
            div.className = l.cls || "";
            div.textContent = l.text;
            textEl.appendChild(div);
            return div;
        });

        // Add dots to last element if sakura
        if (themeId === "sakura" && els.length > 0) {
            const dotsEl = document.createElement("span");
            dotsEl.className = "sb-dots";
            dotsEl.textContent = "...";
            els[els.length - 1].appendChild(dotsEl);
        }

        let totalTime = 0;
        els.forEach((el, i) => {
            const delay = 180 + i * 240;
            totalTime = delay + 400;
            setTimeout(() => { if (!skipped) el.classList.add("visible"); }, delay);
        });

        autoTimer = setTimeout(() => {
            if (!skipped) {
                if (themeId === "sakura") {
                    triggerFubuki(reveal);
                } else {
                    reveal();
                }
            }
        }, totalTime + 200);
    }

    // ════════════════════════════════════════════════════════
    //  FUBUKI — sakura blizzard from bottom-right → upper-left
    // ════════════════════════════════════════════════════════
    function triggerFubuki(onComplete) {
        const W = window.innerWidth  || 1280;
        const H = window.innerHeight || 800;
        const D = Math.hypot(W, H);   // diagonal = max travel distance

        // Container inside boot screen (fades with it at the end)
        const wrap = document.createElement("div");
        wrap.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:20;";
        bootScreen.appendChild(wrap);

        // Flash overlay — sweeps from bottom-right pink to top-left sakura bg
        const flash = document.createElement("div");
        flash.style.cssText = `
            position:absolute;inset:0;z-index:19;pointer-events:none;
            background:linear-gradient(315deg,
                #ffb7c5 0%, #fde4ec 40%, #fdf6f0 100%);
            opacity:0;transition:opacity 0.75s ease;
        `;
        bootScreen.appendChild(flash);

        // All 160 petals originate from the right edge + bottom edge + bottom-right area
        // baseAngle: pointing upper-left = -Math.PI * 0.75 (225° CCW from right = 135° = upper-left)
        const BASE_ANGLE = -Math.PI * 0.75;  // upper-left direction
        const TOTAL = 160;

        for (let i = 0; i < TOTAL; i++) {
            const p = document.createElement("div");
            p.className = "fubuki-petal" + (Math.random() > 0.5 ? " petal-b" : "");

            // Spawn along right edge, bottom edge, and bottom-right quadrant
            let sx, sy;
            const zone = Math.random();
            if (zone < 0.35) {
                // Right edge
                sx = W - Math.random() * W * 0.15;
                sy = Math.random() * H;
            } else if (zone < 0.65) {
                // Bottom edge
                sx = Math.random() * W;
                sy = H - Math.random() * H * 0.15;
            } else {
                // Bottom-right quadrant cluster
                sx = W * 0.5 + Math.random() * W * 0.55;
                sy = H * 0.5 + Math.random() * H * 0.55;
            }

            // Fan out ±50° around upper-left; travel ≥ full diagonal
            const angle = BASE_ANGLE + (Math.random() - 0.5) * Math.PI * 0.55;
            const dist  = D * (0.6 + Math.random() * 0.7);
            const fx    = Math.cos(angle) * dist;
            const fy    = Math.sin(angle) * dist;
            const fr    = (Math.random() - 0.5) * 1080;  // up to 3 full spins
            const sz    = 10 + Math.random() * 30;        // 10–40 px
            const dur   = 1.3 + Math.random() * 1.0;      // 1.3–2.3 s
            const del   = Math.random() * 1.0;            // stagger up to 1 s

            p.style.cssText = `
                left:${sx}px;top:${sy}px;
                width:${sz}px;height:${sz * 1.4}px;
                --fx:${fx}px;--fy:${fy}px;--fr:${fr}deg;--fdur:${dur}s;
                animation-delay:${del}s;
            `;
            wrap.appendChild(p);
        }

        // Screen fills with petals around 1 s in; flash overlay kicks at 1 s
        setTimeout(() => { flash.style.opacity = "0.9"; }, 1000);

        // reveal() at 2.3 s — flash still inside boot screen, fades with it
        // Clean up wrap + flash 700 ms later (after boot screen has faded out)
        setTimeout(() => {
            onComplete();
            setTimeout(() => { wrap.remove(); flash.remove(); }, 700);
        }, 2300);
    }
});
