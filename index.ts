import {
  provideFluentDesignSystem,
  allComponents,
  Button,
  accentBaseColor,
  SwatchRGB,
} from '@fluentui/web-components';
import {
  defaultExecutionContext,
  html,
  SyntheticViewTemplate,
} from '@microsoft/fast-element';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import { ComponentPreview } from './src/component-preview';
import { createElementView } from './src/utilities/create-element-view';

import manifest from './test-manifest.json';
import { getElementData } from './utils';
import { CustomElement } from 'custom-elements-manifest/schema';

manifest.modules = manifest.modules.filter((module) => {
  return module.declarations[0]?.customElement;
});

provideFluentDesignSystem().register(allComponents);

accentBaseColor.withDefault(SwatchRGB.from(parseColorHexRGB('#0B556A')!));

ComponentPreview;

const app = document.getElementById('app')!;

const customData: CustomElement & {
  exampleContent?: string | SyntheticViewTemplate;
} = {
  tagName: 'fluent-accordion',
  name: 'Accordion',
  customElement: true,
  attributes: [
    {
      name: 'expand-mode',
      fieldName: 'expandMode',
      type: {
        text: 'single | multi',
      },
      default: 'multi',
    },
  ],
  exampleContent: html`
    <fluent-accordion-item>
      <fluent-progress-ring slot="start"></fluent-progress-ring>
      <div slot="heading">Item 1</div>
      Item 1 Content
    </fluent-accordion-item>
    <fluent-accordion-item>
      <fluent-button appearance="accent" slot="start">button</fluent-button>
      <div slot="heading">Item 1</div>
      Item 2 Content
    </fluent-accordion-item>
    <fluent-accordion-item>
      <div slot="heading">Item 1</div>
      Item 3 Content
    </fluent-accordion-item>
  `,
};

const componentPreviewData = {
  elementData: getElementData(manifest, 'Button'),
  customData: customData,
  enableAttributesPanel: true,
};

const componentPreview = createElementView('component-preview', {
  bindings: {
    id: 'preview',
    ':elementData': (x) => x.elementData,
    '?attributes-panel': (x) => x.enableAttributesPanel,
  },
}).create();

componentPreview.bind(componentPreviewData, defaultExecutionContext);
componentPreview.appendTo(app);
