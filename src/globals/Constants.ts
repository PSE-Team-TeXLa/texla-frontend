import type {ComponentType} from "svelte";
import GraphTextNode from "../components/graph/GraphTextNode.svelte";
import StandardCaptionNode from "../components/standard_nodes/StandardCaptionNode.svelte";
import StandardCommentNode from "../components/standard_nodes/StandardCommentNode.svelte";
import StandardEnvironmentNode from "../components/standard_nodes/StandardEnvironmentNode.svelte";
import StandardFileNode from "../components/standard_nodes/StandardFileNode.svelte";
import StandardImageNode from "../components/standard_nodes/StandardImageNode.svelte";
import StandardLabelNode from "../components/standard_nodes/StandardLabelNode.svelte";
import StandardMathNode from "../components/standard_nodes/StandardMathNode.svelte";
import StandardSegmentNode from "../components/standard_nodes/StandardSegmentNode.svelte";
import StandardTextNode from "../components/standard_nodes/StandardTextNode.svelte";
import type API from "./socket.api";
import {scrollMap} from "./Variables";
import GraphMathNode from "../components/graph/GraphMathNode.svelte";
import GraphImageNode from "../components/graph/GraphImageNode.svelte";
import GraphLabelNode from "../components/graph/GraphLabelNode.svelte";
import GraphCaptionNode from "../components/graph/GraphCaptionNode.svelte";
import GraphCommentNode from "../components/graph/GraphCommentNode.svelte";

export const backendUrl = "http://localhost:13814";
export const editorStandardNavSize = 20;
export const nonEditorStandardReadSize = 40;

export const graphNodeTypeMap = new Map<string, ComponentType>(
    [
        ["Text", GraphTextNode],
        ["Math", GraphMathNode],
        ["Image", GraphImageNode],
        ["Label", GraphLabelNode],
        ["Caption", GraphCaptionNode],
        ["Comment", GraphCommentNode]
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
