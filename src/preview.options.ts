import type { SyntheticViewTemplate } from '@microsoft/fast-element';
import type { FoundationElementDefinition } from '@microsoft/fast-foundation';

export type PreviewOptions = FoundationElementDefinition & {
  copyButtonText: string | SyntheticViewTemplate;
};
