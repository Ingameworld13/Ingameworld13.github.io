// EN/UA language switcher.
// English text lives in the HTML itself (it is harvested on load), so only
// Ukrainian strings and JS-generated English strings are listed here.
(() => {
  const STORE_KEY = "lang";

  // Ukrainian translations for elements marked with data-i18n / data-i18n-html / data-i18n-attr
  const UA = {
    "meta.title": "INGAME — Розробник ПЗ",
    "meta.desc": "INGAME — розробник програмного забезпечення. Web, Full-stack, Системне програмування.",
    "lang.aria": "Змінити мову",

    "nav.projects": "Проєкти", "nav.about": "Про мене", "nav.stack": "Стек",
    "nav.engineering": "Інженерія", "nav.github": "GitHub", "nav.contact": "Контакти",

    "hero.eyebrow": "Відкритий до стажування",
    "hero.role": "Розробник програмного забезпечення",
    "hero.tagline": "Створюю програмне забезпечення,<br>навчаючись на реальних проєктах.",
    "hero.cta": "Переглянути проєкти",

    "proj.label": "// 01 — проєкти", "proj.title": "Проєкти",
    "proj.desc": "Сайт, який ти зараз бачиш: developer hub із живим терміналом, анімованими секціями та адаптивною версткою. Він демонструє сам себе.",
    "proj.live": "Живий сайт", "proj.src": "Вихідний код",
    "proj.more": "// незабаром більше проєктів",

    "about.label": "// 02 — про мене", "about.title": "Про мене",
    "about.p1": "Я студент спеціальності «Програмна інженерія» з Києва, навчаюсь у Коледжі комп'ютерних технологій та економіки Київського авіаційного інституту.",
    "about.p2": "Мене цікавлять веб-розробка, програмна інженерія, системне програмування та сучасна розробка з підтримкою AI. Найкраще вчусь, створюючи: кожен проєкт — це шанс зрозуміти, як усе працює насправді.",
    "about.goal": "Шукаю стажування / позицію Junior Software Developer.",
    "edu.label": "Освіта", "edu.degree": "Програмна інженерія",
    "edu.school": "Київський авіаційний інститут",
    "edu.sub": "Коледж комп'ютерних технологій та економіки",
    "facts.location": "Локація", "facts.locationV": "Київ, Україна",
    "facts.focus": "Фокус", "facts.status": "Статус", "facts.statusV": "Відкритий до стажування",

    "stack.label": "// 03 — стек", "stack.title": "Технологічний стек",
    "layer.systems": "Системне", "layer.db": "Бази даних",
    "panel.label": "Деталі", "panel.hint": "Натисни на технологію →",

    "eng.label": "// 04 — інженерія", "eng.title": "Інженерні практики",
    "eng.oop.t": "Об'єктно-орієнтоване програмування",
    "eng.oop.d": "Проєктування коду навколо чітких відповідальностей і об'єктів.",
    "eng.solid.d": "Принципи читабельного та підтримуваного дизайну.",
    "eng.test.t": "Модульне тестування",
    "eng.test.d": "Перевірка поведінки в малих повторюваних тестах.",
    "eng.git.d": "Контроль версій і процес спільної роботи.",
    "eng.postman.d": "Дослідження та тестування HTTP API.",
    "eng.build.t": "Системи збірки",

    "gh.label": "// 05 — github", "gh.title": "GitHub",
    "gh.repos": "Репозиторії", "gh.projects": "Публічні проєкти", "gh.langs": "Мови", "gh.stars": "Зірки",
    "gh.cta": "Відкрити профіль GitHub", "gh.sub": "Останні проєкти",
    "gh.loading": "Завантаження з GitHub…",

    "road.label": "// 06 — роадмап", "road.title": "Роадмап розробника",
    "road.fund": "Основи програмування", "road.oop": "ООП", "road.db": "Бази даних", "road.web": "Веб",
    "road.systems": "Системне програмування", "road.intern": "Стажування", "road.junior": "Junior-розробник ПЗ",
    "focus.label": "Поточний фокус", "focus.aria": "Прогрес поточного фокусу",
    "focus.web": "Веб-розробка", "focus.sys": "Системне програмування", "focus.se": "Програмна інженерія",

    "ach.label": "// 07 — досягнення", "ach.title": "Досягнення",
    "ach.hack": "Хакатон", "ach.hackD": "Програмне забезпечення універсального використання",
    "ach.round": "Круглий стіл",
    "ach.prod": "Виробнича практика", "ach.prodD": "Розробка веб-застосунків",

    "ai.label": "// 08 — розробка з AI", "ai.title": "Розробка з підтримкою AI",
    "ai.p": "AI — це інструмент у моєму робочому процесі, а не заміна розуміння. Я використовую його, щоб працювати швидше та вчитися більше, але кожен рядок коду все одно читаю, тестую та за нього відповідаю.",
    "ai.used": "Використовую для",
    "ai.l1": "Вивчення коду", "ai.l2": "Допомога з налагодженням", "ai.l3": "Документація",
    "ai.l4": "Навчання", "ai.l5": "Прототипування",

    "contact.label": "// 09 — контакти", "contact.title": "Створімо щось разом",
    "contact.p": "Цікавить співпраця або є пропозиція щодо стажування? Напиши мені.",
    "contact.name": "Ім'я", "contact.message": "Повідомлення", "contact.send": "Надіслати повідомлення",

    // JS-generated strings
    "term.role": ["Розробник ПЗ"],
    "term.status": ["Відкритий до стажування"],
    "term.about": [
      "Студент спеціальності «Програмна інженерія» з Києва.",
      "Цікавлюсь веб-розробкою, програмною інженерією,",
      "системним програмуванням і розробкою з підтримкою AI.",
    ],
    "term.skills": [
      "Frontend : HTML5, CSS, JavaScript, React.js",
      "Backend  : .NET, Java",
      "Системне : C/C++, C#, CMake, Ninja, MSBuild",
      "Бази даних : PostgreSQL, MySQL",
      "Практики : ООП, SOLID, модульне тестування, Git/GitHub, Postman",
    ],
    "term.education": ["2023 - 2027  Програмна інженерія", "Київський авіаційний інститут", "Коледж комп'ютерних технологій та економіки"],
    "term.experience": ["Навчальні проєкти та самостійне навчання.", "Шукаю стажування / позицію Junior Software Developer."],
    "term.contact": ["GitHub : https://github.com/Ingameworld13", "Форма  : #contact"],
    "term.help": [
      "Доступні команди:",
      "about, skills, projects, education, experience, github, contact, lang en|ua, clear",
      "(також: whoami, role, focus, status)",
    ],
    "term.hint": "Команди: about, skills, projects, education, experience, github, contact, lang, clear",
    "term.notfound": "команду не знайдено: {0} (спробуй 'help')",
    "term.placeholder": "введи 'help'",
    "term.aria": "Поле терміналу. Введи help, щоб побачити команди.",
    "term.langset": "мова: {0}",
    "term.langusage": "використання: lang en | ua",

    "tech.cat.Systems": "Системне програмування", "tech.cat.Build systems": "Системи збірки", "tech.cat.Database": "Бази даних",
    "tech.usedFor": "Використовується для", "tech.usedIn": "Де використано", "tech.learning": "Вивчаю та практикую",

    "gh.nodesc": "Опису поки немає.", "gh.updated": "оновлено",
    "gh.empty": "Публічних проєктів поки немає.",
    "gh.error": "Зараз не вдалося завантажити дані з GitHub. Відкрий профіль напряму.",

    "form.invalid": "Заповни ім'я, коректний email і повідомлення.",
    "form.ok": "Повідомлення надіслано. Дякую!",
    "form.fail": "Не вдалося надіслати повідомлення. Спробуй пізніше.",
    "form.mailto": "Відкриваю поштовий застосунок…",
    "form.off": "Форма ще не підключена. Напиши мені через GitHub.",
  };

  // English strings that are generated by JS (not present in the HTML)
  const EN_EXTRA = {
    "term.whoami": ["INGAME"],
    "term.role": ["Software Developer"],
    "term.focus": ["Web / Full-stack / Systems"],
    "term.status": ["Open to internship"],
    "term.about": [
      "Software Engineering student from Kyiv.",
      "Interested in web development, software engineering,",
      "systems programming and AI-assisted development.",
    ],
    "term.skills": [
      "Frontend : HTML5, CSS, JavaScript, React.js",
      "Backend  : .NET, Java",
      "Systems  : C/C++, C#, CMake, Ninja, MSBuild",
      "Database : PostgreSQL, MySQL",
      "Practice : OOP, SOLID, Unit Testing, Git/GitHub, Postman",
    ],
    "term.projects": ["[01] Interactive Developer Portfolio", "     HTML5 / CSS / JavaScript  ->  #projects"],
    "term.education": ["2023 - 2027  Software Engineering", "Kyiv Aviation Institute", "College of Computer Technologies and Economics"],
    "term.experience": ["Student projects and self-directed learning.", "Looking for an internship / Junior Software Developer position."],
    "term.github": ["https://github.com/Ingameworld13"],
    "term.contact": ["GitHub : https://github.com/Ingameworld13", "Form   : #contact"],
    "term.help": [
      "Available commands:",
      "about, skills, projects, education, experience, github, contact, lang en|ua, clear",
      "(also: whoami, role, focus, status)",
    ],
    "term.hint": "Commands: about, skills, projects, education, experience, github, contact, lang, clear",
    "term.notfound": "command not found: {0} (try 'help')",
    "term.placeholder": "type 'help'",
    "term.aria": "Terminal input. Type help for commands.",
    "term.langset": "language: {0}",
    "term.langusage": "usage: lang en | ua",

    "tech.cat.Frontend": "Frontend", "tech.cat.Backend": "Backend", "tech.cat.Systems": "Systems",
    "tech.cat.Build systems": "Build systems", "tech.cat.Database": "Database",
    "tech.usedFor": "Used for", "tech.usedIn": "Used in", "tech.learning": "Learning and practicing",

    "gh.nodesc": "No description yet.", "gh.updated": "updated",
    "gh.empty": "No public projects yet.",
    "gh.error": "Could not load data from GitHub right now. Open the profile directly.",

    "form.invalid": "Please fill in name, a valid email and a message.",
    "form.ok": "Message sent. Thank you!",
    "form.fail": "Could not send the message. Please try again later.",
    "form.mailto": "Opening your email app…",
    "form.off": "The form is not connected yet. Please reach me via GitHub.",
  };

  const DICT = { en: { ...EN_EXTRA }, ua: UA };

  // Harvest English text from the HTML so it never has to be duplicated here.
  const metaDesc = document.querySelector('meta[name="description"]');
  DICT.en["meta.title"] = document.title;
  if (metaDesc) DICT.en["meta.desc"] = metaDesc.getAttribute("content");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (!(el.dataset.i18n in DICT.en)) DICT.en[el.dataset.i18n] = el.textContent;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    if (!(el.dataset.i18nHtml in DICT.en)) DICT.en[el.dataset.i18nHtml] = el.innerHTML;
  });
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (!(key in DICT.en)) DICT.en[key] = el.getAttribute(attr);
    });
  });

  let lang = "en";
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved === "en" || saved === "ua") lang = saved;
    else if ((navigator.language || "").toLowerCase().startsWith("uk")) lang = "ua";
  } catch (_) {}

  const listeners = [];

  function t(key, ...args) {
    let v = DICT[lang][key];
    if (v === undefined) v = DICT.en[key];
    if (v === undefined) return key;
    if (typeof v === "string") args.forEach((a, i) => { v = v.replace("{" + i + "}", a); });
    return v;
  }

  function apply() {
    document.documentElement.lang = lang === "ua" ? "uk" : "en";
    document.title = t("meta.title");
    if (metaDesc) metaDesc.setAttribute("content", t("meta.desc"));
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        el.setAttribute(attr, t(key));
      });
    });
    document.querySelectorAll("#langToggle span").forEach((s) => {
      s.classList.toggle("is-active", s.dataset.lang === lang);
    });
  }

  function setLang(next) {
    if (next !== "en" && next !== "ua") return false;
    if (next === lang) return true;
    lang = next;
    try { localStorage.setItem(STORE_KEY, lang); } catch (_) {}
    apply();
    listeners.forEach((fn) => fn(lang));
    return true;
  }

  window.I18N = {
    t,
    setLang,
    get lang() { return lang; },
    onChange: (fn) => listeners.push(fn),
  };

  apply();
  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.addEventListener("click", () => setLang(lang === "en" ? "ua" : "en"));
})();
