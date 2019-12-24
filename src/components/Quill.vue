<template>
  <div class="vuerd-plugin-quill">
    <div ref="editor" :style="quillStyle"></div>
  </div>
</template>

<script lang="ts">
import "quill/dist/quill.snow.css";
import QuillEditor from "@/plugins/quill";
import { base64StringToBlob } from "blob-util";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

const TOOLBAR_HEIGHT = 42;

@Component({
  name: "Quill"
})
export default class Quill extends Vue {
  @Prop({ type: Number, default: 0 })
  private height!: number;
  @Prop({ type: String, default: "" })
  private value!: string;

  public imageUpload?: (
    files: File[] | Blob[],
    callback: (url: string) => void
  ) => void;
  private inputFile: HTMLInputElement = document.createElement("input");
  private currentValue: string = "";
  private quill!: QuillEditor;
  private option = {
    modules: {
      toolbar: [
        [{ font: [] }, { header: [1, 2, 3, 4, 5, 6, false] }],
        [
          { color: [] },
          { background: [] },
          "bold",
          "italic",
          "underline",
          "strike"
        ],
        ["blockquote", "code-block"],
        ["link", "image", "video"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] },
          { script: "sub" },
          { script: "super" }
        ],
        ["clean"]
      ],
      imageResize: {
        modules: ["Resize", "DisplaySize", "Toolbar"]
      },
      imageDropAndPaste: {
        handler: this.imageDropHandler
      }
    },
    theme: "snow"
  };

  get quillStyle(): string {
    return `height: ${this.height - TOOLBAR_HEIGHT}px;`;
  }

  @Watch("value")
  private watchValue(value: string) {
    if (this.currentValue !== value) {
      const editor = this.$refs.editor as HTMLElement;
      const container = editor.querySelector(".ql-editor");
      if (container) {
        this.currentValue = value;
        container.innerHTML = value;
      }
    }
  }

  private imageDropHandler(base64URL: string, type: string) {
    if (this.imageUpload && typeof this.imageUpload === "function") {
      const blob = base64StringToBlob(
        base64URL.replace(/^data:image\/\w+;base64,/, ""),
        type
      );
      this.imageUpload([blob], url => {
        const range = this.quill.getSelection();
        if (range) {
          this.quill.insertEmbed(range.index, "image", url);
        }
      });
    } else {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.insertEmbed(range.index, "image", base64URL);
      }
    }
  }

  private onChangeFile(event: Event) {
    const el = event.target as HTMLInputElement;
    if (
      el.files &&
      this.imageUpload &&
      typeof this.imageUpload === "function"
    ) {
      this.imageUpload(Array.from(el.files), url => {
        const range = this.quill.getSelection();
        if (range) {
          this.quill.insertEmbed(range.index, "image", url);
        }
      });
    }
    el.value = "";
  }

  private onChange() {
    const editor = this.$refs.editor as HTMLElement;
    const container = editor.querySelector(".ql-editor");
    if (container) {
      this.currentValue = container.innerHTML;
      this.$emit("input", container.innerHTML);
    }
  }

  private created() {
    this.inputFile.setAttribute("type", "file");
    this.inputFile.setAttribute(
      "accept",
      ".png,.gif,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.bmp,.ico"
    );
    this.inputFile.setAttribute("multiple", "");
    this.inputFile.addEventListener("change", this.onChangeFile);
  }

  private mounted() {
    const editor = this.$refs.editor as HTMLElement;
    this.quill = new QuillEditor(editor, this.option);
    this.quill.on("text-change", this.onChange);
    if (this.imageUpload && typeof this.imageUpload === "function") {
      this.quill.getModule("toolbar").addHandler("image", () => {
        this.inputFile.click();
      });
    }
  }

  private destroyed() {
    this.inputFile.removeEventListener("change", this.onChangeFile);
    this.quill.off("text-change", this.onChange);
    delete this.quill;
  }
}
</script>

<style scoped>
.vuerd-plugin-quill {
  background-color: white;
  color: black;
  width: 100%;
  height: 100%;
}
</style>
