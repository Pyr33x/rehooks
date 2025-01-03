import { openapi } from "@/lib/fuma/source";
export const { GET, HEAD, PUT, POST, PATCH, DELETE } = openapi.createProxy();
