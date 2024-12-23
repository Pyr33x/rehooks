import type { ReactNode } from "react";
import { cn } from "@rehooks/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps {
  name: string;
  className: string;
  background: ReactNode;
  Icon: ReactNode;
  description: string;
}

function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3", className)}>
      {children}
    </div>
  );
}

function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
}: BentoCardProps) {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden",
        "bg-white",
        "transform-gpu dark:bg-neutral-950",
        className,
      )}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-4">
        <Icon className="size-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-[.8] group-hover:text-violet-600" />
        <h3 className="text-fd-foreground mt-2 text-xl font-semibold">
          {name}
        </h3>
        <p className="text-fd-muted-foreground max-w-lg">{description}</p>
      </div>
    </div>
  );
}

export { BentoCard, BentoGrid };
