import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PersistedState = {
  stage: "onboarding" | "plan";
  profile: unknown;
  plan: unknown;
  selectedMonthId: string | null;
  chat: unknown[];
};

function isObjectLike(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPersistedState(value: unknown): value is PersistedState {
  if (!isObjectLike(value)) return false;
  return (
    (value.stage === "onboarding" || value.stage === "plan") &&
    Array.isArray(value.chat) &&
    (value.selectedMonthId === null || typeof value.selectedMonthId === "string")
  );
}

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const doc = await db.collection("user_states").findOne<{ state: PersistedState }>({
      userId,
    });

    if (!doc) {
      return NextResponse.json({ state: null });
    }

    return NextResponse.json({ state: doc.state ?? null });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load state";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { state?: unknown };
    const state = body?.state;

    if (!isPersistedState(state)) {
      return NextResponse.json(
        { error: "Invalid payload. state is required." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const now = new Date();

    await db.collection("user_states").updateOne(
      { userId },
      {
        $set: {
          userId,
          state,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save state";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

