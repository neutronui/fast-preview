import { Preview } from './src/index';
import {
  provideFluentDesignSystem,
  allComponents,
  Button,
} from '@fluentui/web-components';
import { Story, StoryDefinition, StoryFN } from './src/preview';
import { html } from '@microsoft/fast-element';

provideFluentDesignSystem().register(allComponents);

Preview;

const def: StoryDefinition = {
  title: 'Button',
  component: Button,
  argTypes: {
    appearance: {
      description: 'appearance',
      control: {
        type: 'radio',
      },
      options: ['accent', 'neutral', 'lightweight', 'stealth'],
    },
    disabled: {
      description: 'disabled',
      control: {
        type: 'checkbox',
      },
    },
  },
};

const template = ({ content, appearance, disabled }) => html`
  <fluent-button
    ${appearance ? `appearance="${appearance}"` : ''}
    ${disabled ? 'disabled' : ''}
  >
    ${content ? content : 'button'}
  </fluent-button>
`;

const story: StoryFN = template.bind({});
(story as Story).args = {
  appearance: 'accent',
  content: 'button',
};

const preview = document.getElementById('element-preview')! as Preview;

preview.storyDefinition = def;
preview.story = story as Story;

const def2: StoryDefinition = {
  title: 'Slider',
  component: Button,
  argTypes: {
    step: {
      description: 'step',
      control: {
        type: 'number',
      },
    },
    disabled: {
      description: 'disabled',
      control: {
        type: 'checkbox',
      },
    },
  },
};

const template2 = ({ disabled, min, max, step }) => html`
  <fluent-slider
    ${min ? `min="${min}"` : ''}
    ${max ? `max="${max}"` : ''}
    ${step ? `step="${step}"` : ''}
    ${disabled ? 'disabled' : ''}
  >
    <fluent-slider-label position="${min}">${min}</fluent-slider-label>
    <fluent-slider-label position="${max}">${max}</fluent-slider-label>
  </fluent-slider>
`;

const story2: StoryFN = template2.bind({});
(story2 as Story).args = {
  min: 0,
  max: 100,
  step: 10,
};

const preview2 = document.getElementById('element-preview2')! as Preview;

preview2.storyDefinition = def2;
preview2.story = story2 as Story;
