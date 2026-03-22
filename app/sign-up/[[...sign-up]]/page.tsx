import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/[0.03] px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
              CC
            </div>
            <span className="font-semibold tracking-tight">Career Compass AI</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Start your journey
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your account to get personalized career guidance
            </p>
          </div>
        </div>

        {/* Clerk Sign Up Component */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none bg-transparent border-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "rounded-lg border border-border bg-background/50 hover:bg-accent/50 transition-colors",
                socialButtonsBlockButtonText: "text-sm font-medium",
                formButtonPrimary:
                  "rounded-lg bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 transition-all",
                formFieldInput:
                  "rounded-lg border border-border bg-background/50 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20",
                formFieldLabel: "text-sm font-semibold text-foreground/80",
                footerActionLink: "text-primary hover:text-primary/80 font-medium",
                identityPreviewText: "text-sm",
                identityPreviewEditButton: "text-primary hover:text-primary/80",
                formResendCodeLink: "text-primary hover:text-primary/80",
              },
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
          />
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
