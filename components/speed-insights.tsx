import { SpeedInsights } from "@vercel/speed-insights/next";

// Speed Insights script exists only on Vercel; rendering it locally just 404s.
export function VercelSpeedInsights() {
  if (!process.env.VERCEL) return null;
  return <SpeedInsights />;
}
