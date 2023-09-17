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


export const backendUrl = window.location.origin;
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
    scrollMap.get(node)?.scrollIntoView({behavior: "smooth", block: "center"});
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
    //if (text[20] !== " ") text = text.split(" ").slice(0, -1).join(" ");
    return text + "...";
}

/**
 * Gets the content of a node or just the first X. Use shortForm if necessary.
 *
 * @param node
 * @param firstX
 * @param useShortForm
 */
export function getContentFromNode(node: API.Ast.Node, firstX = 0, useShortForm = false): string {
    let content: string;
    switch (node?.node_type.data.type) {
        case "Caption": {
            content = node?.node_type.data.caption as string;
            break;
        }
        case "Text": {
            content = node?.node_type.data.text as string;
            break;
        }
        case "Comment": {
            content = node?.node_type.data.comment as string;
            break;
        }
        case "Document": {
            content = "Document";
            break;
        }
        case "Environment": {
            content = node?.node_type.data.name as string;
            break;
        }
        case "File": {
            content = node?.node_type.data.path as string;
            break;
        }
        case "Image": {
            content = node?.node_type.data.path as string;
            break;
        }
        case "Label": {
            content = node?.node_type.data.label as string;
            break;
        }
        case "Math": {
            content = node?.node_type.data.content as string;
            break;
        }
        case "Segment": {
            content = node?.node_type.data.heading as string;
            break;
        }
        default: {
            content = "NO-CONTENT";
        }
    }

    if (useShortForm && node?.meta_data.short_form) {
        content = node?.meta_data.short_form as string;
    }

    if (firstX !== 0) {
        content = firstXChars(content, firstX);
    }

    return content;
}

/**
 * The size of the screen "edge" in pixels.
 * This determines, how large the hover zone is that moves the page during dragging.
 */
export const scrollEdgeSize = 150;
/**
 * The maximum speed of the scrolling when hovering near screen edges in pixels per 30ms.
 */
export const scrollBaseIntensity = 70;
/**
 * The time between two scrolls on screen edge in ms.
 */
export const scrollFrequency = 20;

export function debounceRepeated<T extends (..._: any[]) => any>(func: T, delay: number): T {
    let instantAllowed = true;
    let nextExecution: (() => void) | null = null;

    function runDelayed() {
        if (nextExecution) {
            nextExecution();
            nextExecution = null;
            setTimeout(runDelayed, delay);
        } else {
            instantAllowed = true;
        }
    }

    return function () {
        const args = arguments;
        if (instantAllowed) {
            func(...args);
            instantAllowed = false;
            setTimeout(runDelayed, delay);
        } else {
            nextExecution = function () {
                func(...args);
            };
        }
    } as T;
}
