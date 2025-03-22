import { Tracer } from "@/components/landing/tracer";
import { Editor } from "@/components/landing/editor";
import { Grid } from "@/components/landing/bento";
import { Hero } from "@/components/layout/hero";
import { Contributors } from "@/components/landing/contributors";

export default function HomePage() {
  return (
    <div className="mx-8 flex min-h-screen flex-col items-center justify-center py-16">
      <Hero />
      <Editor />
      <Tracer />
      <section className="flex flex-col items-center justify-center">
        <h2 className="text-fd-muted-foreground select-none text-xl font-medium uppercase">
          Features
        </h2>
        <h3 className="text-fd-foreground my-1 text-wrap text-center text-3xl font-semibold">
          Crafted for Efficiency
        </h3>
        <h4 className="text-fd-muted-foreground mt-1.5 max-w-lg text-pretty text-center text-xl italic">
          I've created Rehooks to streamline the process of creating custom
          hooks, and get rid of heavy packages.
        </h4>
        <div className="mt-10 max-w-6xl">
          <Grid />
        </div>
      </section>
      <Contributors />
    </div>
  );
}
