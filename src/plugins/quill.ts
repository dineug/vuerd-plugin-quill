import Quill from "quill";
// @ts-ignore
import ImageResize from "quill-image-resize";
// @ts-ignore
import QuillImageDropAndPaste from "quill-image-drop-and-paste";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

export default Quill;
