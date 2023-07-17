import {writable} from "svelte/store";

export const json_ast = writable(JSON);

export const currentLayer = writable(2);
export const isEditorActive = writable(false);
export const isGraphActive = writable(false);

export const scrollMap = writable(new Map<number, HTMLElement>());


export const isFrozen = writable(false);

