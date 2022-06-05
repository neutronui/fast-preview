import filesize from "rollup-plugin-filesize";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import transformTaggedTemplate from "rollup-plugin-transform-tagged-template";
import typescript from "@rollup/plugin-typescript";
import {
    transformCSSFragment,
    transformHTMLFragment,
} from "./build/transform-fragments.js";

const parserOptions = {
    sourceType: "module",
};

const plugins = [
    nodeResolve(),
    typescript({
        compilerOptions: {
            declaration: false,
            declarationDir: undefined,
        },
    }),
    transformTaggedTemplate({
        tagsToProcess: ["css"],
        transformer: transformCSSFragment,
        parserOptions,
    }),
    transformTaggedTemplate({
        tagsToProcess: ["html"],
        transformer: transformHTMLFragment,
        parserOptions,
    }),
    filesize({
        showMinifiedSize: false,
        showBrotliSize: true,
    }),
];

export default [
    {
        context: "this",
        input: "src/index.ts",
        output: [
            {
                file: "dist/preview-element.js",
                format: "esm",
            },
            {
                file: "dist/preview-element.min.js",
                format: "esm",
                plugins: [terser()],
            },
        ],
        plugins,
    },
];