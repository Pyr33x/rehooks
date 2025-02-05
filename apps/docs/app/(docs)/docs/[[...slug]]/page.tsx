import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import { source, openapi } from "@/lib/docs/source";
import { metadataImage } from "@/lib/docs/metadata";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { notFound } from "next/navigation";
import { DOCS_URL } from "@rehooks/utils";

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{ ...defaultMdxComponents, APIPage: openapi.APIPage }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return metadataImage.withImage(page.slugs, {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      siteName: "Rehooks",
      url: `${DOCS_URL}/docs/${page.slugs.join("/")}`,
    },
  });
}
