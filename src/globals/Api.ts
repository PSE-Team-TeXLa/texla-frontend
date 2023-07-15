// import { io } from "../lib/socket.io.esm.min";
import { io } from "socket.io-client";

const socket = io("ws://localhost:13814/");
console.count("socket established");
// of course, it should only be one

export function editNode(target: bigint, raw_latex: string) {
    // TODO: Use API Types
    const operation = {
        target: Number(target), // TODO: information is lost here! -> limit uuids to 2^53 or 2^32
        raw_latex
    }
    
    socket.emit("operation", operation);
    console.log("operation sent: ", operation);
}
