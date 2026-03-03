import { cn } from "@/lib/utils";

type SpinnerVariant = "arc" | "ring" | "dots" | "twirl";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: SpinnerVariant;
  className?: string;
}

const sizeMap = {
  sm: 20,
  md: 32,
  lg: 48,
};

const variantClass: Record<SpinnerVariant, string> = {
  arc: "whirl-spinner",
  ring: "whirl-ring",
  dots: "whirl-dots",
  twirl: "whirl-twirl",
};

export function Spinner({ size = "md", variant = "arc", className }: SpinnerProps) {
  const px = sizeMap[size];
  return (
    <div
      className={cn(variantClass[variant], className)}
      style={{ width: px, height: px }}
      role="status"
      aria-label="Loading"
    />
  );
}

export function SpinnerOverlay({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Spinner size="lg" variant="ring" />
      <p className="text-xs text-[#9b92a8] font-medium">{label}</p>
    </div>
  );
}
