import type {ComponentType} from "svelte";
import GraphTextNode from "../components/graph/GraphTextNode.svelte";
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

export const scrollToNode = (node: API.Uuid) => {
    if (scrollMap.get(node) !== undefined) {
        scrollMap.get(node).scrollIntoView({behavior: "smooth"});
    }


}