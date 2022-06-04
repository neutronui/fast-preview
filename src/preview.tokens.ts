import { DesignToken } from '@microsoft/fast-foundation';

const { create } = DesignToken;

const previewLuminance = create<number>('preview-luminance').withDefault(1);