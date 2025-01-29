"use client";

import { motion } from "motion/react";
import { useId } from "react";

interface TraceProps {
  width: number;
  height: number;
  baseColor?: string;
  gradientColors?: [string, string, string];
  animationDuration?: number;
  strokeWidth?: number;
}

export function Trace({
  width,
  height,
  baseColor = "#525252",
  gradientColors = ["#2EB9DF", "#2EB9DF", "#9E00FF"],
  animationDuration = 2,
  strokeWidth = 2,
}: TraceProps) {
  const gradientId = `pulse-${useId()}`;

  return (
    <div className="pointer-events-none relative" style={{ width, height }}>
      <svg
        fill="none"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
      >
        <line
          stroke={baseColor}
          strokeOpacity="0.2"
          x1={0}
          x2={width}
          y1={height / 2}
          y2={height / 2}
        />
        <line
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          x1={0}
          x2={width}
          y1={height / 2}
          y2={height / 2}
        />
        <defs>
          <motion.linearGradient
            animate={{
              x1: [0, width * 2],
              x2: [0, width],
            }}
            gradientUnits="userSpaceOnUse"
            id={gradientId}
            initial={{ x1: 0, x2: width * 2 }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" />
            <stop stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
}
