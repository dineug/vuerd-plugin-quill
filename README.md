# vuerd-plugin-quill

> [vuerd-core](https://github.com/vuerd/vuerd-core) plugin [quill](https://github.com/quilljs/quill)

[![npm version](https://img.shields.io/npm/v/vuerd-plugin-quill.svg)](https://www.npmjs.com/package/vuerd-plugin-quill) [![Build Status](https://travis-ci.com/vuerd/vuerd-plugin-quill.svg?branch=master)](https://travis-ci.com/vuerd/vuerd-plugin-quill)

## Document
[Storybook](https://vuerd.github.io/vuerd-docs/)   
[Live Demo](https://vuerd.github.io/vuerd-docs/iframe.html?id=demo-live--vuerd-core)

## Install
```bash
$ yarn add vuerd-core
$ yarn add vuerd-plugin-quill
or
$ npm install vuerd-core
$ npm install vuerd-plugin-quill
```
## Usage
```js
// main.js or main.ts
import Vue from 'vue';
import VuerdCore from 'vuerd-core';
import Quill from 'vuerd-plugin-quill';
import 'vuerd-core/dist/vuerd-core.css';
import 'vuerd-plugin-quill/dist/vuerd-plugin-quill.css';

VuerdCore.use(
  Quill,
/*
  {
    imageUpload(files, callback) {
      // upload
      callback("URL");
    }
  }
*/
);

Vue.use(VuerdCore);
```
```html
<VuerdCore/>
```
## CDN Quick Start
```html
<!DOCTYPE html>
<html>
<head>
  <title>vuerd-core demo</title>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/vuerd-core/dist/vuerd-core.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/vuerd-plugin-quill/dist/vuerd-plugin-quill.css">
</head>
<body>
  <div id="app">
    <vuerd-core />
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuerd-core/dist/vuerd-core.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuerd-plugin-quill/dist/vuerd-plugin-quill.umd.min.js"></script>
  <script>
    const VuerdCore = window['vuerd-core'].default
    const Quill = window['vuerd-plugin-quill'].default
    VuerdCore.use(Quill)
    Vue.use(VuerdCore)
    new Vue({
      el: '#app'
    })
  </script>
</body>
</html>
```
## Option interface
```typescript
export interface Option {
  imageUpload?: (files: File[] | Blob[], callback: (url: string) => void) => void;
  scope?: string[] | RegExp[];
  exclude?: string[] | RegExp[];
}
```
## Option
| Name | Type | Default | Describe |
| --- | --- | --- | --- |
| imageUpload | function | base64 | image upload |
| scope | [String \| RegExp] | ["rich"] | file designation(string extension) |
| exclude | [String \| RegExp] |  | exception file designation(string extension) |
 
## License
[MIT](https://github.com/vuerd/vuerd-plugin-quill/blob/master/LICENSE)
