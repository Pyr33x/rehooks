import { openapi } from "@/lib/docs/source";
export const { GET, HEAD, PUT, POST, PATCH, DELETE } = openapi.createProxy();
