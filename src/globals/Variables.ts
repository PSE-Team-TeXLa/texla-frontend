import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type API from "./socket.api";

export const json_ast: Writable<API.Ast.Ast | undefined> = writable();


export const currentLayer = writable(2);
export const isEditorActive = writable(false);
export const isGraphActive = writable(false);

export const scrollMap = writable(new Map<number, HTMLElement>());


export const isFrozen = writable(false);

