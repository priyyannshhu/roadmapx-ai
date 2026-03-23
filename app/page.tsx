// "use client";

// import { useAuth } from "@clerk/nextjs";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { Sparkles, Target } from "lucide-react";
// import {
//   Header,
//   PriyanshuChatPanel as PriyanshuChatPanel,
//   Navbar,
//   OnboardingCard,
//   PlanSection,
// } from "@/components/home/sections";
// import type {
//   AppState,
//   ChatMessage,
//   MonthPlan,
//   Plan,
//   Task,
//   TaskStatus,
//   UserProfile,
// } from "@/lib/career-types";

// const PLAN_GENERATION_STEPS = [
//   "Analyzing your background and goals...",
//   "Building your 12-month roadmap...",
//   "Calibrating tasks to your weekly availability...",
//   "Finalizing your personalized plan...",
// ];

// function createInitialState(): AppState {
//   return {
//     stage: "onboarding",
//     profile: null,
//     plan: null,
//     selectedMonthId: null,
//     chat: [
//       {
//         id: "welcome",
//         from: "priyanshu",
//         content:
//           "Hey, I'm Priyanshu—your AI career assistant. Once you create your plan, ask me anything about your next steps.",
//         timestamp: Date.now(),
//       },
//     ],
//   };
// }

// function generateMockPlan(profile: UserProfile): Plan {
//   const baseThemes = [
//     "Foundations & Clarity",
//     "Skill Mapping & Gap Analysis",
//     "Core Skills – Fundamentals",
//     "Core Skills – Projects",
//     "Portfolio & Storytelling",
//     "Networking & Visibility",
//     "Interview Readiness",
//     "Deep Dives & Specialization",
//     "Leadership & Ownership",
//     "Industry Positioning",
//     "Refinement & Stretch Goals",
//     "Launch / Transition",
//   ];

//   const months: MonthPlan[] = Array.from({ length: 12 }, (_, i) => {
//     const index = i + 1;
//     const theme = baseThemes[i] ?? `Month ${index} Focus`;

//     const tasks: Task[] = [
//       {
//         id: `m${index}-t1`,
//         title: "Learn & absorb",
//         description:
//           i === 0
//             ? `Clarify your target move into ${profile.desiredRole || "your next role"} and capture 3–5 concrete outcomes you want in 12 months.`
//             : "Complete a focused learning block and summarize your key takeaways in 5–10 bullet points.",
//         category: "learning",
//         status: "not_started",
//       },
//       {
//         id: `m${index}-t2`,
//         title: "Build & practice",
//         description:
//           "Apply what you learned in a small, scoped project or task that you can talk about in future interviews.",
//         category: "practice",
//         status: "not_started",
//       },
//       {
//         id: `m${index}-t3`,
//         title: "Connect with others",
//         description:
//           "Have at least one meaningful conversation with someone working in or near your target role.",
//         category: "networking",
//         status: "not_started",
//       },
//       {
//         id: `m${index}-t4`,
//         title: "Reflect & adjust",
//         description:
//           "Write a short reflection: what moved you closer to your goal this month, and what will you adjust next month?",
//         category: "reflection",
//         status: "not_started",
//       },
//     ];

//     return {
//       id: `month-${index}`,
//       index,
//       title: `Month ${index}`,
//       theme,
//       summary: `Focus on ${theme.toLowerCase()} as you move toward ${profile.desiredRole || "your next step"}.`,
//       tasks,
//     };
//   });

//   return {
//     id: `plan-${Date.now()}`,
//     months,
//   };
// }

// export default function Home() {
//   const { isLoaded, userId } = useAuth();
//   const [state, setState] = useState<AppState>(createInitialState());

//   const [isHydrated, setIsHydrated] = useState(false);
//   const [isSending, setIsSending] = useState(false);
//   const [input, setInput] = useState("");
//   const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
//   const [planGenerationStep, setPlanGenerationStep] = useState(0);
//   const hasCompletedRemoteRestoreRef = useRef(false);

//   useEffect(() => {
//     setIsHydrated(true);
//   }, []);

//   useEffect(() => {
//     if (!isHydrated || !isLoaded || !userId || hasCompletedRemoteRestoreRef.current) return;

//     fetch("/api/state")
//       .then((res) => (res.ok ? res.json() : null))
//       .then((data) => {
//         const remoteState = data?.state;
//         if (remoteState) {
//           setState((prev) => ({
//             ...prev,
//             ...remoteState,
//             chat:
//               Array.isArray(remoteState.chat) && remoteState.chat.length
//                 ? remoteState.chat
//                 : prev.chat,
//           }));
//         }
//       })
//       .catch((error) => {
//         console.error("Failed to restore remote state:", error);
//       })
//       .finally(() => {
//         hasCompletedRemoteRestoreRef.current = true;
//       });
//   }, [isHydrated, isLoaded, userId]);

//   useEffect(() => {
//     if (!isHydrated || !isLoaded || !userId || !hasCompletedRemoteRestoreRef.current) return;
//     const timer = window.setTimeout(() => {
//       fetch("/api/state", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           state,
//         }),
//       }).catch((error) => {
//         console.error("Failed to sync state to MongoDB:", error);
//       });
//     }, 700);

//     return () => window.clearTimeout(timer);
//   }, [isHydrated, isLoaded, userId, state]);

//   const selectedMonth = useMemo(() => {
//     if (!state.plan) return null;
//     const id = state.selectedMonthId ?? state.plan.months[0]?.id;
//     return state.plan.months.find((m) => m.id === id) ?? null;
//   }, [state.plan, state.selectedMonthId]);


//   useEffect(() => {
//     if (!userId) {
//       hasCompletedRemoteRestoreRef.current = false;
//       setState(createInitialState());
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (!isGeneratingPlan) {
//       setPlanGenerationStep(0);
//       return;
//     }
//     const stepTimer = window.setInterval(() => {
//       setPlanGenerationStep((prev) =>
//         prev === PLAN_GENERATION_STEPS.length - 1 ? prev : prev + 1
//       );
//     }, 1500);
//     return () => window.clearInterval(stepTimer);
//   }, [isGeneratingPlan]);


//   const handleOnboardingSubmit = async (profile: UserProfile) => {
//     setIsGeneratingPlan(true);
//     try {
//       const res = await fetch("/api/plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ profile }),
//       });

//       let plan: Plan;
//       if (res.ok) {
//         const data = (await res.json()) as { plan?: Plan };
//         plan = data.plan ?? generateMockPlan(profile);
//       } else {
//         console.error("Plan generation failed, falling back to mock:", await res.text());
//         plan = generateMockPlan(profile);
//       }

//       setState((prev) => ({
//         ...prev,
//         stage: "plan",
//         profile,
//         plan,
//         selectedMonthId: plan.months[0]?.id ?? null,
//         chat: [
//           ...prev.chat,
//           {
//             id: `plan-generated-${Date.now()}`,
//             from: "Priyanshu",
//             content: `Nice work, ${profile.name || "there"
//               }! I've mapped out a 12‑month path toward ${profile.desiredRole || "your next step"
//               }. Let's focus on Month 1 first so it feels manageable.`,
//             timestamp: Date.now(),
//           },
//         ],
//       }));
//     } catch (error) {
//       console.error("Error calling /api/plan, using mock plan instead:", error);
//       const plan = generateMockPlan(profile);
//       setState((prev) => ({
//         ...prev,
//         stage: "plan",
//         profile,
//         plan,
//         selectedMonthId: plan.months[0]?.id ?? null,
//         chat: [
//           ...prev.chat,
//           {
//             id: `plan-generated-${Date.now()}`,
//             from: "Priyanshu",
//             content: `Nice work, ${profile.name || "there"
//               }! I've mapped out a 12‑month path toward ${profile.desiredRole || "your next step"
//               }. Let's focus on Month 1 first so it feels manageable.`,
//             timestamp: Date.now(),
//           },
//         ],
//       }));
//     } finally {
//       setIsGeneratingPlan(false);
//     }
//   };



//   const updateTaskStatus = (monthId: string, taskId: string, status: TaskStatus) => {
//     if (!state.plan) return;
//     setState((prev) => {
//       if (!prev.plan) return prev;
//       const months = prev.plan.months.map((month) =>
//         month.id !== monthId
//           ? month
//           : {
//             ...month,
//             tasks: month.tasks.map((task) =>
//               task.id === taskId ? { ...task, status } : task
//             ),
//           }
//       );
//       return {
//         ...prev,
//         plan: { ...prev.plan, months },
//       };
//     });
//   };

//   const handleStartMonth = (monthId: string) => {
//     setState((prev) => {
//       if (!prev.plan) return prev;
//       const months = prev.plan.months.map((month) => {
//         if (month.id !== monthId) return month;
//         const hasStarted = month.tasks.some((task) => task.status !== "not_started");
//         if (hasStarted) return month;

//         const firstTask = month.tasks[0];
//         if (!firstTask) return month;

//         return {
//           ...month,
//           tasks: month.tasks.map((task) =>
//             task.id === firstTask.id
//               ? { ...task, status: "in_progress" as TaskStatus }
//               : task
//           ),
//         };
//       });
//       return {
//         ...prev,
//         plan: { ...prev.plan, months },
//       };
//     });
//   };

//   const handleSendMessage = async () => {
//     const trimmed = input.trim();
//     if (!trimmed || isSending) return;

//     const userMessage: ChatMessage = {
//       id: `user-${Date.now()}`,
//       from: "user",
//       content: trimmed,
//       timestamp: Date.now(),
//     };

//     setState((prev) => ({
//       ...prev,
//       chat: [...prev.chat, userMessage],
//     }));
//     setInput("");
//     setIsSending(true);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           profile: state.profile,
//           plan: state.plan,
//           selectedMonthId: selectedMonth?.id ?? null,
//           messages: [...state.chat, userMessage].map((m) => ({
//             from: m.from,
//             content: m.content,
//           })),
//         }),
//       });

//       if (!res.ok) {
//         console.error("Chat API failed, falling back to local reply:", await res.text());
//         const fallback: ChatMessage = {
//           id: `Priyanshu-${Date.now()}`,
//           from: "Priyanshu",
//           content:
//             "I had trouble reaching the AI service. For now, pick one small task from this month, mark it in progress, and I'll be ready with more guidance once the connection is back.",
//           timestamp: Date.now(),
//         };
//         setState((prev) => ({
//           ...prev,
//           chat: [...prev.chat, fallback],
//         }));
//         setIsSending(false);
//         return;
//       }

//       const data = (await res.json()) as { reply?: string };
//       const replyText =
//         data.reply ||
//         "Let's focus on one or two small actions this week from your current month. Once you mark them complete, we'll decide together what's next.";

//       const reply: ChatMessage = {
//         id: `Priyanshu-${Date.now()}`,
//         from: "Priyanshu",
//         content: replyText,
//         timestamp: Date.now(),
//       };

//       setState((prev) => ({
//         ...prev,
//         chat: [...prev.chat, reply],
//       }));
//     } catch (error) {
//       console.error("Error calling /api/chat:", error);
//       const fallback: ChatMessage = {
//         id: `Priyanshu-${Date.now()}`,
//         from: "Priyanshu",
//         content:
//           "I couldn't reach the AI service just now. Try again in a bit, and in the meantime pick one manageable task from this month to move forward.",
//         timestamp: Date.now(),
//       };
//       setState((prev) => ({
//         ...prev,
//         chat: [...prev.chat, fallback],
//       }));
//     } finally {
//       setIsSending(false);
//     }
//   };

//   if (!isHydrated) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/[0.03]">
//         <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 px-8 py-7 shadow-2xl shadow-black/10 backdrop-blur-sm">
//           <div className="relative">
//             <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary shadow-lg" />
//             <div className="absolute inset-0 h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-xl" />
//           </div>
//           <div className="text-center">
//             <p className="text-base font-semibold">
//               Loading RoadmapX
//             </p>
//             <p className="mt-1 text-xs text-muted-foreground">
//               Preparing your journey...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isLoaded) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-background">
//         <p className="text-sm text-muted-foreground">Loading authentication...</p>
//       </div>
//     );
//   }

//   if (!userId) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/[0.03] px-6">
//         <div className="w-full max-w-md space-y-6 text-center">
//           <div className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm shadow-sm">
//             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-xs font-bold text-white">
//               RX
//             </div>
//             <span className="font-semibold tracking-tight">RoadmapX</span>
//           </div>
//           <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
//             <div className="space-y-4">
//               <div>
//                 <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
//                   Welcome to RoadmapX
//                 </h2>
//                 <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
//                   Your personalized 12-month career journey awaits. Sign in to get started.
//                 </p>
//               </div>
//               <div className="flex flex-col gap-3 pt-4">
//                 <a
//                   href="/sign-in"
//                   className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-emerald-500 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
//                 >
//                   <Sparkles className="h-4 w-4" />
//                   Sign in
//                 </a>
//                 <a
//                   href="/sign-up"
//                   className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-accent/50"
//                 >
//                   <Target className="h-4 w-4" />
//                   Create account
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen flex-col bg-background px-6 py-6 text-foreground sm:px-10 lg:px-16">
//       <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6">
//         <Navbar />

//         <div className="flex flex-1 flex-col gap-6 lg:flex-row">
//           <main className="flex-1 space-y-6">
//             <Header stage={state.stage} profile={state.profile} />

//             {state.stage === "onboarding" || !state.plan ? (
//               <OnboardingCard
//                 onSubmit={handleOnboardingSubmit}
//                 isGeneratingPlan={isGeneratingPlan}
//                 generationStepText={PLAN_GENERATION_STEPS[planGenerationStep]}
//               />
//             ) : (
//               <PlanSection
//                 profile={state.profile}
//                 plan={state.plan}
//                 selectedMonth={selectedMonth}
//                 onSelectMonth={(id) =>
//                   setState((prev) => ({ ...prev, selectedMonthId: id }))
//                 }
//                 onUpdateTaskStatus={updateTaskStatus}
//                 onStartMonth={handleStartMonth}
//               />
//             )}
//           </main>

//           <aside className="flex w-full shrink-0 lg:w-[420px] xl:w-[460px] lg:pl-4">
//             <PriyanshuChatPanel
//               messages={state.chat}
//               input={input}
//               onInputChange={setInput}
//               onSend={handleSendMessage}
//               isSending={isSending}
//             />
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, Target } from "lucide-react";
import {
  Header,
  PriyanshuChatPanel as PriyanshuChatPanel,
  Navbar,
  OnboardingCard,
  PlanSection,
} from "@/components/home/sections";
import type {
  AppState,
  ChatMessage,
  MonthPlan,
  Plan,
  Task,
  TaskStatus,
  UserProfile,
} from "@/lib/career-types";

const PLAN_GENERATION_STEPS = [
  "Analyzing your background and goals...",
  "Building your 12-month roadmap...",
  "Calibrating tasks to your weekly availability...",
  "Finalizing your personalized plan...",
];

function createInitialState(): AppState {
  return {
    stage: "onboarding",
    profile: null,
    plan: null,
    selectedMonthId: null,
    chat: [
      {
        id: "welcome",
        from: "priyanshu",
        content:
          "Hey, I'm Priyanshu—your AI career assistant. Once you create your plan, ask me anything about your next steps.",
        timestamp: Date.now(),
      },
    ],
  };
}

function generateMockPlan(profile: UserProfile): Plan {
  const baseThemes = [
    "Foundations & Clarity",
    "Skill Mapping & Gap Analysis",
    "Core Skills – Fundamentals",
    "Core Skills – Projects",
    "Portfolio & Storytelling",
    "Networking & Visibility",
    "Interview Readiness",
    "Deep Dives & Specialization",
    "Leadership & Ownership",
    "Industry Positioning",
    "Refinement & Stretch Goals",
    "Launch / Transition",
  ];

  const months: MonthPlan[] = Array.from({ length: 12 }, (_, i) => {
    const index = i + 1;
    const theme = baseThemes[i] ?? `Month ${index} Focus`;

    const tasks: Task[] = [
      {
        id: `m${index}-t1`,
        title: "Learn & absorb",
        description:
          i === 0
            ? `Clarify your target move into ${profile.desiredRole || "your next role"} and capture 3–5 concrete outcomes you want in 12 months.`
            : "Complete a focused learning block and summarize your key takeaways in 5–10 bullet points.",
        category: "learning",
        status: "not_started",
      },
      {
        id: `m${index}-t2`,
        title: "Build & practice",
        description:
          "Apply what you learned in a small, scoped project or task that you can talk about in future interviews.",
        category: "practice",
        status: "not_started",
      },
      {
        id: `m${index}-t3`,
        title: "Connect with others",
        description:
          "Have at least one meaningful conversation with someone working in or near your target role.",
        category: "networking",
        status: "not_started",
      },
      {
        id: `m${index}-t4`,
        title: "Reflect & adjust",
        description:
          "Write a short reflection: what moved you closer to your goal this month, and what will you adjust next month?",
        category: "reflection",
        status: "not_started",
      },
    ];

    return {
      id: `month-${index}`,
      index,
      title: `Month ${index}`,
      theme,
      summary: `Focus on ${theme.toLowerCase()} as you move toward ${profile.desiredRole || "your next step"}.`,
      tasks,
    };
  });

  return {
    id: `plan-${Date.now()}`,
    months,
  };
}

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const [state, setState] = useState<AppState>(createInitialState());

  const [isHydrated, setIsHydrated] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [input, setInput] = useState("");
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planGenerationStep, setPlanGenerationStep] = useState(0);
  const hasCompletedRemoteRestoreRef = useRef(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !isLoaded || !userId || hasCompletedRemoteRestoreRef.current) return;

    fetch("/api/state")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const remoteState = data?.state;
        if (remoteState) {
          setState((prev) => ({
            ...prev,
            ...remoteState,
            chat:
              Array.isArray(remoteState.chat) && remoteState.chat.length
                ? remoteState.chat
                : prev.chat,
          }));
        }
      })
      .catch((error) => {
        console.error("Failed to restore remote state:", error);
      })
      .finally(() => {
        hasCompletedRemoteRestoreRef.current = true;
      });
  }, [isHydrated, isLoaded, userId]);

  useEffect(() => {
    if (!isHydrated || !isLoaded || !userId || !hasCompletedRemoteRestoreRef.current) return;
    const timer = window.setTimeout(() => {
      fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state }),
      }).catch((error) => {
        console.error("Failed to sync state to MongoDB:", error);
      });
    }, 700);

    return () => window.clearTimeout(timer);
  }, [isHydrated, isLoaded, userId, state]);

  const selectedMonth = useMemo(() => {
    if (!state.plan) return null;
    const id = state.selectedMonthId ?? state.plan.months[0]?.id;
    return state.plan.months.find((m) => m.id === id) ?? null;
  }, [state.plan, state.selectedMonthId]);

  useEffect(() => {
    if (!userId) {
      hasCompletedRemoteRestoreRef.current = false;
      setState(createInitialState());
    }
  }, [userId]);

  useEffect(() => {
    if (!isGeneratingPlan) {
      setPlanGenerationStep(0);
      return;
    }
    const stepTimer = window.setInterval(() => {
      setPlanGenerationStep((prev) =>
        prev === PLAN_GENERATION_STEPS.length - 1 ? prev : prev + 1
      );
    }, 1500);
    return () => window.clearInterval(stepTimer);
  }, [isGeneratingPlan]);

  const handleOnboardingSubmit = async (profile: UserProfile) => {
    setIsGeneratingPlan(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });

      let plan: Plan;
      if (res.ok) {
        const data = (await res.json()) as { plan?: Plan };
        plan = data.plan ?? generateMockPlan(profile);
      } else {
        console.error("Plan generation failed, falling back to mock:", await res.text());
        plan = generateMockPlan(profile);
      }

      setState((prev) => ({
        ...prev,
        stage: "plan",
        profile,
        plan,
        selectedMonthId: plan.months[0]?.id ?? null,
        chat: [
          ...prev.chat,
          {
            id: `plan-generated-${Date.now()}`,
            from: "Priyanshu",
            content: `Nice work, ${profile.name || "there"}! I've mapped out a 12‑month path toward ${
              profile.desiredRole || "your next step"
            }. Let's focus on Month 1 first so it feels manageable.`,
            timestamp: Date.now(),
          },
        ],
      }));
    } catch (error) {
      console.error("Error calling /api/plan, using mock plan instead:", error);
      const plan = generateMockPlan(profile);
      setState((prev) => ({
        ...prev,
        stage: "plan",
        profile,
        plan,
        selectedMonthId: plan.months[0]?.id ?? null,
        chat: [
          ...prev.chat,
          {
            id: `plan-generated-${Date.now()}`,
            from: "Priyanshu",
            content: `Nice work, ${profile.name || "there"}! I've mapped out a 12‑month path toward ${
              profile.desiredRole || "your next step"
            }. Let's focus on Month 1 first so it feels manageable.`,
            timestamp: Date.now(),
          },
        ],
      }));
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const updateTaskStatus = (monthId: string, taskId: string, status: TaskStatus) => {
    if (!state.plan) return;
    setState((prev) => {
      if (!prev.plan) return prev;
      const months = prev.plan.months.map((month) =>
        month.id !== monthId
          ? month
          : {
              ...month,
              tasks: month.tasks.map((task) =>
                task.id === taskId ? { ...task, status } : task
              ),
            }
      );
      return { ...prev, plan: { ...prev.plan, months } };
    });
  };

  const handleStartMonth = (monthId: string) => {
    setState((prev) => {
      if (!prev.plan) return prev;
      const months = prev.plan.months.map((month) => {
        if (month.id !== monthId) return month;
        const hasStarted = month.tasks.some((task) => task.status !== "not_started");
        if (hasStarted) return month;
        const firstTask = month.tasks[0];
        if (!firstTask) return month;
        return {
          ...month,
          tasks: month.tasks.map((task) =>
            task.id === firstTask.id
              ? { ...task, status: "in_progress" as TaskStatus }
              : task
          ),
        };
      });
      return { ...prev, plan: { ...prev.plan, months } };
    });
  };

  const handleSendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      from: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    setState((prev) => ({ ...prev, chat: [...prev.chat, userMessage] }));
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: state.profile,
          plan: state.plan,
          selectedMonthId: selectedMonth?.id ?? null,
          messages: [...state.chat, userMessage].map((m) => ({
            from: m.from,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        console.error("Chat API failed:", await res.text());
        const fallback: ChatMessage = {
          id: `Priyanshu-${Date.now()}`,
          from: "Priyanshu",
          content:
            "I had trouble reaching the AI service. For now, pick one small task from this month, mark it in progress, and I'll be ready with more guidance once the connection is back.",
          timestamp: Date.now(),
        };
        setState((prev) => ({ ...prev, chat: [...prev.chat, fallback] }));
        setIsSending(false);
        return;
      }

      const data = (await res.json()) as { reply?: string };
      const replyText =
        data.reply ||
        "Let's focus on one or two small actions this week from your current month. Once you mark them complete, we'll decide together what's next.";

      const reply: ChatMessage = {
        id: `Priyanshu-${Date.now()}`,
        from: "Priyanshu",
        content: replyText,
        timestamp: Date.now(),
      };

      setState((prev) => ({ ...prev, chat: [...prev.chat, reply] }));
    } catch (error) {
      console.error("Error calling /api/chat:", error);
      const fallback: ChatMessage = {
        id: `Priyanshu-${Date.now()}`,
        from: "Priyanshu",
        content:
          "I couldn't reach the AI service just now. Try again in a bit, and in the meantime pick one manageable task from this month to move forward.",
        timestamp: Date.now(),
      };
      setState((prev) => ({ ...prev, chat: [...prev.chat, fallback] }));
    } finally {
      setIsSending(false);
    }
  };

  // ── Loading states ────────────────────────────────────────────────────────
  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-orange-50/20 to-amber-50/20">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-8 py-7 shadow-xl">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-orange-400" />
          <div className="text-center">
            <p className="text-base font-semibold text-gray-900">Loading RoadmapX</p>
            <p className="mt-1 text-xs text-gray-500">Preparing your journey...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Loading authentication...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-orange-50/20 to-amber-50/20 px-6">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-amber-300 text-xs font-bold text-white">
              RX
            </div>
            <span className="font-semibold tracking-tight text-gray-800">RoadmapX</span>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome to RoadmapX
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Your personalized 12-month career journey awaits. Sign in to get started.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="/sign-in"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-400 to-amber-300 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-100 transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                Sign in
              </a>
              <a
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Target className="h-4 w-4" />
                Create account
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main app ──────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-gray-50/50 px-6 py-6 text-foreground sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6">
        <Navbar />

        {/* 3-column grid: main (2 cols) + chat sidebar (1 col) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <main className="space-y-6 lg:col-span-2">
            <Header stage={state.stage} profile={state.profile} />

            {state.stage === "onboarding" || !state.plan ? (
              <OnboardingCard
                onSubmit={handleOnboardingSubmit}
                isGeneratingPlan={isGeneratingPlan}
                generationStepText={PLAN_GENERATION_STEPS[planGenerationStep]}
              />
            ) : (
              <PlanSection
                profile={state.profile}
                plan={state.plan}
                selectedMonth={selectedMonth}
                onSelectMonth={(id) =>
                  setState((prev) => ({ ...prev, selectedMonthId: id }))
                }
                onUpdateTaskStatus={updateTaskStatus}
                onStartMonth={handleStartMonth}
              />
            )}
          </main>

          <aside className="lg:col-span-1">
            <div className="sticky top-6">
              <PriyanshuChatPanel
                messages={state.chat}
                input={input}
                onInputChange={setInput}
                onSend={handleSendMessage}
                isSending={isSending}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}