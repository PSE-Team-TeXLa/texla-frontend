import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type API from "./socket.api";

export const json_ast: Writable<API.Ast.Ast | undefined> = writable();
export const remoteUrl: Writable<string | null> = writable(null);
export const currentLayer = writable(2);
export const isEditorActive = writable(false);
export const isGraphActive = writable(false);
export const scrollMap = new Map<number, HTMLElement>();
export const latexMap = new Map<string, string>();
export const isExpandedMap = writable(new Map<API.Uuid, Writable<boolean>>());
export const test = writable(0);
export const modal = writable();
export const isFrozen = writable(false);
export const isDragged = writable(false);
export const lastNodeTouched = writable(0);

export const inViewMap = writable(new Map<API.Uuid, Writable<boolean>>());