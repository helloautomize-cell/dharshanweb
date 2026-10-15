export const navLinks = [
  { href: "/video-consultation/", label: "Video consults" },
  { href: "/doctors/", label: "Doctors" },
  { href: "/plan-your-visit/", label: "Visit" },
  { href: "/guides/", label: "Guides" },
] as const;

export const megaExtras = [
  { href: "/guides/", label: "Guides" },
  { href: "/care/#a-z", label: "Conditions A to Z" },
  { href: "/faqs/", label: "FAQs" },
] as const;

export const megaGroups = [
  {
    title: "Pain and spine",
    href: "/pain-and-spine/",
    links: [
      { href: "/pain-and-spine/back-pain/", label: "Back pain" },
      { href: "/pain-and-spine/neck-pain/", label: "Neck pain" },
      { href: "/pain-and-spine/sciatica/", label: "Sciatica" },
      {
        href: "/pain-and-spine/image-guided-injections/",
        label: "Image-guided injections",
      },
    ],
  },
  {
    title: "Neuro rehabilitation",
    href: "/neuro-rehabilitation/",
    links: [
      { href: "/neuro-rehabilitation/stroke/", label: "Stroke rehab" },
      {
        href: "/neuro-rehabilitation/spinal-cord-injury/",
        label: "Spinal cord injury",
      },
      { href: "/neuro-rehabilitation/head-injury/", label: "Head injury" },
      { href: "/neuro-rehabilitation/parkinsons/", label: "Parkinson's" },
      { href: "/neuro-rehabilitation/spasticity/", label: "Spasticity" },
    ],
  },
  {
    title: "Joints and sports",
    href: "/joints-and-sports/",
    links: [
      { href: "/joints-and-sports/knee-pain/", label: "Knee pain" },
      { href: "/joints-and-sports/shoulder-pain/", label: "Shoulder pain" },
      { href: "/joints-and-sports/sports-injuries/", label: "Sports injuries" },
      {
        href: "/joints-and-sports/after-fracture-or-surgery/",
        label: "After fracture or surgery",
      },
      {
        href: "/joints-and-sports/prp-and-prolotherapy/",
        label: "PRP and prolotherapy",
      },
      {
        href: "/joints-and-sports/prosthetic-rehab/",
        label: "Prosthetic rehab",
      },
    ],
  },
  {
    title: "Children and older adults",
    href: "/childrens-rehabilitation/",
    links: [
      {
        href: "/childrens-rehabilitation/cerebral-palsy/",
        label: "Cerebral palsy",
      },
      {
        href: "/childrens-rehabilitation/muscular-dystrophy/",
        label: "Muscular dystrophy",
      },
      {
        href: "/childrens-rehabilitation/developmental-delay/",
        label: "Developmental delay",
      },
      { href: "/older-adults/", label: "Older adults" },
      { href: "/older-adults/falls-and-balance/", label: "Falls and balance" },
      { href: "/older-adults/osteoporosis/", label: "Osteoporosis" },
    ],
  },
] as const;

export const footerLinks = [
  { href: "/care/", label: "Care" },
  { href: "/doctors/", label: "Doctors" },
  { href: "/plan-your-visit/", label: "Plan your visit" },
  { href: "/faqs/", label: "FAQs" },
  { href: "/guides/", label: "Guides" },
] as const;

export const legalLinks = [
  { href: "/privacy-policy/", label: "Privacy policy" },
  { href: "/terms-of-use/", label: "Terms of use" },
  { href: "/medical-disclaimer/", label: "Medical disclaimer" },
  { href: "/editorial-policy/", label: "Editorial policy" },
  { href: "/patient-rights/", label: "Patient rights" },
  {
    href: "/appointments-cancellation-refund/",
    label: "Cancellation and refund",
  },
  { href: "/accessibility/", label: "Accessibility" },
  { href: "#cookie-settings", label: "Cookie settings" },
] as const;
