export const doctorChoices = [
  {
    label: "Stroke",
    doctors: [
      {
        id: "dr-dharshan-n-a",
        reason: "Neuro rehab after stroke, including spasticity and arm use",
      },
      {
        id: "dr-selina-kh",
        reason: "Stroke rehabilitation and recovery of daily tasks",
      },
    ],
  },
  {
    label: "Spinal cord injury",
    doctors: [
      {
        id: "dr-dharshan-n-a",
        reason: "Rehab plans, pressure-injury prevention and mobility",
      },
      { id: "dr-selina-kh", reason: "Spinal cord injury rehabilitation" },
    ],
  },
  {
    label: "Back or neck pain",
    doctors: [
      {
        id: "dr-dharshan-n-a",
        reason: "Exercise first, with image-guided injections when suitable",
      },
      { id: "dr-selina-kh", reason: "Back, neck and joint pain care" },
    ],
  },
  {
    label: "Joint or rheumatic pain",
    doctors: [
      { id: "dr-selina-kh", reason: "Joint and rheumatology-related pain" },
      {
        id: "dr-dharshan-n-a",
        reason: "Knee osteoarthritis, shoulder pain, PRP when suitable",
      },
    ],
  },
  {
    label: "Sports injury or surgery",
    doctors: [
      {
        id: "dr-dharshan-n-a",
        reason: "Sports injuries, after fracture or joint replacement",
      },
    ],
  },
  {
    label: "Head injury or Parkinson's",
    doctors: [
      {
        id: "dr-dharshan-n-a",
        reason: "Neuro rehab for head injury and Parkinson's disease",
      },
    ],
  },
  {
    label: "My child",
    doctors: [
      {
        id: "dr-dharshan-n-a",
        reason: "Cerebral palsy, muscular dystrophy and developmental delay",
      },
    ],
  },
  {
    label: "An older parent",
    doctors: [
      {
        id: "dr-dharshan-n-a",
        reason: "Falls, balance, osteoporosis and staying independent",
      },
    ],
  },
] as const;

export type DoctorChoiceProfile = {
  id: string;
  name: string;
  href: string;
  avatar: string;
};
