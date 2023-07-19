import {io} from "socket.io-client";
import type API from "./socket.api";
import {isFrozen, json_ast} from "./Variables";

const socket = io("ws://localhost:13814/");
console.count("socket established");
// useful for debugging in the browser console
// @ts-ignore
globalThis.socket = socket;
// of course, it should only be one

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

socket.on("disconnect", () => {
    console.info("disconnect");
});


// outgoing

export function editNode(target: number, raw_latex: string) {
    sendOperation({
        type: "EditNode", arguments: {
            target,
            raw_latex
        }
    });
}

export function moveNode(target: API.Uuid, destination: API.Operation.Position) {
    sendOperation({
        type: "MoveNode", arguments: {
            target,
            destination
        }
    });
}

function sendOperation(operation: API.Operation.Operation) {
    socket.emit("operation", JSON.stringify(operation));
    console.info("[socket %s] operation sent: ", socket.id, operation);
    isFrozen.set(true);
    console.time("roundtrip");
}
