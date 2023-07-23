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
});

socket.on("new_ast", (new_ast: API.Ast.Ast) => {
    json_ast.set(new_ast);
    console.info("new_ast: ", new_ast);
    isFrozen.set(false);
    console.timeEnd("roundtrip");
});

socket.on("quit", () => {
    console.info("quit");
    goto("/close");
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
