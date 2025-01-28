import { motion } from "motion/react";
import { cn } from "@rehooks/utils";

type ShimmerProps = {
  className?: string;
  text: string;
  color?: string;
  midColor?: string;
};

export function Shimmer({
  className,
  text,
  color = "#222",
  midColor = "#fff",
}: ShimmerProps) {
  return (
    <motion.span
      className={cn("bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(110deg, ${color} 35%, ${midColor} 50%, ${color} 75%, ${color})`,
        backgroundSize: "200% 100%",
      }}
      initial={{ backgroundPosition: "200% 0" }}
      animate={{ backgroundPosition: "-200% 0" }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
}
