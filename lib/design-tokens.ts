export const layers = {
  content: 0,
  portrait: 1,
  controls: 2,
  navigation: 10,
  overlay: 20,
} as const;
export const designDials = {
  DESIGN_VARIANCE: 6,
  MOTION_INTENSITY: 4,
  VISUAL_DENSITY: 4,
} as const;
export const tokens = {
  night: "#0A1626",
  "night-2": "#10233A",
  "night-3": "#173251",
  ice: "#D9EDF3",
  "ice-2": "#A9BFCB",
  aqua: "#6FD0E6",
  apricot: "#F2B48A",
  paper: "#F5F8FA",
  card: "#FFFFFF",
  ink: "#0E2233",
  "ink-2": "#4A6274",
  blue: "#0A6E94",
  "blue-ink": "#086487",
  line: "#DFE8EE",
  alert: "#C8302A",
  ok: "#2F7D5B",
  wa: "#1F8F55",
} as const;
export function contrast(foreground: string, background: string) {
  const luminance = (hex: string) => {
    const channels = hex
      .replace("#", "")
      .match(/.{2}/g)!
      .map((channel) => parseInt(channel, 16) / 255)
      .map((channel) =>
        channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4,
      );
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const a = luminance(foreground),
    b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
