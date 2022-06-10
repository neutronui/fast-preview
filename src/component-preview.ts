import {
  attr,
  customElement,
  FASTElement,
  observable,
  DOM,
  ViewTemplate,
  html,
} from '@microsoft/fast-element';
import {
  baseLayerLuminance,
  direction,
  StandardLuminance,
} from '@fluentui/web-components';
import { Direction } from '@microsoft/fast-web-utilities';
import { componentPreviewStyles } from './component-preview.styles';
import { componentPreviewTemplate } from './component-preview.template';

/**
 * Type Imports
 */
import type { Switch } from '@microsoft/fast-foundation';
import type {
  CustomElement,
  Attribute,
  CssPart,
  CssCustomProperty,
  Event,
} from 'custom-elements-manifest/schema';

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
