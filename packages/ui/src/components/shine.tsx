"use client";

import type { ReactNode, CSSProperties } from "react";
import { useMemo, memo } from "react";
import { cn } from "@rehooks/utils";

type TColorProp = string | string[];

interface ShineProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: ReactNode;
}

export const Shine = memo(function Shine({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineProps) {
  const backgroundRadialGradient = useMemo(() => {
    const colors = Array.isArray(color) ? color.join(",") : color;
    return `radial-gradient(transparent, transparent, ${colors}, transparent, transparent)`;
  }, [color]);

  const maskLinearGradient = `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`;

  return (
    <div
      className={cn(
        "relative min-h-full max-w-full rounded-[--border-radius]",
        className,
      )}
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as CSSProperties
      }
    >
      <div
        className={`before:bg-shine-size motion-safe:before:animate-shine pointer-events-none before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:![mask-composite:exclude] before:[mask:--mask-linear-gradient]`}
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--duration": `${duration}s`,
            "--mask-linear-gradient": maskLinearGradient,
            "--background-radial-gradient": backgroundRadialGradient,
          } as CSSProperties
        }
      />
      {children}
    </div>
  );
});
