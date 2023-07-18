// import { io } from "../lib/socket.io.esm.min";
import { io } from "socket.io-client";
import type API from "./socket.api";
import {isFrozen, json_ast} from "./Variables";

const socket = io("ws://localhost:13814/");
console.count("socket established");
// of course, it should only be one

// incoming

socket.on("remote_url", (url: string | null) => {
    console.log("remote_url: ", url);
});

socket.on("new_ast", (new_ast: API.Ast.Ast) => {
    json_ast.set(new_ast);
    isFrozen.set(false);
});


// outgoing

export function editNode(target: number, raw_latex: string) {
    const operation: API.Operation.EditNode = {
        target,
        raw_latex
    }
    
    sendOperation(operation);
}

export function moveNode(target: API.Uuid, destination: API.Operation.Position) {
    const operation: API.Operation.MoveNode = {
        target,
        destination
    }

    sendOperation(operation);
}
function sendOperation(operation: API.Operation.Operation) {
    socket.emit("operation", operation);
    console.log("operation sent: ", operation);
    isFrozen.set(true);
}
