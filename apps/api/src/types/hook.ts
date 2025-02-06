export type React = Readonly<{
  id: number;
  title: string;
  description: string;
  content: string;
}>;

export type Next = Readonly<{
  id: number;
  title: string;
  description: string;
  content: Opts;
}>;

type Opts = {
  server: string;
  client: string;
};

export type CondHooks = Next | React;
