"use client";

import { useRef, useState, useMemo } from "react";
import { useDebounceCallback } from "rehooks-ts";
import { motion } from "framer-motion";
import { cn } from "@rehooks/utils";

export function Text({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useDebounceCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        setCursor({
          x: e.clientX,
          y: e.clientY,
        });
      }
    },
    16,
  );

  const maskPosition = useMemo(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      return {
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      };
    }
    return { cx: "50%", cy: "50%" };
  }, [cursor]);

  return (
    <svg
      className={cn("select-none", className)}
      height="100%"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      ref={svgRef}
      viewBox="0 0 300 100"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          cx="50%"
          cy="50%"
          gradientUnits="userSpaceOnUse"
          id="textGradient"
          r="25%"
        >
          {hovered ? (
            <stop offset="100%" stopColor="var(--violet-500)" />
          ) : null}
        </linearGradient>

        <motion.radialGradient
          animate={maskPosition}
          gradientUnits="userSpaceOnUse"
          id="revealMask"
          r="20%"
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            fill="url(#revealMask)"
            height="100%"
            width="100%"
            x="0"
            y="0"
          />
        </mask>
      </defs>
      <text
        className="fill-transparent stroke-neutral-400 font-mono text-7xl font-black dark:stroke-neutral-800"
        dominantBaseline="middle"
        strokeWidth="1"
        style={{ opacity: hovered ? 0.7 : 0 }}
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {text}
      </text>
      <motion.text
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        className="fill-transparent stroke-neutral-400 font-mono text-7xl font-black dark:stroke-neutral-800"
        dominantBaseline="middle"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        strokeWidth="1"
        textAnchor="middle"
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
        x="50%"
        y="50%"
      >
        {text}
      </motion.text>
      <text
        className="fill-transparent font-mono text-7xl font-black"
        dominantBaseline="middle"
        mask="url(#textMask)"
        stroke="url(#textGradient)"
        strokeWidth="1"
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {text}
      </text>
    </svg>
  );
}
