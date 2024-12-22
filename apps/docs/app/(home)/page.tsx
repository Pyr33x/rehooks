import { Editor } from "@/app/(home)/_components/editor";
import { Grid } from "@/app/(home)/_components/bento";
import { Hero } from "@/app/(home)/_components/hero";
import { Star } from "@rehooks/ui/components";

export default function HomePage() {
  return (
    <div className="h-full w-full">
      <div className="mx-8 my-28 flex min-h-screen flex-col items-center justify-center lg:my-36">
        <Hero />
        <div className="my-12">
          <Editor />
        </div>
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
      </div>
      <Star
        className="absolute inset-0 -z-50"
        quantity={50}
        ease={200}
        refresh
      />
    </div>
  );
}
