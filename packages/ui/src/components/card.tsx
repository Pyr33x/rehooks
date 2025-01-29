import type { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";
import { cn } from "@rehooks/utils";
import { forwardRef } from "react";

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "bg-fd-card text-fd-foreground border-fd-border rounded-2xl border",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("border-b-fd-border flex flex-col border-b-2 p-4", className)}
    ref={ref}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardLabel = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "text-fd-muted-foreground select-none text-sm font-normal",
      className,
    )}
    ref={ref}
    {...props}
  />
));
CardLabel.displayName = "CardLabel";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    className={cn(
      "text-fd-foreground select-none text-lg font-bold leading-none",
      className,
    )}
    ref={ref}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("relative text-pretty rounded-md p-4 text-sm", className)}
    ref={ref}
    {...props}
  />
));
CardContent.displayName = "CardContent";

interface CodeBlockProps {
  children: string;
  cls?: string;
  sign?: string;
  string?: string;
  keyword?: string;
  comment?: string;
  identifier?: string;
  jsxliterals?: string;
  property?: string;
  entity?: string;
}

function CodeBlock({
  children,
  cls = "#3b82f6",
  sign = "#a0a0a0",
  string = "#60a5fa",
  keyword = "#64b5f6",
  comment = "#a0a0a0",
  identifier = "#1e88e5",
  jsxliterals = "#60a5fa",
  property = "#90caf9",
  entity = "#3b82f6",
  ...props
}: CodeBlockProps & ComponentPropsWithoutRef<"code">) {
  const codeHTML = highlight(children as string);
  return (
    <pre>
      <code
        className={cn("font-mono text-sm")}
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        style={
          {
            "--sh-class": cls,
            "--sh-sign": sign,
            "--sh-string": string,
            "--sh-keyword": keyword,
            "--sh-comment": comment,
            "--sh-identifier": identifier,
            "--sh-jsxliterals": jsxliterals,
            "--sh-property": property,
            "--sh-entity": entity,
          } as React.CSSProperties
        }
        {...props}
      />
    </pre>
  );
}

export { Card, CardHeader, CardTitle, CardLabel, CardContent, CodeBlock };
