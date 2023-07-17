// import { io } from "../lib/socket.io.esm.min";
import { io } from "socket.io-client";
import type API from "./socket.api";
import {isFrozen} from "./Variables";

const socket = io("ws://localhost:13814/");
console.count("socket established");
// of course, it should only be one

// incoming

socket.on("remote_url", (url: string | null) => {
    console.log("remote_url: ", url);
});

socket.on("new_ast", (ast: API.Ast.Ast) => {
    // TODO: save ast into store (that does not exist yet)
});


// outgoing

export function editNode(target: number, raw_latex: string) {
    const operation: API.Operation.EditNode = {
        target:target, // TODO: information is lost here! -> limit uuids to 2^53 or 2^32
        raw_latex
    }

    socket.emit("operation", operation);
    console.log("operation sent: ", operation);
}
function sendOperation(operation: API.Operation.Operation) {
    socket.emit("operation", operation);
    console.log("operation sent: ", operation);
    isFrozen.set(true);
}
