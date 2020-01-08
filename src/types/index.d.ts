import { Command } from "vuerd-core";

export interface Option {
  imageUpload?: (
    files: File[] | Blob[],
    callback: (url: string) => void
  ) => void;
  scope?: string[] | RegExp[];
  exclude?: string[] | RegExp[];
  editorOption?: EditorOption;
}

export interface EditorOption {
  theme?: Theme;
  toolbar?: any[];
}

export type Theme = "snow" | "bubble";

export declare function install(command: Command, option?: Option): void;
declare const _default: {
  install: typeof install;
};

export default _default;
