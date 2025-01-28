"use client";

import { BentoCard, BentoGrid } from "@rehooks/ui/components";
import { features } from "@/app/(home)/_components/cards";

export function Grid() {
  return (
    <BentoGrid>
      {features.map((features, index) => (
        <BentoCard key={index} {...features} />
      ))}
    </BentoGrid>
  );
}
