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

export const componentPreviewStyles = css`
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
		background-color: ${neutralLayer3};
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
    border-radius: 0;
    padding: 2rem;
    contain: content;
	}

	.props-panel {
		background-color: ${neutralLayer4};
		padding: 1rem;
		border-bottom-left-radius: calc(${layerCornerRadius} * 1px);
    border-bottom-right-radius: calc(${layerCornerRadius} * 1px);
	}

	.attributes-panel {
		z-index: 2;
	}
`;
