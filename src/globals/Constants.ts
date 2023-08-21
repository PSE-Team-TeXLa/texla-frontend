import type {ComponentType} from "svelte";
import GraphTextNode from "../components/graph/GraphTextNode.svelte";
import StandardCaptionNode from "../components/nodes/standard_nodes/StandardCaptionNode.svelte";
import StandardCommentNode from "../components/nodes/standard_nodes/StandardCommentNode.svelte";
import StandardEnvironmentNode from "../components/nodes/standard_nodes/StandardEnvironmentNode.svelte";
import StandardFileNode from "../components/nodes/standard_nodes/StandardFileNode.svelte";
import StandardImageNode from "../components/nodes/standard_nodes/StandardImageNode.svelte";
import StandardLabelNode from "../components/nodes/standard_nodes/StandardLabelNode.svelte";
import StandardMathNode from "../components/nodes/standard_nodes/StandardMathNode.svelte";
import StandardSegmentNode from "../components/nodes/standard_nodes/StandardSegmentNode.svelte";
import StandardTextNode from "../components/nodes/standard_nodes/StandardTextNode.svelte";
import type API from "./socket.api";
import {scrollMap, scrollMapNav} from "./Variables";
import GraphMathNode from "../components/graph/GraphMathNode.svelte";
import GraphImageNode from "../components/graph/GraphImageNode.svelte";
import GraphLabelNode from "../components/graph/GraphLabelNode.svelte";
import GraphCaptionNode from "../components/graph/GraphCaptionNode.svelte";
import GraphCommentNode from "../components/graph/GraphCommentNode.svelte";


export const backendUrl = "http://localhost:13814";
export const readColumnSize = 70;
export const navColumnSize = 100 - readColumnSize;

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

export const meta_data_items: string[] = ["short_form", "note"];

/**
 * Scroll to a node in the read column
 * @param node
 */
export const scrollToNode = (node: API.Uuid) => {
    scrollMap.get(node)?.scrollIntoView({behavior: "smooth"});
}

/**
 * Scroll to a node in the nav column
 * @param node
 */
export const scrollToNodeNav = (node: API.Uuid) => {
    scrollMapNav.get(node)?.scrollIntoView({behavior: "smooth", block: "center"});
}

/**
 * Returns the first x characters of a string
 * @param text
 * @param x
 */
export function firstXChars(text: string, x: number) {
    if (text.length <= x) return text;
    text = text.slice(0, x);
    if (text[20] !== " ") text = text.split(" ").slice(0, -1).join(" ");
    return text + "...";
}
