import {goto} from "$app/navigation";
import {io} from "socket.io-client";
import {backendUrl} from "./Constants";
import type API from "./socket.api";
import {isEditorActive, isFrozen, json_ast, scrollMap} from "./Variables";

import {modal} from "./Variables";
import {bind} from "svelte-simple-modal";
import ErrorPopup from "../components/popups/ErrorPopup.svelte";

const socket = io("ws://localhost:13814/");
// useful for debugging in the browser console
// @ts-ignore
globalThis.socket = socket;

socket.on("connect", () => {
    console.info("connect");
});
socket.on("disconnect", (reason, description) => {
    console.info("disconnect", reason, description);
    modal.set(bind(ErrorPopup, {message: "Backend disconnected"}));
});

// incoming

socket.on("remote_url", (url: string | null) => {
    console.info("remote_url: ", url);
    // TODO: transform to user-friendly URL and put into some store
});

socket.on("new_ast", (new_ast: API.Ast.Ast) => {
    json_ast.set(new_ast);
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
    sendOperation({
        type: "AddNode",
        arguments: {
            destination,
            raw_latex
        }
    });
}

export function editNode(target: number, raw_latex: string) {
    sendOperation({
        type: "EditNode",
        arguments: {
            target,
            raw_latex
        }
    });
}

export function moveNode(target: API.Uuid, destination: API.Operation.Position) {
    sendOperation({
        type: "MoveNode",
        arguments: {
            target,
            destination
        }
    });
}

export function deleteNode(target: API.Uuid) {
    sendOperation({
        type: "DeleteNode",
        arguments: {
            target
        }
    })
}

export function mergeNodes(second_node: API.Uuid) {
    sendOperation({
        type: "MergeNodes",
        arguments: {
            second_node
        }
    })
}

function sendOperation(operation: API.Operation.Operation) {
    let frozen: boolean = false;
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

function downloadFile(url: string) {
    const link = document.createElement("a");
    link.download = url;
    link.href = url;
    link.click();
}
