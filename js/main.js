// Hero terminal
(() => {
  const term = document.getElementById("terminal");
  if (!term) return;

  const L = window.I18N;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const PROMPT = "ingame@devhub:~$ ";
  // Output text for each command lives in i18n.js under "term.<name>"
  const CMD_NAMES = ["whoami", "role", "focus", "status", "about", "skills", "projects", "education", "experience", "github", "contact", "help"];
  const INTRO = ["whoami", "role", "focus", "status"];

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let hintEl = null;

  function addLine(text, cls) {
    const el = document.createElement("span");
    el.className = "t-line " + (cls || "");
    el.textContent = text;
    term.appendChild(el);
    return el;
  }

  function addGap() {
    const el = document.createElement("span");
    el.className = "t-gap";
    term.appendChild(el);
  }

  function promptLine() {
    const el = document.createElement("span");
    el.className = "t-line";
    const p = document.createElement("span");
    p.className = "t-prompt";
    p.textContent = PROMPT;
    const c = document.createElement("span");
    c.className = "t-cmd";
    el.append(p, c);
    term.appendChild(el);
    return c;
  }

  async function typeCommand(cmd) {
    const target = promptLine();
    if (reduceMotion) {
      target.textContent = cmd;
      return;
    }
    for (const ch of cmd) {
      target.textContent += ch;
      await sleep(55 + Math.random() * 60);
    }
    await sleep(260);
  }

  function printOutput(cmd) {
    const out = L.t("term." + cmd);
    (Array.isArray(out) ? out : [out]).forEach((line) => addLine(line, cmd === "status" ? "t-ok" : "t-out"));
    addGap();
  }

  async function runIntro() {
    for (const cmd of INTRO) {
      await typeCommand(cmd);
      if (!reduceMotion) await sleep(200);
      printOutput(cmd);
      if (!reduceMotion) await sleep(350);
    }
    startInteractive();
  }

  // Interactive prompt: the visitor can type commands after the intro
  function startInteractive(focus) {
    hintEl = addLine(L.t("term.hint"), "t-hint");
    const line = document.createElement("span");
    line.className = "t-line";
    line.style.display = "flex";
    const p = document.createElement("span");
    p.className = "t-prompt";
    p.textContent = PROMPT;
    const input = document.createElement("input");
    input.type = "text";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.setAttribute("aria-label", L.t("term.aria"));
    input.placeholder = L.t("term.placeholder");
    Object.assign(input.style, {
      background: "transparent", border: "none", outline: "none",
      color: "var(--text)", font: "inherit", flex: "1", minWidth: "0", caretColor: "var(--accent)",
    });
    line.append(p, input);
    term.appendChild(line);
    // After a command keep typing without clicking again; never steal focus on page load
    if (focus) input.focus({ preventScroll: true });

    input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const raw = input.value.trim().toLowerCase();
      const parts = raw.split(/\s+/);
      const cmd = parts[0];
      input.disabled = true;

      // Wipe the previous command and its output; only the latest one stays on screen
      term.textContent = "";
      if (cmd === "clear" || !cmd) {
        // nothing to print
      } else {
        promptLine().textContent = raw;
      }

      if (cmd === "clear" || !cmd) {
        // screen stays empty
      } else if (cmd === "lang") {
        if (L.setLang(parts[1])) addLine(L.t("term.langset", L.lang.toUpperCase()), "t-out");
        else addLine(L.t("term.langusage"), "t-out");
        addGap();
      } else if (CMD_NAMES.includes(cmd)) {
        printOutput(cmd);
      } else if (cmd) {
        addLine(L.t("term.notfound", cmd), "t-out");
        addGap();
      }
      startInteractive(true);
    });

    input.dataset.live = "1";
  }

  // Keep the live input in the current language
  L.onChange(() => {
    const live = term.querySelector("input[data-live]");
    if (hintEl && hintEl.isConnected) hintEl.textContent = L.t("term.hint");
    if (!live) return;
    live.placeholder = L.t("term.placeholder");
    live.setAttribute("aria-label", L.t("term.aria"));
  });

  // Don't steal page focus on load; only focus after the user clicks the terminal
  term.parentElement.addEventListener("click", () => {
    const live = term.querySelector("input[data-live]");
    if (live) live.focus();
  });

  // Start the typing animation when the hero is visible
  runIntro();
})();

// Scroll-reveal for sections (shared by all next steps)
(() => {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
})();


// GitHub section: live data from the public GitHub API
(() => {
  const list = document.getElementById("ghList");
  if (!list) return;
  const L = window.I18N;
  const USER = "Ingameworld13";
  const CACHE_KEY = "gh-cache-v1";
  const TTL = 10 * 60 * 1000;
  const STAT_IDS = ["ghStatRepos", "ghStatProjects", "ghStatLangs", "ghStatStars"];

  let state = { kind: "loading" };

  const setStat = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const message = (text) => {
    const p = document.createElement("p");
    p.className = "panel__hint";
    p.textContent = text;
    list.replaceChildren(p);
  };

  async function load() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const c = JSON.parse(raw);
        if (Date.now() - c.t < TTL) return c.d;
      }
    } catch (_) {}
    const [uRes, rRes] = await Promise.all([
      fetch("https://api.github.com/users/" + USER),
      fetch("https://api.github.com/users/" + USER + "/repos?per_page=100&sort=updated"),
    ]);
    if (!uRes.ok || !rRes.ok) throw new Error("GitHub API " + uRes.status + "/" + rRes.status);
    const d = { user: await uRes.json(), repos: await rRes.json() };
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d })); } catch (_) {}
    return d;
  }

  function card(repo) {
    const a = document.createElement("a");
    a.className = "card gh__repo";
    a.href = repo.html_url;
    a.target = "_blank";
    a.rel = "noopener";
    const name = document.createElement("h4");
    name.className = "gh__name";
    name.textContent = repo.name;
    const desc = document.createElement("p");
    desc.className = "gh__desc";
    desc.textContent = repo.description || L.t("gh.nodesc");
    const meta = document.createElement("p");
    meta.className = "gh__meta";
    const parts = [];
    if (repo.language) parts.push(repo.language);
    parts.push("★ " + repo.stargazers_count);
    const date = new Date(repo.pushed_at || repo.updated_at)
      .toLocaleDateString(L.lang === "ua" ? "uk-UA" : "en-GB", { year: "numeric", month: "short", day: "numeric" });
    parts.push(L.t("gh.updated") + " " + date);
    meta.textContent = parts.join("  ·  ");
    a.append(name, desc, meta);
    return a;
  }

  function render() {
    if (state.kind === "ok") {
      const { user, repos } = state.data;
      const own = repos.filter((r) => !r.fork);
      const langs = new Set(own.map((r) => r.language).filter(Boolean));
      setStat("ghStatRepos", user.public_repos);
      setStat("ghStatProjects", own.length);
      setStat("ghStatLangs", langs.size);
      setStat("ghStatStars", own.reduce((s, r) => s + r.stargazers_count, 0));
      if (!own.length) return message(L.t("gh.empty"));
      list.replaceChildren(...own.slice(0, 6).map(card));
    } else if (state.kind === "error") {
      STAT_IDS.forEach((id) => setStat(id, "—"));
      message(L.t("gh.error"));
    }
  }

  L.onChange(render);
  load()
    .then((data) => { state = { kind: "ok", data }; render(); })
    .catch(() => { state = { kind: "error" }; render(); });
})();

// Contact form + links
(() => {
  const L = window.I18N;
  // Fill these in to enable the form and the extra links:
  const CONFIG = {
    EMAIL: "",          // e.g. "you@example.com"  (enables mailto fallback + Email button)
    LINKEDIN: "",       // e.g. "https://www.linkedin.com/in/your-name"
    FORM_ENDPOINT: "",  // e.g. a Formspree URL "https://formspree.io/f/xxxxxxxx"
  };

  const links = document.getElementById("contactLinks");
  const addLink = (label, href, external) => {
    const a = document.createElement("a");
    a.className = "btn btn--ghost";
    a.textContent = label;
    a.href = href;
    if (external) { a.target = "_blank"; a.rel = "noopener"; }
    links.appendChild(a);
  };
  if (links && CONFIG.EMAIL) addLink("Email", "mailto:" + CONFIG.EMAIL, false);
  if (links && CONFIG.LINKEDIN) addLink("LinkedIn", CONFIG.LINKEDIN, true);

  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  if (!form) return;
  const say = (key, ok) => { status.textContent = L.t(key); status.className = "contact__status " + (ok ? "is-ok" : "is-err"); };
  L.onChange(() => { status.textContent = ""; status.className = "contact__status"; });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return say("form.invalid", false);
    }
    if (CONFIG.FORM_ENDPOINT) {
      try {
        const res = await fetch(CONFIG.FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        return say("form.ok", true);
      } catch (_) {
        return say("form.fail", false);
      }
    }
    if (CONFIG.EMAIL) {
      const body = message + "\n\n— " + name + " (" + email + ")";
      location.href = "mailto:" + CONFIG.EMAIL + "?subject=" + encodeURIComponent("Portfolio message from " + name) + "&body=" + encodeURIComponent(body);
      return say("form.mailto", true);
    }
    say("form.off", false);
  });
})();

// Interactive tech stack map
(() => {
  const panel = document.getElementById("techPanel");
  if (!panel) return;
  const L = window.I18N;
  const SITE = "Interactive Developer Portfolio";

  // cat: category key, used: "site" (this portfolio) or "learn"
  const T = {
    "HTML5": { cat: "Frontend", used: "site", en: "Semantic page structure and accessible markup.", ua: "Семантична структура сторінок і доступна розмітка." },
    "CSS": { cat: "Frontend", used: "site", en: "Layout, theming, responsive design and animations.", ua: "Верстка, теми, адаптивний дизайн і анімації." },
    "JavaScript": { cat: "Frontend", used: "site", en: "Interactivity, DOM scripting and UI logic.", ua: "Інтерактивність, робота з DOM і логіка інтерфейсу." },
    "React.js": { cat: "Frontend", used: "learn", en: "Component-based user interfaces.", ua: "Компонентні інтерфейси користувача." },
    ".NET": { cat: "Backend", used: "learn", en: "Application platform for C# services and apps.", ua: "Платформа для C#-сервісів і застосунків." },
    "Java": { cat: "Backend", used: "learn", en: "Object-oriented programming and backend basics.", ua: "Об'єктно-орієнтоване програмування та основи бекенду." },
    "C/C++": { cat: "Systems", used: "learn", en: "Low-level, performance-oriented programming.", ua: "Низькорівневе програмування, орієнтоване на продуктивність." },
    "C#": { cat: "Systems", used: "learn", en: "Object-oriented language for the .NET ecosystem.", ua: "Об'єктно-орієнтована мова для екосистеми .NET." },
    "CMake": { cat: "Build systems", used: "learn", en: "Cross-platform build configuration.", ua: "Кросплатформенне налаштування збірки." },
    "Ninja": { cat: "Build systems", used: "learn", en: "Fast build backend.", ua: "Швидкий бекенд збірки." },
    "MSBuild": { cat: "Build systems", used: "learn", en: "Build engine for .NET and Visual Studio projects.", ua: "Система збірки для .NET та проєктів Visual Studio." },
    "PostgreSQL": { cat: "Database", used: "learn", en: "Relational database and SQL.", ua: "Реляційні бази даних і SQL." },
    "MySQL": { cat: "Database", used: "learn", en: "Relational database and SQL.", ua: "Реляційні бази даних і SQL." },
  };

  let current = null;

  const row = (label, text) => {
    const d = document.createElement("div");
    d.className = "panel__row";
    const b = document.createElement("b");
    b.textContent = label;
    d.append(b, document.createTextNode(text));
    return d;
  };

  function renderDetails() {
    const info = T[current];
    const label = document.createElement("h3");
    label.className = "card__label";
    label.textContent = L.t("tech.cat." + info.cat);
    const title = document.createElement("h4");
    title.className = "panel__title";
    title.textContent = current;
    const used = info.used === "site" ? SITE : L.t("tech.learning");
    panel.replaceChildren(label, title, row(L.t("tech.usedFor"), info[L.lang]), row(L.t("tech.usedIn"), used));
  }

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip.is-active").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      current = chip.dataset.tech;
      renderDetails();
    });
  });

  L.onChange(() => { if (current) renderDetails(); });
})();
