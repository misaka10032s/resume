/* ============================================================
   SAKURA THEME — washi paper / ink brush aesthetic
   ============================================================ */

window.SakuraTheme = {
    id: "sakura",
    label: "桜 SAKURA",

    bootLines: [
        { text: "❀",                cls: "sb-flower"  },
        { text: "Yang, Zhen-Guan",  cls: "sb-name"    },
        { text: "Frontend Engineer",cls: "sb-role"    },
        { text: "────────────────", cls: "sb-rule"    },
        { text: "Loading portfolio",cls: "sb-loading" },
    ],

    activate() {
        this._createSunlight();
        this._createPetals();
    },

    deactivate() {
        document.getElementById("sunlight-overlay")?.remove();
        document.getElementById("petal-container")?.remove();
    },

    _createSunlight() {
        if (document.getElementById("sunlight-overlay")) return;
        const el = document.createElement("div");
        el.id = "sunlight-overlay";
        document.body.appendChild(el);
    },

    _createPetals() {
        if (document.getElementById("petal-container")) return;
        const container = document.createElement("div");
        container.id = "petal-container";
        document.body.appendChild(container);
        for (let i = 0; i < 24; i++) {
            const p = document.createElement("div");
            p.className = `petal ${i % 3 === 0 ? "petal-b" : "petal-a"}`;
            const size  = 8 + Math.random() * 9;
            const drift = (Math.random() - 0.4) * 220;
            const dur   = 9 + Math.random() * 9;
            const delay = -(Math.random() * dur);
            p.style.cssText = `
                left: ${Math.random() * 105}vw;
                width: ${size}px;
                height: ${size * 1.35}px;
                opacity: ${0.55 + Math.random() * 0.4};
                animation-duration: ${dur}s;
                animation-delay: ${delay}s;
            `;
            p.style.setProperty("--drift", `${drift}px`);
            container.appendChild(p);
        }
    },

    render(d) {
        return `
<header class="sakura-header">
    <img src="${d.avatar}" alt="Avatar" class="sakura-avatar">
    <h1 class="sakura-name">${d.name} <span style="font-size:0.7em;opacity:0.7">(${d.nameEn})</span></h1>
    <p class="sakura-role">${d.role}</p>
</header>

<main>
    <!-- Profile -->
    <div class="washi-card">
        <div class="profile-grid">
            <div class="profile-row"><span class="profile-label">學歷</span><span class="profile-value">${d.education}</span></div>
            <div class="profile-row"><span class="profile-label">Email</span><span class="profile-value"><a href="mailto:${d.email}">${d.email}</a></span></div>
            <div class="profile-row"><span class="profile-label">經歷</span><span class="profile-value">${d.experience}</span></div>
            <div class="profile-row"><span class="profile-label">GitHub</span><span class="profile-value"><a href="${d.github}" target="_blank">github.com/misaka10032s</a></span></div>
            <div class="profile-row"><span class="profile-label">部落格</span><span class="profile-value"><a href="${d.blog}" target="_blank">misaka-site.co</a></span></div>
            <div class="profile-row"><span class="profile-label">側專</span><span class="profile-value"><a href="${d.gameTracker}" target="_blank">msapi.misaka-site.co</a></span></div>
        </div>
    </div>

    <!-- Experience -->
    <div class="washi-card">
        <h2 class="sakura-section-title">工作經歷</h2>
        <div class="sk-timeline">
            ${d.jobs.map(job => `
            <div class="sk-timeline-item">
                <div class="sk-date">${job.period}</div>
                <div class="sk-content">
                    <div class="sk-company">${job.company}</div>
                    <div style="margin-bottom:0.4rem">
                        <span class="sk-role-badge">${job.role}</span>
                        ${job.subTag ? `<span class="sk-sub">${job.subTag}</span>` : ""}
                    </div>
                    ${job.projects.map(p => skProject(p)).join("")}
                    ${job.extras.length ? `
                    <details class="sk-expand">
                        <summary>更多專案 ▸</summary>
                        <div class="sk-expand-content">
                            ${job.extras.map(p => skProject(p)).join("")}
                        </div>
                    </details>` : ""}
                </div>
            </div>`).join("")}
        </div>
    </div>

    <!-- Projects -->
    <div class="washi-card">
        <h2 class="sakura-section-title">個人作品</h2>
        <div class="sk-projects-grid">
            ${d.projects.map(p => `
            <div class="sk-project-card">
                <div class="sk-card-header">
                    <span class="sk-card-icon"><i class="${p.icon}"></i></span>
                    <div>
                        <div class="sk-card-title">${p.url ? `<a href="${p.url}" target="_blank">${p.title}</a>` : p.title}</div>
                        <div class="sk-card-badges">
                            ${p.badges.map(b => `<span class="sk-badge">${b}</span>`).join("")}
                        </div>
                    </div>
                </div>
                <ul>${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
                ${p.deep.length ? `
                <details class="sk-expand">
                    <summary>技術深度 ▸</summary>
                    <div class="sk-expand-content">
                        <ul>${p.deep.map(b => `<li>${b}</li>`).join("")}</ul>
                    </div>
                </details>` : ""}
            </div>`).join("")}
        </div>
    </div>

    <!-- AI Collab -->
    <div class="washi-card">
        <h2 class="sakura-section-title">AI 協作模式</h2>
        <blockquote class="sk-quote">${d.aiCollab.quote}</blockquote>
        <div class="sk-ai-grid">
            ${d.aiCollab.columns.map(col => `
            <div class="sk-ai-col">
                <div class="sk-ai-label">${col.label}</div>
                <ul>${col.items.map(i => `<li>${i}</li>`).join("")}</ul>
            </div>`).join("")}
        </div>
    </div>

    <!-- Skills -->
    <div class="washi-card">
        <h2 class="sakura-section-title">技術能力</h2>
        <div class="sk-skills-grid">
            ${d.skills.map(s => `
            <div class="sk-skill-block">
                <div class="sk-skill-header">${s.header}</div>
                <ul>${s.items.map(i => `<li>${i}</li>`).join("")}</ul>
            </div>`).join("")}
        </div>
    </div>

    <!-- Achievements -->
    <div class="washi-card">
        <h2 class="sakura-section-title">獎項與證照</h2>
        <ul class="sk-achievement-list">
            ${d.achievements.map(a => `<li>${a}</li>`).join("")}
        </ul>
    </div>
</main>

<footer class="sakura-footer">
    <p>${d.name} · ${d.email}</p>
</footer>`;
    },
};

function skProject(p) {
    return `
<div class="sk-project">
    <div class="sk-project-title">
        <i class="${p.icon}"></i>
        ${p.title}
        ${p.badges.map(b => `<span class="sk-badge">${b}</span>`).join("")}
    </div>
    <ul>${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
</div>`;
}
