import {goto} from "$app/navigation";
import {io} from "socket.io-client";
import {backendUrl, scrollToNode} from "./Constants";
import type API from "./socket.api";
import {
    globalTimer,
    graphContainerStore,
    graphScrollX,
    graphScrollY,
    inViewMap,
    isEditorActive,
    isExpandedMap,
    isFrozen,
    isGraphActive,
    json_ast,
    lastNodeTouched,
    latexMap,
    modal,
    remoteUrl,
    scrollMap,
    scrollMapNav
} from "./Variables";
import {bind} from "svelte-simple-modal";
import ErrorPopup from "../components/popups/ErrorPopup.svelte";
import type {Writable} from "svelte/store";
import {writable} from "svelte/store";

const socket = io("ws://localhost:13814/");
// useful for debugging in the browser console
// @ts-ignore
globalThis.socket = socket;

// ------------ SOCKET CONNECTION ------------

socket.on("connect", () => {
    console.info("connect " + socket.id);
});
socket.on("disconnect", (reason, description) => {
    console.info("disconnect", reason, description);
    if (window.location.href.includes("close")) return;
    modal.set(bind(ErrorPopup, {message: "Backend disconnected"}));
});

// ------------- INCOMING MESSAGES -------------

socket.on("remote_url", (url: string | null) => {
    console.info("remote_url: ", url);

    if (!url) return;

    // TODO: externalize this into {remoteUrlRegex, userUrlFormatString}[]
    const result = url.match(/^https:\/\/git\.overleaf\.com\/([0-9a-f]+)$/);
    if (!result) return;
    const pid = result[1];
    const userUrl = `https://www.overleaf.com/project/${pid}`;

    remoteUrl.set(userUrl);
});

socket.on("new_ast", (new_ast: API.Ast.Ast) => {
    let ast: API.Ast.Ast;
    json_ast.update((n) => {
        ast = n as API.Ast.Ast;
        return n;
    });

    // Save old ast as path representation
    // @ts-ignore
    if (ast !== undefined)
        saveExpandableMap(ast.root);

    json_ast.set(new_ast);
    isExpandedMap.set(new Map<API.Uuid, Writable<boolean>>());

    // Load new ast from path representation
    // @ts-ignore
    if (ast !== undefined)
        restoreExpandableMapWithNewUuid(new_ast.root);

    console.info("new_ast: ", new_ast);
    console.timeEnd("roundtrip");

    let active;
    isGraphActive.update((o) => {
        active = o;
        return o;
    });

    // reset graph or standard scroll position
    if (!active) {
        /*let lastNode: number;
        lastNodeTouched.update((o) => {
            lastNode = o;
            return o;
        });
        globalTimer.update((o) => {
            o = setTimeout(() => {
                scrollToNode(lastNode)
                console.log("scroll with timer to node" + lastNode);
            }, 300);
            return o;
        });*/
    } else {
        let graphX: number;
        graphScrollX.update((o) => {
            graphX = o;
            return o;
        });
        let graphY: number;
        graphScrollY.update((o) => {
            graphY = o;
            return o;
        });

        graphContainerStore.update((o) => {
            o.scrollTop = graphY;
            o.scrollLeft = graphX;
            return o;
        });

        globalTimer.update((o) => {
            o = setTimeout(() => {
                graphContainerStore.update((o) => {
                    o.scrollTop = graphY;
                    o.scrollLeft = graphX;
                    return o;
                });
            }, 500);
            return o;
        });
    }

    if (latexMap.size > 1000)
        latexMap.clear();
    isEditorActive.set(false);
    isFrozen.set(false);
    scrollMap.clear();
    scrollMapNav.clear()
    inViewMap.update((n) => {
        n.clear();
        return n;
    });
});

socket.on("export_ready", (url: string) => {
    console.info("export_ready: ", url);
    downloadFile(backendUrl + url);
});

socket.on("quit", () => {
    console.info("quit");
    close();
    goto("/close");
});

socket.on("error", (error: API.Error) => {
    console.error("error: ", error);
    modal.set(bind(ErrorPopup, error));
    isFrozen.set(false);
});


// ----------- OUTGOING MESSAGES ------------

/**
 * Sends the add node operation to the backend.
 * @param destination
 * @param raw_latex
 */
export function addNode(destination: API.Operation.Position, raw_latex: string) {
    lastNodeTouched.set(destination.after_sibling === null ? destination.parent : destination.after_sibling);

    sendOperation({
        type: "AddNode",
        arguments: {
            destination,
            raw_latex
        }
    });
}

/**
 * Sends the edit node operation to the backend.
 * @param target
 * @param raw_latex
 */
export function editNode(target: number, raw_latex: string) {
    lastNodeTouched.set(target);

    sendOperation({
        type: "EditNode",
        arguments: {
            target,
            raw_latex
        }
    });
}

/**
 * Sends the move node operation to the backend.
 * @param target
 * @param destination
 */
export function moveNode(target: API.Uuid, destination: API.Operation.Position) {
    lastNodeTouched.set(target);

    sendOperation({
        type: "MoveNode",
        arguments: {
            target,
            destination
        }
    });
}

/**
 * Sends the delete node operation to the backend.
 * @param target
 */
export function deleteNode(target: API.Uuid) {
    lastNodeTouched.set(target);

    sendOperation({
        type: "DeleteNode",
        arguments: {
            target
        }
    })
}

/**
 * Sends the merge nodes operation to the backend.
 * @param second_node
 */
export function mergeNodes(second_node: API.Uuid) {
    lastNodeTouched.set(second_node);

    sendOperation({
        type: "MergeNodes",
        arguments: {
            second_node
        }
    })
}

/**
 * Sends the edit metadata operation to the backend.
 * @param target
 * @param new_meta
 */
export function editMetadata(target: API.Uuid, new_meta: API.Metadata) {
    lastNodeTouched.set(target);

    sendOperation({
        type: "EditMetadata",
        arguments: {
            target: target,
            new: new_meta
        }
    })
}

// the path representation of the ast with the last node touched as path
const expandableMapBackup = new Map<string, boolean>();
let lastTouchedBackup: string;

/**
 * Converts the ast into a path representation and saves it in expandableMapBackup.
 * @param currentNode
 * @param currentPath
 */
function saveExpandableMap(currentNode: API.Ast.Node, currentPath = "0") {
    let lastNodeTouchedUuid;
    lastNodeTouched.update((n) => {
        lastNodeTouchedUuid = n;
        return n;
    })
    if (currentNode.uuid === lastNodeTouchedUuid) {
        lastTouchedBackup = currentPath;
    }

    if (currentNode.node_type.type === "Expandable") {
        let isExpandedWritable = writable(false);
        isExpandedMap.update((n) => {
            if (n.get(currentNode.uuid) !== undefined)
                isExpandedWritable = n.get(currentNode.uuid) as Writable<boolean>;
            return n;
        })
        let isExpanded = false;
        isExpandedWritable.update((n) => {
            isExpanded = n;
            return n;
        });

        expandableMapBackup.set(currentPath, isExpanded);

        currentNode.node_type.children.forEach((child, index) => {
            saveExpandableMap(child, currentPath + "/" + index);
        });
    }
}

/**
 * Restores the expandableMap with the new uuids from the new ast.
 * @param currentNode
 * @param currentPath
 */
function restoreExpandableMapWithNewUuid(currentNode: API.Ast.Node, currentPath = "0") {
    if (lastTouchedBackup === currentPath) {
        lastNodeTouched.set(currentNode.uuid);
    }

    if (currentNode.node_type.type === "Expandable") {
        if (expandableMapBackup.has(currentPath)) {
            isExpandedMap.update((n) => {
                n.set(currentNode.uuid, writable(expandableMapBackup.get(currentPath)));
                return n;
            });
        }
        currentNode.node_type.children.forEach((child, index) => {
            restoreExpandableMapWithNewUuid(child, currentPath + "/" + index);
        });
    }
}

/**
 * Sends the given operation to the backend.
 * @param operation
 */
function sendOperation(operation: API.Operation.Operation) {
    // Dont send operation if frontend is frozen
    let frozen = false;
    isFrozen.update(x => {
        frozen = x;
        return x;
    });
    if (frozen) {
        // TODO: implement some overlay
        console.log("Ignoring operation, because frontend is still frozen");
    }

    let active;
    isGraphActive.update((o) => {
        active = o;
        return o;
    });

    if (active) {
        let div: HTMLDivElement;
        graphContainerStore.update((o) => {
            div = o;
            return o;
        });
        // @ts-ignore
        if (div !== undefined) {
            graphScrollY.set(div.scrollTop);
            graphScrollX.set(div.scrollLeft);
        }
    }
    // volatile -> message is not buffered (it would contain wrong UUIDs anyway)
    socket.volatile.emit("operation", JSON.stringify(operation));
    console.info("[sid=%s] operation sent: ", socket.id, operation);
    isFrozen.set(true);
    console.time("roundtrip");
}

/**
 * Sends the prepare_export message to the backend.
 * @param options
 */
export function sendPrepareExport(options: API.StringificationOptions) {
    socket.emit("prepare_export", JSON.stringify(options));
    console.info("[sid=%s] prepare_export sent: ", socket.id, options);
}

/**
 * Sends the active message to the backend.
 */
export function sendActive() {
    socket.emit("active", "{}");
}

/**
 * Sends the quit message to the backend.
 */
export function sendQuit() {
    console.log("quitting...");
    socket.emit("quit", "{}");
}

/**
 * Downloads the file from the given url.
 * @param url
 */
function downloadFile(url: string) {
    console.log("Downloading", url)
    const link = document.createElement("a");
    link.download = url;
    link.href = url;
    link.click();
}
