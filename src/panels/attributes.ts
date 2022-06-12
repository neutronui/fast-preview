import {
  defaultExecutionContext,
  html,
  Observable,
  repeat,
  TemplateValue,
} from '@microsoft/fast-element';
import { createElementView } from '../utilities/create-element-view';

import type { Attribute } from 'custom-elements-manifest/schema';
import { uniqueId } from '@microsoft/fast-web-utilities';
import {
  ColumnDefinition,
  DataGridCell,
  DataGrid,
} from '@microsoft/fast-foundation';

export function constructAttributesPanel(
  target: DataGrid,
  attributes: Array<Attribute>,
  previewElementData: Record<string, string | TemplateValue<any, any>>,
  previewElementBindings: Record<string, string | TemplateValue<any, any>>
): void {
  attributes?.forEach((attribute: Attribute) => {
    const fieldName: string = attribute.fieldName!;

    let controlTag = 'fluent-text-field';
    let controlContent = null;
    let controlBindings: Record<string, string | TemplateValue<any, any>> = {
      class: 'value',
      '@input': (x, c) =>
        (previewElementData[fieldName] =
          (c.event.target as any)?.value ?? attribute.default ?? ''),
    };

    let type = 'text';
    const parsedType = attribute.type.text.split(/[\s][^\w+][\s]/g);
    if (parsedType.length > 1) {
      type = 'select';
    } else {
      type = attribute.type.text;
    }

    switch (type) {
      case 'boolean':
        controlTag = 'fluent-checkbox';
        controlBindings = {
          class: 'value',
          '@change': (x, c) =>
            (previewElementData[fieldName] = (c.event.target as any).checked),
        };
        break;

      case 'select':
        controlTag = 'fluent-select';
        controlContent = html`
          ${repeat(
            (x) => parsedType,
            html`<fluent-option value="${(x) => x}">${(x) => x}</fluent-option>`
          )}
        `;
        controlBindings = {
          value: attribute.default,
          class: 'value',
          '@change': (x, c) =>
            (previewElementData[fieldName] = (c.event.target as any).value),
        };
    }

    const control = createElementView(controlTag, {
      content: controlContent,
      bindings: controlBindings,
    });

    const view = html`
      <b class="name">${attribute.name ?? attribute.fieldName}</b>
      <p class="description">${attribute.description}</p>
    `.create();

    view.appendTo(target);
    control.render(previewElementData, target);
  });
}
