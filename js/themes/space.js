/* ============================================================
   SPACE THEME — deep cosmos, solar system, glassmorphism
   ============================================================ */

window.SpaceTheme = {
    id: "space",
    label: "✦ SPACE",

    bootLines: [
        { text: "✦",                  cls: "space-boot-line spb-icon"  },
        { text: "Yang, Zhen-Guan",    cls: "space-boot-line spb-name"  },
        { text: "Frontend Engineer",  cls: "space-boot-line spb-role"  },
        { text: "· · · · · · · · ·", cls: "space-boot-line spb-rule"  },
        { text: "Entering orbit...",  cls: "space-boot-line spb-load"  },
    ],

    activate() {
        this._buildStars();
        this._buildSolarSystem();
        this._buildNebula();
    },

    deactivate() {
        ["star-layer", "star-layer-2", "solar-system-bg", "nebula"].forEach(id => {
            document.getElementById(id)?.remove();
        });
    },

    _buildStars() {
        if (document.getElementById("star-layer")) return;

        // Layer 1 — dim small stars
        const l1 = document.createElement("div");
        l1.id = "star-layer";
        const s1 = [], s2 = [];
        const W = window.innerWidth  || 1440;
        const H = window.innerHeight || 900;

        for (let i = 0; i < 280; i++) {
            const x = Math.random() * W;
            const y = Math.random() * H;
            const r = Math.random() * 1.2;
            const a = (0.2 + Math.random() * 0.6).toFixed(2);
            s1.push(`${x.toFixed(0)}px ${y.toFixed(0)}px ${r.toFixed(1)}px rgba(200,220,255,${a})`);
        }
        l1.style.cssText = `width:1px;height:1px;position:fixed;top:0;left:0;`;
        l1.style.boxShadow = s1.join(",");
        document.body.appendChild(l1);

        // Layer 2 — twinkling brighter stars
        const l2 = document.createElement("div");
        l2.id = "star-layer-2";
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * W;
            const y = Math.random() * H;
            const r = 0.5 + Math.random() * 1.5;
            const a = (0.5 + Math.random() * 0.5).toFixed(2);
            s2.push(`${x.toFixed(0)}px ${y.toFixed(0)}px ${r.toFixed(1)}px rgba(220,235,255,${a})`);
        }
        l2.style.cssText = `width:1px;height:1px;position:fixed;top:0;left:0;`;
        l2.style.boxShadow = s2.join(",");
        document.body.appendChild(l2);
    },

    _buildSolarSystem() {
        if (document.getElementById("solar-system-bg")) return;

        const bg = document.createElement("div");
        bg.id = "solar-system-bg";

        const scene = document.createElement("div");
        scene.className = "sp-solar-scene";

        /* Planets: r (CSS length), sz (px), c1/c2 (gradient stops),
           dur (s), ang (CCW start angle in degrees), op (max opacity).
           Delay = -(dur × ang/360) so planet begins at ang° CCW = lower-left area.
           Different ang values spread planets around the orbit at t=0. */
        const planets = [
            { r: "12vw", sz: 10, c1: "#c8bcb0", c2: "#806050", dur: 10, ang: 120, op: 0.85 },
            { r: "20vw", sz: 16, c1: "#ead888", c2: "#b09030", dur: 20, ang: 200, op: 0.90 },
            { r: "33vw", sz: 18, c1: "#5888d0", c2: "#1e4080", dur: 35, ang: 300, op: 0.85 },
            { r: "50vw", sz: 13, c1: "#d06040", c2: "#903020", dur: 55, ang: 160, op: 0.75 },
        ];

        // Static ellipse rings (no spin, same rotateX tilt as orbit arms)
        planets.forEach(pl => {
            const ring = document.createElement("div");
            ring.className = "sp-orbit-ring-static";
            ring.style.setProperty("--r", pl.r);
            scene.appendChild(ring);
        });

        // Animated orbit arms + planet dots
        planets.forEach(pl => {
            const delay = -(pl.dur * pl.ang / 360);

            const arm = document.createElement("div");
            arm.className = "sp-orbit-arm";
            arm.style.setProperty("--r",     pl.r);
            arm.style.setProperty("--dur",   pl.dur + "s");
            arm.style.setProperty("--delay", delay.toFixed(2) + "s");

            const dot = document.createElement("div");
            dot.className = "sp-planet-dot";
            dot.style.setProperty("--psz",   pl.sz + "px");
            dot.style.setProperty("--pc1",   pl.c1);
            dot.style.setProperty("--pc2",   pl.c2);
            dot.style.setProperty("--dur",   pl.dur + "s");
            dot.style.setProperty("--delay", delay.toFixed(2) + "s");
            dot.style.setProperty("--op",    pl.op);

            arm.appendChild(dot);
            scene.appendChild(arm);
        });

        // Sun glow first, then disk — both painted on top of orbit arms
        const glow = document.createElement("div");
        glow.className = "sp-sun-glow";
        scene.appendChild(glow);

        const sun = document.createElement("div");
        sun.className = "sp-sun-orb";
        scene.appendChild(sun);

        bg.appendChild(scene);
        // Prepend so it stays behind all body content
        document.body.insertBefore(bg, document.body.firstChild);
    },

    _buildNebula() {
        if (document.getElementById("nebula")) return;
        const el = document.createElement("div");
        el.id = "nebula";
        document.body.appendChild(el);
    },

    render(d) {
        return `
<header class="sp-header">
    <img src="${d.avatar}" alt="Avatar" class="sp-avatar">
    <h1 class="sp-name"><strong>${d.name}</strong> · <span style="font-weight:300">${d.nameEn}</span></h1>
    <p class="sp-role">${d.role}</p>
</header>

<main>
    <!-- Profile -->
    <div class="glass-panel">
        <h2 class="sp-section-title"><i class="fas fa-satellite-dish"></i> Signal</h2>
        <div class="sp-profile-grid">
            <div class="sp-profile-row"><span class="sp-profile-label">edu</span><span class="sp-profile-value">${d.education}</span></div>
            <div class="sp-profile-row"><span class="sp-profile-label">email</span><span class="sp-profile-value"><a href="mailto:${d.email}">${d.email}</a></span></div>
            <div class="sp-profile-row"><span class="sp-profile-label">exp</span><span class="sp-profile-value">${d.experience}</span></div>
            <div class="sp-profile-row"><span class="sp-profile-label">github</span><span class="sp-profile-value"><a href="${d.github}" target="_blank">misaka10032s</a></span></div>
            <div class="sp-profile-row"><span class="sp-profile-label">blog</span><span class="sp-profile-value"><a href="${d.blog}" target="_blank">misaka-site.co</a></span></div>
            <div class="sp-profile-row"><span class="sp-profile-label">project</span><span class="sp-profile-value"><a href="${d.gameTracker}" target="_blank">msapi.misaka-site.co</a></span></div>
        </div>
    </div>

    <!-- Experience -->
    <div class="glass-panel">
        <h2 class="sp-section-title"><i class="fas fa-rocket"></i> Mission Log</h2>
        <div class="sp-timeline">
            ${d.jobs.map(job => `
            <div class="sp-tl-item">
                <div class="sp-tl-date">${job.period}</div>
                <div class="sp-tl-body">
                    <div class="sp-tl-company">${job.company}</div>
                    <span class="sp-tl-role">${job.role}</span>
                    ${job.subTag ? `<div class="sp-tl-sub">${job.subTag}</div>` : ""}
                    ${job.projects.map(p => spProject(p)).join("")}
                    ${job.extras.length ? `
                    <details class="sp-expand">
                        <summary>更多 ▸</summary>
                        <div class="sp-expand-body">
                            ${job.extras.map(p => spProject(p)).join("")}
                        </div>
                    </details>` : ""}
                </div>
            </div>`).join("")}
        </div>
    </div>

    <!-- Projects -->
    <div class="glass-panel">
        <h2 class="sp-section-title"><i class="fas fa-meteor"></i> Launchpad</h2>
        <div class="sp-proj-grid">
            ${d.projects.map(p => `
            <div class="sp-proj-card">
                <div class="sp-proj-card-header">
                    <span class="sp-proj-icon"><i class="${p.icon}"></i></span>
                    <div>
                        <div class="sp-proj-card-title">${p.url ? `<a href="${p.url}" target="_blank">${p.title}</a>` : p.title}</div>
                        <div class="sp-proj-card-badges">
                            ${p.badges.map(b => `<span class="sp-badge">${b}</span>`).join("")}
                        </div>
                    </div>
                </div>
                <ul>${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
                ${p.deep.length ? `
                <details class="sp-expand">
                    <summary>技術深度 ▸</summary>
                    <div class="sp-expand-body">
                        <ul>${p.deep.map(b => `<li>${b}</li>`).join("")}</ul>
                    </div>
                </details>` : ""}
            </div>`).join("")}
        </div>
    </div>

    <!-- AI Collab -->
    <div class="glass-panel">
        <h2 class="sp-section-title"><i class="fas fa-robot"></i> AI Crew</h2>
        <blockquote class="sp-quote">${d.aiCollab.quote}</blockquote>
        <div class="sp-ai-grid">
            ${d.aiCollab.columns.map(col => `
            <div class="sp-ai-col">
                <div class="sp-ai-label">${col.label}</div>
                <ul>${col.items.map(i => `<li>${i}</li>`).join("")}</ul>
            </div>`).join("")}
        </div>
    </div>

    <!-- Skills -->
    <div class="glass-panel">
        <h2 class="sp-section-title"><i class="fas fa-microchip"></i> Systems</h2>
        <div class="sp-skills-grid">
            ${d.skills.map(s => `
            <div class="sp-skill-block">
                <div class="sp-skill-header">${s.header}</div>
                <ul>${s.items.map(i => `<li>${i}</li>`).join("")}</ul>
            </div>`).join("")}
        </div>
    </div>

    <!-- Achievements -->
    <div class="glass-panel">
        <h2 class="sp-section-title"><i class="fas fa-star"></i> Stars Earned</h2>
        <ul class="sp-achieve-list">
            ${d.achievements.map(a => `<li>${a}</li>`).join("")}
        </ul>
    </div>
</main>

<footer class="sp-footer">
    ✦ ${d.name} · ${d.email} · Coordinates: Earth
</footer>`;
    },
};

function spProject(p) {
    return `
<div class="sp-proj">
    <div class="sp-proj-title">
        <i class="${p.icon}"></i> ${p.title}
        ${p.badges.map(b => `<span class="sp-badge">${b}</span>`).join("")}
    </div>
    <ul>${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
</div>`;
}

function lighten(hex) {
    // Parse hex and lighten by ~30%
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, ((n >> 16) & 0xff) + 80);
    const g = Math.min(255, ((n >>  8) & 0xff) + 80);
    const b = Math.min(255, ( n        & 0xff) + 80);
    return `rgb(${r},${g},${b})`;
}
