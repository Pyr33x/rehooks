"use client";

import { motion } from "motion/react";
import { cn } from "@rehooks/utils";
import { useId } from "react";

interface GridProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: [x: number, y: number][];
  strokeDasharray?: string;
  className?: string;
  [key: string]: unknown;
}

export function Grid({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  ...props
}: GridProps) {
  const id = useId();

  return (
    <motion.svg
      animate={{ opacity: 1 }}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className,
      )}
      initial={{ opacity: 0 }}
      {...props}
    >
      <defs>
        <pattern
          height={height}
          id={id}
          patternUnits="userSpaceOnUse"
          width={width}
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect fill={`url(#${id})`} height="100%" strokeWidth={0} width="100%" />
      {squares ? (
        <svg className="overflow-visible" x={x} y={y}>
          {squares.map(([x, y]) => (
            <rect
              height={height - 1}
              key={`${x}-${y}`}
              strokeWidth="0"
              width={width - 1}
              x={x * width + 1}
              y={y * height + 1}
            />
          ))}
        </svg>
      ) : null}
    </motion.svg>
  );
}
