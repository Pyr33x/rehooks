"use client";

import { cn } from "@rehooks/utils";

type TColorProp = string | string[];

interface ShineProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
}

export function Shine({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineProps) {
  return (
    <div
      className={cn(
        "relative min-h-full max-w-full rounded-[--border-radius]",
        className,
      )}
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={`before:bg-shine-size motion-safe:before:animate-shine pointer-events-none before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:![mask-composite:exclude] before:[mask:--mask-linear-gradient]`}
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`,
          } as React.CSSProperties
        }
      />
      {children}
    </div>
  );
}
