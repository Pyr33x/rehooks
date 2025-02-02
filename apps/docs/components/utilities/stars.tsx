import { getStars } from "@rehooks/utils";
import { cn } from "@rehooks/utils";

type StarsProps = {
  owner: string;
  repo: string;
  className?: string;
};

export async function Stars({ owner, repo, className }: StarsProps) {
  const stars = await getStars({ owner, repo });
  return <span className={cn("select-none", className)}>{stars}</span>;
}
