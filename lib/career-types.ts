export type TaskStatus = "not_started" | "in_progress" | "complete";

export type Task = {
  id: string;
  title: string;
  description: string;
  category: "learning" | "practice" | "networking" | "reflection";
  status: TaskStatus;
};

export type MonthPlan = {
  id: string;
  index: number;
  title: string;
  theme: string;
  summary: string;
  tasks: Task[];
};

export type Plan = {
  id: string;
  months: MonthPlan[];
};

export type UserProfile = {
  name: string;
  currentRole: string;
  yearsExperience: string;
  desiredRole: string;
  timePerWeek: string;
  constraints: string;
  challenges: string;
};

export type AppStage = "onboarding" | "plan";

export type ChatMessage = {
  id: string;
  from: "user" | "jake";
  content: string;
  timestamp: number;
};

export type AppState = {
  stage: AppStage;
  profile: UserProfile | null;
  plan: Plan | null;
  selectedMonthId: string | null;
  chat: ChatMessage[];
};

