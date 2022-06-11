import { html, repeat } from '@microsoft/fast-element';
import { createElementView } from '../utilities/create-element-view';

import type { Attribute } from 'custom-elements-manifest/schema';
import { uniqueId } from '@microsoft/fast-web-utilities/dist/strings';

export const attributePanelRow = (displayName, description, control) => createElementView(
  'fluent-data-grid-row',
  {
    content: html`
      <fluent-data-grid-cell grid-column="1">
        ${displayName}
      </fluent-data-grid-cell>
      <fluent-data-grid-cell grid-column="2">
        ${description}
      </fluent-data-grid-cell>
      <fluent-data-grid-cell style="overflow: unset;" grid-column="3">
        ${control}
      </fluent-data-grid-cell>
    `,
    bindings: {
      'grid-template-columns': '1fr 1fr 1fr'
    }
  }
);