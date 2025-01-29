import { cn } from "@rehooks/utils";
import { motion } from "motion/react";

interface SparkleProps {
  className?: string;
}

export function SparkleIcon({ className }: SparkleProps) {
  return (
    <svg
      className={cn("transform transition group-hover:rotate-90", className)}
      fill="none"
      height="30"
      viewBox="0 0 30 30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        className="group-hover:fill-blue-600"
        d="M30 15C30 15.1023 29.9264 15.1882 29.8241 15.2005C18.2815 16.9149 16.9149 18.2856 15.2005 29.8241C15.1841 29.9223 15.0982 30 15 30C14.9018 30 14.8118 29.9264 14.7995 29.8241C13.0851 18.2815 11.7144 16.9149 0.175941 15.2005C0.0777412 15.1841 0 15.0982 0 15C0 14.9018 0.0736495 14.8118 0.175941 14.7995C11.7185 13.0851 13.0851 11.7144 14.7995 0.175941C14.8159 0.0777415 14.9018 0 15 0C15.0982 0 15.1882 0.0736499 15.2005 0.175941C16.9149 11.7185 18.2856 13.0851 29.8241 14.7995C29.9223 14.8159 30 14.9018 30 15Z"
        fill="#404040"
        initial={{ rotate: 0 }}
        transition={{
          duration: 1,
          damping: 10,
          ease: "easeInOut",
        }}
        whileInView={{
          rotate: 360,
        }}
      />
    </svg>
  );
}
