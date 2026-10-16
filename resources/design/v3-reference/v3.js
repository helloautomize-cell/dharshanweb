const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* nav: shrink + sliding indicator */
const nav = $("#nav"),
  ind = $("#ind"),
  links = $("#links");
links.querySelectorAll(":scope>a").forEach((a) =>
  a.addEventListener("mouseenter", () => {
    ind.style.left = a.offsetLeft + "px";
    ind.style.width = a.offsetWidth + "px";
    ind.style.opacity = 1;
  }),
);
links.addEventListener("mouseleave", () => (ind.style.opacity = 0));

/* marquee */
const MQ = [
  "Stroke",
  "Back pain",
  "Knee osteoarthritis",
  "Spinal cord injury",
  "Sciatica",
  "Frozen shoulder",
  "Neck pain",
  "Parkinson's disease",
  "Sports injuries",
  "Cerebral palsy",
  "Head injury",
  "Osteoporosis",
];
$("#mqt").innerHTML = MQ.concat(MQ)
  .map((x) => `<span>${x}</span>`)
  .join("");

/* goniometer */
(function () {
  const g = $("#gticks");
  let t = "";
  for (let d = 0; d <= 180; d += 15) {
    const r = (d * Math.PI) / 180,
      x1 = 90 - Math.cos(r) * 70,
      y1 = 90 - Math.sin(r) * 70,
      x2 = 90 - Math.cos(r) * (d % 45 ? 64 : 60),
      y2 = 90 - Math.sin(r) * (d % 45 ? 64 : 60);
    t += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }
  g.innerHTML = t;
  const arc = $("#garc"),
    nd = $("#gneedle"),
    out = $("#gdeg");
  const set = (d) => {
    arc.setAttribute("stroke-dashoffset", 180 - d);
    const r = (d * Math.PI) / 180;
    nd.setAttribute("x2", (90 - Math.cos(r) * 70).toFixed(1));
    nd.setAttribute("y2", (90 - Math.sin(r) * 70).toFixed(1));
    out.textContent = Math.round(d);
  };
  if (reduce) {
    set(120);
    return;
  }
  let t0 = null;
  const seq = [0, 120, 95, 120];
  let i = 0;
  function anim(ts) {
    if (!t0) t0 = ts;
    const p = Math.min(1, (ts - t0) / 1600),
      e = 1 - Math.pow(1 - p, 4);
    const a = seq[i],
      b = seq[(i + 1) % seq.length];
    set(a + (b - a) * e);
    if (p < 1) requestAnimationFrame(anim);
    else {
      i = (i + 1) % (seq.length - 1);
      t0 = null;
      setTimeout(() => requestAnimationFrame(anim), i ? 900 : 2200);
    }
  }
  setTimeout(() => requestAnimationFrame(anim), 500);
})();

/* finder segments */
$$(".seg").forEach((s) =>
  s.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    s.querySelectorAll("button").forEach((x) =>
      x.setAttribute("aria-pressed", x === b),
    );
  }),
);
$("#finder").addEventListener("submit", (e) => {
  e.preventDefault();
  location.hash = "book";
});

/* bento: spotlight, goals, switch */
$$(".tile").forEach((t) =>
  t.addEventListener("pointermove", (e) => {
    const r = t.getBoundingClientRect();
    t.style.setProperty("--mx", e.clientX - r.left + "px");
    t.style.setProperty("--my", e.clientY - r.top + "px");
  }),
);
const goals = $$("#goals .goal"),
  ring = $("#ringfg");
function ringUpd() {
  const n = goals.filter(
    (g) => g.getAttribute("aria-pressed") === "true",
  ).length;
  ring.setAttribute("stroke-dashoffset", 138.2 * (1 - n / goals.length));
  $("#ringtxt").textContent = `${n} of ${goals.length}`;
}
goals.forEach((g) =>
  g.addEventListener("click", () => {
    g.setAttribute("aria-pressed", g.getAttribute("aria-pressed") !== "true");
    ringUpd();
  }),
);
ringUpd();
const SW = [
  [
    "In clinic",
    "A full examination of movement, strength and pain.",
    "Procedures are done on site when needed. Tap the switch.",
    '<path d="M3 21h18M5 21V8l7-5 7 5v13"/>',
  ],
  [
    "By video",
    "Start from home with a video consult.",
    "Share reports, move on camera, leave with a first plan.",
    '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
  ],
];
$("#sw").addEventListener("click", function () {
  const on = this.getAttribute("aria-pressed") !== "true";
  this.setAttribute("aria-pressed", on);
  const s = SW[+on];
  $("#swk").textContent = s[0];
  $("#swh").textContent = s[1];
  $("#swp").textContent = s[2];
  this.querySelector("svg").innerHTML = s[3];
});

/* body map */
const R = [
  {
    n: "Brain and nerves",
    x: 50,
    y: 10,
    d: "Recovery of movement, balance, speech and daily tasks after damage to the brain, spinal cord or nerves.",
    l: [
      "Stroke",
      "Head injury",
      "Parkinson's disease",
      "Spasticity",
      "Nerve injuries",
      "Balance problems",
    ],
  },
  {
    n: "Neck and shoulder",
    x: 63,
    y: 25,
    d: "Stiffness and pain in the neck and shoulder, including pain that travels down the arm.",
    l: [
      "Neck pain",
      "Cervical radiculopathy",
      "Frozen shoulder",
      "Shoulder pain",
      "Myofascial pain",
      "Posture problems",
    ],
  },
  {
    n: "Back and spine",
    x: 50,
    y: 42,
    d: "Back pain from discs, joints and muscles, and recovery after spinal cord injury.",
    l: [
      "Low back pain",
      "Sciatica",
      "Facet joint pain",
      "Spinal cord injury",
      "Disc problems",
      "Osteoporosis",
    ],
  },
  {
    n: "Elbow, wrist and hand",
    x: 23,
    y: 63,
    d: "Pain and weakness that make gripping, writing and lifting hard.",
    l: [
      "Tennis elbow",
      "Wrist pain",
      "Hand weakness",
      "Nerve compression",
      "Arthritis of the hand",
      "After a fracture",
    ],
  },
  {
    n: "Hip and knee",
    x: 58,
    y: 75,
    d: "Joint pain and stiffness that limit walking, stairs and sport.",
    l: [
      "Knee osteoarthritis",
      "Hip pain",
      "Ligament injuries",
      "Sports injuries",
      "After joint surgery",
      "Gait problems",
    ],
  },
  {
    n: "Ankle and foot",
    x: 41,
    y: 94,
    d: "Pain and instability that affect standing and walking.",
    l: [
      "Heel pain",
      "Ankle sprains",
      "Foot care",
      "Flat feet",
      "Walking aids",
      "Prosthetic training",
    ],
  },
];
$("#fig").insertAdjacentHTML(
  "beforeend",
  R.map(
    (r, i) =>
      `<button class="hot" type="button" style="left:${r.x}%;top:${r.y}%" data-i="${i}" aria-label="${r.n}" aria-pressed="false"><i></i></button>`,
  ).join(""),
);
$("#regs").innerHTML = R.map(
  (r, i) =>
    `<button class="reg" type="button" data-i="${i}" aria-pressed="false">${r.n}</button>`,
).join("");
function pick(i) {
  $$(".hot,.reg").forEach((b) =>
    b.setAttribute("aria-pressed", b.dataset.i == i),
  );
  const r = R[i];
  $("#bmsel").textContent = r.n;
  $("#bmp").innerHTML =
    `<div class="bm-panel"><span class="kicker">${r.n}</span><h3>${r.n}</h3><p>${r.d}</p><ul>${r.l.map((x) => `<li>${x}</li>`).join("")}</ul><a class="more" href="#care">See care for ${r.n.toLowerCase()} →</a></div>`;
}
document.addEventListener("click", (e) => {
  const b = e.target.closest(".hot,.reg");
  if (b) pick(+b.dataset.i);
});
pick(2);

/* services track */
const P = {
  spine:
    '<rect x="9" y="2.5" width="6" height="3" rx="1.5"/><rect x="9" y="7.5" width="6" height="3" rx="1.5"/><rect x="9" y="12.5" width="6" height="3" rx="1.5"/><rect x="9" y="17.5" width="6" height="3" rx="1.5"/>',
  neck: '<circle cx="12" cy="5" r="3"/><path d="M12 8v4M6 14c2-2 10-2 12 0M12 12v9"/>',
  nerve:
    '<path d="M12 2v6M12 8c-3 0-5 2-5 5M12 8c3 0 5 2 5 5M7 13c-2 1-3 3-3 5M7 13c1 2 1 4 0 6M17 13c2 1 3 3 3 5M17 13c-1 2-1 4 0 6"/>',
  needle: '<path d="M18 3l3 3M16 5l3 3M17.5 6.5L8 16l-2-2 9.5-9.5M8 16l-4 4"/>',
  brain:
    '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h1V4z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h-1V4z"/>',
  wheel:
    '<circle cx="10" cy="15" r="6"/><circle cx="10" cy="15" r="1.5"/><path d="M10 9V4h3M14 12h5l2 6"/>',
  walker:
    '<circle cx="9" cy="4" r="2"/><path d="M9 7v6l-2 8M9 13l3 8M13 9h5v12M18 13h-5"/>',
  knee: '<path d="M9 2v8a3 3 0 0 0 6 0V2"/><path d="M9 22v-6a3 3 0 0 1 6 0v6"/>',
  run: '<circle cx="14" cy="4" r="2"/><path d="M9 21l3-6 3 2v5M6 12l3-4 4 1 3 3h3M12 15l-1-6"/>',
  child:
    '<circle cx="12" cy="5" r="2.5"/><path d="M8 21l1-7-3-3M16 21l-1-7 3-3M9 11h6"/>',
  fall: '<circle cx="7" cy="5" r="2"/><path d="M9 9l4 3 4-1M8 10l-3 6h5l2 5M3 21h18"/>',
  prost: '<path d="M10 2v9l-2 7h5l1-7V2M8 18h6l1 4H7z"/>',
};
const G = {
  pain: [
    "linear-gradient(140deg,#E3F1F6,#F8EEE7)",
    "rgba(10,110,148,.30)",
    "rgba(242,180,138,.45)",
  ],
  neuro: [
    "linear-gradient(140deg,#E4ECF6,#E8F6F9)",
    "rgba(23,50,81,.30)",
    "rgba(111,208,230,.45)",
  ],
  joint: [
    "linear-gradient(140deg,#F8EEE7,#E6F3F7)",
    "rgba(242,180,138,.50)",
    "rgba(10,110,148,.25)",
  ],
  life: [
    "linear-gradient(140deg,#EAF5F0,#E6F0F7)",
    "rgba(47,125,91,.22)",
    "rgba(111,208,230,.40)",
  ],
};
const S = [
  [
    "spine",
    "pain",
    "Pain and spine",
    "Back pain",
    "Discs, joints and muscles. Exercise first, procedures when suitable.",
  ],
  [
    "neck",
    "pain",
    "Pain and spine",
    "Neck pain",
    "Including pain that travels down the arm.",
  ],
  [
    "nerve",
    "pain",
    "Pain and spine",
    "Sciatica",
    "Pain that runs from the back down the leg.",
  ],
  [
    "needle",
    "pain",
    "Pain and spine",
    "Image-guided injections",
    "Nerve blocks and joint injections, guided by imaging.",
  ],
  [
    "brain",
    "neuro",
    "Neuro rehab",
    "Stroke rehab",
    "Movement, balance, speech and daily tasks.",
  ],
  [
    "wheel",
    "neuro",
    "Neuro rehab",
    "Spinal cord injury",
    "Mobility, independence and preventing complications.",
  ],
  [
    "walker",
    "neuro",
    "Neuro rehab",
    "Parkinson's disease",
    "Keep moving safely, reduce falls.",
  ],
  [
    "knee",
    "joint",
    "Joints and sport",
    "Knee pain",
    "Including osteoarthritis and after surgery.",
  ],
  [
    "run",
    "joint",
    "Joints and sport",
    "Sports injuries",
    "A guided return to training and play.",
  ],
  [
    "child",
    "life",
    "Children",
    "Children's rehab",
    "Cerebral palsy, muscular dystrophy and development.",
  ],
  [
    "fall",
    "life",
    "Older adults",
    "Fall prevention",
    "Balance, strength and safety at home.",
  ],
  [
    "prost",
    "joint",
    "Joints and sport",
    "Prosthetic training",
    "Learning to walk with a new limb.",
  ],
];
$("#track").innerHTML = S.map(([ic, g, grp, t, d]) => {
  const c = G[g];
  return `<a class="svc" href="#care" style="--g:${c[0]};--b1:${c[1]};--b2:${c[2]}"><div class="art"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">${P[ic]}</svg></div><div class="body"><span class="mono">${grp}</span><h3>${t}</h3><p>${d}</p><span class="go">Read more<i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></i></span></div></a>`;
}).join("");
$$(".svc").forEach((a) =>
  a.addEventListener("click", (e) => e.preventDefault()),
);
const hs = $("#care"),
  pin = hs.querySelector(".hs-pin"),
  track = $("#track");
function hsSize() {
  if (innerWidth < 900) {
    hs.style.height = "";
    return;
  }
  const dist = track.scrollWidth - innerWidth + 48;
  hs.style.height = pin.offsetHeight + Math.max(0, dist) + "px";
}

/* journey */
const J = [
  [
    "Book",
    "Book online, call or WhatsApp. Choose a clinic visit or a video consult.",
    ["Clinic or video", "Confirmed by phone"],
  ],
  [
    "First consultation",
    "The doctor asks about your problem, checks how you move, your strength, balance and pain, and reads your scans.",
    ["Movement", "Strength", "Balance"],
  ],
  [
    "Your goals",
    "Together you agree on what matters: walking without support, sleeping without pain, getting back to work or sport.",
    ["Your words", "Measurable"],
  ],
  [
    "Your plan",
    "Exercise, therapy, medicines and, only when suitable, image-guided procedures. Every part explained in plain words.",
    ["Written plan", "Plain words"],
  ],
  [
    "Practice at home",
    "A home programme with clear steps, sets and repetitions, so progress continues between visits.",
    ["Home programme", "WhatsApp questions"],
  ],
  [
    "Review and adjust",
    "At each review the doctor measures your progress and changes the plan as you improve.",
    ["Range of motion", "Next goal"],
  ],
];
$("#steps").innerHTML = J.map(
  (s, i) =>
    `<div class="step" data-i="${i}"><span class="mono">Step ${String(i + 1).padStart(2, "0")}</span><h3>${s[0]}</h3><p>${s[1]}</p><div class="tagrow">${s[2].map((x) => `<span>${x}</span>`).join("")}</div></div>`,
).join("");
const jp = $("#jpath"),
  L = jp.getTotalLength();
$("#jverts").innerHTML = J.map((_, i) => {
  const pt = jp.getPointAtLength((L * (i + 0.5)) / J.length);
  return `<rect class="v" x="${(pt.x - 16).toFixed(1)}" y="${(pt.y - 8).toFixed(1)}" width="32" height="16" rx="8"/>`;
}).join("");
const verts = $$("#jverts .v");
let jcur = -1;
function jset(n) {
  if (n === jcur) return;
  jcur = n;
  $("#jn").textContent = String(n + 1).padStart(2, "0");
  $("#jt").textContent = J[n][0];
  $("#js").textContent = `Step ${n + 1} of ${J.length}`;
  $$(".step").forEach((s, i) => s.classList.toggle("on", i === n));
  verts.forEach((v, i) =>
    v.setAttribute("class", "v" + (i < n ? " done" : i === n ? " on" : "")),
  );
}
jset(0);

/* A to Z */
const AZ = {
  "Pain and spine": [
    "Low back pain",
    "Neck pain",
    "Sciatica",
    "Facet joint pain",
    "Disc problems",
    "Myofascial pain",
    "Osteoporosis",
  ],
  "Brain and nerves": [
    "Stroke",
    "Head injury",
    "Spinal cord injury",
    "Parkinson's disease",
    "Spasticity",
    "Nerve injuries",
  ],
  "Joints and sport": [
    "Knee osteoarthritis",
    "Frozen shoulder",
    "Hip pain",
    "Tennis elbow",
    "Ankle sprains",
    "Sports injuries",
    "After a fracture",
  ],
  "Children and older adults": [
    "Cerebral palsy",
    "Muscular dystrophy",
    "Developmental delay",
    "Fall prevention",
    "Balance problems",
    "Amputation and prosthesis",
  ],
};
function azr(q) {
  q = q.trim().toLowerCase();
  let n = 0;
  $("#azl").innerHTML = Object.entries(AZ)
    .map(([k, v]) => {
      const m = v.filter((x) => x.toLowerCase().includes(q));
      n += m.length;
      return `<div><h4>${k}</h4><ul>${
        m.length
          ? m
              .map((x) => {
                const i = x.toLowerCase().indexOf(q);
                const h = q
                  ? x.slice(0, i) +
                    "<mark>" +
                    x.slice(i, i + q.length) +
                    "</mark>" +
                    x.slice(i + q.length)
                  : x;
                return `<li><a href="#az">${h}<span aria-hidden="true">→</span></a></li>`;
              })
              .join("")
          : '<li class="empty">No match here</li>'
      }</ul></div>`;
    })
    .join("");
  $("#azc").textContent = `${n} conditions`;
}
$("#q").addEventListener("input", (e) => azr(e.target.value));
azr("");

/* FAQ */
const F = [
  [
    "What is a physiatrist?",
    "A physiatrist is a doctor who specialises in Physical Medicine and Rehabilitation. They diagnose and treat problems with muscles, joints, nerves and the spine, and lead your rehab plan with physiotherapists and other therapists.",
  ],
  [
    "Do I need a referral?",
    "No. You can book directly. Bring any scans, reports or hospital discharge summary, or share them before a video consult.",
  ],
  [
    "Can rehab start with a video consult?",
    "Yes, for many problems. The doctor reviews your reports, watches you move on camera and sets a first plan. If you need an in-person examination, the doctor will tell you.",
  ],
  [
    "Is every pain treated with an injection?",
    "No. Most plans start with exercise, posture advice and medicines. Image-guided injections or nerve blocks are used only when the doctor finds them suitable after examining you.",
  ],
];
$("#faq").innerHTML = F.map(
  (f, i) =>
    `<div class="qa"${i ? "" : " data-open"}><button type="button" aria-expanded="${!i}">${f[0]}<i></i></button><div class="a"><div><p>${f[1]}</p></div></div></div>`,
).join("");
$("#faq").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const q = b.parentElement,
    o = q.hasAttribute("data-open");
  q.toggleAttribute("data-open", !o);
  b.setAttribute("aria-expanded", !o);
});

/* spine navigator */
const spl = $$("#spnav a"),
  secs = spl.map((a) => document.getElementById(a.dataset.s));

/* scroll engine */
const docph = $("#docph img"),
  vb = $("#visitband>img"),
  cards = $$(".sc");
function prog(el) {
  const r = el.getBoundingClientRect();
  return Math.min(
    1,
    Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)),
  );
}
function onScroll() {
  nav.classList.toggle("small", scrollY > 40);
  // care track
  if (innerWidth >= 900) {
    const r = hs.getBoundingClientRect(),
      span = hs.offsetHeight - pin.offsetHeight;
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, span)));
    const dist = Math.max(0, track.scrollWidth - innerWidth + 48);
    track.style.transform = `translate3d(${-p * dist}px,0,0)`;
    $("#hsbar").style.width = p * 100 + "%";
    $("#cnt").textContent =
      String(Math.min(S.length, 1 + Math.round(p * (S.length - 1)))).padStart(
        2,
        "0",
      ) +
      " / " +
      S.length;
  }
  // journey
  const st = $("#steps"),
    sr = st.getBoundingClientRect();
  const jpg = Math.min(
    1,
    Math.max(0, (innerHeight * 0.5 - sr.top) / sr.height),
  );
  jp.setAttribute("stroke-dashoffset", reduce ? 0 : 1000 * (1 - jpg));
  $$(".step").forEach((s, i) => {
    const r = s.getBoundingClientRect();
    if (r.top < innerHeight * 0.55 && r.bottom > innerHeight * 0.45) jset(i);
  });
  // stacking
  if (innerWidth >= 1024 && !reduce)
    cards.forEach((c, i) => {
      const nx = cards[i + 1];
      if (!nx) {
        c.style.transform = "";
        return;
      }
      const a = c.getBoundingClientRect(),
        b = nx.getBoundingClientRect();
      const o = Math.min(1, Math.max(0, 1 - (b.top - a.top) / a.height));
      c.style.transform = `scale(${1 - o * 0.06})`;
      c.style.filter = `brightness(${1 - o * 0.08})`;
    });
  // zoom on scroll
  if (!reduce) {
    docph.style.setProperty("--z", (1.15 - prog($("#docph")) * 0.3).toFixed(3));
    vb.style.setProperty(
      "--z",
      (1.15 - prog($("#visitband")) * 0.3).toFixed(3),
    );
  }
  // spine nav
  let cur = 0;
  secs.forEach((s, i) => {
    if (s && s.getBoundingClientRect().top < innerHeight * 0.45) cur = i;
  });
  spl.forEach(
    (a, i) => (a.className = i < cur ? "done" : i === cur ? "on" : ""),
  );
  const mid = document.elementFromPoint(40, innerHeight / 2);
  $("#spnav").classList.toggle("dark", !!(mid && mid.closest("[data-dark]")));
}
let tick = false;
addEventListener(
  "scroll",
  () => {
    if (!tick) {
      tick = true;
      requestAnimationFrame(() => {
        onScroll();
        tick = false;
      });
    }
  },
  { passive: true },
);
addEventListener("resize", () => {
  hsSize();
  onScroll();
});
hsSize();
onScroll();
document.fonts &&
  document.fonts.ready.then(() => {
    hsSize();
    onScroll();
  });
