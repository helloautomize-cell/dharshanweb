export const bookingReasons = [
  "Back pain",
  "Neck pain",
  "Sciatica or leg pain",
  "Knee pain",
  "Shoulder pain",
  "Sports injury",
  "After a fracture or surgery",
  "Stroke",
  "Spinal cord injury",
  "Head injury",
  "Parkinson's disease",
  "Muscle stiffness (spasticity)",
  "Child's movement or development",
  "Falls or balance",
  "Osteoporosis",
  "Prosthesis or amputation",
  "Injection or PRP advice",
  "Other",
];
export const goals = [
  "Walk to the market",
  "Climb two floors",
  "Sleep without pain",
  "Back to badminton",
];
export const regions = [
  {
    name: "Brain and nerves",
    description:
      "Recovery of movement, balance, speech and daily tasks after damage to the brain, spinal cord or nerves.",
    conditions: [
      "Stroke",
      "Head injury",
      "Parkinson's disease",
      "Spasticity",
      "Nerve injuries",
      "Balance problems",
    ],
    href: "/neuro-rehabilitation/",
  },
  {
    name: "Neck and shoulder",
    description:
      "Stiffness and pain in the neck and shoulder, including pain that travels down the arm.",
    conditions: [
      "Neck pain",
      "Cervical radiculopathy",
      "Frozen shoulder",
      "Shoulder pain",
      "Myofascial pain",
      "Posture problems",
    ],
    href: "/pain-and-spine/neck-pain/",
  },
  {
    name: "Back and spine",
    description:
      "Back pain from discs, joints and muscles, and recovery after spinal cord injury.",
    conditions: [
      "Low back pain",
      "Sciatica",
      "Facet joint pain",
      "Spinal cord injury",
      "Disc problems",
      "Osteoporosis",
    ],
    href: "/pain-and-spine/",
  },
  {
    name: "Elbow, wrist and hand",
    description:
      "Pain and weakness that make gripping, writing and lifting hard.",
    conditions: [
      "Tennis elbow",
      "Wrist pain",
      "Hand weakness",
      "Nerve compression",
      "Arthritis of the hand",
      "After a fracture",
    ],
    href: "/joints-and-sports/",
  },
  {
    name: "Hip and knee",
    description:
      "Joint pain and stiffness that limit walking, stairs and sport.",
    conditions: [
      "Knee osteoarthritis",
      "Hip pain",
      "Ligament injuries",
      "Sports injuries",
      "After joint surgery",
      "Gait problems",
    ],
    href: "/joints-and-sports/knee-pain/",
  },
  {
    name: "Ankle and foot",
    description: "Pain and instability that affect standing and walking.",
    conditions: [
      "Heel pain",
      "Ankle sprains",
      "Foot care",
      "Flat feet",
      "Walking aids",
      "Prosthetic training",
    ],
    href: "/joints-and-sports/",
  },
] as const;
export const faqs = [
  {
    question: "What is a physiatrist?",
    answer:
      "A physiatrist is a doctor who specialises in Physical Medicine and Rehabilitation. They diagnose and treat problems with muscles, joints, nerves and the spine, and lead your rehab plan with physiotherapists and other therapists. The aim is less pain and more of the movement and independence you need for daily life.",
  },
  {
    question: "Do I need a referral?",
    answer:
      "No. You can book directly. Bring any scans, reports or hospital discharge summary to a clinic visit, or share them before a video consult, so the doctor can see the full picture.",
  },
  {
    question: "Can rehab start with a video consult?",
    answer:
      "Yes, for many problems. The doctor reviews your reports, watches you move on camera and sets a first plan with home exercises. If you need an in-person examination or a procedure, the doctor will tell you.",
  },
  {
    question: "Is every pain treated with an injection?",
    answer:
      "No. Most plans start with exercise, posture advice and medicines. Image-guided injections or nerve blocks are used only when the doctor finds them suitable after examining you, and every option is explained before you decide.",
  },
];
