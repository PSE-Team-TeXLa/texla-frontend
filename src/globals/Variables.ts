import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type API from "./socket.api";

// TODO: rename to ast
export const json_ast: Writable<API.Ast.Ast | undefined> = writable();


export const currentLayer = writable(2);
export const isEditorActive = writable(false);
export const isGraphActive = writable(false);

export const scrollMap = new Map<number, HTMLElement>();


export const modal = writable();


export const isFrozen = writable(false);
export const isDragged = writable(false);



