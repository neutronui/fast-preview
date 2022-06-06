import {
  baseLayerLuminance,
  StandardLuminance,
  direction,
} from '@fluentui/web-components';
import {
  attr,
  customElement,
  FASTElement,
  html,
  observable,
  repeat,
  SyntheticViewTemplate,
  ViewTemplate,
} from '@microsoft/fast-element';
import {
  Switch,
  Select,
  Checkbox,
  NumberField,
  RadioGroup,
} from '@microsoft/fast-foundation';
import { Direction, uniqueId } from '@microsoft/fast-web-utilities';
import { previewStyles } from './preview.styles';
import { previewTemplate } from './preview.template';

export type ArgType = {
  description: string | SyntheticViewTemplate;
  control: {
    type:
      | 'select'
      | 'radio'
      | 'checkbox'
      | 'number'
      | 'color'
      | 'text'
      | 'textarea';
  };
  options?: Array<any> | null;
};

export type StoryDefinition = {
  title: string;
  component: Function;
  argTypes?: { [key: string]: ArgType };
};

export type StoryArgs = {};

export type StoryFN = (args: StoryArgs) => ViewTemplate;
export type Story = StoryFN & {
  args: { [key: string]: any };
};

@customElement({
  name: 'element-preview',
  template: previewTemplate,
  styles: previewStyles,
})
export class Preview extends FASTElement {
  @attr({ attribute: 'props-pane', mode: 'boolean' })
  public enablePropsPane: boolean = false;

  @observable
  public storyDefinition!: StoryDefinition;

  @observable
  public slottedPreviews!: Array<HTMLElement>;
  public slottedPreviewsChanged(
    oldValue: Array<HTMLElement>,
    newValue: Array<HTMLElement>
  ): void {
    this.previewElement = newValue[0];
  }

  @observable
  private previewElement!: HTMLElement;

  @observable
  public story!: Story;
  public storyChanged(oldValue: Story, newValue: Story): void {
    const storyView = newValue(newValue.args ?? {});

    storyView.render(this.storyDefinition.component, this);
  }

  @observable
  public showAttributes: boolean = false;

  @observable
  public luminanceSwitch!: Switch & HTMLElement;

  @observable
  public directionSwitch!: Switch & HTMLElement;

  @observable
  public previewPane!: HTMLElement;

  public onPreviewLumninaceChange = (event: CustomEvent): boolean | void => {
    if (this.luminanceSwitch.checked) {
      baseLayerLuminance.setValueFor(
        this.previewPane,
        StandardLuminance.DarkMode
      );
    } else {
      baseLayerLuminance.setValueFor(
        this.previewPane,
        StandardLuminance.LightMode
      );
    }
  };

  public onDirectionChange = (event: CustomEvent): boolean | void => {
    if (this.directionSwitch.checked) {
      direction.setValueFor(this.previewPane, Direction.rtl);
      this.previewPane.setAttribute('dir', 'rtl');
    } else {
      direction.setValueFor(this.previewPane, Direction.ltr);
      this.previewPane.setAttribute('dir', 'ltr');
    }
  };

  public constructAttributesPanel(): SyntheticViewTemplate | void {
    if (!this.storyDefinition?.argTypes) {
      return;
    }

    const controls: Array<SyntheticViewTemplate> = [];

    const controlDefs = Array.from(
      Object.entries(this.storyDefinition.argTypes)
    );

    controlDefs.forEach((def: [string, ArgType]) => {
      switch (def[1].control.type) {
        case 'select':
          controls.push(
            selectControlTemplate(
              def[0],
              def[1].options!,
              this.story.args[def[0]],
              this.previewElement
            )
          );
          break;
        case 'checkbox':
          controls.push(
            checkboxControlTemplate(
              def[0],
              this.story.args[def[0]],
              this.previewElement
            )
          );
          break;
        case 'number':
          controls.push(
            numberControlTemplate(
              def[0],
              this.story.args[def[0]] as number,
              this.previewElement
            )
          );
          break;
        case 'radio':
          controls.push(
            radioControlTemplate(
              def[0],
              def[1].options!,
              this.story.args[def[0]],
              this.previewElement
            )
          );
          break;
      }
    });

    this.showAttributes = true;

    return html`
			<div class="props-grid">
				${repeat((x) => controls, html`${(x) => x}`)}
			</div>
		`;
  }

  connectedCallback(): void {
    super.connectedCallback();
  }
}

const selectControlTemplate = (
  label: string,
  options: Array<any>,
  defaultValue: any,
  host: HTMLElement
) => {
  const id = uniqueId(`${label}-select-`);

  const handleSelectChange = (event: Event): void => {
    const select = event.target as Select;
    host.setAttribute(label, select.value);
  };

  return html`
		<div class="control">
			<label for="${id}">${label}</label>
			<fluent-select
				id="${id}"
				@change="${(x, c) => handleSelectChange(c.event)}"
				value="${defaultValue}"
			>
				${repeat(
          (x) => options,
          html`<fluent-option value="${(x) => x}">${(x) => x}</fluent-option>`
        )}
			</fluent-select>
		</div>
	`;
};

const checkboxControlTemplate = (
  label: string,
  defaultValue: boolean,
  host: HTMLElement
) => {
  const id = uniqueId(`${label}-checkbox-`);

  const handleCheckChange = (event: Event): void => {
    const checkbox = event.target as Checkbox;
    host.toggleAttribute(label);
  };

  return html`
		<fluent-checkbox
			id="${id}"
			@change="${(x, c) => handleCheckChange(c.event)}"
			${defaultValue ? 'checked' : ''}
		>
			${label}
		</fluent-checkbox>
	`;
};

const numberControlTemplate = (
  label: string,
  defaultValue: number,
  host: HTMLElement
) => {
  const id = uniqueId(`${label}-number-`);

  const handleNumberChange = (event: Event): void => {
    const numberField = event.target as NumberField;
    host.setAttribute(label, numberField.value);
  };

  return html`
		<fluent-number-field
			id="${id}"
			@change="${(x, c) => handleNumberChange(c.event)}"
			value="${defaultValue}"
		>
			${label}
		</fluent-number-field>
	`;
};

const radioControlTemplate = (
  label: string,
  options: Array<any>,
  defaultValue: any,
  host: HTMLElement
) => {
  const id = uniqueId(`${label}-select-`);

  const handleRadioChange = (event: Event): void => {
    const radio = event.target as RadioGroup;
    host.setAttribute(label, radio.value);
  };

  return html`
		<div class="control">
			<label for="${id}">${label}</label>
			<fluent-radio-group
				id="${id}"
				@change="${(x, c) => handleRadioChange(c.event)}"
				value="${defaultValue}"
			>
				${repeat(
          (x) => options,
          html`<fluent-radio value="${(x) => x}">${(x) => x}</fluent-radio>`
        )}
			</fluent-radio-group>
		</div>
	`;
};
