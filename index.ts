import {
  provideFluentDesignSystem,
  allComponents,
  Button,
} from '@fluentui/web-components';
import {
  defaultExecutionContext,
  html,
  SyntheticViewTemplate,
} from '@microsoft/fast-element';
import { ComponentPreview } from './src/component-preview';
import { createElementView } from './src/utilities/create-element-view';

import manifest from './test-manifest.json';
import { getElementData } from './utils';
import { CustomElement } from 'custom-elements-manifest/schema';

manifest.modules = manifest.modules.filter((module) => {
  return module.declarations[0]?.customElement;
});

provideFluentDesignSystem().register(allComponents);

ComponentPreview;

const app = document.getElementById('app')!;

const customData: CustomElement & { example?: string | SyntheticViewTemplate } =
  {
    tagName: 'fluent-button',
    name: 'Button',
    customElement: true,
    attributes: [
      {
        name: 'appearance',
        type: {
          text: 'accent | stealth | outline | neutral | lightweight',
        },
        default: 'accent',
      },
    ],
    example: html`
    <fluent-menu>
      <fluent-menu-item>item 1</fluent-menu-item>
    </fluent-menu>
  `,
  };

const componentPreviewData = {
  // elementData: getElementData(manifest, 'Button'),
  customData: customData,
  enableAttributesPanel: true,
  enableSlotsPanel: true,
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
