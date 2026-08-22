"use client";

import { PasswordRequirements } from "@/components/shared/password-requirements";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Command,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { blockDisallowedPasswordChars } from "../schemas/password-validation";
import {
  IdentifySchema,
  NewPasswordSchema,
  SecurityQuestionSchema,
  identifySchema,
  newPasswordSchema,
  securityQuestionSchema,
} from "../schemas/reset-password-2-schema";

const securityQuestions = [
  "What was the name of your first pet?",
  "What city were you born in?",
  "What is your mother's maiden name?",
  "What was the name of your elementary school?",
  "What is your favorite movie?",
];

export default function ResetPassword2() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const identifyForm = useForm<IdentifySchema>({
    resolver: zodResolver(identifySchema),
    defaultValues: { email: "", username: "" },
  });

  const securityForm = useForm<SecurityQuestionSchema>({
    resolver: zodResolver(securityQuestionSchema),
    defaultValues: { question: "", answer: "" },
  });

  const passwordForm = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handleIdentifySubmit = async (data: IdentifySchema) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setEmail(data.email);
      setCurrentStep(2);
      toast.success("Account found!");
    } catch {
      toast.error("Account not found. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = async (data: SecurityQuestionSchema) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Security answer:", data.answer);
      setCurrentStep(3);
      toast.success("Identity verified!");
    } catch {
      toast.error("Incorrect answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (data: NewPasswordSchema) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Password reset:", data.password);
      setCurrentStep(4);
      toast.success("Password reset successfully!");
    } catch {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Command className="size-5" />
          </div>
          <span className="text-lg font-semibold">Shadcn Admin</span>
        </div>

        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-2xl font-bold">Reset Your Password</h1>

            <div className="flex items-center justify-center gap-2 pt-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "h-1.5 w-12 rounded-full transition-all",
                    currentStep >= step ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </div>
          </div>

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-lg font-medium">
                  First, let&apos;s identify your account
                </p>
                <p className="text-sm text-muted-foreground">
                  Please enter your email address and username to locate your
                  account.
                </p>
              </div>

              <Form {...identifyForm}>
                <form
                  onSubmit={identifyForm.handleSubmit(handleIdentifySubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={identifyForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            disabled={isLoading}
                            className="h-12 bg-muted/30 border-muted-foreground/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={identifyForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your username"
                            disabled={isLoading}
                            className="h-12 bg-muted/30 border-muted-foreground/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="h-12 w-full font-medium"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="size-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Searching...
                      </span>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-lg font-medium">
                  Verify your identity with a security question
                </p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary size-4" />
                  <span className="text-sm font-medium">Account Found</span>
                </div>
                <p className="text-sm text-muted-foreground">{email}</p>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-muted-foreground size-4" />
                  <span className="text-muted-foreground text-sm">
                    Pending Verification
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Please answer your security question to verify your identity.
              </p>

              <Form {...securityForm}>
                <form
                  onSubmit={securityForm.handleSubmit(handleSecuritySubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={securityForm.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-muted/30 border-muted-foreground/20">
                              <SelectValue placeholder="Select a security question" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {securityQuestions.map((question) => (
                              <SelectItem key={question} value={question}>
                                {question}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={securityForm.control}
                    name="answer"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your answer"
                            disabled={isLoading}
                            className="h-12 bg-muted/30 border-muted-foreground/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground">
                          Answers are case-sensitive and must match exactly what
                          you provided when setting up your account.
                        </p>
                      </FormItem>
                    )}
                  />
                  <Button
                    className="h-12 w-full font-medium"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="size-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      "Verify Identity"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-lg font-medium">
                  Create a new secure password
                </p>
                <p className="text-sm text-muted-foreground">
                  Your identity has been verified. Please create a new password
                  for your account.
                </p>
              </div>

              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter password"
                              disabled={isLoading}
                              className="h-12 bg-muted/30 border-muted-foreground/20 pr-10"
                              onBeforeInput={blockDisallowedPasswordChars}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="size-4" />
                              ) : (
                                <Eye className="size-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <PasswordRequirements password={field.value} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              disabled={isLoading}
                              className="h-12 bg-muted/30 border-muted-foreground/20 pr-10"
                              onBeforeInput={blockDisallowedPasswordChars}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="size-4" />
                              ) : (
                                <Eye className="size-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="h-12 w-full font-medium"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="size-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Resetting...
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-lg font-medium">
                  Your password has been reset successfully
                </p>
              </div>

              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="text-primary size-8" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-semibold">Password Reset Complete</h3>
                <p className="text-sm text-muted-foreground">
                  Your password has been successfully reset. You can now log in
                  with your new credentials.
                </p>
              </div>

              <Link href="/sign-in">
                <Button className="h-12 w-full font-medium">Sign In</Button>
              </Link>

              <div className="rounded-lg border bg-muted/30 p-4 space-y-3 mt-6">
                <div className="flex items-center gap-2">
                  <Lock className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Security Recommendations
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <KeyRound className="size-3" />
                    Use a different password for each account
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="size-3" />
                    Enable two-factor authentication where available
                  </li>
                  <li className="flex items-center gap-2">
                    <Lock className="size-3" />
                    Consider using a password manager
                  </li>
                </ul>
              </div>
            </div>
          )}

          {currentStep !== 4 && (
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Remember your password?{" "}
              </span>
              <Link
                href="/sign-in"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign in instead
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
