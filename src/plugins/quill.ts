import Quill from "quill";
// @ts-ignore
import ImageResize from "quill-image-resize";
// @ts-ignore
import { ImageDrop } from "quill-image-drop-module";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);

export default Quill;
