import type { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";
import { cn } from "@rehooks/utils";
import React from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "bg-fd-card text-fd-foreground border-fd-border rounded-2xl border",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
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

const CardLabel = React.forwardRef<
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

const CardTitle = React.forwardRef<
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

const CardContent = React.forwardRef<
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
  cls = "#4686FF",
  sign = "#666666",
  string = "#7c3aed",
  keyword = "#a78bfa",
  comment = "#666666",
  identifier = "#f472b6",
  jsxliterals = "#ddd6fe",
  property = "#c4b5fd",
  entity = "#8b5cf6",
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
