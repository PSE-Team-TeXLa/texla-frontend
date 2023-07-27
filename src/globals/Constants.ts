import type {ComponentType} from "svelte";
import GraphTextNode from "../components/graph/GraphTextNode.svelte";
import StandardCaptionNode from "../components/standard_nodes/StandardCaptionNode.svelte";
import StandardCommentNode from "../components/standard_nodes/StandardCommentNode.svelte";
import StandardDocumentNode from "../components/standard_nodes/StandardDocumentNode.svelte";
import StandardEnvironmentNode from "../components/standard_nodes/StandardEnvironmentNode.svelte";
import StandardFileNode from "../components/standard_nodes/StandardFileNode.svelte";
import StandardImageNode from "../components/standard_nodes/StandardImageNode.svelte";
import StandardLabelNode from "../components/standard_nodes/StandardLabelNode.svelte";
import StandardMathNode from "../components/standard_nodes/StandardMathNode.svelte";
import StandardSegmentNode from "../components/standard_nodes/StandardSegmentNode.svelte";
import StandardTextNode from "../components/standard_nodes/StandardTextNode.svelte";
import type API from "./socket.api";
import {scrollMap} from "./Variables";
import GraphSegmentNode from "../components/graph/GraphSegmentNode.svelte";


export const editorStandardNavSize = 20;
export const nonEditorStandardReadSize = 40;

export const graphNodeTypeMap = new Map<string, ComponentType>(
    [
        ["Text", GraphTextNode],
        ["Segment", GraphSegmentNode],
        ["Environment", GraphSegmentNode],
        ["Document", GraphSegmentNode],
        ["File", GraphSegmentNode],

    ]
);

export const standardNodeTypeMap = new Map<string, ComponentType>(
    //Expandable
    [
        ["Segment", StandardSegmentNode],
        ["File", StandardFileNode],
        ["Environment", StandardEnvironmentNode],
        ["Text", StandardTextNode],
        ["Math", StandardMathNode],
        ["Image", StandardImageNode],
        ["Label", StandardLabelNode],
        ["Caption", StandardCaptionNode],
        ["Comment", StandardCommentNode]
    ]);

export const scrollToNode = (node: API.Uuid) => {
    scrollMap.get(node)?.scrollIntoView({behavior: "smooth"});
}

export function firstXChars(text: string, x: number) {
    if (text.length <= x) return text;
    text = text.slice(0, x);
    if (text[20] !== " ") text = text.split(" ").slice(0, -1).join(" ");
    return text + "...";
}
