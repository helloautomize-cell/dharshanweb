import type { ComponentType } from "react";
import {
  AlertTriangle,
  Bath,
  CircleAlert,
  DoorStairwell,
  House,
  Link2,
  Moon,
  Printer,
  RectangleHorizontal,
  SportShoe,
  Armchair,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Info,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  Mic,
  Minus,
  Pause,
  Phone,
  Play,
  Plus,
  Search,
  Smartphone,
  UserRound,
  Video,
  Volume2,
  X,
} from "lucide-react";

// Tree-shaken icon set. Only the icons imported above exist in the bundle.
// Stroke is fixed at 1.75 and icons are decorative by default.
const icons = {
  alert: AlertTriangle,
  emergency: CircleAlert,
  bath: Bath,
  stairs: DoorStairwell,
  house: House,
  link: Link2,
  moon: Moon,
  printer: Printer,
  mat: RectangleHorizontal,
  shoe: SportShoe,
  seat: Armchair,
  lock: Lock,
  smartphone: Smartphone,
  user: UserRound,
  arrow: ArrowRight,
  calendar: CalendarDays,
  check: Check,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  clock: Clock,
  close: X,
  file: FileText,
  info: Info,
  menu: Menu,
  pin: MapPin,
  play: Play,
  pause: Pause,
  plus: Plus,
  minus: Minus,
  phone: Phone,
  mic: Mic,
  sound: Volume2,
  search: Search,
  video: Video,
  whatsapp: MessageCircle,
} as const;
export type IconName = keyof typeof icons;
export function Icon({
  name,
  size = 24,
  label,
  className,
}: {
  name: IconName;
  size?: number;
  label?: string;
  className?: string;
}) {
  const Glyph = icons[name] as ComponentType<{
    size: number;
    strokeWidth: number;
    "aria-hidden"?: boolean;
    "aria-label"?: string;
    role?: string;
    className?: string;
  }>;
  return (
    <Glyph
      size={size}
      strokeWidth={1.75}
      className={className}
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true })}
    />
  );
}
