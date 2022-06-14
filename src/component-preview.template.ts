import {
  elements,
  html,
  ref,
  repeat,
  slotted,
  when,
} from '@microsoft/fast-element';

import type { ViewTemplate } from '@microsoft/fast-element';
import type { ComponentPreview } from './component-preview';
import { Card, FoundationElementTemplate, Switch, Tab, TabPanel, Tabs, Toolbar } from '@microsoft/fast-foundation';

export const componentPreviewTemplate: FoundationElementTemplate<
	ViewTemplate<ComponentPreview>,
	any
> = (context, definition) => {
	const toolbarTag = context.tagFor(Toolbar);
	const switchTag = context.tagFor(Switch);
	const cardTag = context.tagFor(Card);
	const tabsTag = context.tagFor(Tabs);
	const tabTag = context.tagFor(Tab);
	const tabPanelTag = context.tagFor(TabPanel);

	return html`
		<template>
			<${toolbarTag} class="toolbar">
				<h3 slot="start">&lt;${(x) => x.displayName}&gt;</h3>
				<${switchTag}
					slot="end"
					aria-label="Toggle ${(x) => x.title ?? ''} preview luminance"
					id="preview-luminance"
					${ref('luminanceSwitch')}
					@change="${(x) => x.onPreviewLuminanceChange()}"
				>
					<span slot="checked-message">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M7.456 2a6 6 0 1 1-5.406 8.605a.5.5 0 0 1 .36-.71c1.276-.231 3.278-.937 4.078-3.07c.563-1.5.512-3.015.283-4.23a.5.5 0 0 1 .475-.591C7.316 2 7.386 2 7.456 2Z"/></svg>
					</span>
					<span slot="unchecked-message">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M8 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 1Zm0 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm6.5-2.5a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1h1ZM8 13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 13ZM2.5 8.5a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1h1Zm.646-5.354a.5.5 0 0 1 .708 0l1 1a.5.5 0 1 1-.708.708l-1-1a.5.5 0 0 1 0-.708Zm.708 9.708a.5.5 0 1 1-.708-.707l1-1a.5.5 0 0 1 .708.707l-1 1Zm9-9.708a.5.5 0 0 0-.708 0l-1 1a.5.5 0 0 0 .708.708l1-1a.5.5 0 0 0 0-.708Zm-.708 9.708a.5.5 0 0 0 .708-.707l-1-1a.5.5 0 0 0-.708.707l1 1Z"/></svg>
					</span>
				</${switchTag}>
				<${switchTag}
					slot="end"
					aria-label="Toggle ${(x) => x.title ?? ''} preview reading direction"
					id="preview-direction"
					${ref('directionSwitch')}
					@change="${(x) => x.onDirectionChange()}"
				>
					<span slot="checked-message">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M5 3.75A.75.75 0 0 1 5.75 3h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 5 3.75Zm-4 4A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75Zm8 4a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"/></svg>
					</span>
					<span slot="unchecked-message">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M1 3.75A.75.75 0 0 1 1.75 3h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 1 3.75Zm0 4A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75Zm0 4a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"/></svg>
					</span>
				</${switchTag}>
			</${toolbarTag}>

				
			<${cardTag}
				class="preview-panel"
				part="preview-panel"
				${ref('previewPanel')}
			></${cardTag}>

			${when(
				(x) =>
					x.enableAttributesPanel ||
					x.enableEventsPanel ||
					x.enablePartsPanel ||
					x.enablePropsPanel ||
					x.enableSlotsPanel ||
					x.enableSourcePanel,
				html<ComponentPreview>`
					<div
						class="props-panel"
						part="props-panel"
					>
						<${tabsTag} orientation="vertical" activeid="attributes">
							<${tabTag}
								id="attributes"
								?hidden="${(x) => !x.enableAttributesPanel}"
							>Attributes</${tabTag}>
							<${tabPanelTag}
								?hidden="${(x) => !x.enableAttributesPanel}"
							>
								<div
									class="attributes-panel"
									part="attributes-panel"
									${ref('attributesPanel')}
								></div>
							</${tabPanelTag}>
						</${tabsTag}>
					</div>
				`
			)}
		</template>
	`;
}