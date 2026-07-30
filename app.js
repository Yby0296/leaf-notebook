/* ===================================================================
   叶子的小本本 · 移动端工作台  (原生 JS / 本地存储 / 零依赖)
   =================================================================== */
(function () {
  "use strict";

  /* ---------------- 常量 ---------------- */
  const STORE_KEY = "yezi_notebook_v1";
  const EXPENSE_CATS = [
    { key: "服饰", emoji: "👗", color: "#FADADD" },
    { key: "饮食", emoji: "🍰", color: "#CDE7F0" },
    { key: "护肤", emoji: "🧴", color: "#FCEFD6" },
    { key: "健康", emoji: "💊", color: "#DDEFD8" },
  ];
  const VIDEO_TAGS = ["拍摄技巧", "剪辑操作", "特效转场", "调色思路"];
  const VIDEO_LIB = [
    { id: "v1", title: "日常vlog拍摄：手机稳定运镜5招", tag: "拍摄技巧", emoji: "📷", color: "#CDE7F0", heat: "12.3w" },
    { id: "v2", title: "手机vlog怎么拍才有电影感", tag: "拍摄技巧", emoji: "🎬", color: "#FADADD", heat: "9.8w" },
    { id: "v3", title: "剪映零基础：vlog粗剪全流程", tag: "剪辑操作", emoji: "✂️", color: "#CDE7F0", heat: "15.1w" },
    { id: "v4", title: "自动踩点卡点剪辑教程", tag: "剪辑操作", emoji: "🎵", color: "#FADADD", heat: "8.4w" },
    { id: "v5", title: "6种高级转场，让视频丝滑", tag: "特效转场", emoji: "🌟", color: "#FCEFD6", heat: "11.2w" },
    { id: "v6", title: "遮罩转场怎么做", tag: "特效转场", emoji: "🔆", color: "#FADADD", heat: "6.7w" },
    { id: "v7", title: "手机调色：小清新滤镜参数", tag: "调色思路", emoji: "🎨", color: "#DDEFD8", heat: "13.5w" },
    { id: "v8", title: "电影感调色思路分享", tag: "调色思路", emoji: "🖼️", color: "#CDE7F0", heat: "7.9w" },
    { id: "v9", title: "vlog字幕排版与花字教程", tag: "剪辑操作", emoji: "🅰️", color: "#FCEFD6", heat: "5.6w" },
    { id: "v10", title: "第一人称vlog拍摄机位", tag: "拍摄技巧", emoji: "🤳", color: "#FADADD", heat: "10.2w" },
    { id: "v11", title: "转场+调色组合案例", tag: "特效转场", emoji: "💫", color: "#DDEFD8", heat: "4.9w" },
    { id: "v12", title: "氛围感vlog调色预设", tag: "调色思路", emoji: "🌈", color: "#FADADD", heat: "9.1w" },
  ];
  const ENGLISH_LIB = [
    { id: "e1", scene: "便利店购物 · 基础", lines: [
        { en: "Can I get a bottle of water, please?", cn: "请给我一瓶水，谢谢。" },
        { en: "Sure, that'll be three yuan.", cn: "好的，三块钱。" }],
      vocab: [{ w: "bottle", m: "瓶子" }, { w: "yuan", m: "元" }] },
    { id: "e2", scene: "咖啡店点餐 · 基础", lines: [
        { en: "I'd like a latte, please.", cn: "我要一杯拿铁，谢谢。" },
        { en: "For here or to go?", cn: "堂食还是外带？" }],
      vocab: [{ w: "latte", m: "拿铁" }, { w: "to go", m: "外带" }] },
    { id: "e3", scene: "公交问路 · 基础", lines: [
        { en: "Which bus goes to the station?", cn: "哪路公交去车站？" },
        { en: "Take the No.5 bus.", cn: "坐5路公交。" }],
      vocab: [{ w: "station", m: "车站" }, { w: "bus", m: "公交" }] },
    { id: "e4", scene: "朋友打招呼 · 基础", lines: [
        { en: "Hi, long time no see!", cn: "嗨，好久不见！" },
        { en: "Yeah, how have you been?", cn: "是啊，你最近好吗？" }],
      vocab: [{ w: "long time no see", m: "好久不见" }, { w: "been", m: "（状态）" }] },
    { id: "e5", scene: "试衣间 · 进阶", lines: [
        { en: "Can I try this on?", cn: "我能试穿这件吗？" },
        { en: "Of course, the fitting room is over there.", cn: "当然，试衣间在那边。" }],
      vocab: [{ w: "try on", m: "试穿" }, { w: "fitting room", m: "试衣间" }] },
    { id: "e6", scene: "餐厅预订 · 进阶", lines: [
        { en: "I'd like to book a table for two at seven.", cn: "我想订一张七点的两人桌。" },
        { en: "Sure, may I have your name?", cn: "好的，请问您贵姓？" }],
      vocab: [{ w: "book a table", m: "订位" }, { w: "reservation", m: "预订" }] },
    { id: "e7", scene: "打车出行 · 进阶", lines: [
        { en: "Please drop me off at the museum.", cn: "请在博物馆让我下车。" },
        { en: "Sure, it'll take about fifteen minutes.", cn: "好的，大概十五分钟。" }],
      vocab: [{ w: "drop off", m: "让…下车" }, { w: "museum", m: "博物馆" }] },
    { id: "e8", scene: "下班邀约 · 进阶", lines: [
        { en: "Would you like to grab a coffee after work?", cn: "下班后喝杯咖啡吗？" },
        { en: "I'd love to!", cn: "我很乐意！" }],
      vocab: [{ w: "grab a coffee", m: "喝杯咖啡" }, { w: "after work", m: "下班后" }] },
    { id: "e9", scene: "商场退货 · 长对话", lines: [
        { en: "I'd like to return this shirt.", cn: "我想退这件衬衫。" },
        { en: "Do you have the receipt?", cn: "请问有收据吗？" },
        { en: "Yes, here you are.", cn: "有，给您。" },
        { en: "No problem, I'll process the refund.", cn: "没问题，我帮您办理退款。" }],
      vocab: [{ w: "return", m: "退货" }, { w: "receipt", m: "收据" }, { w: "refund", m: "退款" }] },
    { id: "e10", scene: "聚会闲聊 · 长对话", lines: [
        { en: "This party is so much fun!", cn: "这个派对太好玩了！" },
        { en: "Totally. How do you know the host?", cn: "是啊，你怎么认识主人的？" },
        { en: "We used to be classmates.", cn: "我们以前是同学。" },
        { en: "Small world!", cn: "世界真小！" }],
      vocab: [{ w: "host", m: "主人" }, { w: "classmate", m: "同学" }, { w: "small world", m: "世界真小" }] },
  ];

  /* ---------------- 默认（含示例）数据 ---------------- */
  function defaultData() {
    return {
      settings: { mode: "daily", lastVisit: todayKey() },
      learning: {
        templates: {
          big: [{ id: uid(), name: "整理文献综述", est: 120, done: false }],
          small: [{ id: uid(), name: "润色引言段落", est: 45, done: false }],
        },
        days: {},
      },
      exercise: {
        templates: [{ id: uid(), name: "晨间慢跑", target: 30, count: 1, done: false }],
        days: {},
      },
      video: { learned: {} },
      english: { days: {}, lastScore: { acc: 80, fl: 80, cmp: 80 } },
      account: { deposits: [], expenses: {} },
      review: { days: {} },
      plans: { items: [] },
    };
  }

  /* ---------------- 存储 ---------------- */
  let data = null;
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        data = JSON.parse(raw);
        data = deepMerge(defaultData(), data);
      } else data = defaultData();
    } catch (e) { data = defaultData(); }
    rolloverCheck();
    save();
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
  }
  function rolloverCheck() {
    const t = todayKey();
    if (data.settings.lastVisit !== t) {
      if (data.settings.mode === "daily") {
        // 新的一天：当日数据已在 days 中按日期归档，无需额外操作
        setTimeout(() => toast("🌿 新的一天，当日任务已重置~"), 600);
      }
      data.settings.lastVisit = t;
    }
  }
  function deepMerge(base, over) {
    if (Array.isArray(base)) return Array.isArray(over) ? over : base;
    if (base && typeof base === "object") {
      const out = {};
      for (const k in base) out[k] = (over && k in over) ? deepMerge(base[k], over[k]) : base[k];
      return out;
    }
    return over === undefined ? base : over;
  }

  /* ---------------- 工具 ---------------- */
  function uid() { return "id" + Math.random().toString(36).slice(2, 9); }
  function $(s, r) { return (r || document).querySelector(s); }
  function ymd(d) {
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  function todayKey(d) { return ymd(d || new Date()); }
  function parseKey(k) { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); }
  function weekdayCn(d) { return "星期" + ["日", "一", "二", "三", "四", "五", "六"][d.getDay()]; }
  function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function daysInMonth(y, m) { return new Date(y, m, 0).getDate(); }
  function monthKeyList(y, m) { const n = daysInMonth(y, m); const a = []; for (let i = 1; i <= n; i++) a.push(`${y}-${String(m).padStart(2, "0")}-${String(i).padStart(2, "0")}`); return a; }
  function weekKeyList(ref) { const a = []; for (let i = 6; i >= 0; i--) a.push(todayKey(addDays(ref || new Date(), -i))); return a; }
  function dateDiff(a, b) { return Math.round((parseKey(b) - parseKey(a)) / 86400000); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function num(v) { const n = parseFloat(v); return isNaN(n) ? 0 : n; }
  function money(n) { return (Math.round(n * 100) / 100).toLocaleString("zh-CN"); }
  function hash(str) { let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h; }

  /* ---------------- 提示 ---------------- */
  let toastTimer = null;
  function toast(msg) {
    let el = $("#toast");
    if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
  }

  /* ---------------- UI 状态 ---------------- */
  const UI = {
    module: "learning",
    videoFilter: "全部",
    learnHist: false, exerHist: false, accCat: "全部", accRange: "month",
    accStart: "", accEnd: "",
    reviewView: null, // 查看历史的日期
  };

  /* 侧边栏折叠 */
  function toggleSidebar() {
    const body = $(".body");
    const collapsed = body.classList.toggle("collapsed");
    try { localStorage.setItem("yezi_sidebar", collapsed ? "1" : "0"); } catch (e) {}
    const tab = $("#collapseTab"); if (tab) tab.setAttribute("aria-label", collapsed ? "展开导航" : "折叠导航");
  }

  /* ---------------- 打卡核心 ---------------- */
  function ensureDay(kind) {
    const t = todayKey();
    if (!data[kind].days[t]) {
      if (kind === "learning") data[kind].days[t] = { big: [], small: [] };
      else data[kind].days[t] = [];
    }
    return data[kind].days[t];
  }
  // 学习任务
  function learnDone(sub, id) {
    if (data.settings.mode === "daily") return (data.learning.days[todayKey()]?.[sub] || []).includes(id);
    return !!data.learning.templates[sub].find(t => t.id === id)?.done;
  }
  function toggleLearn(sub, id) {
    const tpl = data.learning.templates[sub].find(t => t.id === id);
    if (!tpl) return;
    if (data.settings.mode === "daily") {
      const arr = ensureDay("learning")[sub];
      const i = arr.indexOf(id);
      if (i >= 0) arr.splice(i, 1); else arr.push(id);
    } else {
      tpl.done = !tpl.done;
      const arr = ensureDay("learning")[sub];
      const i = arr.indexOf(id);
      if (tpl.done && i < 0) arr.push(id);
      else if (!tpl.done && i >= 0) arr.splice(i, 1);
    }
    save(); render();
  }
  // 运动
  function exerDone(id) {
    if (data.settings.mode === "daily") return (data.exercise.days[todayKey()] || []).includes(id);
    return !!data.exercise.templates.find(t => t.id === id)?.done;
  }
  function toggleExer(id) {
    const tpl = data.exercise.templates.find(t => t.id === id);
    if (!tpl) return;
    if (data.settings.mode === "daily") {
      const arr = ensureDay("exercise"); const i = arr.indexOf(id);
      if (i >= 0) arr.splice(i, 1); else arr.push(id);
    } else {
      tpl.done = !tpl.done;
      const arr = ensureDay("exercise"); const i = arr.indexOf(id);
      if (tpl.done && i < 0) arr.push(id); else if (!tpl.done && i >= 0) arr.splice(i, 1);
    }
    save(); render();
  }

  /* ===================================================================
     渲染入口
     =================================================================== */
  const content = $("#content");
  function render() {
    // 导航高亮
    document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.nav === UI.module));
    // 模式按钮
    document.querySelectorAll(".mode-opt").forEach(b => b.classList.toggle("active", b.dataset.mode === data.settings.mode));
    // 内容（顶部拼接今日提醒横幅）
    const map = { learning: renderLearning, exercise: renderExercise, video: renderVideo, english: renderEnglish, account: renderAccount, review: renderReview, plans: renderPlans };
    const html = (map[UI.module] || renderLearning)();
    content.innerHTML = reminderBanner() + html;
  }

  /* 全局今日提醒横幅：当日有预定计划未完成时展示 */
  function reminderBanner() {
    const t = todayKey();
    const due = (data.plans.items || []).filter(p => p.date === t && !p.done);
    if (!due.length) return "";
    return `<div class="reminder-banner"><span class="bell">🔔</span>今日有 ${due.length} 件预定计划，记得完成哦~</div>`;
  }

  /* ---------- 通用片段 ---------- */
  function checkSvg() { return '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L19 7" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  function ratePill(done, total) { return `<span class="rate-pill">${done}/${total}</span>`; }

  /* ===================================================================
     1. 学习任务
     =================================================================== */
  function renderLearning() {
    const t = todayKey();
    const mode = data.settings.mode;
    return `
      <div class="module-title">📚 学习任务</div>
      <div class="module-sub">大论文写作时长 · 小论文修改进展，今日进度一目了然</div>
      ${learnBoard("big", "大论文写作时长", "dot-pink")}
      ${learnBoard("small", "小论文修改进展", "dot-blue")}
      <button class="link-btn" data-action="hist-learning">${UI.learnHist ? "收起历史 ▲" : "📅 查看历史打卡（周/月）▼"}</button>
      <div class="history-panel ${UI.learnHist ? "open" : ""}">${learnHistory()}</div>
    `;
  }
  function learnBoard(sub, title, dot) {
    const tpls = data.learning.templates[sub];
    const done = tpls.filter(x => learnDone(sub, x.id)).length;
    const month = monthStats("learning", sub);
    const items = tpls.map(x => `
      <div class="item ${learnDone(sub, x.id) ? "done" : ""}">
        <div class="check" data-action="toggle-learning" data-sub="${sub}" data-id="${x.id}">${checkSvg()}</div>
        <div class="body">
          <div class="name">${esc(x.name)}</div>
          <div class="meta">预计 ${x.est || 0} 分钟</div>
        </div>
        <div class="ops">
          <button class="icon-btn" data-action="edit-learning" data-sub="${sub}" data-id="${x.id}">✎</button>
          <button class="icon-btn danger" data-action="del-learning" data-sub="${sub}" data-id="${x.id}">🗑</button>
        </div>
      </div>`).join("");
    return `
      <div class="card">
        <div class="card-h">
          <div class="t"><span class="dot ${dot}"></span>${title}</div>
          ${ratePill(done, tpls.length)}
        </div>
        ${tpls.length ? items : '<div class="empty"><span class="em">🌱</span>还没有任务，下面添加一条吧</div>'}
        <div class="add-form">
          <input class="f-name" id="ln_${sub}" placeholder="任务说明，如：完成第三章初稿" />
          <input class="f-num" id="le_${sub}" type="number" min="0" placeholder="时长(分)" />
          <button class="btn" data-action="add-learning" data-sub="${sub}">+ 添加</button>
        </div>
        <div class="stat-row" style="margin-top:12px">
          <div class="stat-chip"><div class="n">${month.days}</div><div class="l">本月打卡天数</div></div>
          <div class="stat-chip"><div class="n">${month.mins}</div><div class="l">累计投入(分)</div></div>
        </div>
      </div>`;
  }
  function monthStats(kind, sub) {
    const d = new Date(); const y = d.getFullYear(), m = d.getMonth() + 1;
    const keys = monthKeyList(y, m);
    let dayCount = 0, mins = 0;
    keys.forEach(k => {
      if (kind === "learning") {
        const rec = data.learning.days[k];
        if (!rec) return;
        const ids = (rec[sub] || []);
        if (ids.length) {
          dayCount++;
          ids.forEach(id => { const tp = data.learning.templates[sub].find(t => t.id === id); if (tp) mins += tp.est || 0; });
        }
      } else {
        const rec = data.exercise.days[k];
        if (!rec || !rec.length) return;
        dayCount++;
        rec.forEach(id => { const tp = data.exercise.templates.find(t => t.id === id); if (tp) mins += tp.target || 0; });
      }
    });
    if (kind === "learning" && data.settings.mode === "cumulative") {
      const tp = data.learning.templates[sub].filter(t => t.done);
      mins = tp.reduce((s, x) => s + (x.est || 0), 0);
    }
    return { days: dayCount, mins };
  }
  function learnHistory() {
    const scope = "month";
    const d = new Date(); const keys = scope === "month" ? monthKeyList(d.getFullYear(), d.getMonth() + 1) : weekKeyList();
    let html = `<div class="module-sub" style="margin:4px 0 8px">本月各任务打卡情况</div>`;
    ["big", "small"].forEach(sub => {
      data.learning.templates[sub].forEach(tp => {
        let c = 0; keys.forEach(k => { const r = data.learning.days[k]; if (r && (r[sub] || []).includes(tp.id)) c++; });
        const rate = Math.round(c / keys.length * 100);
        html += `<div class="item" style="cursor:default"><div class="body"><div class="name" style="font-size:13px">${esc(tp.name)}</div><div class="meta">本月打卡 ${c} 次 · 完成率 ${rate}%</div></div></div>`;
      });
    });
    // 按日归档列表
    html += `<div class="module-sub" style="margin:14px 0 6px">每日完成归档</div>`;
    const archived = keys.filter(k => { const r = data.learning.days[k]; return r && ((r.big || []).length || (r.small || []).length); }).reverse();
    if (!archived.length) html += '<div class="empty"><span class="em">🗒️</span>暂无历史打卡</div>';
    archived.forEach(k => {
      const r = data.learning.days[k]; const names = [];
      (r.big || []).forEach(id => { const tp = data.learning.templates.big.find(t => t.id === id); if (tp) names.push("📕" + tp.name); });
      (r.small || []).forEach(id => { const tp = data.learning.templates.small.find(t => t.id === id); if (tp) names.push("📘" + tp.name); });
      html += `<div class="history-day">${k}　${weekdayCn(parseKey(k))}</div>` + names.map(n => `<div class="item" style="cursor:default;opacity:.85"><div class="body"><div class="name" style="font-size:13px">${esc(n)}</div></div></div>`).join("");
    });
    return html;
  }

  /* ===================================================================
     2. 运动计划
     =================================================================== */
  function renderExercise() {
    const tpls = data.exercise.templates;
    const done = tpls.filter(x => exerDone(x.id)).length;
    const todayMins = tpls.filter(x => exerDone(x.id)).reduce((s, x) => s + (x.target || 0), 0);
    const month = monthStats("exercise");
    const items = tpls.map(x => `
      <div class="item ${exerDone(x.id) ? "done" : ""}">
        <div class="check" data-action="toggle-exercise" data-id="${x.id}">${checkSvg()}</div>
        <div class="body">
          <div class="name">${esc(x.name)}</div>
          <div class="meta">目标 ${x.target || 0} 分钟 · ${x.count || 1} 组</div>
        </div>
        <div class="ops">
          <button class="icon-btn" data-action="edit-exercise" data-id="${x.id}">✎</button>
          <button class="icon-btn danger" data-action="del-exercise" data-id="${x.id}">🗑</button>
        </div>
      </div>`).join("");
    return `
      <div class="module-title">🏃 运动计划</div>
      <div class="module-sub">每日运动打卡，活力满满一整天</div>
      <div class="card">
        <div class="card-h"><div class="t"><span class="dot dot-blue"></span>今日运动</div>${ratePill(done, tpls.length)}</div>
        ${tpls.length ? items : '<div class="empty"><span class="em">🏋️</span>还没有运动项目</div>'}
        <div class="add-form">
          <input class="f-name" id="ex_name" placeholder="运动项目，如：拉伸/力量训练" />
          <input class="f-num" id="ex_target" type="number" min="0" placeholder="时长(分)" />
          <input class="f-num" id="ex_count" type="number" min="1" placeholder="组数" />
          <button class="btn" data-action="add-exercise">+ 添加项目</button>
        </div>
        <div class="stat-row" style="margin-top:12px">
          <div class="stat-chip"><div class="n">${todayMins}</div><div class="l">今日时长(分)</div></div>
          <div class="stat-chip"><div class="n">${tpls.length ? Math.round(done / tpls.length * 100) : 0}%</div><div class="l">已完成占比</div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div class="t">📊 月度统计</div></div>
        <div class="stat-row">
          <div class="stat-chip"><div class="n">${month.days}</div><div class="l">打卡总次数</div></div>
          <div class="stat-chip"><div class="n">${month.mins}</div><div class="l">累计时长(分)</div></div>
        </div>
        <button class="link-btn" data-action="hist-exercise" style="margin-top:10px">${UI.exerHist ? "收起每日明细 ▲" : "📅 查看每日运动明细▼"}</button>
        <div class="history-panel ${UI.exerHist ? "open" : ""}">${exerHistory()}</div>
      </div>`;
  }
  function exerHistory() {
    const d = new Date(); const keys = monthKeyList(d.getFullYear(), d.getMonth() + 1).reverse();
    const arch = keys.filter(k => data.exercise.days[k] && data.exercise.days[k].length);
    if (!arch.length) return '<div class="empty"><span class="em">🏃</span>本月暂无运动打卡</div>';
    return arch.map(k => {
      const names = data.exercise.days[k].map(id => { const tp = data.exercise.templates.find(t => t.id === id); return tp ? "🏃" + tp.name : ""; }).filter(Boolean);
      return `<div class="history-day">${k}　${weekdayCn(parseKey(k))}</div>` + names.map(n => `<div class="item" style="cursor:default;opacity:.85"><div class="body"><div class="name" style="font-size:13px">${esc(n)}</div></div></div>`).join("");
    }).join("");
  }

  /* ===================================================================
     3. 视频剪辑学习
     =================================================================== */
  function renderVideo() {
    const f = UI.videoFilter;
    const list = VIDEO_LIB.filter(v => f === "全部" || v.tag === f);
    const learnedCount = Object.keys(data.video.learned).length;
    const monthLearned = Object.values(data.video.learned).filter(d => d.slice(0, 7) === todayKey().slice(0, 7)).length;
    const prog = Math.round(learnedCount / VIDEO_LIB.length * 100);
    const cards = list.map(v => {
      const on = !!data.video.learned[v.id];
      return `
      <div class="video-card">
        <div class="thumb" style="background:${v.color}">${v.emoji}<span class="play">▶</span></div>
        <div class="v-body">
          <div class="v-title">${esc(v.title)}</div>
          <div class="v-tag">#${v.tag}</div>
          <div class="v-foot">
            <span class="heat">🔥 ${v.heat}</span>
            <button class="learn-badge ${on ? "on" : ""}" data-action="toggle-video" data-id="${v.id}">${on ? "已学习" : "标记学习"}</button>
          </div>
        </div>
      </div>`;
    }).join("");
    return `
      <div class="module-title">🎬 视频剪辑学习</div>
      <div class="module-sub">抖音高赞爆款剪辑教程 · 按热度更新</div>
      <div class="card">
        <div class="card-h"><div class="t">本月学习进度</div><span class="rate-pill">${monthLearned} 条</span></div>
        <div class="progress"><i style="width:${prog}%"></i></div>
        <div class="module-sub" style="margin:2px 0 0">累计已学 ${learnedCount}/${VIDEO_LIB.length} · 本月 ${monthLearned} 条</div>
      </div>
      <div class="tags">
        <span class="tag ${f === "全部" ? "active" : ""}" data-action="video-tag" data-tag="全部">全部</span>
        ${VIDEO_TAGS.map(t => `<span class="tag ${f === t ? "active" : ""}" data-action="video-tag" data-tag="${t}">${t}</span>`).join("")}
      </div>
      ${cards || '<div class="empty"><span class="em">🔍</span>该分类暂无内容</div>'}
    `;
  }

  /* ===================================================================
     4. 英语口语训练
     =================================================================== */
  function renderEnglish() {
    const t = todayKey();
    const lib = ENGLISH_LIB[hash(t) % ENGLISH_LIB.length];
    const rec = data.english.days[t] || {};
    const done = !!rec.done;
    const lines = lib.lines.map((l, i) => `
      <div class="line">
        <div class="line-txt"><div class="en">${esc(l.en)}</div><div class="cn">${esc(l.cn)}</div></div>
        <button class="line-play" data-action="speak-en" data-i="${i}" aria-label="播放发音">🔊</button>
      </div>`).join("");
    const vocab = lib.vocab.map(v => `<div><b>${esc(v.w)}</b> — ${esc(v.m)}</div>`).join("");
    const targetStr = lib.lines.map(l => l.en).join(" ");

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const support = !!SR;
    const recBar = support
      ? `<div class="rec-bar"><button class="rec-btn" id="recBtn" data-action="rec-en"><span class="rec-dot"></span><span id="recLabel">🎤 开始朗读跟读</span></button></div>`
      : `<div class="rec-bar"><button class="rec-btn" disabled>🎤 当前浏览器不支持语音识别</button></div>`;
    const unsupported = support ? "" : `<div class="rec-unsupported">💡 你的浏览器暂不支持语音录入。安卓 Chrome 可正常使用；iPhone 的 Safari 暂不支持网页语音识别，可手动在下方调整评分后打卡。</div>`;

    const result = rec.you ? `
      <div class="rec-result">
        <div class="rr-h"><span>你的跟读</span><span class="rate-pill">${Math.round((rec.acc + rec.fl + rec.cmp) / 3)} 分</span></div>
        <div class="rr-you">${diffUser(rec.you, targetStr)}</div>
        <div class="rr-target">标准：${diffWords(targetStr, rec.you)}</div>
      </div>` : "";

    // 月度统计
    const d = new Date(); const keys = monthKeyList(d.getFullYear(), d.getMonth() + 1);
    let dayCount = 0; const scores = [];
    keys.forEach(k => { const r = data.english.days[k]; if (r && r.done) { dayCount++; if (r.acc != null) scores.push(Math.round((r.acc + r.fl + r.cmp) / 3)); } });
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    return `
      <div class="module-title">💬 英语口语训练</div>
      <div class="module-sub">每日生活化场景对话 · 点喇叭听标准发音，再点麦克风跟读</div>
      <div class="card">
        <div class="dialogue">
          <div class="scene">📍 ${esc(lib.scene)} · ${t} <span style="float:right;cursor:pointer" class="link-btn" data-action="speak-all">🔊 播放全部</span></div>
          ${lines}
          <div class="vocab"><b>重点词汇 / 句式</b><br>${vocab}</div>
        </div>
        ${recBar}
        ${unsupported}
        ${result}
        <div class="scores">
          ${["acc", "fl", "cmp"].map((k, i) => {
            const labs = ["发音准确度", "流利度", "完整度"];
            const val = rec[k] != null ? rec[k] : (data.english.lastScore[k] != null ? data.english.lastScore[k] : 80);
            return `<div class="score-box"><div class="sl">${labs[i]}</div><input type="number" min="0" max="100" id="sc_${k}" value="${val}"><div class="sl">分</div></div>`;
          }).join("")}
        </div>
        <button class="btn block" data-action="save-english">${done ? "✓ 已打卡（可重新跟读或调整评分）" : "完成跟读并打卡"}</button>
        <div class="rec-hint">提示：跟读得分由语音识别自动计算，可手动微调。</div>
      </div>
      <div class="card">
        <div class="card-h"><div class="t">📈 本月口语统计</div></div>
        <div class="stat-row">
          <div class="stat-chip"><div class="n">${dayCount}</div><div class="l">打卡天数</div></div>
          <div class="stat-chip"><div class="n">${avg}</div><div class="l">平均得分</div></div>
        </div>
        ${scores.length ? `<div class="module-sub" style="margin:12px 0 4px">评分趋势</div><div class="progress"><i style="width:${avg}%"></i></div>` : '<div class="empty" style="padding:14px"><span class="em">📉</span>打卡后显示趋势</div>'}
      </div>`;
  }

  /* 英语发音播放 / 录音识别 / 评分 */
  function speakText(text) {
    try {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 0.95; u.pitch = 1;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }
  function speakAll(lines) {
    if (!window.speechSynthesis) { toast("当前浏览器不支持语音播放"); return; }
    window.speechSynthesis.cancel();
    let i = 0;
    const next = () => {
      if (i >= lines.length) return;
      const u = new SpeechSynthesisUtterance(lines[i].en);
      u.lang = "en-US"; u.rate = 0.95; u.pitch = 1;
      u.onend = () => { i++; setTimeout(next, 350); };
      window.speechSynthesis.speak(u);
    };
    next();
  }
  function cleanWord(w) { return w.toLowerCase().replace(/[^a-z']/g, ""); }
  function scoreReading(target, user, confs) {
    const tw = target.toLowerCase().split(/\s+/).filter(Boolean).map(cleanWord);
    const uw = user.toLowerCase().split(/\s+/).filter(Boolean).map(cleanWord);
    const uwSet = new Set(uw);
    const matched = tw.filter(w => uwSet.has(w)).length;
    const cmp = tw.length ? Math.round(matched / tw.length * 100) : 0;
    const acc = uw.length ? Math.round(matched / uw.length * 100) : 0;
    const avgConf = (confs && confs.length) ? confs.reduce((a, b) => a + b, 0) / confs.length : (acc / 100);
    const fl = Math.round(Math.max(0, Math.min(1, avgConf)) * 100);
    return { acc, fl, cmp };
  }
  function diffWords(target, user) {
    const tw = target.toLowerCase().split(/\s+/).filter(Boolean);
    const uwSet = new Set(user.toLowerCase().split(/\s+/).filter(Boolean).map(cleanWord));
    return tw.map(w => {
      const c = cleanWord(w);
      return uwSet.has(c) ? `<span class="ok">${esc(w)}</span>` : `<span class="miss">${esc(w)}</span>`;
    }).join(" ");
  }
  function diffUser(user, target) {
    const twSet = new Set(target.toLowerCase().split(/\s+/).filter(Boolean).map(cleanWord));
    const arr = user.toLowerCase().split(/\s+/).filter(Boolean);
    if (!arr.length) return '<span class="extra">（未识别到内容）</span>';
    return arr.map(w => {
      const c = cleanWord(w);
      return twSet.has(c) ? `<span class="ok">${esc(w)}</span>` : `<span class="extra">${esc(w)}</span>`;
    }).join(" ");
  }
  function startEnglishRecord() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast("当前浏览器不支持语音识别"); return; }
    const t = todayKey();
    const lib = ENGLISH_LIB[hash(t) % ENGLISH_LIB.length];
    const target = lib.lines.map(l => l.en).join(" ");
    let recog;
    try { recog = new SR(); } catch (e) { toast("无法启动语音识别"); return; }
    recog.lang = "en-US"; recog.interimResults = true; recog.continuous = false; recog.maxAlternatives = 1;
    let finalTranscript = "", confs = [];
    const btn = $("#recBtn"), label = $("#recLabel");
    if (btn) { btn.classList.add("recording"); btn.disabled = true; }
    if (label) label.textContent = "🎙️ 正在聆听…请朗读";
    recog.onresult = (ev) => {
      let interim = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const r = ev.results[i][0];
        if (r.confidence) confs.push(r.confidence);
        if (ev.results[i].isFinal) finalTranscript += r.transcript; else interim += r.transcript;
      }
      if (label) {
        const shown = (finalTranscript || interim).trim();
        label.textContent = shown ? "“" + shown.slice(0, 24) + (shown.length > 24 ? "…" : "") + "”" : "🎙️ 正在聆听…请朗读";
      }
    };
    recog.onerror = (ev) => { toast("语音识别：" + (ev.error || "出错")); };
    recog.onend = () => {
      if (btn) { btn.classList.remove("recording"); btn.disabled = false; }
      if (label) label.textContent = "🎤 开始朗读跟读";
      const you = finalTranscript.trim();
      if (!you) { toast("没听清，再试一次~"); render(); return; }
      const sc = scoreReading(target, you, confs);
      data.english.lastScore = { acc: sc.acc, fl: sc.fl, cmp: sc.cmp };
      data.english.days[t] = { acc: sc.acc, fl: sc.fl, cmp: sc.cmp, you, done: true };
      save(); render(); toast("💬 跟读完成，看看得分~");
    };
    try { recog.start(); }
    catch (e) {
      toast("无法启动，请检查麦克风权限");
      if (btn) { btn.classList.remove("recording"); btn.disabled = false; }
      if (label) label.textContent = "🎤 开始朗读跟读";
    }
  }

  /* ===================================================================
     5. 我的账户
     =================================================================== */
  function renderAccount() {
    // 存款
    const depTotal = data.account.deposits.reduce((s, x) => s + num(x.amount), 0);
    const depList = [...data.account.deposits].reverse().slice(0, 6).map(x => `
      <div class="item" style="cursor:default">
        <div class="body"><div class="name">+${money(x.amount)} 元</div><div class="meta">${x.date}${x.note ? " · " + esc(x.note) : ""}</div></div>
        <div class="ops"><button class="icon-btn danger" data-action="del-deposit" data-id="${x.id}">🗑</button></div>
      </div>`).join("");
    // 当日开支
    const td = todayKey();
    const tdExp = data.account.expenses[td] || [];
    const tdTotal = tdExp.reduce((s, x) => s + num(x.amount), 0);
    // 汇总范围
    const range = UI.accRange;
    let start, end;
    if (range === "week") { start = weekKeyList()[0]; end = todayKey(); }
    else if (range === "month") { const d = new Date(); start = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`; end = todayKey(); }
    else { start = UI.accStart || weekKeyList()[0]; end = UI.accEnd || todayKey(); }
    const inRange = (k) => k >= start && k <= end;
    const allExp = [];
    Object.keys(data.account.expenses).filter(inRange).forEach(k => data.account.expenses[k].forEach(e => allExp.push({ ...e, date: k })));
    const sumTotal = allExp.reduce((s, x) => s + num(x.amount), 0);
    const catSum = {}; EXPENSE_CATS.forEach(c => catSum[c.key] = 0);
    allExp.forEach(e => { catSum[e.cat] = (catSum[e.cat] || 0) + num(e.amount); });
    const segs = [["week", "本周"], ["month", "本月"], ["custom", "自定义"]];
    // 明细（按分类筛选）
    const filt = UI.accCat === "全部" ? allExp : allExp.filter(e => e.cat === UI.accCat);
    const detail = [...filt].sort((a, b) => b.date.localeCompare(a.date)).map(e => `
      <div class="item" style="cursor:default">
        <div class="body"><div class="name">${money(e.amount)} 元 · ${esc(e.cat)}</div><div class="meta">${e.date}${e.note ? " · " + esc(e.note) : ""}</div></div>
      </div>`).join("");
    // 甜甜圈
    let acc = 0; const segs2 = EXPENSE_CATS.map(c => { const v = catSum[c.key] || 0; const part = sumTotal ? v / sumTotal : 0; const startA = acc * 360; acc += part; const endA = acc * 360; return `${c.color} ${startA}deg ${endA}deg`; }).join(", ");
    const donut = sumTotal ? `<div class="donut" style="background:conic-gradient(${segs2})"></div>` : '<div class="donut" style="background:#ECE6DE"></div>';
    const legend = EXPENSE_CATS.map(c => `<div class="lg"><span class="sw" style="background:${c.color}"></span>${c.emoji} ${c.key}<span class="lv">${money(catSum[c.key] || 0)}</span></div>`).join("");

    return `
      <div class="module-title">👛 我的账户</div>
      <div class="module-sub">存款与开支，本地留存更安心</div>

      <div class="card">
        <div class="card-h"><div class="t"><span class="dot dot-pink"></span>存款记录</div></div>
        <div class="amount-big">¥ <small>${money(depTotal)}</small></div>
        <div class="module-sub" style="margin:2px 0 10px">累计存款总额</div>
        <div class="add-form">
          <input class="f-num" id="dep_amt" type="number" min="0" placeholder="金额" style="flex:1 1 40%" />
          <input class="f-name" id="dep_note" placeholder="备注（可选）" style="flex:1 1 50%" />
          <button class="btn" data-action="add-deposit">+ 存入</button>
        </div>
        <div style="margin-top:10px">${depList || '<div class="empty" style="padding:14px"><span class="em">💰</span>暂无存款记录</div>'}</div>
      </div>

      <div class="card">
        <div class="card-h"><div class="t"><span class="dot dot-blue"></span>记一笔开支</div></div>
        <div class="add-form">
          <input class="f-num" id="exp_amt" type="number" min="0" placeholder="金额" style="flex:1 1 40%" />
          <input class="f-name" id="exp_note" placeholder="备注（可选）" style="flex:1 1 50%" />
        </div>
        <div class="cat-pick" style="margin:10px 0">
          ${EXPENSE_CATS.map((c, i) => `<div class="cat c${i + 1} ${(window._expCat || "服饰") === c.key ? "active" : ""}" data-action="pick-cat" data-cat="${c.key}">${c.emoji}<br>${c.key}</div>`).join("")}
        </div>
        <button class="btn block" data-action="add-expense">+ 添加开支</button>
      </div>

      <div class="card">
        <div class="card-h"><div class="t">📅 今日开支</div></div>
        <div class="amount-big">¥ <small>${money(tdTotal)}</small></div>
        <div class="cat-pick" style="margin-top:10px">
          ${EXPENSE_CATS.map(c => `<div class="cat c${EXPENSE_CATS.indexOf(c) + 1}" style="cursor:default"><div style="font-size:11px">${c.key}</div><b>${money(catSumDay(c.key))}</b></div>`).join("")}
        </div>
      </div>

      <div class="card">
        <div class="card-h"><div class="t">📊 汇总分析</div></div>
        <div class="seg">
          ${segs.map(s => `<button class="${range === s[0] ? "active" : ""}" data-action="acc-range" data-range="${s[0]}">${s[1]}</button>`).join("")}
        </div>
        ${range === "custom" ? `<div class="add-form" style="margin-bottom:8px">
          <input class="f-num" id="acc_start" type="date" value="${UI.accStart || weekKeyList()[0]}" style="flex:1 1 45%" />
          <input class="f-num" id="acc_end" type="date" value="${UI.accEnd || todayKey()}" style="flex:1 1 45%" />
        </div>` : ""}
        <div class="amount-big">¥ <small>${money(sumTotal)}</small></div>
        <div class="module-sub" style="margin:2px 0 8px">${start} ~ ${end} 累计开支</div>
        <div class="donut-wrap">${donut}<div class="legend">${legend}</div></div>
        <div class="module-sub" style="margin:14px 0 6px">明细（按分类筛选）</div>
        <div class="seg" style="margin-bottom:8px">
          <button class="${UI.accCat === "全部" ? "active" : ""}" data-action="acc-cat" data-cat="全部">全部</button>
          ${EXPENSE_CATS.map(c => `<button class="${UI.accCat === c.key ? "active" : ""}" data-action="acc-cat" data-cat="${c.key}">${c.key}</button>`).join("")}
        </div>
        ${detail || '<div class="empty" style="padding:14px"><span class="em">🧾</span>该范围暂无开支</div>'}
      </div>`;
  }
  function catSumDay(cat) {
    const td = todayKey(); const arr = data.account.expenses[td] || [];
    return arr.filter(e => e.cat === cat).reduce((s, e) => s + num(e.amount), 0);
  }

  /* ===================================================================
     6. 每日复盘
     =================================================================== */
  function renderReview() {
    const t = todayKey();
    // 查看历史
    if (UI.reviewView) return renderReviewHistory(UI.reviewView);
    const day = data.review.days[t] || { emotions: [], emotionNote: "", summary: "", tomorrow: "" };
    // 同步四模块完成情况
    const sync = [
      { name: "学习任务", ok: syncLearning(), icon: "📚" },
      { name: "运动计划", ok: syncExercise(), icon: "🏃" },
      { name: "口语训练", ok: !!data.english.days[t]?.done, icon: "💬" },
      { name: "剪辑学习", ok: syncVideo(), icon: "🎬" },
      { name: "预定计划", ok: syncPlans(), icon: "📅" },
    ];
    const moods = [
      { k: "开心", e: "😊" }, { k: "平静", e: "😌" }, { k: "疲惫", e: "😪" }, { k: "焦虑", e: "😰" }, { k: "满足", e: "😍" }, { k: "emo", e: "😢" },
    ];
    const syncHtml = sync.map(s => `
      <div class="item" style="cursor:default">
        <div class="check" style="border-color:${s.ok ? "transparent" : "var(--gray-line)"};background:${s.ok ? "var(--pink)" : "#fff"}">${s.ok ? checkSvg() : ""}</div>
        <div class="body"><div class="name">${s.icon} ${s.name}</div></div>
        <div class="ops"><span class="rate-pill" style="background:${s.ok ? "var(--pink)" : "#ECE6DE"};color:${s.ok ? "#7a5c52" : "#9A8678"}">${s.ok ? "已完成" : "未完成"}</span></div>
      </div>`).join("");
    const moodHtml = moods.map(m => `<div class="mood ${day.emotions.includes(m.k) ? "active" : ""}" data-action="mood" data-mood="${m.k}"><span class="em">${m.e}</span>${m.k}</div>`).join("");
    return `
      <div class="module-title">📝 每日复盘</div>
      <div class="module-sub">${t} · ${weekdayCn(new Date())} 的小结</div>

      <div class="card">
        <div class="card-h"><div class="t">💗 情绪洞察</div></div>
        <div class="mood-row">${moodHtml}</div>
        <textarea class="note" id="rv_emotion" placeholder="今天为什么是这样的心情？记录一下吧~">${esc(day.emotionNote)}</textarea>
      </div>

      <div class="card">
        <div class="card-h"><div class="t">✅ 任务完成度复盘</div></div>
        <div class="sync-list">${syncHtml}</div>
      </div>

      <div class="card">
        <div class="card-h"><div class="t">📝 总结与明日待办</div></div>
        <div class="module-sub" style="margin:0 0 6px">今日总结</div>
        <textarea class="note" id="rv_summary" placeholder="今天有什么收获或遗憾？">${esc(day.summary)}</textarea>
        <div class="module-sub" style="margin:12px 0 6px">明日待办提醒</div>
        <textarea class="note" id="rv_tomorrow" placeholder="明天想完成的小目标~">${esc(day.tomorrow)}</textarea>
        <button class="btn block" data-action="save-review" style="margin-top:12px">💾 保存今日复盘</button>
      </div>

      <button class="link-btn" data-action="hist-review">📚 翻阅历史复盘记录▼</button>
    `;
  }
  function syncLearning() {
    const big = data.learning.templates.big.some(x => learnDone("big", x.id));
    const small = data.learning.templates.small.some(x => learnDone("small", x.id));
    const hasTpl = data.learning.templates.big.length || data.learning.templates.small.length;
    return hasTpl ? (big || small) : false;
  }
  function syncExercise() { return data.exercise.templates.some(x => exerDone(x.id)); }
  function syncVideo() { return Object.keys(data.video.learned).length > 0; }
  function renderReviewHistory(date) {
    const r = data.review.days[date];
    if (!r) return `<div class="module-title">📝 复盘详情</div><div class="empty"><span class="em">📭</span>${date} 暂无复盘记录<br><button class="link-btn" data-action="back-review">← 返回</button></div>`;
    const moods = (r.emotions || []).map(m => { const map = { "开心": "😊", "平静": "😌", "疲惫": "😪", "焦虑": "😰", "满足": "😍", "emo": "😢" }; return `<span style="font-size:20px">${map[m] || "🙂"}</span>`; }).join(" ");
    return `
      <div class="module-title">📝 复盘详情</div>
      <div class="module-sub">${date} · ${weekdayCn(parseKey(date))}</div>
      <div class="card">
        <div class="card-h"><div class="t">💗 情绪</div></div>
        <div style="font-size:22px;margin-bottom:6px">${moods || "—"}</div>
        <div class="module-sub" style="margin:0">${esc(r.emotionNote) || "（无备注）"}</div>
      </div>
      <div class="card">
        <div class="card-h"><div class="t">📝 今日总结</div></div>
        <div class="module-sub" style="margin:0;white-space:pre-wrap">${esc(r.summary) || "（无）"}</div>
      </div>
      <div class="card">
        <div class="card-h"><div class="t">⏰ 明日待办</div></div>
        <div class="module-sub" style="margin:0;white-space:pre-wrap">${esc(r.tomorrow) || "（无）"}</div>
      </div>
      <button class="link-btn" data-action="back-review">← 返回今日复盘</button>
    `;
  }

  /* ===================================================================
     7. 预定计划（提前预约未来某天，当天自动提醒）
     =================================================================== */
  function renderPlans() {
    const t = todayKey();
    const items = data.plans.items.slice().sort((a, b) => a.date.localeCompare(b.date));
    const list = items.map(p => {
      const isToday = p.date === t;
      const diff = dateDiff(t, p.date);
      const badge = isToday ? "今天" : (diff > 0 ? "还有 " + diff + " 天" : "已过期");
      const bColor = isToday ? "var(--pink)" : "#ECE6DE";
      const bInk = isToday ? "#7a5c52" : "#9A8678";
      return `
      <div class="item ${p.done ? "done" : ""}">
        <div class="check" data-action="toggle-plan" data-id="${p.id}">${checkSvg()}</div>
        <div class="body">
          <div class="name">${esc(p.title)}</div>
          <div class="meta">📅 ${p.date}　${weekdayCn(parseKey(p.date))}${p.note ? " · " + esc(p.note) : ""}</div>
        </div>
        <div class="ops">
          <span class="rate-pill" style="background:${bColor};color:${bInk}">${badge}</span>
          <button class="icon-btn danger" data-action="del-plan" data-id="${p.id}">🗑</button>
        </div>
      </div>`;
    }).join("");
    return `
      <div class="module-title">📅 预定计划</div>
      <div class="module-sub">提前预约未来安排，到当天会自动提醒并展示</div>
      <div class="card">
        <div class="card-h"><div class="t"><span class="dot dot-pink"></span>添加预定</div></div>
        <div class="add-form">
          <input class="f-name" id="pl_title" placeholder="计划内容，如：和朋友看展" />
          <input class="f-sel" id="pl_date" type="date" value="${t}" />
          <input class="f-name" id="pl_note" placeholder="备注（可选）" />
          <button class="btn" data-action="add-plan">+ 预定</button>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div class="t">📋 全部预定（按日期）</div></div>
        ${items.length ? list : '<div class="empty"><span class="em">🗓️</span>还没有预定，先添加一个吧</div>'}
      </div>`;
  }
  function syncPlans() {
    const t = todayKey();
    const today = data.plans.items.filter(p => p.date === t);
    return today.length === 0 || today.every(p => p.done);
  }

  /* ===================================================================
     事件处理（委托）
     =================================================================== */
  document.addEventListener("click", (e) => {
    if (e.target.closest("#collapseTab")) { toggleSidebar(); return; }
    const nav = e.target.closest(".nav-item");
    if (nav) { UI.module = nav.dataset.nav; UI.reviewView = null; render(); return; }
    const mode = e.target.closest(".mode-opt");
    if (mode) { data.settings.mode = mode.dataset.mode; save(); render(); toast(mode.dataset.mode === "daily" ? "已切换：每日重置" : "已切换：累计记录"); return; }
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const a = el.dataset.action;
    try { handleAction(a, el); } catch (err) { console.error(err); }
  });

  function handleAction(a, el) {
    switch (a) {
      /* 学习任务 */
      case "add-learning": {
        const sub = el.dataset.sub; const name = $("#ln_" + sub).value.trim();
        const est = num($("#le_" + sub).value);
        if (!name) { toast("先写点任务说明吧~"); return; }
        data.learning.templates[sub].push({ id: uid(), name, est, done: false });
        save(); render(); break;
      }
      case "toggle-learning": toggleLearn(el.dataset.sub, el.dataset.id); break;
      case "del-learning": {
        const sub = el.dataset.sub; const id = el.dataset.id;
        data.learning.templates[sub] = data.learning.templates[sub].filter(t => t.id !== id);
        // 清理历史
        Object.values(data.learning.days).forEach(r => { if (r[sub]) r[sub] = r[sub].filter(x => x !== id); });
        save(); render(); break;
      }
      case "edit-learning": {
        const sub = el.dataset.sub; const id = el.dataset.id;
        const tp = data.learning.templates[sub].find(t => t.id === id); if (!tp) return;
        const name = prompt("修改任务说明", tp.name); if (name === null) return;
        const est = prompt("修改预计时长(分钟)", tp.est); if (est === null) return;
        tp.name = name.trim() || tp.name; tp.est = num(est); save(); render(); break;
      }
      case "hist-learning": UI.learnHist = !UI.learnHist; render(); break;

      /* 运动 */
      case "add-exercise": {
        const name = $("#ex_name").value.trim(); const target = num($("#ex_target").value); const count = Math.max(1, num($("#ex_count").value) || 1);
        if (!name) { toast("先填运动项目~"); return; }
        data.exercise.templates.push({ id: uid(), name, target, count, done: false }); save(); render(); break;
      }
      case "toggle-exercise": toggleExer(el.dataset.id); break;
      case "del-exercise": {
        const id = el.dataset.id; data.exercise.templates = data.exercise.templates.filter(t => t.id !== id);
        Object.keys(data.exercise.days).forEach(k => { data.exercise.days[k] = (data.exercise.days[k] || []).filter(x => x !== id); }); save(); render(); break;
      }
      case "edit-exercise": {
        const id = el.dataset.id; const tp = data.exercise.templates.find(t => t.id === id); if (!tp) return;
        const name = prompt("修改运动项目", tp.name); if (name === null) return;
        const target = prompt("修改目标时长(分钟)", tp.target); if (target === null) return;
        const count = prompt("修改组数", tp.count); if (count === null) return;
        tp.name = name.trim() || tp.name; tp.target = num(target); tp.count = Math.max(1, num(count) || 1); save(); render(); break;
      }
      case "hist-exercise": UI.exerHist = !UI.exerHist; render(); break;

      /* 视频 */
      case "video-tag": UI.videoFilter = el.dataset.tag; render(); break;
      case "toggle-video": {
        const id = el.dataset.id; const t = todayKey();
        if (data.video.learned[id]) delete data.video.learned[id];
        else data.video.learned[id] = t;
        save(); render(); break;
      }

      /* 英语 */
      case "speak-en": {
        const lib = ENGLISH_LIB[hash(todayKey()) % ENGLISH_LIB.length];
        const line = lib.lines[+el.dataset.i];
        el.classList.add("speaking");
        setTimeout(() => el.classList.remove("speaking"), 1300);
        speakText(line.en); break;
      }
      case "speak-all": {
        const lib = ENGLISH_LIB[hash(todayKey()) % ENGLISH_LIB.length];
        speakAll(lib.lines); break;
      }
      case "rec-en": startEnglishRecord(); break;
      case "save-english": {
        const t = todayKey(); const acc = num($("#sc_acc").value), fl = num($("#sc_fl").value), cmp = num($("#sc_cmp").value);
        data.english.lastScore = { acc, fl, cmp };
        data.english.days[t] = { acc, fl, cmp, done: true };
        save(); render(); toast("💬 今日口语已打卡！"); break;
      }

      /* 账户 - 存款 */
      case "add-deposit": {
        const amt = num($("#dep_amt").value); if (!amt) { toast("请输入金额~"); return; }
        const note = $("#dep_note").value.trim();
        data.account.deposits.push({ id: uid(), amount: amt, date: todayKey(), note }); save(); render(); break;
      }
      case "del-deposit": data.account.deposits = data.account.deposits.filter(x => x.id !== el.dataset.id); save(); render(); break;

      /* 账户 - 开支 */
      case "pick-cat": {
        const cat = el.dataset.cat;
        if (!window._expCat || window._expCat !== cat) window._expCat = cat; else window._expCat = cat;
        // 仅高亮，提交时读取
        document.querySelectorAll(".cat[data-action='pick-cat']").forEach(c => c.classList.toggle("active", c.dataset.cat === cat));
        break;
      }
      case "add-expense": {
        const amt = num($("#exp_amt").value); if (!amt) { toast("请输入金额~"); return; }
        const note = $("#exp_note").value.trim();
        const cat = window._expCat || EXPENSE_CATS[0].key;
        const t = todayKey();
        if (!data.account.expenses[t]) data.account.expenses[t] = [];
        data.account.expenses[t].push({ id: uid(), cat, amount: amt, note });
        window._expCat = null; save(); render(); break;
      }
      case "acc-range": UI.accRange = el.dataset.range; render(); break;
      case "acc-cat": UI.accCat = el.dataset.cat; render(); break;

      /* 复盘 */
      case "mood": {
        const t = todayKey(); const m = el.dataset.mood;
        if (!data.review.days[t]) data.review.days[t] = { emotions: [], emotionNote: "", summary: "", tomorrow: "" };
        const arr = data.review.days[t].emotions; const i = arr.indexOf(m);
        if (i >= 0) arr.splice(i, 1); else arr.push(m); save(); render(); break;
      }
      case "save-review": {
        const t = todayKey();
        if (!data.review.days[t]) data.review.days[t] = { emotions: [], emotionNote: "", summary: "", tomorrow: "" };
        const r = data.review.days[t];
        r.emotionNote = $("#rv_emotion").value; r.summary = $("#rv_summary").value; r.tomorrow = $("#rv_tomorrow").value;
        save(); toast("💾 今日复盘已保存~"); break;
      }
      case "hist-review": UI.reviewView = "__list"; renderReviewList(); break;
      case "back-review": UI.reviewView = null; render(); break;

      /* 预定计划 */
      case "add-plan": {
        const title = $("#pl_title").value.trim();
        const date = $("#pl_date").value;
        const note = $("#pl_note").value.trim();
        if (!title || !date) { toast("请填写内容并选择日期~"); return; }
        data.plans.items.push({ id: uid(), title, date, note, done: false });
        save(); render();
        toast(date === todayKey() ? "🔔 已加入今日提醒" : "📅 已预定 " + date + " 的计划"); break;
      }
      case "toggle-plan": {
        const p = data.plans.items.find(x => x.id === el.dataset.id); if (!p) return;
        p.done = !p.done; save(); render(); break;
      }
      case "del-plan": data.plans.items = data.plans.items.filter(x => x.id !== el.dataset.id); save(); render(); break;
      case "edit-plan": {
        const p = data.plans.items.find(x => x.id === el.dataset.id); if (!p) return;
        const title = prompt("修改计划内容", p.title); if (title === null) return;
        const date = prompt("修改日期 (YYYY-MM-DD)", p.date); if (date === null) return;
        const note = prompt("修改备注", p.note || ""); if (note === null) return;
        p.title = title.trim() || p.title; p.date = date.trim() || p.date; p.note = note; save(); render(); break;
      }
    }
  }

  function renderReviewList() {
    const dates = Object.keys(data.review.days).sort((a, b) => b.localeCompare(a));
    if (!dates.length) return `<div class="module-title">📝 历史复盘</div><div class="empty"><span class="em">📭</span>还没有历史复盘<br><button class="link-btn" data-action="back-review">← 返回</button></div>`;
    const items = dates.map(d => { const r = data.review.days[d]; const moods = (r.emotions || []).map(m => { const map = { "开心": "😊", "平静": "😌", "疲惫": "😪", "焦虑": "😰", "满足": "😍", "emo": "😢" }; return map[m] || "🙂"; }).join(""); return `<div class="item" data-action="open-review" data-date="${d}" style="cursor:pointer"><div class="body"><div class="name">${d}　${weekdayCn(parseKey(d))}</div><div class="meta">${moods || "未记录情绪"}</div></div><div class="ops">›</div></div>`; }).join("");
    return `<div class="module-title">📝 历史复盘</div><div class="module-sub">按日期归档，点击查看</div>${items}<button class="link-btn" data-action="back-review" style="margin-top:8px">← 返回今日复盘</button>`;
  }

  // 处理历史列表中的打开
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-action='open-review']");
    if (open) { UI.reviewView = open.dataset.date; render(); }
  });
  // 自定义日期范围变更
  document.addEventListener("change", (e) => {
    if (e.target.id === "acc_start") { UI.accStart = e.target.value; render(); }
    if (e.target.id === "acc_end") { UI.accEnd = e.target.value; render(); }
  });

  /* ===================================================================
     顶部时钟
     =================================================================== */
  function tick() {
    const d = new Date();
    $("#clockDate").textContent = ymd(d).replace(/-/g, "/");
    $("#clockWeek").textContent = weekdayCn(d);
    $("#clockTime").textContent = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }

  /* ===================================================================
     启动
     =================================================================== */
  load();
  tick(); setInterval(tick, 1000);
  // 恢复侧边栏折叠状态
  try { if (localStorage.getItem("yezi_sidebar") === "1") $(".body").classList.add("collapsed"); } catch (e) {}
  render();
  // 当日有预定计划未完成 -> 自动提醒
  const dueNow = (data.plans.items || []).filter(p => p.date === todayKey() && !p.done);
  if (dueNow.length) setTimeout(() => toast("🔔 今天有 " + dueNow.length + " 件预定计划，记得完成哦~"), 700);

  // 暴露给调试
  window.__yezi = { data, save, render };
})();
