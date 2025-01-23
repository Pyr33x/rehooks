import { Editor } from "@/app/(home)/_components/editor";
import { Grid } from "@/app/(home)/_components/bento";
import { Hero } from "@/app/(home)/_components/hero";
import { ArrowUpRight } from "@rehooks/ui/icons";
import { ReactNode } from "react";

export default function HomePage() {
  return (
    <div className="mx-8 my-12 flex min-h-screen flex-col items-center justify-center">
      <div className="mb-6">
        <Badge
          icon={
            <ArrowUpRight className="size-3 transition-transform duration-100 group-hover:-translate-y-px group-hover:translate-x-px" />
          }
        >
          Rehooks v4.5 Released!
        </Badge>
      </div>
      <Hero />
      <Editor />
      <h2 className="text-fd-muted-foreground select-none text-xl font-medium uppercase">
        Features
      </h2>
      <h3 className="text-fd-foreground my-1 text-wrap text-center text-3xl font-semibold">
        Crafted for Efficiency
      </h3>
      <h4 className="text-fd-muted-foreground mt-1.5 max-w-lg text-pretty text-center text-xl italic">
        I've created Rehooks to streamline the process of creating custom hooks,
        and get rid of heavy packages.
      </h4>
      <div className="mt-10 max-w-6xl">
        <Grid />
      </div>
    </div>
  );
}

function Badge({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <a
      href="#"
      className="divide-fd-border border-fd-border bg-fd-background hover:bg-fd-secondary/50 group flex items-center rounded-full border text-xs font-medium drop-shadow-sm backdrop-blur-sm transition-colors duration-75 sm:divide-x"
    >
      <span className="text-fd-foreground py-1.5 pl-4 text-sm sm:pr-2.5">
        {children}
      </span>
      <div className="text-fd-muted-foreground flex items-center gap-1.5 p-1.5 pl-2.5">
        <span className="hidden text-sm sm:block">Read more</span>
        <div className="rounded-full bg-blue-600 p-1 text-white">{icon}</div>
      </div>
    </a>
  );
}
