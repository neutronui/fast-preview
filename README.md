# FAST Preview

Web Component for previewing [FAST-based](https://github.com/microsoft/fast) web components

Uses the [custom elements manifest](https://github.com/webcomponents/custom-elements-manifest) JSON format.

```html
<fast-preview
  id="preview-element"
  attributes-panel
></fast-preview>
```

```ts
import manifest from '...manifest.json';
import { FASTPreview } from '@tac-elements/fast-preview';
const preview = document.getElementById('preview-element')!;

preview.elementData = getCustomElement(manifest, 'Button');
```

[<img src="https://raw.githubusercontent.com/kingoftac/fast-preview/master/fast-preview-example.png" alt="Screenshot of api-viewer docs" width="800">](https://github.com/kingoftac)

## Features

- Uses CustomElement definitions from a custom-elements-manifest file.
- Can use custom definitions based on the CustomElement schema for customizing the component preview that gets rendered.
- Can render a FAST Component, with controls to configure any attributes defined on the element.

## Known Issues

> This is an alpha with a lot of rough edges, so several issues are to be expected.

- Attribute TextFields that get cleared out throw an exception.

## In Progress Features

- Panel to customize internal slots
- Panel to customize internal CSS Parts
- Panel to customize CSS Custom Properties
- Types for custom data format
