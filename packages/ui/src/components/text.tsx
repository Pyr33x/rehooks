import { cn } from "@rehooks/utils";

export function Text({
  text,
  className,
}: {
  text: string;
  className?: string;
}): JSX.Element {
  return (
    <svg
      className={cn("select-none", className)}
      height="100"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        className="text-fd-muted-foreground/30 transform font-mono text-7xl font-bold transition-colors ease-in-out group-hover:text-blue-600"
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {text}
      </text>
    </svg>
  );
}
