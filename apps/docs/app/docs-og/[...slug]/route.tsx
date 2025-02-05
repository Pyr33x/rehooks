import { metadataImage } from "@/lib/docs/metadata";
import { generateOGImage } from "fumadocs-ui/og";

export const GET = metadataImage.createAPI((page) => {
  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: "Rehooks",
  });
});

export function generateStaticParams() {
  return metadataImage.generateParams();
}
