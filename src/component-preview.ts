import {
  attr,
  customElement,
  FASTElement,
  observable,
  DOM,
  ViewTemplate,
  html,
  defaultExecutionContext,
  TemplateValue,
  Observable,
  HTMLView,
  repeat,
} from '@microsoft/fast-element';
import {
  baseLayerLuminance,
  DataGridCell,
  direction,
  StandardLuminance,
} from '@fluentui/web-components';
import { Direction } from '@microsoft/fast-web-utilities';
import { componentPreviewStyles } from './component-preview.styles';
import { componentPreviewTemplate } from './component-preview.template';

/**
 * Type Imports
 */
import type {
  Switch,
  DataGrid,
  DataGridCellTypes,
  ColumnDefinition,
} from '@microsoft/fast-foundation';
import type {
  CustomElement,
  Attribute,
  CssPart,
  CssCustomProperty,
  Event,
} from 'custom-elements-manifest/schema';
import { createElementView } from './utilities/create-element-view';
import { uniqueId } from '@microsoft/fast-web-utilities/dist/strings';

export type CustomAttribute = Attribute & {
  options?: Array<any>;
};

@customElement({
  name: 'component-preview',
  template: componentPreviewTemplate,
  styles: componentPreviewStyles,
})
export class ComponentPreview extends FASTElement {
  /**
   * Attributes
   */
  @attr({ attribute: 'attributes-panel', mode: 'boolean' })
  public enableAttributesPanel: boolean = false;

  @attr({ attribute: 'parts-panel', mode: 'boolean' })
  public enablePartsPanel: boolean = false;

  @attr({ attribute: 'props-panel', mode: 'boolean' })
  public enablePropsPanel: boolean = false;

  @attr({ attribute: 'events-panel', mode: 'boolean' })
  public enableEventsPanel: boolean = false;

  @attr({ attribute: 'source-panel', mode: 'boolean' })
  public enableSourcePanel: boolean = false;

  /**
   * Template Refs
   */
  @observable
  public attributesPanel!: HTMLElement;

  @observable
  public partsPanel!: HTMLElement;

  @observable
  public propsPanel!: HTMLElement;

  @observable
  public eventsPanel!: HTMLElement;

  @observable
  public sourcePanel!: HTMLElement;

  @observable
  public previewPanel!: HTMLElement;

  @observable
  public luminanceSwitch!: Switch;

  @observable
  public directionSwitch!: Switch;

  /**
   * Public API
   */
  @observable
  public elementData!: CustomElement;
  public elementDataChanged(): void {
    console.log(this.elementData);
    this.reset();

    this.constructPreview();
  }

  /**
   * Private API
   */
  private reset(): void {}

  @observable
  private previewData: Record<string, string | TemplateValue<any, any>> = {};

  private previewBindings: Record<string, string | TemplateValue<any, any>> =
    {};

  @observable
  private previewTemplate!: ViewTemplate;
  private previewTemplateChanged(): void {}

  private constructPreview(): void {
    const tagName = this.elementData.name!;
    const rowsData = [];

    this.previewBindings.id = uniqueId(`${tagName}-`);

    this.elementData.attributes?.forEach((attribute: Attribute) => {
      const fieldName: string = attribute.fieldName!;
      this.previewData.type = attribute.type?.text!;

      if (attribute.type?.text === 'boolean') {
        this.previewBindings[`?${fieldName}`] = (x) => x[fieldName];
        this.previewData[`_${fieldName}`] = attribute.default ?? false;
      } else {
        this.previewBindings[`:${fieldName}`] = (x) => x[fieldName];
        this.previewData[`_${fieldName}`] = attribute.default!;
      }

      Object.defineProperty(this.previewData, fieldName, {
        get() {
          Observable.track(this, fieldName);
          return this[`_${fieldName}`];
        },
        set(value: any) {
          this[`_${fieldName}`] = value;
          Observable.notify(this, fieldName);
        },
      });

      let controlTag = 'fluent-text-field';
      let controlContent = null;
      let controlBindings: Record<string, string | TemplateValue<any, any>> = {
        '@input': (x, c) =>
          (this.previewData[fieldName] =
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
              (this.previewData[fieldName] = (c.event.target as any).checked),
          };
          break;

        case 'select':
          controlTag = 'fluent-select';
          controlContent = html`
            ${repeat(
              (x) => parsedType,
              html`<fluent-option value="${(x) => x}">${(x) =>
                x}</fluent-option>`
            )}
          `;
          controlBindings = {
            ':value': attribute.default,
            '@change': (x, c) =>
              (this.previewData[fieldName] = (c.event.target as any).value),
          };
      }

      const control = createElementView(controlTag, {
        content: controlContent,
        bindings: controlBindings,
      });
      const view = control.create();
      view.bind(this.previewData, defaultExecutionContext);

      rowsData.push({
        attribute: attribute.name ?? attribute.fieldName,
        description: attribute.description,
        control,
      });

      // DOM.queueUpdate(() => {
      //   view.appendTo(this.attributesPanel);
      // });
    });

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
        title: null,
        cellInternalFocusQueue: true,
        cellFocusTargetCallback: (cell: DataGridCell) =>
          cell.children[0] as HTMLElement,
        cellTemplate: html<DataGridCell>`
          <template
            style="display: flex; align-items: center;"
            @cell-focused="${(x, c) => (x.children[0] as HTMLElement).focus()}"
          >
            ${(x) => x.rowData[x.columnDefinition.columnDataKey]}
          </template>
        `,
      },
    ];

    this.previewTemplate = createElementView(tagName, {
      content: tagName,
      bindings: this.previewBindings,
    });
    const view = this.previewTemplate.create();
    view.bind(this.previewData, defaultExecutionContext);

    DOM.queueUpdate(() => {
      view.appendTo(this.previewPanel);
      (this.attributesPanel as DataGrid).columnDefinitions = columnDefinitions;
      (this.attributesPanel as DataGrid).rowsData = rowsData;
    });
  }

  /**
   * Event Handlers
   */
  public onPreviewLuminanceChange = (): boolean | void => {
    if (this.luminanceSwitch.checked) {
      baseLayerLuminance.setValueFor(
        this.previewPanel,
        StandardLuminance.DarkMode
      );
    } else {
      baseLayerLuminance.setValueFor(
        this.previewPanel,
        StandardLuminance.LightMode
      );
    }
  };

  public onDirectionChange = (): boolean | void => {
    if (this.directionSwitch.checked) {
      direction.setValueFor(this.previewPanel, Direction.rtl);
      this.previewPanel.setAttribute('dir', 'rtl');
    } else {
      direction.setValueFor(this.previewPanel, Direction.ltr);
      this.previewPanel.setAttribute('dir', 'ltr');
    }
  };

  /**
   * Lifecycle
   */
  public connectedCallback(): void {
    super.connectedCallback();

    DOM.queueUpdate(() => {
      baseLayerLuminance.setValueFor(
        this.previewPanel,
        StandardLuminance.LightMode
      );
    });
  }
}
