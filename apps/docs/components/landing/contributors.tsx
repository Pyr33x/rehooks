import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@rehooks/ui/components";
import Image from "next/image";

export async function Contributors() {
  const res = await fetch(
    "https://api.github.com/repos/pyr33x/rehooks/contributors",
  );
  const contributors = await res.json();
  return (
    <section className="mt-12 text-center">
      <h2 className="text-fd-muted-foreground select-none text-xl font-medium uppercase">
        Open Source
      </h2>
      <h3 className="text-fd-foreground my-1 text-wrap text-3xl font-semibold">
        Powered by Community
      </h3>
      <h4 className="text-fd-muted-foreground mt-1.5 max-w-lg text-pretty text-xl italic">
        Here are some of the contributors that helped to streamline the
        development process.
      </h4>
      <TooltipProvider>
        <div className="mt-12 flex flex-row items-center justify-center -space-x-2">
          {contributors.map((contributor) => (
            <a
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    width={75}
                    height={75}
                    className="border-border transform rounded-full border transition hover:scale-110"
                  />
                  <TooltipContent className="mb-1.5">
                    {contributor.login}
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </a>
          ))}
        </div>
      </TooltipProvider>
    </section>
  );
}
