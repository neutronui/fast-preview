import { html, repeat, SyntheticViewTemplate, TemplateValue } from '@microsoft/fast-element';
import { createElementView } from '../utilities/create-element-view';

import type { Attribute } from 'custom-elements-manifest/schema';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { Checkbox, DesignSystem, ListboxOption, Select, TextField } from '@microsoft/fast-foundation';

export function constructAttributesPanel(
  target: HTMLElement,
  attributes: Array<Attribute>,
  previewElementData: Record<string, string | TemplateValue<any, any>>
): void {
  if (!attributes.length) {
    return;
  }

  attributes?.forEach((attribute: Attribute) => {
    const fieldName: string = attribute.fieldName!;
    const fieldId: string = uniqueId(`${fieldName}-`);
    const labelId: string = uniqueId(`${fieldName}-label-`);
    
    let controlTag = DesignSystem.tagFor(TextField);
    let controlContent: string | SyntheticViewTemplate | null = null;
    let controlBindings: Record<string, string | TemplateValue<any, any>> = {
      id: fieldId,
      'aria-labelledby': labelId,
      class: 'value',
      '@input': (x, c) =>
        (previewElementData[fieldName] =
          (c.event.target as any)?.value ?? attribute.default ?? ''),
    };

    let type = 'text';
    const parsedType = attribute.type?.text.split(/[\s][^\w+][\s]/g)!;
    if (parsedType.length > 1) {
      type = 'select';
    } else {
      type = attribute.type?.text!;
    }

    switch (type) {
      case 'boolean':
        controlTag = DesignSystem.tagFor(Checkbox);
        controlBindings = {
          id: fieldId,
          'aria-labelledby': labelId,
          class: 'value',
          '@change': (x, c) =>
            (previewElementData[fieldName] = (c.event.target as any).checked),
        };
        break;

      case 'select':
        controlTag = DesignSystem.tagFor(Select);
        controlContent = html`
          ${repeat(
            (x) => parsedType,
            html`<${DesignSystem.tagFor(ListboxOption)} value="${(x) => x}">${(x) => x}</${DesignSystem.tagFor(ListboxOption)}>`
          )}
        `;
        controlBindings = {
          value: attribute.default!,
          id: fieldId,
          'aria-labelledby': labelId,
          class: 'value',
          '@change': (x, c) =>
            (previewElementData[fieldName] = (c.event.target as any).value),
        };
    }

    const control = createElementView(controlTag, {
      content: controlContent!,
      bindings: controlBindings,
    });

    const view = html`
      <label id="${labelId}" class="name" for="${fieldId}">${
      attribute.name ?? attribute.fieldName ?? ''
    }</label>
      <p class="description">${attribute.description ?? ''}</p>
    `.create();

    view.appendTo(target);
    control.render(previewElementData, target);
  });
}
