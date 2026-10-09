export type Language = 'uz' | 'en';

export type SectionTab =
  | 'overview'
  | 'problem-solution'
  | 'team'
  | 'why-us'
  | 'roadmap'
  | 'tech-plan'
  | 'demo';

export type DemoSubTab = 'prototype' | 'video' | 'ai-bot' | 'api-access';

export interface ScheduleDay {
  day: string;
  typeUz: string;
  typeEn: string;
  binColor: 'green' | 'blue' | 'gray' | 'rose' | 'amber' | 'slate';
  code: string;
}

export interface DistrictInfo {
  districtId: string;
  districtNameUz: string;
  districtNameEn: string;
  mahallaCount: number;
  coverageRate: string;
  collectionTime: string;
  schedule: ScheduleDay[];
}

export interface WasteItem {
  id: string;
  nameUz: string;
  nameEn: string;
  category: 'recyclable' | 'organic' | 'hazardous' | 'electronic' | 'general';
  binColor: 'green' | 'blue' | 'gray' | 'rose' | 'amber';
  disposalUz: string;
  disposalEn: string;
}

export interface TeamMember {
  id: string;
  name: string;
  roleUz: string;
  roleEn: string;
  bioUz: string;
  bioEn: string;
  skills: string[];
  techStack: string[];
  github: string;
  linkedin: string;
  portfolio: string;
  avatarSeed: string;
}

export interface RoadmapMilestone {
  phase: 'idea' | 'prototype' | 'mvp' | 'launched';
  phaseTitleUz: string;
  phaseTitleEn: string;
  period: string;
  statusUz: string;
  statusEn: string;
  isCurrent: boolean;
  isDone: boolean;
  deliverablesUz: string[];
  deliverablesEn: string[];
}
