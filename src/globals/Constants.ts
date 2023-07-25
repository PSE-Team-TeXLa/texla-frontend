import type {ComponentType} from "svelte";
import GraphTextNode from "../components/graph/GraphTextNode.svelte";

export const editorStandardNavSize = 20;
export const nonEditorStandardReadSize = 40;

export const graphNodeTypeMap = new Map<string, ComponentType>(
    [
        ["Text", GraphTextNode],
    ]
);