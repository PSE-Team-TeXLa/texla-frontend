import {goto} from "$app/navigation";
import {io} from "socket.io-client";
import {backendUrl} from "./Constants";
import type API from "./socket.api";
import {isEditorActive, isExpandedMap, isFrozen, json_ast, lastNodeTouched, remoteUrl, scrollMap} from "./Variables";

import {modal} from "./Variables";
import {bind} from "svelte-simple-modal";
import ErrorPopup from "../components/popups/ErrorPopup.svelte";
import type {Writable} from "svelte/store";
import {writable} from "svelte/store";

const socket = io("ws://localhost:13814/");
// useful for debugging in the browser console
// @ts-ignore
globalThis.socket = socket;

socket.on("connect", () => {
    console.info("connect " + socket.id);
});
socket.on("disconnect", (reason, description) => {
    console.info("disconnect", reason, description);
    modal.set(bind(ErrorPopup, {message: "Backend disconnected"}));
});

// incoming

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
    // @ts-ignore
    if (ast !== undefined)
        saveExpandableMap(ast.root);
    console.log(expandableMapBackup);

    json_ast.set(new_ast);
    isExpandedMap.set(new Map<API.Uuid, Writable<boolean>>());
    // @ts-ignore
    if (ast !== undefined)
        restoreExpandableMapWithNewUuid(new_ast.root);
    lastNodeTouched.update(o => {
        console.log(o);
        return o;
    });

    console.info("new_ast: ", new_ast);
    isFrozen.set(false);
    console.timeEnd("roundtrip");
    scrollMap.clear();
    isEditorActive.set(false);
});

socket.on("export_ready", (url: string) => {
    console.info("export_ready: ", url);
    downloadFile(backendUrl + url);
});

socket.on("quit", () => {
    console.info("quit");
    goto("/close");
});

socket.on("error", (error: API.Error) => {
    console.error("error: ", error);
    modal.set(bind(ErrorPopup, error));
    isFrozen.set(false);
});


// outgoing

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

export function moveNode(target: API.Uuid, destination: API.Operation.Position) {
    lastNodeTouched.set(target);
    console.log(destination)

    sendOperation({
        type: "MoveNode",
        arguments: {
            target,
            destination
        }
    });
}

export function deleteNode(target: API.Uuid) {
    lastNodeTouched.set(target);

    sendOperation({
        type: "DeleteNode",
        arguments: {
            target
        }
    })
}

export function mergeNodes(second_node: API.Uuid) {
    lastNodeTouched.set(second_node);

    sendOperation({
        type: "MergeNodes",
        arguments: {
            second_node
        }
    })
}

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

const expandableMapBackup = new Map<string, boolean>();
let lastTouchedBackup: string;

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

function sendOperation(operation: API.Operation.Operation) {
    let frozen = false;
    isFrozen.update(x => {
        frozen = x;
        return x;
    });
    if (frozen) {
        // TODO: implement some overlay
        console.log("Ignoring operation, because frontend is still frozen");
    }
    // volatile -> message is not buffered (it would contain wrong UUIDs anyway)
    socket.volatile.emit("operation", JSON.stringify(operation));
    console.info("[sid=%s] operation sent: ", socket.id, operation);
    isFrozen.set(true);
    console.time("roundtrip");
}

export function sendPrepareExport(options: API.StringificationOptions) {
    socket.emit("prepare_export", JSON.stringify(options));
    console.info("[sid=%s] prepare_export sent: ", socket.id, options);
}

export function sendActive() {
    socket.emit("active", "{}");
}

function downloadFile(url: string) {
    console.log("Downloading", url)
    const link = document.createElement("a");
    link.download = url;
    link.href = url;
    link.click();
}
