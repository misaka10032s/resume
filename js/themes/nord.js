/* ============================================================
   NORD THEME — two-column sidebar, clean Scandinavian aesthetic
   ============================================================ */

window.NordTheme = {
    id: "nord",
    label: "NORD",

    bootLines: [
        { text: "◈",                  cls: "nord-boot-line nb-icon" },
        { text: "Yang, Zhen-Guan",    cls: "nord-boot-line nb-name" },
        { text: "Frontend Engineer",  cls: "nord-boot-line nb-role" },
        { text: "···············",    cls: "nord-boot-line nb-rule" },
        { text: "Initializing...",    cls: "nord-boot-line nb-load" },
    ],

    activate() {},
    deactivate() {},

    render(d) {
        const sidebarSkills = d.skills.flatMap(s =>
            s.items.map(i => i.split("、")[0].split(" ")[0].split("+")[0].trim()).slice(0, 3)
        ).slice(0, 16);

        return `
<div class="nord-sidebar">
    <div>
        <img src="${d.avatar}" alt="Avatar" class="nord-avatar">
        <div class="nord-name">${d.name}</div>
        <div class="nord-name-en">${d.nameEn}</div>
        <span class="nord-role-badge">${d.role}</span>
    </div>

    <div class="nord-sidebar-section">
        <div class="nord-sidebar-label">Contact</div>
        <ul class="nord-sidebar-list">
            <li><i class="fas fa-envelope"></i><a href="mailto:${d.email}">${d.email}</a></li>
            <li><i class="fab fa-github"></i><a href="${d.github}" target="_blank">misaka10032s</a></li>
            <li><i class="fas fa-globe"></i><a href="${d.blog}" target="_blank">misaka-site.co</a></li>
        </ul>
    </div>

    <div class="nord-sidebar-section">
        <div class="nord-sidebar-label">Education</div>
        <ul class="nord-sidebar-list">
            <li style="white-space:normal;line-height:1.5">${d.education}</li>
        </ul>
    </div>

    <div class="nord-sidebar-section">
        <div class="nord-sidebar-label">Skills</div>
        <div>
            ${sidebarSkills.map(s => `<span class="nord-skill-tag">${s}</span>`).join("")}
        </div>
    </div>

    <div class="nord-sidebar-section">
        <div class="nord-sidebar-label">Achievements</div>
        <ul class="nord-sidebar-list">
            ${d.achievements.map(a => `<li style="white-space:normal;line-height:1.5;font-size:0.74rem">${a}</li>`).join("")}
        </ul>
    </div>
</div>

<div class="nord-main">

    <!-- Experience -->
    <section class="nord-section">
        <h2 class="nord-section-title"><i class="fas fa-briefcase"></i> Work Experience</h2>
        <div class="nord-timeline">
            ${d.jobs.map(job => `
            <div class="nord-tl-item">
                <div class="nord-tl-date">${job.period.replace("—", "–")}</div>
                <div class="nord-tl-dot"></div>
                <div class="nord-tl-body">
                    <div class="nord-tl-company">${job.company}</div>
                    <span class="nord-tl-role">${job.role}</span>
                    ${job.subTag ? `<div class="nord-tl-sub">${job.subTag}</div>` : ""}
                    ${job.projects.map(p => nordProject(p)).join("")}
                    ${job.extras.length ? `
                    <details class="nord-expand">
                        <summary>其他專案 ▸</summary>
                        <div class="nord-expand-body">
                            ${job.extras.map(p => nordProject(p)).join("")}
                        </div>
                    </details>` : ""}
                </div>
            </div>`).join("")}
        </div>
    </section>

    <!-- Projects -->
    <section class="nord-section">
        <h2 class="nord-section-title"><i class="fas fa-code-branch"></i> Side Projects</h2>
        <div class="nord-proj-grid">
            ${d.projects.map(p => `
            <div class="nord-proj-card">
                <div class="nord-proj-card-header">
                    <span class="nord-proj-icon"><i class="${p.icon}"></i></span>
                    <div>
                        <div class="nord-proj-card-title">${p.url ? `<a href="${p.url}" target="_blank">${p.title}</a>` : p.title}</div>
                        <div class="nord-proj-card-badges">
                            ${p.badges.map(b => `<span class="nord-badge">${b}</span>`).join("")}
                        </div>
                    </div>
                </div>
                <ul>${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
                ${p.deep.length ? `
                <details class="nord-expand">
                    <summary>技術深度 ▸</summary>
                    <div class="nord-expand-body">
                        <ul>${p.deep.map(b => `<li>${b}</li>`).join("")}</ul>
                    </div>
                </details>` : ""}
            </div>`).join("")}
        </div>
    </section>

    <!-- AI Collab -->
    <section class="nord-section">
        <h2 class="nord-section-title"><i class="fas fa-robot"></i> AI Collaboration</h2>
        <blockquote class="nord-quote">${d.aiCollab.quote}</blockquote>
        <div class="nord-ai-grid">
            ${d.aiCollab.columns.map(col => `
            <div class="nord-ai-col">
                <div class="nord-ai-label">${col.label}</div>
                <ul>${col.items.map(i => `<li>${i}</li>`).join("")}</ul>
            </div>`).join("")}
        </div>
    </section>

    <!-- Skills detail -->
    <section class="nord-section">
        <h2 class="nord-section-title"><i class="fas fa-code"></i> Tech Stack</h2>
        <div class="nord-proj-grid">
            ${d.skills.map(s => `
            <div class="nord-proj-card">
                <div style="font-size:0.75rem;font-weight:700;color:var(--f0);margin-bottom:0.5rem;padding-bottom:0.3rem;border-bottom:1px solid var(--n2)">${s.header}</div>
                <ul>${s.items.map(i => `<li>${i}</li>`).join("")}</ul>
            </div>`).join("")}
        </div>
    </section>

    <footer class="nord-footer">
        ${d.name} · ${d.email} · ${new Date().getFullYear()}
    </footer>
</div>`;
    },
};

function nordProject(p) {
    return `
<div class="nord-proj">
    <div class="nord-proj-title">
        <i class="${p.icon}"></i> ${p.title}
        ${p.badges.map(b => `<span class="nord-badge">${b}</span>`).join("")}
    </div>
    <ul>${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
</div>`;
}
