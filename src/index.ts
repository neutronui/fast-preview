import { ComponentPreview } from './component-preview';
import { componentPreviewTemplate as template } from './component-preview.template';
import { componentPreviewStyles as styles } from './component-preview.styles';

export const fastPreview = ComponentPreview.compose({
	baseName: 'preview',
	template,
	styles
});

export * from './component-preview';
export * from './component-preview.template';
export * from './component-preview.styles';
export * from './utilities/create-element-view';
export * from './utilities/utils';