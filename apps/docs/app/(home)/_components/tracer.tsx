import { ReactIcon, RehooksIcon } from "@rehooks/ui/icons";
import { Trace } from "@rehooks/ui/components";

export function Tracer() {
  return (
    <section className="mb-10 text-center">
      <h2 className="text-fd-muted-foreground select-none text-xl font-medium uppercase">
        Compatibility
      </h2>
      <h3 className="text-fd-foreground my-1 text-wrap text-center text-3xl font-semibold">
        Compatible with <span className="text-[#58C4DC]">React</span> Frameworks
      </h3>
      <h4 className="text-fd-muted-foreground mt-1.5 max-w-lg text-pretty text-center text-xl italic">
        Rehooks has a wide compatibility around React Frameworks, including
        Next.js, Remix, Astro, etc.
      </h4>
      <div className="mb-4 mt-16 flex flex-row items-center justify-center gap-x-2">
        <div className="bg-fd-background border-fd-border pointer-events-none inline-flex items-center justify-center rounded-xl border p-2">
          <RehooksIcon className="size-8" />
        </div>
        <Trace
          width={250}
          height={50}
          gradientColors={["#3b82f6", "#3b82f6", "#2563eb"]}
          animationDuration={2}
        />
        <div className="bg-fd-background border-fd-border pointer-events-none inline-flex items-center justify-center rounded-xl border p-2">
          <ReactIcon className="size-8" />
        </div>
      </div>
    </section>
  );
}
