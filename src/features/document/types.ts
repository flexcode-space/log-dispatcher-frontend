export type TypeDocument =
  | "pemulihan"
  | "code"
  | "gi"
  | "dispatcher"
  | "scheme"
  | "dkikp"
  | "lain";

export type ListTable = {
  title: string;
  type: TypeDocument;
};