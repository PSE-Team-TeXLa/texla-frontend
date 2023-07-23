import {goto} from "$app/navigation";
import {io} from "socket.io-client";
import type API from "./socket.api";
import {isFrozen, json_ast} from "./Variables";

const socket = io("ws://localhost:13814/");
// useful for debugging in the browser console
// @ts-ignore
globalThis.socket = socket;

socket.on("connect", () => {
    console.info("connect");
});
socket.on("disconnect", (reason, description) => {
    console.info("disconnect", reason, description);
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
});

socket.on("export_ready", (url: string) => {
    console.info("export_ready: ", url);
    downloadFile(url);
});

socket.on("quit", () => {
    console.info("quit");
    goto("/close");
});

socket.on("error", (error: string) => {
    console.error("error: ", error);
    // TODO: show error in pop up
});


// outgoing

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

function sendOperation(operation: API.Operation.Operation) {
    // volatile -> message is not buffered (it would contain wrong UUIDs anyway)
    socket.volatile.emit("operation", JSON.stringify(operation));
    console.info("[sid=%s] operation sent: ", socket.id, operation);
    isFrozen.set(true);
    console.time("roundtrip");
}

function sendPrepareExport(options: API.StringificationOptions) {
    socket.emit("prepare_export", JSON.stringify(options));
    console.info("[sid=%s] prepare_export sent: ", socket.id, options);
}

function downloadFile(url: string) {
    const link = document.createElement("a");
    link.download = url;
    link.href = url;
    link.click();
}
