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
  ref,
  SyntheticViewTemplate,
} from '@microsoft/fast-element';
import {
  baseLayerLuminance,
  DataGridCell,
  direction,
  StandardLuminance,
} from '@fluentui/web-components';
import { Direction, isHTMLElement } from '@microsoft/fast-web-utilities';
import { componentPreviewStyles } from './component-preview.styles';
import { componentPreviewTemplate } from './component-preview.template';

/**
 * Type Imports
 */
import {
  Switch,
  DataGrid,
  DataGridCellTypes,
  ColumnDefinition,
  FoundationElement,
} from '@microsoft/fast-foundation';
import type {
  CustomElement,
  Attribute,
  CssPart,
  CssCustomProperty,
  Event,
  Slot,
} from 'custom-elements-manifest/schema';
import { createElementView } from './utilities/create-element-view';
import { uniqueId } from '@microsoft/fast-web-utilities/dist/strings';
import { constructAttributesPanel } from './panels/attributes';
import { PreviewPanel } from './panels/preview';

PreviewPanel;

export type CustomAttribute = Attribute & {
  options?: Array<any>;
};

export class ComponentPreview extends FoundationElement {
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

  @attr({ attribute: 'slots-panel', mode: 'boolean' })
  public enableSlotsPanel: boolean = false;

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
  public slotsPanel!: HTMLElement;

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
  public displayName!: string;

  @observable
  public elementData!: CustomElement;
  public elementDataChanged(
    oldValue: CustomElement,
    newValue: CustomElement
  ): void {
    if (!newValue) {
      return;
    }

    this.displayName = this.elementData.tagName ?? this.elementData.name;
    this.constructPreview(this.elementData);
    this.customData = undefined;
  }

  @observable
  public customData!: CustomElement;
  public customDataChanged(
    oldValue: CustomElement,
    newValue: CustomElement
  ): void {
    if (!newValue) {
      return;
    }

    this.displayName = this.customData.tagName ?? this.customData.name;
    this.constructPreview(this.customData);
    this.elementData = undefined;
  }

  /**
   * Private API
   */
  private reset(): void {
    if (this.attributesPanel) {
      this.attributesPanel.innerHTML = '';
    }
    this.previewData = {};
    this.previewBindings = {};
  }

  @observable
  private previewData: Record<string, string | TemplateValue<any, any>> = {};

  private previewBindings: Record<string, string | TemplateValue<any, any>> =
    {};

  @observable
  private previewTemplate!: HTMLView;
  private previewTemplateChanged(oldValue: HTMLView, newValue: HTMLView): void {
    let view;

    if (newValue) {
      view = newValue;
      view.bind(this.previewData, defaultExecutionContext);
    }

    DOM.queueUpdate(() => {
      view.appendTo(this.previewPanel);

      if (oldValue) {
        oldValue.dispose();
      }
    });
  }

  private constructPreview(
    data: CustomElement & { exampleContent?: string | SyntheticViewTemplate }
  ): void {
    this.reset();
    const tagName = data.tagName ?? data.name!;
    this.previewBindings.id = uniqueId(`${tagName}-`);

    if (data.attributes) {
      data.attributes?.forEach((attribute: Attribute) => {
        const fieldName: string = attribute.fieldName!;
        this.previewData.type = attribute.type?.text!;

        if (attribute.type?.text === 'boolean') {
          this.previewBindings[`?${attribute.name ?? fieldName}`] = (x) =>
            x[fieldName];
          this.previewData[`_${fieldName}`] = attribute.default ?? false;
        } else {
          this.previewBindings[`${attribute.name ?? fieldName}`] = (x) =>
            x[fieldName];
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
      });
    } else {
      DOM.queueUpdate(() => {
        this.setAttribute('attributes-panel', 'false');
      });
    }

    this.previewTemplate = createElementView(tagName, {
      content: data.exampleContent ?? tagName,
      bindings: this.previewBindings,
    }).create();

    DOM.queueUpdate(() => {
      constructAttributesPanel(
        this.attributesPanel,
        data.attributes!,
        this.previewData!
      );
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

    // DOM.queueUpdate(() => {
    //   baseLayerLuminance.setValueFor(
    //     this.previewPanel,
    //     StandardLuminance.LightMode
    //   );
    // });
  }
}
