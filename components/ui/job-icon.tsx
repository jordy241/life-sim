import {
  Briefcase,
  Coffee,
  GraduationCap,
  Hammer,
  Laptop,
  Paintbrush,
  Shield,
  Stethoscope,
  Store,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { JobIconKey } from "@/game/core/job";

const ICONS: Record<JobIconKey, LucideIcon> = {
  Briefcase,
  Coffee,
  Wrench,
  GraduationCap,
  Hammer,
  Stethoscope,
  Laptop,
  Paintbrush,
  Store,
  Truck,
  Users,
  Shield,
};

export function JobIcon({
  icon,
  className,
}: {
  icon: JobIconKey;
  className?: string;
}) {
  const Icon = ICONS[icon];
  return <Icon className={className} />;
}
