"use client";

import { useState, useEffect } from "React";
import { getStars } from "@rehooks/utils";

type StarsProps = {
  owner: string;
  repo: string;
  className?: string;
};

export function Stars({ owner, repo }: StarsProps) {
  const [stars, setStars] = useState<number>(0);

  useEffect(() => {
    getStars({ owner, repo }).then(setStars);
  }, []);

  return `${stars}`;
}
