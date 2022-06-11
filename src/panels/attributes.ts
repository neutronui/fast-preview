import { html, repeat } from '@microsoft/fast-element';
import { createElementView } from '../utilities/create-element-view';

import type { Attribute } from 'custom-elements-manifest/schema';
import { uniqueId } from '@microsoft/fast-web-utilities/dist/strings';

const attributePanelRowTemplate = (displayName, description, control) => html`
  <fluent-data-grid-row grid-template-columns="1fr 1fr 1fr">
    <fluent-data-grid-cell grid-column="1">
      ${displayName}
    </fluent-data-grid-cell>
    <fluent-data-grid-cell grid-column="2">
      ${description}
    </fluent-data-grid-cell>
    <fluent-data-grid-cell style="overflow: unset;" grid-column="3">
			${control}
		</fluent-data-grid-cell>
  </fluent-data-grid-row>
`;

const attributesPanel = {
  attributes: [],
};

export type AttributesPanel = {
  attributes: Array<Attribute>;
};

export const attributesPanelView = createElementView<AttributesPanel>(
  'fluent-data-grid',
  {
    content: html<AttributesPanel>`
      ${repeat(
        (x) => x.attributes,
        html<Attribute>`
        ${(x) => attributePanelRowTemplate(x.name, x.description, null)}
      `
      )}
  `,
    bindings: {
      id: uniqueId('attributes-panel-'),
    },
  }
);
