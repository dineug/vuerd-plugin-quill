import Quill from "./Quill.vue";
import { Command, Editor } from "vuerd-core";
import { Option } from "@/types";

export default {
  install(command: Command, option?: Option) {
    const editor: Editor = {
      name: "quill",
      component: Quill,
      scope: ["rich"],
      option: {
        readme: {
          owner: "vuerd",
          repo: "vuerd-plugin-quill"
        }
      }
    };
    if (option) {
      if (typeof option.imageUpload === "function") {
        Quill.prototype.imageUpload = option.imageUpload;
      }
      if (option.scope !== undefined) {
        editor.scope = option.scope;
      }
      if (option.exclude !== undefined) {
        editor.exclude = option.exclude;
      }
    }
    command.editorAdd(editor);
  }
};
