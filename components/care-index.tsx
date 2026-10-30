"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { CareIcon, type CareIconName } from "./icons/care";

/* v3 care index: the 20 care pages grouped under the five hubs, plus
   Video consultation under "Online". One-line descriptions come from
   resources/docs/new-website-content.md; links mirror lib/nav.ts. */
type CareItem = {
  icon: CareIconName;
  title: string;
  desc: string;
  href: string;
};
type CareGroup = { id: string; name: string; items: CareItem[] };

const groups: CareGroup[] = [
  {
    id: "pain",
    name: "Pain and spine",
    items: [
      {
        icon: "back",
        title: "Back pain",
        desc: "For discs, joints and muscles; exercise first.",
        href: "/pain-and-spine/back-pain/",
      },
      {
        icon: "neck",
        title: "Neck pain",
        desc: "Including pain that travels down the arm.",
        href: "/pain-and-spine/neck-pain/",
      },
      {
        icon: "sciatica",
        title: "Sciatica",
        desc: "Pain that runs from the back down the leg.",
        href: "/pain-and-spine/sciatica/",
      },
      {
        icon: "injection",
        title: "Image-guided injections",
        desc: "Nerve blocks and joint injections, guided by imaging.",
        href: "/pain-and-spine/image-guided-injections/",
      },
    ],
  },
  {
    id: "neuro",
    name: "Neuro rehabilitation",
    items: [
      {
        icon: "stroke",
        title: "Stroke rehab",
        desc: "Movement, balance, speech and daily tasks.",
        href: "/neuro-rehabilitation/stroke/",
      },
      {
        icon: "spinal-cord",
        title: "Spinal cord injury",
        desc: "Mobility, independence and preventing complications.",
        href: "/neuro-rehabilitation/spinal-cord-injury/",
      },
      {
        icon: "head-injury",
        title: "Head injury",
        desc: "Movement, thinking and daily skills after brain injury.",
        href: "/neuro-rehabilitation/head-injury/",
      },
      {
        icon: "parkinsons",
        title: "Parkinson's disease",
        desc: "Keep moving safely, reduce falls.",
        href: "/neuro-rehabilitation/parkinsons/",
      },
      {
        icon: "spasticity",
        title: "Spasticity",
        desc: "Care for muscles that stay tight or spasm.",
        href: "/neuro-rehabilitation/spasticity/",
      },
    ],
  },
  {
    id: "joints",
    name: "Joints and sports",
    items: [
      {
        icon: "knee",
        title: "Knee pain",
        desc: "Including osteoarthritis and after surgery.",
        href: "/joints-and-sports/knee-pain/",
      },
      {
        icon: "shoulder",
        title: "Shoulder pain",
        desc: "Pain and stiffness, including frozen shoulder.",
        href: "/joints-and-sports/shoulder-pain/",
      },
      {
        icon: "sports",
        title: "Sports injuries",
        desc: "A guided return to training and play.",
        href: "/joints-and-sports/sports-injuries/",
      },
      {
        icon: "fracture",
        title: "After fracture or surgery",
        desc: "Getting back movement, strength and confidence.",
        href: "/joints-and-sports/after-fracture-or-surgery/",
      },
      {
        icon: "prp",
        title: "PRP and prolotherapy",
        desc: "Injection options for some joint and tendon problems.",
        href: "/joints-and-sports/prp-and-prolotherapy/",
      },
      {
        icon: "prosthetic",
        title: "Prosthetic rehab",
        desc: "Learning to walk with a new limb.",
        href: "/joints-and-sports/prosthetic-rehab/",
      },
    ],
  },
  {
    id: "children",
    name: "Children's rehabilitation",
    items: [
      {
        icon: "cerebral-palsy",
        title: "Cerebral palsy",
        desc: "Helping your child do more for themselves.",
        href: "/childrens-rehabilitation/cerebral-palsy/",
      },
      {
        icon: "muscular-dystrophy",
        title: "Muscular dystrophy",
        desc: "Stretching, splints and activity planned with family.",
        href: "/childrens-rehabilitation/muscular-dystrophy/",
      },
      {
        icon: "development",
        title: "Developmental delay",
        desc: "Support for motor skills and daily activities.",
        href: "/childrens-rehabilitation/developmental-delay/",
      },
    ],
  },
  {
    id: "older",
    name: "Older adults",
    items: [
      {
        icon: "balance",
        title: "Falls and balance",
        desc: "Balance, strength and safety at home.",
        href: "/older-adults/falls-and-balance/",
      },
      {
        icon: "osteoporosis",
        title: "Osteoporosis",
        desc: "Bone health, safe exercise and fall prevention.",
        href: "/older-adults/osteoporosis/",
      },
    ],
  },
  {
    id: "online",
    name: "Online",
    items: [
      {
        icon: "video",
        title: "Video consultation",
        desc: "See the doctor from home and leave with a first plan.",
        href: "/video-consultation/",
      },
    ],
  },
];

const sideGroups = groups.slice(0, 5);

const hubs: Record<string, string> = {
  pain: "/pain-and-spine/",
  neuro: "/neuro-rehabilitation/",
  joints: "/joints-and-sports/",
  children: "/childrens-rehabilitation/",
  older: "/older-adults/",
  online: "/video-consultation/",
};

export function CareIndex() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(groups[0].id);
  const [open, setOpen] = useState<ReadonlySet<string>>(
    () => new Set([groups[0].id]),
  );
  const [mobile, setMobile] = useState(false);

  // Below 900px the groups collapse into an accordion (first open). Above
  // 900px every group reads and behaves as open, so SSR and no-JS markup
  // always show the full list.
  useEffect(() => {
    const mq = matchMedia("(max-width: 899px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Find-in-page can reveal hidden="until-found" panels; keep state in sync.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onBeforeMatch = (e: Event) => {
      const id = (e.target as HTMLElement)
        .closest?.("[data-ci-panel]")
        ?.getAttribute("data-ci-panel");
      if (id) setOpen((prev) => new Set(prev).add(id));
    };
    el.addEventListener("beforematch", onBeforeMatch);
    return () => el.removeEventListener("beforematch", onBeforeMatch);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) el.dataset.fx = "";
    const blocks = [...el.querySelectorAll<HTMLElement>(".ci-group")];
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (!entry.isIntersecting && el.getBoundingClientRect().bottom >= 0)
            continue;
          el.classList.add("in");
          reveal.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id.slice(5));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    blocks.forEach((b) => {
      if (!reduced) reveal.observe(b);
      if (b.id !== "care-online") spy.observe(b);
    });
    return () => {
      reveal.disconnect();
      spy.disconnect();
    };
  }, []);

  const isOpen = (id: string) => (mobile ? open.has(id) : true);
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const jump = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(`care-${id}`);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <div className="ci" ref={root}>
      <nav className="ci-side" aria-label="Care groups">
        {sideGroups.map((g) => (
          <a
            key={g.id}
            href={`#care-${g.id}`}
            aria-current={active === g.id ? "true" : undefined}
            onClick={jump(g.id)}
          >
            <span>{g.name}</span>
            <span className="cnt">
              {String(g.items.length).padStart(2, "0")}
            </span>
          </a>
        ))}
      </nav>
      <div className="ci-groups">
        {groups.map((g) => (
          <div className="ci-group" id={`care-${g.id}`} key={g.id}>
            <h3 className="ci-k mono">
              <button
                type="button"
                className="ci-acc"
                aria-expanded={isOpen(g.id)}
                aria-controls={`care-${g.id}-panel`}
                onClick={() => toggle(g.id)}
              >
                <span className="ci-acc-name">{g.name}</span>
                <span className="ci-acc-cnt" aria-hidden="true">
                  {String(g.items.length).padStart(2, "0")}
                </span>
                <ChevronDown
                  className="ci-acc-ic"
                  size={20}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              className="ci-panel"
              id={`care-${g.id}-panel`}
              data-ci-panel={g.id}
              ref={(el) => {
                if (!el) return;
                if (isOpen(g.id)) el.removeAttribute("hidden");
                else el.setAttribute("hidden", "until-found");
              }}
            >
              <div className="ci-rows">
                {g.items.map((item, i) => (
                  <Link
                    key={item.href}
                    className="ci-row"
                    href={item.href}
                    style={{ "--d": `${i * 30}ms` } as React.CSSProperties}
                  >
                    <CareIcon name={item.icon} size={28} className="ci-ic" />
                    <span className="ci-t">{item.title}</span>
                    <span className="ci-d">{item.desc}</span>
                    <ArrowUpRight
                      className="ci-a"
                      size={20}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
              <Link className="ci-hub" href={hubs[g.id]}>
                See all of {g.name}
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
        <Link className="ci-more" href="/care/">
          See all care
          <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
