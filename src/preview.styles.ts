import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  bodyFont,
  elevationShadowCardRest,
  layerCornerRadius,
  neutralForegroundRest,
  neutralLayer2,
  neutralLayer3,
  neutralLayer4,
  neutralStrokeRest,
  strokeWidth,
} from '@fluentui/web-components';

export const previewStyles = css`
  ${display('flex')} :host {
    box-shadow: ${elevationShadowCardRest};
    font-family: ${bodyFont};
    color: ${neutralForegroundRest};
    flex-direction: column;
    background-color: ${neutralLayer4};
    border: calc(${strokeWidth} * 1px) solid ${neutralStrokeRest};
    border-radius: calc(${layerCornerRadius} * 1px);
    padding: 1rem;
  }

  fluent-toolbar {
    width: 100%;
    background-color: ${neutralLayer4};
    border-bottom: calc(${strokeWidth} * 1px) solid ${neutralStrokeRest};
    border-top-left-radius: calc(${layerCornerRadius} * 1px);
    border-top-right-radius: calc(${layerCornerRadius} * 1px);
  }

  h3 {
    margin: 0;
  }

  .preview-pane {
    box-sizing: border-box;
    width: 100%;
    height: fit-content;
    background-color: ${neutralLayer2};
    border-radius: calc(${layerCornerRadius} * 1px);
    padding: 2rem;
    contain: content;
  }

  :host([props-pane]) .preview-pane {
    border-bottom: calc(${strokeWidth} * 1px) solid ${neutralStrokeRest};
  }

  .props-pane {
    background-color: ${neutralLayer4};
  }

  fluent-tabs {
    border-bottom-left-radius: calc(${layerCornerRadius} * 1px);
    border-bottom-right-radius: calc(${layerCornerRadius} * 1px);
  }

  fluent-tab-panel {
    border-bottom-right-radius: calc(${layerCornerRadius} * 1px);
  }

  .props-grid {
    display: grid;
    gap: 1rem;
    padding: 1rem;
  }

  .control {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
