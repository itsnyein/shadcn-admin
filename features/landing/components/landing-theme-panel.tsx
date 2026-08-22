"use client";

import { ImportModal } from "@/components/shared/theme-customizer/import-modal";
import { ThemeTab } from "@/components/shared/theme-customizer/theme-tab";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { tweakcnThemes } from "@/config/theme-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { useThemeManager } from "@/hooks/use-theme-manager";
import type { ImportedTheme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Palette, RotateCcw, X } from "lucide-react";
import * as React from "react";

export function LandingThemePanel() {
  const {
    applyImportedTheme,
    applyTheme,
    applyTweakcnTheme,
    isDarkMode,
    resetTheme,
    applyRadius,
    setBrandColorsValues,
  } = useThemeManager();

  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const [selectedTheme, setSelectedTheme] = React.useState("");
  const [selectedTweakcnTheme, setSelectedTweakcnTheme] = React.useState("");
  const [selectedRadius, setSelectedRadius] = React.useState("0.5rem");
  const [importModalOpen, setImportModalOpen] = React.useState(false);
  const [importedTheme, setImportedTheme] =
    React.useState<ImportedTheme | null>(null);

  const handleReset = () => {
    setSelectedTheme("");
    setSelectedTweakcnTheme("");
    setSelectedRadius("0.5rem");
    setImportedTheme(null);
    setBrandColorsValues({});
    resetTheme();
    applyRadius("0.5rem");
  };

  const handleImport = (themeData: ImportedTheme) => {
    setImportedTheme(themeData);
    setSelectedTheme("");
    setSelectedTweakcnTheme("");
    applyImportedTheme(themeData, isDarkMode);
  };

  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (importedTheme) {
      applyImportedTheme(importedTheme, isDarkMode);
    } else if (selectedTheme) {
      applyTheme(selectedTheme, isDarkMode);
    } else if (selectedTweakcnTheme) {
      const preset = tweakcnThemes.find(
        (t) => t.value === selectedTweakcnTheme,
      )?.preset;
      if (preset) applyTweakcnTheme(preset, isDarkMode);
    }
  }, [
    isDarkMode,
    importedTheme,
    selectedTheme,
    selectedTweakcnTheme,
    applyImportedTheme,
    applyTheme,
    applyTweakcnTheme,
  ]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Customize theme"
        className="bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring fixed top-1/2 right-4 z-50 flex size-11 -translate-y-1/2 items-center justify-center rounded-xl border shadow-lg transition-colors focus-visible:ring-2 focus-visible:outline-none sm:right-6"
      >
        <Palette className="size-5" />
      </button>

      <Sheet open={open} onOpenChange={setOpen} modal={false}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={cn(
            "pointer-events-auto flex flex-col gap-0 overflow-hidden p-0 [&>button]:hidden",
            isMobile
              ? "h-[60svh] rounded-t-xl border-t"
              : "w-100 sm:max-w-none",
          )}
          onInteractOutside={(e) => {
            if (importModalOpen) e.preventDefault();
          }}
        >
          <SheetHeader className="space-y-0 p-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="bg-muted rounded-lg p-2">
                <Palette className="size-4" />
              </div>
              <SheetTitle className="text-lg font-semibold">
                Customizer
              </SheetTitle>

              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  aria-label="Reset theme"
                  className="size-8 cursor-pointer"
                >
                  <RotateCcw className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close customizer"
                  className="size-8 cursor-pointer"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            <SheetDescription className="sr-only">
              Switch between light and dark, pick a preset, radius and brand
              colours.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <ThemeTab
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              selectedTweakcnTheme={selectedTweakcnTheme}
              setSelectedTweakcnTheme={setSelectedTweakcnTheme}
              selectedRadius={selectedRadius}
              setSelectedRadius={setSelectedRadius}
              setImportedTheme={setImportedTheme}
              onImportClick={() => setImportModalOpen(true)}
            />
          </div>
        </SheetContent>
      </Sheet>

      <ImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onImport={handleImport}
      />
    </>
  );
}
