import { Preview } from './preview.js';
import { previewTemplate } from './preview.template.js';

export const previewElement = Preview.compose({
	baseName: 'preview',
	template: previewTemplate
});

export {
	Preview,
	previewTemplate
};