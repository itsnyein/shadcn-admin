import { SignUp2 } from "@/features/auth/components/sign-up-2";
import Image from "next/image";
import Link from "next/link";

export default function SignUp2Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
              SA
            </div>
            <span>Shadcn Admin</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignUp2 />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Authentication background"
          fill
          className="object-cover dark:brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <blockquote className="space-y-4">
            <p className="text-xl font-medium leading-relaxed">
              &ldquo;Join thousands of users who trust our platform to manage
              their business efficiently.&rdquo;
            </p>
            <footer className="text-sm text-white/80">- Nyein Phyo Aung</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
