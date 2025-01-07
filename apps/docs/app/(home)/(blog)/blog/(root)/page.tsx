import { RehooksIcon } from "@rehooks/ui/icons";
import { blog } from "@/lib/docs/source";
import Link from "next/link";

export default function BlogPage() {
  const posts = blog.getPages();

  return (
    <main className="container mx-auto grow px-4 py-8">
      <div className="flex flex-row items-center gap-x-2">
        <RehooksIcon className="size-10" stroke="#8b5cf6" />
        <h1 className="text-4xl font-bold">Rehooks Blog</h1>
      </div>
      <hr className="border-t-fd-border my-6 border-t" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="bg-fd-background border-fd-border hover:bg-fd-secondary/50 block overflow-hidden rounded-lg border p-6"
          >
            <h2 className="text-fd-foreground mb-2 text-xl font-semibold">
              {post.data.title}
            </h2>
            <p className="text-fd-muted-foreground mb-4">
              {post.data.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
