import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export function ComingSoon() {
  return (
    <div className="h-[calc(100vh-180px)]">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center px-4">
        <Card className="w-full max-w-md border-border/50 shadow-lg bg-card">
          <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
            <Spinner className="size-12 text-primary" />
            <h1 className="text-4xl leading-tight font-bold">Coming Soon</h1>
            <p className="text-muted-foreground text-center">
              This page has not been created yet. <br />
              Stay tuned though!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
