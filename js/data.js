window.RESUME_DATA = {
    name:     "楊貞觀",
    nameEn:   "Yang, Zhen-Guan",
    role:     "Frontend Engineer",
    email:    "codyjj1012@gmail.com",
    github:   "https://github.com/misaka10032s",
    blog:     "https://misaka-site.co/",
    gameTracker: "https://msapi.misaka-site.co/",
    education: "台北科技大學 機電學士班 / 機械系",
    experience: "4.5 年（前端為主，全端能力）",
    avatar:   "img/avatar.png",

    jobs: [
        {
            company:  "光速未來有限公司",
            role:     "前端工程師",
            period:   "2024/12 — 2025/09",
            projects: [
                {
                    icon:  "fas fa-gamepad",
                    title: "遊戲管理後台",
                    badges: ["Vue3"],
                    bullets: [
                        "入職首日即可獨立投入，<strong>1 週</strong>完成原訂 2 週工作量進入測試。",
                        "分配任務均在期限 1/3–1/4 時間完成開發，進入 Stage QA 時程僅佔總期限 50–70%，<strong>整體效率約 2 倍</strong>於預估時程。",
                        "為既有元件新增功能，零破壞性修改，無回歸風險。",
                    ],
                },
                {
                    icon:  "fas fa-mobile-alt",
                    title: "H5 遊戲 PC 版前端",
                    badges: ["Vue3", "Nuxt.js"],
                    bullets: [
                        "無 API 文件情況下，以手機版 H5 環境為參照，透過 Vue DevTools + 原始碼關鍵字搜尋<strong>獨立還原介接規格</strong>，處理動態字串拼接函數等非直覺呼叫方式。",
                        "主動介入 Figma 規格缺漏，與需求方確認後補齊，避免後期大幅返工。",
                        "重構並封裝重複邏輯，降低後續維護成本。",
                    ],
                },
            ],
            extras: [],
        },
        {
            company:  "元宏創新",
            role:     "前端工程師",
            period:   "2021/03 — 2024/12",
            subTag:   "全端能力 (Vue3 / Python Django / MariaDB)",
            projects: [
                {
                    icon:  "fas fa-folder-open",
                    title: "案件管理系統",
                    badges: ["Vue2"],
                    bullets: [
                        "設計 BD / Manager / Sales 三層管理視角：上層可派發案件至下層，各層僅能查看自身負責範圍，資訊隔離清晰。",
                        "自製邏輯搜尋元件，支援 AND / OR 複合條件組合，超越一般關鍵字搜尋限制。",
                    ],
                },
                {
                    icon:  "fas fa-chart-line",
                    title: "CRM 業務管理系統",
                    badges: ["Vue3", "Django", "MariaDB"],
                    bullets: [
                        "前後端個人獨立開發，<strong>2 週內</strong>完成（同步自學 Django 全端技術棧）。",
                        "實作案件進度追蹤、Excel 批次匯入等核心功能。",
                    ],
                },
            ],
            extras: [
                {
                    icon:  "fas fa-search",
                    title: "檢索系統",
                    badges: ["Vue3"],
                    bullets: ["前端 API 串接與資料呈現，邏輯組合搜尋、欄位伸縮表格。"],
                },
                {
                    icon:  "fas fa-globe",
                    title: "企業官網更新",
                    badges: ["Vue3"],
                    bullets: ["主導會員中心、點數購買、資料服務等 6 個功能頁面前端開發。"],
                },
            ],
        },
    ],

    projects: [
        {
            icon:  "fas fa-blog",
            title: "個人部落格平台",
            url:   "https://misaka-site.co/",
            badges: ["Vue3", "Flask", "Socket.IO", "GCP"],
            bullets: [
                "整合 Socket.IO 實現即時多人棋盤遊戲平台（5 種棋類，1–10 人）。",
                "自建 GitHub Webhook CI/CD：Push 後自動觸發建置 → Migration → PM2 滾動重啟。",
                "Discord OAuth 登入、三語系 i18n（繁中 / 英 / 日）、TanStack Query 快取管理。",
            ],
            deep: [
                "useWindowSize composable 取代 media query，集中管理 RWD 斷點邏輯。",
                "Room 系統含狀態機（WAITING / PLAYING / ENDING）+ threading.Lock 確保執行緒安全。",
                "Flask-SQLAlchemy + Alembic Migration，Nginx + Certbot SSL，UFW 防火牆。",
            ],
        },
        {
            icon:  "fas fa-chart-bar",
            title: "遊戲角色數據平台",
            url:   "https://msapi.misaka-site.co/",
            badges: ["Vue3", "FastAPI", "Redis", "TypeScript"],
            bullets: [
                "MapleStory TW 角色數據分析平台，20+ 資料區塊視覺化、完整傷害計算引擎。",
                "Stale-While-Revalidate 快取 + 自製請求去重佇列，最大化外部 API 命中率。",
                "IntersectionObserver 懶載入 + Semaphore 並發控制，防止大清單記憶體溢出。",
            ],
            deep: [
                "全面 TypeScript（零 any），三語系 i18n，Redis 不可用時自動降級至純 DB 模式。",
                "聯盟最佳化求解器（Web Worker 背景運算，不阻塞 UI）、SQLite WAL 模式。",
                "malloc_trim() 主動釋放 C 層記憶體、串流游標查詢避免 fetchall() 爆記憶體。",
            ],
        },
        {
            icon:  "fas fa-gamepad",
            title: "Minecraft RPG 插件",
            url:   null,
            badges: ["Java 21", "Paper API", "HikariCP"],
            bullets: [
                "189 個類別、28 個模組，多資料庫抽象層（SQLite / MySQL / PostgreSQL 可切換）。",
                "自製遞歸下降公式解析器，解析 ATK*1.5+MATK/2 等動態傷害公式。",
                "嵌入式 REST API + WebSocket，Strategy / Factory / Chain of Responsibility 設計模式。",
            ],
            deep: [],
        },
        {
            icon:  "fas fa-dragon",
            title: "線上文字 RPG (Sword Saga)",
            url:   null,
            badges: [".NET 8", "Vue3", "PostgreSQL"],
            bullets: [
                "PostgreSQL 行級鎖 + ACID 事務確保高併發交易原子性，杜絕超賣與物品複製漏洞。",
                "向量代數鍛造系統（極坐標相位疊加演算法）、常態分佈品質機率判定。",
                "純手工 SCSS Glassmorphism UI + 明暗主題切換，不依賴 CSS 框架。",
            ],
            deep: [],
        },
    ],

    aiCollab: {
        quote: "「我把 AI 定位為需要被 code review 的執行工程師 — 我負責架構決策與品質驗收，AI 負責快速實作與重複性工作。以此模式，一個人完成從規格→開發→測試→部署→維護的完整工程循環。」",
        columns: [
            {
                label: "我做什麼",
                items: ["架構設計、技術選型", "規格文件（CLAUDE.md / GEMINI.md）", "驗證 AI 輸出、diff review", "Bug 假設、範圍縮小"],
            },
            {
                label: "AI 做什麼",
                items: ["依規格快速實作", "重複性內容批次生成", "單元測試撰寫", "協助 Bug 追蹤與驗證"],
            },
            {
                label: "品質保證",
                items: ["Git 小步 commit，隨時可回滾", "每次 AI 輸出後人工 review diff", "視覺 + 功能驗收，計算邏輯必附 Vitest", "沙盒權限控制，刪除 / commit 需人工確認"],
            },
        ],
    },

    skills: [
        {
            header: "JS / TS Ecosystem",
            items: ["Vue 3 Composition API + TypeScript", "Vue Router / Pinia / TanStack Query / i18n", "Nuxt.js + Vite + UnoCSS / Tailwind CSS", "Socket.IO、自製 Chrome Extension"],
        },
        {
            header: "Backend / Infra",
            items: ["Python Flask + FastAPI + SQLAlchemy", "Django + MariaDB、.NET 8 (C#)", "GCP VM + Nginx 反向代理 + PM2", "自建 GitHub Webhook CI/CD"],
        },
        {
            header: "C / C++ / Java",
            items: ["Socket、OpenCV、Thread 實作", "Drogon 網站伺服器", "Java 21 + Paper API（Minecraft 插件）", "國中自學，高中市級資訊競賽佳作"],
        },
        {
            header: "Others",
            items: ["AI 輔助開發（Gemini CLI / Claude Code）", "OAuth（Discord / Line）、WebSocket", "MySQL / SQLite / PostgreSQL / Redis", "高斯模糊、FFT、JPEG 編解碼實作"],
        },
    ],

    achievements: [
        "103、104 學年度 高中學科能力競賽資訊科 佳作",
        "日語檢定 JLPT N2 合格",
    ],
};
