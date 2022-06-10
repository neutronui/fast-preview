import { html, ViewTemplate } from '@microsoft/fast-element';

import type {
  SyntheticViewTemplate,
  TemplateValue,
} from '@microsoft/fast-element';

export type ViewData<TSource, TParent> = {
  content?: string | SyntheticViewTemplate;
  bindings?: Record<string, string | TemplateValue<TSource, TParent>>;
};

/**
 * TODO: Needs to be able to still create a valid template
 * if the content and bindings are undefined. Currently creates a template like:
 * <buttonundefined"></button>
 */
export function createElementView<TSource = any, TParent = any>(
  tagName: string,
  data?: ViewData<TSource, TParent>
): ViewTemplate {
  let markup = [`<${tagName}`];
  const values: Array<TemplateValue<TSource, TParent>> = [];
  const content = data?.content;
  const bindings = data?.bindings;

  if (bindings) {
    const firstBinding = Object.keys(bindings)[0];

    for (const key in bindings) {
      if (key === firstBinding) {
        markup[0] = `${markup[0]} ${key}="`;
      } else {
        markup.push(`" ${key}="`);
      }

      values.push(bindings[key]);
    }
  }

  if (content instanceof ViewTemplate) {
    markup.push(`">`);
    values.push(content);
    markup.push(`</${tagName}>`);
  } else {
    markup.push(`">${content ?? ''}</${tagName}>`);
  }

  return html(markup as any as TemplateStringsArray, ...values);
}
