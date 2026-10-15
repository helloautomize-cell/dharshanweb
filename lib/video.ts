export type VideoFit = "video" | "start" | "clinic" | "emergency";
export const videoChoices: { label: string; type: VideoFit; text: string }[] = [
  {
    label: "A follow-up after a visit",
    type: "video",
    text: "The doctor reviews your progress, checks how you move on camera and updates your plan.",
  },
  {
    label: "Reviewing scans or reports",
    type: "video",
    text: "Share them before the call and the doctor talks you through what they mean for you.",
  },
  {
    label: "Family questions after a stroke",
    type: "video",
    text: "The family can join from home to ask about recovery, care and the next steps.",
  },
  {
    label: "A home exercise programme",
    type: "video",
    text: "The doctor watches you do the exercises and adjusts them for you.",
  },
  {
    label: "Long-standing pain, first advice",
    type: "start",
    text: "The doctor can give first advice on video. If you need a hands-on examination, they will ask you to come in.",
  },
  {
    label: "A new injury",
    type: "clinic",
    text: "A first assessment of a new injury usually needs an in-person examination.",
  },
  {
    label: "Numbness, tingling or weakness",
    type: "clinic",
    text: "Nerve problems usually need a hands-on examination first.",
  },
  {
    label: "An injection or procedure",
    type: "clinic",
    text: "Procedures, and the assessment before them, are done in the clinic.",
  },
  {
    label: "Something sudden or severe right now",
    type: "emergency",
    text: "Video consults are never for emergencies. Call an ambulance or go to the nearest emergency department.",
  },
];
export const videoFitResults: Record<
  VideoFit,
  { badge: string; heading: string }
> = {
  video: { badge: "Video works well", heading: "A video consult suits this." },
  start: { badge: "A good place to start", heading: "Start on video." },
  clinic: {
    badge: "Clinic visit first",
    heading: "Start with a clinic visit.",
  },
  emergency: { badge: "Not for video", heading: "Call 108 or 112 now." },
};
export const videoReadyItems = [
  {
    title: "Your space",
    text: "Wear loose clothes. Keep a chair and a clear patch of floor nearby so you can walk a few steps.",
    icon: "seat",
  },
  {
    title: "Your phone",
    text: "Charged, with the camera working. Ask a family member to hold it if you need to move around.",
    icon: "smartphone",
  },
  {
    title: "Your papers",
    text: "Keep your medicines and latest reports beside you, even if you sent them before.",
    icon: "file",
  },
] as const;
