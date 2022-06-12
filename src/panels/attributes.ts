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
  const rowsData = [];

  const columnDefinitions: ColumnDefinition[] = [
    {
      columnDataKey: 'attribute',
      title: 'Attribute',
    },
    {
      columnDataKey: 'description',
      title: 'Description',
      cellTemplate: html<DataGridCell>`
        <template>
          <p style="white-space: normal; margin: 0;">
            ${(x) => x.rowData[x.columnDefinition.columnDataKey]}
          </p>
        </template>
      `,
    },
    {
      columnDataKey: 'control',
      title: 'Value',
      // cellInternalFocusQueue: true,
      // cellFocusTargetCallback: (cell: DataGridCell) =>
      //   cell.children[0] as HTMLElement,
      cellTemplate: html<DataGridCell>`
        <template
          style="display: contents;"
          @cell-focused="${(x, c) => (x.children[0] as HTMLElement).focus()}"
        >
          ${(x) => x.rowData[x.columnDefinition.columnDataKey]}
        </template>
      `,
    },
  ];

  attributes?.forEach((attribute: Attribute) => {
    const fieldName: string = attribute.fieldName!;

    let controlTag = 'fluent-text-field';
    let controlContent = null;
    let controlBindings: Record<string, string | TemplateValue<any, any>> = {
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
          '@change': (x, c) =>
            (previewElementData[fieldName] = (c.event.target as any).value),
        };
    }

    const control = createElementView(controlTag, {
      content: controlContent,
      bindings: controlBindings,
    });
    const view = control.create();
    view.bind(previewElementData, defaultExecutionContext);

    rowsData.push({
      attribute: attribute.name ?? attribute.fieldName,
      description: attribute.description,
      control,
    });
  });

  target.columnDefinitions = columnDefinitions;
  target.rowsData = rowsData;
}
