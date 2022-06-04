import { html, ref } from '@microsoft/fast-element';

import type { ViewTemplate } from '@microsoft/fast-element';
import type { FoundationElementTemplate } from '@microsoft/fast-foundation';
import type { Preview } from './preview.js';

export const previewTemplate: FoundationElementTemplate<
	ViewTemplate<Preview>,
	any
> = (context, definition) => html`
	<template></template>
`;