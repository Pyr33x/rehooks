import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import path from "path";
import fs from "fs";

extendZodWithOpenApi(z);

const HookSchema = z
  .object({
    id: z.number().int().positive().openapi({ example: 1 }),
    title: z.string().min(1).openapi({ example: "Example Hook Title" }),
    description: z
      .string()
      .min(1)
      .openapi({ example: "This is an example hook description." }),
    content: z
      .string()
      .min(1)
      .openapi({ example: "This is the content of the hook." }),
  })
  .openapi("Hook");

const registry = new OpenAPIRegistry();

// Register GET /hooks
registry.registerPath({
  method: "get",
  path: "/hooks",
  summary: "Get a list of hooks",
  description:
    "Returns a list of hooks, optionally filtered by search and limited by count.",
  parameters: [
    {
      name: "search",
      in: "query",
      description: "Filter hooks by title",
      required: false,
      schema: { type: "string" },
    },
    {
      name: "limit",
      in: "query",
      description: "Limit the number of hooks returned",
      required: false,
      schema: { type: "integer", minimum: 1 },
    },
  ],
  responses: {
    200: {
      description: "A list of hooks",
      content: {
        "application/json": {
          schema: z.array(HookSchema),
        },
      },
    },
    400: { description: "Invalid input (e.g., invalid limit)" },
    429: { description: "Rate limit exceeded" },
    500: { description: "Internal server error" },
  },
});

// Register GET /hooks/:title
registry.registerPath({
  method: "get",
  path: "/hooks/{title}",
  summary: "Get a hook by title",
  description: "Returns a single hook by its title.",
  parameters: [
    {
      name: "title",
      in: "path",
      description: "Title of the hook to retrieve",
      required: true,
      schema: { type: "string" },
    },
  ],
  responses: {
    200: {
      description: "A single hook",
      content: {
        "application/json": {
          schema: HookSchema,
        },
      },
    },
    404: { description: "Hook not found" },
    429: { description: "Rate limit exceeded" },
    500: { description: "Internal server error" },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);
const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Rehooks API",
    version: "1.0.0",
    description: "The API for Rehooks",
  },
  servers: [
    {
      url: "https://rehooks.pyr33x.ir/api",
      description: "Production server",
    },
  ],
});

// Write schema to JSON
const outputPath = path.join(
  process.cwd(),
  "../../../../apps/docs/rehooksapi.json",
);
fs.writeFileSync(outputPath, JSON.stringify(openApiDocument, null, 2));
console.log(`OpenAPI schema written to ${outputPath}`);
