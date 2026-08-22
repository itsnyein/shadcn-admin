import { Command } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SignIn from "@/features/auth/components/sign-in";
import { Suspense } from "react";

function SignInFallback() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1.05fr_1fr]">
      <aside className="bg-muted/30 hidden border-r border-dashed lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3">
          <span className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg">
            <Command className="size-5" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-[15px] font-semibold tracking-tight">
              Shadcn Admin
            </span>
            <span className="text-muted-foreground font-mono text-[10px] tracking-[0.14em] uppercase">
              Admin Dashboard
            </span>
          </span>
        </div>

        <div className="max-w-md space-y-6">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-3/4" />
          <div className="space-y-3 border-y border-dashed py-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>

        <span className="text-muted-foreground font-mono text-[10px] tracking-[0.14em] uppercase">
          Free &amp; open source &middot; MIT
        </span>
      </aside>

      <main className="flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-sm space-y-6">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-9 w-52" />
          <Skeleton className="h-14 w-full" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
        </div>
      </main>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignIn />
    </Suspense>
  );
}
