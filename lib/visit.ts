export type VisitDay = { open: string; close: string } | "closed" | null;
export type VisitWeek = [
  VisitDay,
  VisitDay,
  VisitDay,
  VisitDay,
  VisitDay,
  VisitDay,
  VisitDay,
];
export type VisitFacts = {
  address: string;
  landmark: string;
  mapsUrl: string;
  transit: string;
  liftAndParking: string;
  hours: VisitWeek;
  videoHours: string;
  phoneHours: string;
  firstConsultLength: string;
  confirmTime: string;
};

export const visitFacts: VisitFacts = {
  address: "",
  landmark: "",
  mapsUrl: "",
  transit: "",
  liftAndParking: "",
  hours: [null, null, null, null, null, null, null],
  videoHours: "",
  phoneHours: "",
  firstConsultLength: "",
  confirmTime: "",
};

export function visitValue(value: string) {
  const text = value.trim();
  return /confirm|\btbc\b/i.test(text) ? "" : text;
}

export type VisitFormat = "clinic" | "video";
export const visitSituations = [
  { id: "child", label: "Coming with a child", tag: "Child" },
  { id: "hospital", label: "Just out of hospital", tag: "Hospital" },
  { id: "stroke", label: "After a stroke", tag: "Stroke" },
  { id: "mobility", label: "Uses a walker or wheelchair", tag: "Mobility" },
  { id: "joint", label: "Knee or shoulder problem", tag: "Knee or shoulder" },
] as const;
export type VisitSituation = (typeof visitSituations)[number]["id"];
export type ChecklistItem = {
  id: string;
  title: string;
  detail: string;
  format: VisitFormat | "both";
  situation?: VisitSituation;
};
export const checklistItems: ChecklistItem[] = [
  {
    id: "scans",
    title: "Scans and their reports",
    detail: "MRI, CT or X-ray, on CD or your phone.",
    format: "clinic",
  },
  {
    id: "scans-v",
    title: "Scans and reports, ready to share",
    detail: "Send them before the consult, or keep them open on your phone.",
    format: "video",
  },
  {
    id: "meds",
    title: "Your medicines",
    detail: "A list of what you take, or the medicines themselves.",
    format: "both",
  },
  {
    id: "clothes",
    title: "Loose, comfortable clothes",
    detail: "So the doctor can see how you move.",
    format: "both",
  },
  {
    id: "space",
    title: "A quiet spot with room to move",
    detail: "The doctor may ask you to stand, walk or show a movement.",
    format: "video",
  },
  {
    id: "shorts",
    title: "Shorts or a T-shirt in your bag",
    detail: "Helps the doctor see the knee or shoulder.",
    format: "clinic",
    situation: "joint",
  },
  {
    id: "shorts-v",
    title: "Shorts or a T-shirt on",
    detail: "Helps the doctor see the knee or shoulder on camera.",
    format: "video",
    situation: "joint",
  },
  {
    id: "discharge",
    title: "Hospital discharge summary",
    detail: "If you were admitted recently.",
    format: "both",
    situation: "hospital",
  },
  {
    id: "family",
    title: "A family member",
    detail: "To help you on the day, especially after a stroke.",
    format: "both",
    situation: "stroke",
  },
  {
    id: "aids",
    title: "Walking aids, splints or braces",
    detail: "The ones you use every day.",
    format: "both",
    situation: "mobility",
  },
  {
    id: "wheel",
    title: "Ask for a wheelchair at the entrance",
    detail: "Mention it when you book.",
    format: "clinic",
    situation: "mobility",
  },
  {
    id: "guardian",
    title: "A parent or guardian",
    detail: "Required for anyone under 18.",
    format: "both",
    situation: "child",
  },
  {
    id: "school",
    title: "School or therapy reports",
    detail: "If you have them.",
    format: "both",
    situation: "child",
  },
];
export type ChecklistState = {
  format: VisitFormat;
  situations: VisitSituation[];
  ticked: string[];
};
export const defaultChecklist: ChecklistState = {
  format: "clinic",
  situations: [],
  ticked: [],
};
export function visitChecklist(state: ChecklistState) {
  return checklistItems.filter(
    (item) =>
      (item.format === "both" || item.format === state.format) &&
      (!item.situation || state.situations.includes(item.situation)),
  );
}
export function parseChecklist(raw: string | null): ChecklistState {
  try {
    const value = JSON.parse(raw ?? "null");
    if (!value || typeof value !== "object") return defaultChecklist;
    return {
      format: value.format === "video" ? "video" : "clinic",
      situations: visitSituations
        .filter(
          (item) =>
            Array.isArray(value.situations) &&
            value.situations.includes(item.id),
        )
        .map((item) => item.id),
      ticked: checklistItems
        .filter(
          (item) =>
            Array.isArray(value.ticked) && value.ticked.includes(item.id),
        )
        .map((item) => item.id),
    };
  } catch {
    return defaultChecklist;
  }
}
export function checklistMessage(state: ChecklistState) {
  return `My Rehabify ${state.format === "clinic" ? "clinic visit" : "video consult"} checklist:\n${visitChecklist(
    state,
  )
    .map(
      (item) =>
        `${state.ticked.includes(item.id) ? "\u2713" : "\u2022"} ${item.title}`,
    )
    .join("\n")}`;
}

export const visitDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
export function validVisitDay(
  day: VisitDay,
): day is { open: string; close: string } {
  return (
    !!day &&
    day !== "closed" &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(day.open) &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(day.close) &&
    day.close > day.open
  );
}
export function visitTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}${minute ? `:${String(minute).padStart(2, "0")}` : ""} ${hour < 12 ? "am" : "pm"}`;
}
export function visitHoursStatus(hours: VisitWeek, now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";
  const today = visitDays.indexOf(
    part("weekday") as (typeof visitDays)[number],
  );
  const time = `${part("hour")}:${part("minute")}`;
  const day = hours[today];
  if (hours.some((entry) => entry === null))
    return { today, open: false, text: "" };
  if (validVisitDay(day) && time >= day.open && time < day.close)
    return { today, open: true, text: "Open now" };
  for (let offset = 0; offset <= 7; offset++) {
    const index = (today + offset) % 7;
    const next = hours[index];
    if (validVisitDay(next) && (offset > 0 || time < next.open))
      return {
        today,
        open: false,
        text: `Closed now, opens ${visitDays[index]} ${visitTime(next.open)}`,
      };
  }
  return {
    today,
    open: false,
    text: hours.every((day) => day === "closed") ? "Closed now" : "",
  };
}
