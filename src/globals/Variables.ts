import {writable} from "svelte/store";

export const currentLayer = writable(2);
export const isEditorActive = writable(false);

