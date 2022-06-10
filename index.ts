import {
  provideFluentDesignSystem,
  allComponents,
  Button,
} from '@fluentui/web-components';
import { html } from '@microsoft/fast-element';

provideFluentDesignSystem().register(allComponents);
