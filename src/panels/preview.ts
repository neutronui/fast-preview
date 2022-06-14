import {
  baseLayerLuminance,
  StandardLuminance,
} from '@fluentui/web-components';
import { css, customElement, FASTElement, html } from '@microsoft/fast-element';

@customElement({
  name: 'preview-panel',
  template: html`<template><slot></slot></template>`,
  styles: css``,
})
export class PreviewPanel extends FASTElement {
  public connectedCallback(): void {
    super.connectedCallback();

    baseLayerLuminance.setValueFor(this, StandardLuminance.LightMode);
  }
}
