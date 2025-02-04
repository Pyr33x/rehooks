import type { Server as ServerInterface } from "../types/server";

export class Server implements ServerInterface {
  public readonly port: number;
  public readonly host: string;
  public readonly docs: string;

  constructor(port: number, host: string, docs: string) {
    this.port = port;
    this.host = host;
    this.docs = docs;
  }
}
