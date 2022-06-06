import { baseLayerLuminance } from '@fluentui/web-components';
import { DesignToken } from '@microsoft/fast-foundation';

const { create } = DesignToken;

export const previewLuminance =
  create<number>('preview-luminance').withDefault(baseLayerLuminance);
