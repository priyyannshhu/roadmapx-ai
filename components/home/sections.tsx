"use client";

import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Lightbulb,
  MessageCircle,
  Network,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  AppStage,
  ChatMessage,
  MonthPlan,
  Plan,
  TaskStatus,
  UserProfile,
} from "@/lib/career-types";

function calculateMonthProgress(month: MonthPlan): number {
  if (!month.tasks.length) return 0;
  const progressUnits = month.tasks.reduce((sum, task) => {
    if (task.status === "complete") return sum + 1;
    if (task.status === "in_progress") return sum + 0.5;
    return sum;
  }, 0);
  return Math.round((progressUnits / month.tasks.length) * 100);
}

function calculatePlanProgress(plan: Plan | null): number {
  if (!plan) return 0;
  const allTasks = plan.months.flatMap((m) => m.tasks);
  if (!allTasks.length) return 0;
  const progressUnits = allTasks.reduce((sum, task) => {
    if (task.status === "complete") return sum + 1;
    if (task.status === "in_progress") return sum + 0.5;
    return sum;
  }, 0);
  return Math.round((progressUnits / allTasks.length) * 100);
}

function formatTimestamp(ts: number) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(ts);
}

function PriyanshuBadge() {
  return (
    <span className="font-poppins inline-flex items-center gap-2 rounded-full border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 shadow-md transition-all duration-300 hover:scale-105">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500 shadow-md" />
      </span>
      <span className="text-gray-800 font-medium">Online</span>
    </span>
  );
}

export function Navbar() {
  return (
    <nav className="font-poppins rounded-xl bg-white border border-gray-200 px-6 py-4 text-sm shadow-md sm:px-8 sm:py-4.5 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-orange text-sm font-bold text-white shadow-lg hover:scale-105 transition-all">
            RX
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight text-gray-900">RoadmapX</p>
            <p className="text-sm text-gray-600">Private, personalized, powered by AI</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Header({
  stage,
  profile,
}: {
  stage: AppStage;
  profile: UserProfile | null;
}) {
  return (
    <header className="space-y-3">
      <div className="font-poppins inline-flex items-center gap-3 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm text-gray-700 shadow-md transition-all duration-300 hover:scale-105">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-orange text-xs font-bold text-white shadow-lg hover:scale-110 transition-all">
          RX
        </span>
        <span className="flex items-center gap-2">
          RoadmapX
          {stage === "plan" && (
            <>
              <span className="text-muted-foreground/60">·</span>
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-primary" />
                <span>AI-Powered Journey with Priyanshu</span>
              </span>
            </>
          )}
        </span>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            {profile?.name
              ? `Welcome back, ${profile.name}.`
              : "Chart your path to professional success."}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {stage === "onboarding"
              ? "Tell us where you are today, and we'll build a personalized 12‑month roadmap to get you where you want to be."
              : "You're on a 12‑month journey—one month at a time. Track progress, adapt as needed, and let Priyanshu guide you."}
          </p>
        </div>
        {stage === "plan" && profile && (
          <div className="flex gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 shadow-sm">
              <Target className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{profile.desiredRole}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 shadow-sm">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{profile.timePerWeek}</span>
            </span>
          </div>
        )}
      </div>
    </header>
  );
}

export function OnboardingCard({
  onSubmit,
  isGeneratingPlan,
  generationStepText,
}: {
  onSubmit: (profile: UserProfile) => Promise<void>;
  isGeneratingPlan: boolean;
  generationStepText: string;
}) {
  const [form, setForm] = useState<UserProfile>({
    name: "",
    currentRole: "",
    yearsExperience: "",
    desiredRole: "",
    timePerWeek: "",
    constraints: "",
    challenges: "",
  });
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const isValid =
    form.name.trim() &&
    form.currentRole.trim() &&
    form.desiredRole.trim() &&
    form.timePerWeek.trim();

  const handleChange = (field: keyof UserProfile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isGeneratingPlan) return;
    await onSubmit(form);
  };

  return (
    <section className="font-poppins rounded-xl bg-white border border-gray-200 p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-orange text-white shadow-lg hover:scale-110 transition-all">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-orange-600 sm:text-2xl">
              Start with your career destination
            </h2>
            <p className="mt-2 text-base leading-relaxed text-gray-600">
              A few questions so we can shape a realistic, personalized 12‑month roadmap.
            </p>
          </div>
        </div>
        <span className="font-poppins inline-flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 shadow-md transition-all duration-300 hover:scale-105">
          <Sparkles className="h-4 w-4" />
          Step 1
        </span>
      </div>

      <form className="relative grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
        {isGeneratingPlan && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-lg bg-card/90 backdrop-blur-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
            <p className="text-sm font-semibold tracking-tight">Generating your plan...</p>
            <p className="max-w-xs text-center text-xs text-muted-foreground">{generationStepText}</p>
            <div className="h-1.5 w-56 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-orange-500 to-orange-400" />
            </div>
          </div>
        )}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
            <Users className="h-3.5 w-3.5 text-primary" />
            Name
          </label>
          <input
            ref={nameInputRef}
            disabled={isGeneratingPlan}
            className="w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm shadow-sm backdrop-blur transition-all placeholder:text-muted-foreground/50 hover:border-primary/40 focus:border-primary focus:bg-background focus:shadow-md focus:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Alex"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
            <Briefcase className="h-3.5 w-3.5 text-primary" />
            Current role
          </label>
          <input
            disabled={isGeneratingPlan}
            className="w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm shadow-sm backdrop-blur transition-all placeholder:text-muted-foreground/50 hover:border-primary/40 focus:border-primary focus:bg-background focus:shadow-md focus:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="e.g. Support Engineer"
            value={form.currentRole}
            onChange={(e) => handleChange("currentRole", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            Years of experience
          </label>
          <input
            disabled={isGeneratingPlan}
            className="w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm shadow-sm backdrop-blur transition-all placeholder:text-muted-foreground/50 hover:border-primary/40 focus:border-primary focus:bg-background focus:shadow-md focus:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="e.g. 3"
            value={form.yearsExperience}
            onChange={(e) => handleChange("yearsExperience", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
            <Target className="h-3.5 w-3.5 text-primary" />
            Target role / goal
          </label>
          <input
            disabled={isGeneratingPlan}
            className="w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm shadow-sm backdrop-blur transition-all placeholder:text-muted-foreground/50 hover:border-primary/40 focus:border-primary focus:bg-background focus:shadow-md focus:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="e.g. Senior Frontend Engineer"
            value={form.desiredRole}
            onChange={(e) => handleChange("desiredRole", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
            <Clock className="h-3.5 w-3.5 text-primary" />
            Time you can invest per week
          </label>
          <input
            disabled={isGeneratingPlan}
            className="w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm shadow-sm backdrop-blur transition-all placeholder:text-muted-foreground/50 hover:border-primary/40 focus:border-primary focus:bg-background focus:shadow-md focus:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="e.g. 5–8 hours"
            value={form.timePerWeek}
            onChange={(e) => handleChange("timePerWeek", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
            <Zap className="h-3.5 w-3.5 text-primary" />
            Constraints (optional)
          </label>
          <input
            disabled={isGeneratingPlan}
            className="w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm shadow-sm backdrop-blur transition-all placeholder:text-muted-foreground/50 hover:border-primary/40 focus:border-primary focus:bg-background focus:shadow-md focus:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="e.g. full‑time job, family, budget"
            value={form.constraints}
            onChange={(e) => handleChange("constraints", e.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
            <Lightbulb className="h-3.5 w-3.5 text-primary" />
            Biggest challenges (optional)
          </label>
          <textarea
            rows={3}
            disabled={isGeneratingPlan}
            className="w-full resize-none rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm shadow-sm backdrop-blur transition-all placeholder:text-muted-foreground/50 hover:border-primary/40 focus:border-primary focus:bg-background focus:shadow-md focus:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="What tends to get in the way? Confidence, time, direction, something else?"
            value={form.challenges}
            onChange={(e) => handleChange("challenges", e.target.value)}
          />
        </div>
        <div className="md:col-span-2 mt-3 flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-1.5 text-xs leading-snug text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5 text-primary" />
            <span>We'll use this to sketch a realistic, focused path. Adjust anytime with Priyanshu.</span>
          </p>
          <button
            type="submit"
            disabled={!isValid || isGeneratingPlan}
            className={cn(
              "font-poppins group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-orange px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none",
              isGeneratingPlan && "animate-pulse"
            )}
          >
            {isGeneratingPlan ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500" />
                <span>Generating your 12-month plan...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Generate my 12‑month plan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export function PlanSection({
  profile,
  plan,
  selectedMonth,
  onSelectMonth,
  onUpdateTaskStatus,
  onStartMonth,
}: {
  profile: UserProfile | null;
  plan: Plan;
  selectedMonth: MonthPlan | null;
  onSelectMonth: (id: string) => void;
  onUpdateTaskStatus: (monthId: string, taskId: string, status: TaskStatus) => void;
  onStartMonth: (monthId: string) => void;
}) {
  const overall = calculatePlanProgress(plan);

  return (
    <section className="font-poppins space-y-6">
      <div className="rounded-xl bg-white border border-gray-200 p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-orange text-white shadow-lg hover:scale-110 transition-all">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-orange-600 sm:text-2xl">Your 12‑month journey</h2>
              <p className="mt-2 max-w-md text-base leading-relaxed text-gray-600">
                {profile?.desiredRole
                  ? `A realistic path from ${profile.currentRole || "where you are now"} to ${
                      profile.desiredRole
                    }.`
                  : "A structured plan that turns long‑term goals into monthly, doable steps."}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="text-xs font-medium text-muted-foreground">Overall progress</p>
              <p className="text-2xl font-bold tracking-tight">
                {overall}
                <span className="text-sm text-muted-foreground">%</span>
              </p>
            </div>
            <div className="relative h-2.5 w-40 overflow-hidden rounded-full bg-gray-200 shadow-inner">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 shadow-sm transition-all duration-500"
                style={{ width: `${overall}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.5fr)]">
        <div className="font-poppins space-y-4 rounded-xl bg-white border border-gray-200 p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <p className="text-sm font-bold uppercase tracking-wide text-foreground/80">Monthly themes</p>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">{plan.months.length} months</span>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {plan.months.map((month) => {
              const monthProgress = calculateMonthProgress(month);
              const isActive = selectedMonth?.id === month.id;
              const isStarted = month.tasks.some((task) => task.status !== "not_started");
              return (
                <button
                  key={month.id}
                  type="button"
                  onClick={() => onSelectMonth(month.id)}
                  className={cn(
                    "group flex flex-col items-start gap-2 rounded-lg border px-3.5 py-3 text-left text-xs transition-colors",
                    isActive
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/40 hover:bg-accent/40"
                  )}
                >
                  {isActive && (
                    <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 -translate-y-4 translate-x-4 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-xl" />
                  )}
                  <div className="relative flex w-full items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all",
                          isActive
                            ? "bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground shadow-sm"
                            : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                        )}
                      >
                        {month.index}
                      </span>
                      <div className="text-sm font-bold leading-tight">{month.title}</div>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        monthProgress === 100
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {monthProgress}%
                    </span>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      isStarted
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {isStarted ? "Started" : "Not started"}
                  </span>
                  <p className="relative line-clamp-2 text-xs leading-relaxed text-muted-foreground">{month.theme}</p>
                  <div className="relative mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary/60 shadow-inner">
                    <div
                      className={cn(
                        "h-full rounded-full shadow-sm transition-all duration-500",
                        monthProgress === 100
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                          : "bg-gradient-to-r from-primary to-emerald-500"
                      )}
                      style={{ width: `${monthProgress}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
          {selectedMonth ? (
            <>
              {selectedMonth.tasks.every((task) => task.status === "not_started") && (
                <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">
                      Ready to begin {selectedMonth.title}? Start now and we will mark your first task
                      as in progress.
                    </p>
                    <button
                      type="button"
                      onClick={() => onStartMonth(selectedMonth.id)}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Start this month
                    </button>
                  </div>
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Focus for {selectedMonth.title.toLowerCase()}
                  </p>
                  <h3 className="mt-1.5 text-base font-bold leading-tight">{selectedMonth.theme}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{selectedMonth.summary}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Complete</p>
                  <p className="mt-1 text-2xl font-bold tracking-tight">
                    {calculateMonthProgress(selectedMonth)}
                    <span className="text-sm text-muted-foreground">%</span>
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {selectedMonth.tasks.map((task) => {
                  const categoryIcon = {
                    learning: Lightbulb,
                    practice: Target,
                    networking: Network,
                    reflection: Sparkles,
                  }[task.category] || Briefcase;
                  const CategoryIcon = categoryIcon;

                  return (
                    <div
                      key={task.id}
                      className="group flex items-start gap-3 rounded-lg border border-border bg-background p-3 text-xs transition-colors hover:border-primary/40 hover:bg-accent/30"
                    >
                      <div className="mt-0.5 shrink-0">
                        <StatusPill
                          status={task.status}
                          onChange={(next) => onUpdateTaskStatus(selectedMonth.id, task.id, next)}
                        />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-start gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <CategoryIcon className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold leading-tight">{task.title}</p>
                            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                              {task.category}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Pick a month to see your focus tasks</p>
                <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-muted-foreground">
                  Each month balances learning, practice, networking, and reflection so you're always moving forward.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StatusPill({
  status,
  onChange,
}: {
  status: TaskStatus;
  onChange: (next: TaskStatus) => void;
}) {
  const nextStatus: TaskStatus =
    status === "not_started" ? "in_progress" : status === "in_progress" ? "complete" : "not_started";
  const label = status === "not_started" ? "Not started" : status === "in_progress" ? "In progress" : "Done";
  const Icon = status === "complete" ? CheckCircle2 : status === "in_progress" ? Clock : Target;

  return (
    <button
      type="button"
      onClick={() => onChange(nextStatus)}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold shadow-sm transition-all hover:scale-105 hover:shadow-md",
        status === "complete"
          ? "border-emerald-500/60 bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 text-emerald-600 dark:text-emerald-400"
          : status === "in_progress"
          ? "border-amber-500/60 bg-gradient-to-r from-amber-500/10 to-amber-400/10 text-amber-600 dark:text-amber-400"
          : "border-border bg-secondary/70 text-muted-foreground hover:border-primary/40"
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}

export function PriyanshuChatPanel({
  messages,
  input,
  onInputChange,
  onSend,
  isSending,
}: {
  messages: ChatMessage[];
  input: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  isSending: boolean;
}) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <section className="flex h-full w-full min-h-[320px] flex-col overflow-hidden rounded-xl border border-border bg-card p-4 text-xs shadow-sm sm:p-5">
      <div className="mb-3 flex items-start gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
          P
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold tracking-tight">Priyanshu, your career assistant</h2>
            <PriyanshuBadge />
          </div>
          <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
            Ask about your plan, next steps, or how to adapt when things change.
          </p>
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-hidden rounded-lg border border-border bg-background/60 p-2">
        <div ref={scrollContainerRef} className="flex h-full flex-col gap-2.5 overflow-y-auto pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex animate-in fade-in slide-in-from-bottom-2 duration-300",
                msg.from === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 shadow-sm",
                  msg.from === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md border border-border bg-card text-foreground"
                )}
              >
                <p className="whitespace-pre-line text-xs leading-relaxed">{msg.content}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold",
                      msg.from === "user"
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {msg.from === "user" ? "Y" : "J"}
                  </div>
                  <p
                    className={cn(
                      "text-[9px] font-medium",
                      msg.from === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {formatTimestamp(msg.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        className="mt-4 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <div className="relative flex-1">
          <textarea
            rows={2}
            className="h-10 w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-2 pr-10 text-xs shadow-sm backdrop-blur transition-all placeholder:text-muted-foreground/50 hover:border-primary/40 focus:border-primary focus:bg-background focus:shadow-md focus:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Ask Priyanshu anything about your career journey..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <MessageCircle className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          className={cn(
            "group inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-emerald-500 px-5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-lg",
            isSending && "animate-pulse"
          )}
        >
          {isSending ? (
            <>
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              <span>Sending</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
              <span>Send</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}

