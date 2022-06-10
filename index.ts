import {
  provideFluentDesignSystem,
  allComponents,
  Button,
} from '@fluentui/web-components';
import { defaultExecutionContext, html } from '@microsoft/fast-element';
import { ComponentPreview } from './src/component-preview';
import { createElementView } from './src/utilities/create-element-view';

provideFluentDesignSystem().register(allComponents);

ComponentPreview;

const app = document.getElementById('app')!;

const componentPreviewData = {};
const componentPreview = createElementView('component-preview', {
  bindings: {
    id: 'preview',
  },
}).create();

componentPreview.bind(componentPreviewData, defaultExecutionContext);
componentPreview.appendTo(app);
