"use client";

import { motion } from "motion/react";
import { cn } from "@rehooks/utils";

type Method = "GET";
type Endpoint = `/api/${string}`;

interface APICardProps {
  endpoint: Endpoint;
  className?: string;
  method: Method;
}

export function APICard({ endpoint, className, method }: APICardProps) {
  const methods: Record<Method, string> = {
    GET: "bg-blue-600 text-blue-100",
  };

  const parts = endpoint.split("/");

  return (
    <div
      className={cn(
        "bg-fd-background border-fd-border w-66 inline-flex h-10 select-none items-center overflow-hidden rounded-full border drop-shadow-md",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-full items-center px-4 font-mono text-lg font-bold",
          methods[method],
        )}
      >
        {method}
      </div>
      <div className="flex items-center space-x-1 p-2 font-mono text-lg">
        <span className="text-fd-muted-foreground">/</span>
        <span className="text-fd-foreground">api</span>
        {parts.slice(2).map((part, index) => (
          <span key={index} className="flex items-center">
            <span className="text-fd-muted-foreground">/</span>
            {part.startsWith(":") ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, damping: 10, ease: "easeInOut" }}
                className="text-fd-foreground rounded-full px-1 font-bold"
              >
                {part}
              </motion.span>
            ) : (
              <span className="text-fd-foreground ml-1">{part}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
