import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { mkdirSync } from "fs";
import { z } from "zod";
import path from "path";
import fs from "fs";

extendZodWithOpenApi(z);

const HookSchema = z
  .object({
    id: z.number().int().positive().openapi({ example: 1 }),
    title: z.string().min(1).openapi({ example: "useExample" }),
    description: z
      .string()
      .min(1)
      .openapi({ example: "This is an example description." }),
    content: z
      .string()
      .min(1)
      .openapi({ example: "This is the content of the hook." }),
  })
  .openapi("Hook");

const NotFoundErrorSchema = z
  .object({
    code: z.number().openapi({ example: 404 }),
    message: z.string().openapi({ example: "Hook not found" }),
  })
  .openapi("NotFoundError");

const InvalidLimitErrorSchema = z
  .object({
    code: z.number().openapi({ example: 400 }),
    message: z.string().openapi({
      example: "Invalid limit. It must be a positive number.",
    }),
  })
  .openapi("InvalidLimitError");

const RateLimitErrorSchema = z
  .object({
    code: z.number().openapi({ example: 429 }),
    message: z.string().openapi({ example: "Rate limit exceeded" }),
  })
  .openapi("RateLimitError");

const InternalServerErrorSchema = z
  .object({
    code: z.number().openapi({ example: 500 }),
    message: z.string().openapi({ example: "Internal server error" }),
  })
  .openapi("InternalServerError");

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/hooks",
  summary: "Get list of available hooks",
  description:
    "Returns the list of available hooks, optionally filtered by search and limited by count.",
  tags: ["Hooks"],
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
      description: "Limit the number of hooks returned. Default is all.",
      required: false,
      schema: { type: "integer", minimum: 1 },
    },
  ],
  responses: {
    200: {
      description: "Success.",
      content: {
        "application/json": {
          schema: z.array(HookSchema),
        },
      },
    },
    400: {
      description: "Bad request.",
      content: {
        "application/json": {
          schema: InvalidLimitErrorSchema,
        },
      },
    },
    429: {
      description: "Rate limit exceeded",
      content: {
        "application/json": {
          schema: RateLimitErrorSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: InternalServerErrorSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/hooks/{title}",
  summary: "Get a specific hook by title",
  description: "Returns a specific hook by its title.",
  tags: ["Hooks"],
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
      description: "Success.",
      content: {
        "application/json": {
          schema: HookSchema,
        },
      },
    },
    404: {
      description: "Not found.",
      content: {
        "application/json": {
          schema: NotFoundErrorSchema,
        },
      },
    },
    429: {
      description: "Rate limit exceeded",
      content: {
        "application/json": {
          schema: RateLimitErrorSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: InternalServerErrorSchema,
        },
      },
    },
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
      url: "https://rehooks.dev/api",
      description: "Production server",
    },
  ],
});

const outputPath = path.join(
  process.cwd(),
  "../../../../apps/docs/rehooksapi.json",
);

const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(openApiDocument, null, 2));
console.log(`OpenAPI schema written to ${outputPath}`);
