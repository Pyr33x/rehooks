import { createMetadataImage } from "fumadocs-core/server";
import { source } from "@/lib/fuma/source";

export const metadataImage = createMetadataImage({
  imageRoute: "/docs-og",
  source,
});
