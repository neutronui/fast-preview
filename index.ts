import {
  provideFluentDesignSystem,
  allComponents,
  Button,
  accentBaseColor,
  SwatchRGB,
  baseLayerLuminance,
  StandardLuminance,
} from '@fluentui/web-components';
import {
  defaultExecutionContext,
  html,
  Observable,
  SyntheticViewTemplate,
} from '@microsoft/fast-element';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import { ComponentPreview, fastPreview } from './src/index';
import { createElementView } from './src/utilities/create-element-view';

import manifest from './test-manifest.json';
import { getElementData } from './utils';
import { CustomElement } from 'custom-elements-manifest/schema';
import { DesignSystem, Switch } from '@microsoft/fast-foundation';

manifest.modules = manifest.modules.filter((module) => {
  return module.declarations[0]?.customElement;
});

provideFluentDesignSystem().register(allComponents, fastPreview());

accentBaseColor.withDefault(SwatchRGB.from(parseColorHexRGB('#0B556A')!));

const themeSwitch = createElementView(DesignSystem.tagFor(Switch), {
  content: html`
    <span slot="checked-message">Dark Mode</span>
    <span slot="unchecked-message">Light Mode</span>
  `,
  bindings: {
    '@change': (x, c) =>
      (c.event.target as Switch).checked
        ? baseLayerLuminance.setValueFor(
            document.documentElement,
            StandardLuminance.DarkMode
          )
        : baseLayerLuminance.setValueFor(
            document.documentElement,
            StandardLuminance.LightMode
          ),
  },
}).create();

themeSwitch.bind({}, defaultExecutionContext);

const app = document.getElementById('app')!;
themeSwitch.appendTo(app);

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
  _elementData: undefined,
  get elementData() {
    Observable.track(this, 'elementData');
    return this._elementData;
  },
  set elementData(value) {
    this._elementData = value;
    Observable.notify(this, 'elementData');
  },
  _customData: customData,
  get customData() {
    Observable.track(this, 'customData');
    return this._customData;
  },
  set customData(value) {
    this._customData = value;
    Observable.notify(this, 'customData');
  },
  enableAttributesPanel: true,
};

const componentPreview = createElementView('fluent-preview', {
  bindings: {
    id: 'preview',
    ':elementData': (x) => x.elementData,
    ':customData': (x) => x.customData,
    '?attributes-panel': (x) => x.enableAttributesPanel,
  },
}).create();

componentPreview.bind(componentPreviewData, defaultExecutionContext);
componentPreview.appendTo(app);

const menu = createElementView('fluent-menu', {
  content: html`
    <fluent-menu-item id="Button">Button</fluent-menu-item>
    <fluent-menu-item id="Slider">Slider</fluent-menu-item>
    <fluent-menu-item id="Accordion">Accordion</fluent-menu-item>
  `,
  bindings: {
    id: 'menu',
    '@change': (x, c) => {
      if ((c.event.target as any).id === 'Accordion') {
        componentPreviewData.customData = customData;
      } else {
        componentPreviewData.elementData = getElementData(
          manifest,
          (c.event.target as any).id
        );
      }
    },
  },
}).create();

menu.bind({}, defaultExecutionContext);
menu.appendTo(app);
