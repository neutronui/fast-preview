import { attr, observable, ViewTemplate } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';

import type { SyntheticViewTemplate } from '@microsoft/fast-element';

export type StoryDefinition = {
	title: string;
	component: Function;
}

export type StoryArgs = {};

export type StoryFN = (args: StoryArgs) => ViewTemplate;
export type Story = StoryFN & {
	args: {}
}

export class Preview extends FoundationElement {
	@observable
	public storyDefinition!: StoryDefinition;

	@observable
	public story!: Story;
	public storyChanged(oldValue: Story, newValue: Story): void {
		if (this.$fastController.isConnected) {
			newValue(newValue.args ?? {}).render(this.storyDefinition.component, this);
		}
	}
}