import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  bodyFont,
  layerCornerRadius,
  neutralForegroundRest,
  neutralLayer2,
  neutralLayer3,
  neutralLayer4,
  neutralStrokeRest,
  strokeWidth,
} from '@fluentui/web-components';

export const componentPreviewStyles = (context, definition) => css`
	${display('flex')} :host {
		font-family: ${bodyFont};
		flex-direction: column;

		background-color: ${neutralLayer4};
		color: ${neutralForegroundRest};

		border: calc(${strokeWidth} * 1px) solid ${neutralStrokeRest};
		border-radius: calc(${layerCornerRadius} * 1px);
	}

	.toolbar {
		width: 100%;
		background-color: ${neutralLayer4};
		border-top-left-radius: calc(${layerCornerRadius} * 1px);
    border-top-right-radius: calc(${layerCornerRadius} * 1px);
	}

	h3 {
		margin: 0;
	}

	.preview-panel {
		box-sizing: border-box;
    width: 100%;
    height: fit-content;
    background-color: ${neutralLayer2};
    color: ${neutralForegroundRest};
		border-color: transparent;
    border-radius: 0;
    padding: 2rem;
    contain: content;
		box-shadow: unset;
	}

	.props-panel {
		background-color: ${neutralLayer4};
		padding: 1rem;
		border-bottom-left-radius: calc(${layerCornerRadius} * 1px);
    border-bottom-right-radius: calc(${layerCornerRadius} * 1px);
	}
	
	.preview-panel {
		
	}

	.slots-panel,
	.attributes-panel {
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		gap: 1rem;
		padding-inline-start: 3rem;
	}

	.slots-panel > .name,
	.attributes-panel > .name {
		grid-column: 1;
	}

	.slots-panel > .description,
	.attributes-panel > .description {
		grid-column: 2;
		white-space: normal;
		margin: 0;
	}

	.slots-panel > .value,
	.attributes-panel > .value {
		grid-column: 3;
	}
`;
