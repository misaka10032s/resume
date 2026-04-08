/* ============================================================
   CYBER THEME
   ============================================================ */

window.CyberTheme = {
    id: "cyber",
    label: "CYBER",

    bootLines: [
        "Initialize system...",
        "Loading kernel modules [OK]",
        "Mounting file systems [OK]",
        "Starting networking service [OK]",
        "Fetching user profile: Yang, Zhen-Guan...",
        "Loading Vue3 components...",
        "Compiling C++ algorithms...",
        "Executing Python scripts...",
        "Access Granted. Welcome.",
    ],

    activate() {},
    deactivate() {},

    render(d) {
        return `
<header class="cyber-header">
    <img src="${d.avatar}" alt="Avatar" class="cyber-avatar">
    <h1 class="glitch" data-text="${d.name} (${d.nameEn})">${d.name} (${d.nameEn})</h1>
    <p class="cyber-role">&lt; ${d.role} /&gt;</p>
</header>

<main>
    <!-- Profile -->
    <section class="code-block">
        <div class="block-header">
            <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
            <span class="filename">profile.json</span>
        </div>
        <div class="block-content">
<pre><code>{
  <span class="key">"name"</span>: <span class="string">"${d.name}"</span>,
  <span class="key">"email"</span>: <span class="link"><a href="mailto:${d.email}">"${d.email}"</a></span>,
  <span class="key">"education"</span>: <span class="string">"${d.education}"</span>,
  <span class="key">"experience"</span>: <span class="string">"${d.experience}"</span>,
  <span class="key">"links"</span>: {
    <span class="key">"github"</span>: <span class="link"><a href="${d.github}" target="_blank">"github.com/misaka10032s"</a></span>,
    <span class="key">"blog"</span>: <span class="link"><a href="${d.blog}" target="_blank">"misaka-site.co"</a></span>,
    <span class="key">"game_tracker"</span>: <span class="link"><a href="${d.gameTracker}" target="_blank">"msapi.misaka-site.co"</a></span>
  }
}</code></pre>
        </div>
    </section>

    <!-- Experience -->
    <section class="section-container">
        <h2 class="section-title"><i class="fas fa-briefcase"></i> Experience.log</h2>
        <div class="timeline">
            ${d.jobs.map(job => `
            <div class="timeline-item">
                <div class="timeline-date">${job.period}</div>
                <div class="timeline-content">
                    <h3>${job.company}
                        <span class="tag">${job.role}</span>
                        ${job.subTag ? `<span class="sub-tag">${job.subTag}</span>` : ""}
                    </h3>
                    ${job.projects.map(p => renderProject(p)).join("")}
                    ${job.extras.length ? `
                    <details class="expand-details">
                        <summary>其他專案 <span class="expand-hint">▸</span></summary>
                        <div class="expand-content">
                            ${job.extras.map(p => renderProject(p)).join("")}
                        </div>
                    </details>` : ""}
                </div>
            </div>`).join("")}
        </div>
    </section>

    <!-- Projects -->
    <section class="section-container">
        <h2 class="section-title"><i class="fas fa-code-branch"></i> Projects.md</h2>
        <div class="projects-grid">
            ${d.projects.map(p => `
            <div class="project-card">
                <div class="project-card-header">
                    <span class="project-icon"><i class="${p.icon}"></i></span>
                    <div>
                        <h3>${p.url ? `<a href="${p.url}" target="_blank">${p.title}</a>` : p.title}</h3>
                        <div class="project-badges">
                            ${p.badges.map(b => `<span class="tech-badge">${b}</span>`).join("")}
                        </div>
                    </div>
                </div>
                <ul>${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
                ${p.deep.length ? `
                <details class="expand-details">
                    <summary>技術深度 <span class="expand-hint">▸</span></summary>
                    <div class="expand-content">
                        <ul>${p.deep.map(b => `<li>${b}</li>`).join("")}</ul>
                    </div>
                </details>` : ""}
            </div>`).join("")}
        </div>
    </section>

    <!-- AI Collab -->
    <section class="section-container">
        <h2 class="section-title"><i class="fas fa-robot"></i> AI_Collab.md</h2>
        <div class="ai-collab-block">
            <div class="ai-collab-quote">
                <span class="prompt-symbol">▎</span>${d.aiCollab.quote}
            </div>
            <div class="ai-collab-grid">
                ${d.aiCollab.columns.map(col => `
                <div class="ai-collab-item">
                    <span class="ai-label">${col.label}</span>
                    <ul>${col.items.map(i => `<li>${i}</li>`).join("")}</ul>
                </div>`).join("")}
            </div>
        </div>
    </section>

    <!-- Skills -->
    <section class="section-container">
        <h2 class="section-title"><i class="fas fa-code"></i> Skills.md</h2>
        <div class="skills-grid">
            ${d.skills.map(s => `
            <div class="skill-card">
                <div class="skill-header">${s.header}</div>
                <ul>${s.items.map(i => `<li>${i}</li>`).join("")}</ul>
            </div>`).join("")}
        </div>
    </section>

    <!-- Achievements -->
    <section class="section-container">
        <h2 class="section-title"><i class="fas fa-award"></i> Achievements.txt</h2>
        <ul class="terminal-list">
            ${d.achievements.map(a => `<li><span class="prompt">></span> ${a}</li>`).join("")}
        </ul>
    </section>
</main>

<footer class="cyber-footer">
    <p>System.exit(0); // <span class="blink">_</span></p>
</footer>`;
    },
};

function renderProject(p) {
    return `
    <div class="project">
        <h4><i class="${p.icon}"></i> ${p.title}
            ${p.badges.map(b => `<span class="tech-badge">${b}</span>`).join("")}
        </h4>
        <ul>${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
    </div>`;
}
