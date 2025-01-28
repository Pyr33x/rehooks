import defaultMdxComponents from "fumadocs-ui/mdx";
import { CornerDownLeft } from "@rehooks/ui/icons";
import { notFound } from "next/navigation";
import { blog } from "@/lib/docs/source";
import Link from "next/link";

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <>
      <div className="bg-fd-background container mt-8 rounded-xl border p-8">
        <h1 className="mg:text-3xl mb-2 text-xl font-bold">
          {page.data.title}
        </h1>
        <p className="text-fd-muted-foreground mb-4 text-base md:text-lg">
          {page.data.description}
        </p>
        <div className="flex items-center">
          <Link
            href="/blog"
            className="bg-fd-background border-fd-border hover:bg-fd-secondary inline-flex transform items-center gap-x-2 rounded-md border px-4 py-1 transition"
          >
            Back
            <CornerDownLeft className="inline-block size-4" />
          </Link>
        </div>
      </div>
      <article className="container flex flex-col px-4 py-8">
        <div className="prose min-w-0">
          <Mdx components={defaultMdxComponents} />
        </div>
        <hr className="border-t-fd-border my-12 border-t" />
        <div className="flex flex-col gap-4 text-sm">
          <div>
            <p className="text-fd-muted-foreground mb-1">Written by</p>
            <p className="font-medium">{page.data.author}</p>
          </div>
          <div>
            <p className="text-fd-muted-foreground mb-1 text-sm">At</p>
            <p className="font-medium">
              {new Date(page.data.date).toDateString()}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
