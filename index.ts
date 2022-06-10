import {
  provideFluentDesignSystem,
  allComponents,
  Button,
} from '@fluentui/web-components';
import { defaultExecutionContext, html } from '@microsoft/fast-element';
import { ComponentPreview } from './src/component-preview';
import { createElementView } from './src/utilities/create-element-view';

import manifest from './test-manifest.json';
import { getElementData } from './utils';

manifest.modules = manifest.modules.filter((module) => {
  return module.declarations[0]?.customElement;
});

provideFluentDesignSystem().register(allComponents);

ComponentPreview;

const app = document.getElementById('app')!;

const componentPreviewData = {
  elementData: getElementData(manifest, 'Button'),
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
