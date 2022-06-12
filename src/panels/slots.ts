import { html, TemplateValue } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities/dist/strings';
import type { Slot } from 'custom-elements-manifest/schema';
import { createElementView } from '../utilities/create-element-view';

export function constructSlotsPanel(
  target: HTMLElement,
  slots: Array<Slot>,
  previewElementData: Record<string, string | TemplateValue<any, any>>
): void {
  slots?.forEach((slot: Slot) => {
    const fieldName: string = slot.name!;
    const fieldId: string = uniqueId(`${fieldName}-`);
    const labelId: string = uniqueId(`${fieldName}-label-`);

    let controlTag = 'fluent-text-field';
    let controlContent = null;
    let controlBindings: Record<string, string | TemplateValue<any, any>> = {
      id: fieldId,
      'aria-labelledby': labelId,
      class: 'value',
      '@input': (x, c) =>
        (previewElementData[fieldName] = (c.event.target as any)?.value ?? ''),
    };

    const control = createElementView(controlTag, {
      content: controlContent,
      bindings: controlBindings,
    });

    const view = html`
      <label id="${labelId}" class="name" for="${fieldId}">
        ${slot.name}
      </label>
      <p class="description">${slot.description}</p>
    `.create();

    view.appendTo(target);
    control.render(previewElementData, target);
  });
}
