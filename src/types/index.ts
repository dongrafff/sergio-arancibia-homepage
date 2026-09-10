import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Project {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  metric: string;
}

export interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ExperienceItem {
  title: string;
  org: string;
  period: string;
  description?: string;
  current?: boolean;
}

export interface EducationItem {
  degree: string;
  school: string;
  years: string;
}
