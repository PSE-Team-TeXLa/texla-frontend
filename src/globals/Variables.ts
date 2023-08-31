import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type API from "./socket.api";

/**
 * Stores the AST.
 */
export const json_ast: Writable<API.Ast.Ast | undefined> = writable();

/**
 * Stores the url of the remote project.
 */
export const remoteUrl: Writable<string | null> = writable(null);

/**
 * Stores the current layer.
 */
//export const currentLayer = writable(2);

/**
 * Stores whether the editor is active.
 */
export const isEditorActive = writable(false);

/**
 * Stores whether the graph is active.
 */
export const isGraphActive = writable(false);

/**
 * Allows one to get access to a html element by its uuid in the read column.
 */
export const scrollMap = new Map<number, HTMLElement>();

/**
 * Allows one to get access to a html element by its uuid in the nav column.
 */
export const scrollMapNav = new Map<number, HTMLElement>();

/**
 * Cache for Latex objects.
 */
export const latexMap = new Map<string, string>();

/**
 * Stores whether a node is expanded.
 */
export const isExpandedMap = writable(new Map<API.Uuid, Writable<boolean>>());

/**
 * Stores popups.
 */
export const modal = writable();

/**
 * Stores whether the application is frozen.
 */
export const isFrozen = writable(false);

/**
 * Stores whether a node is dragged.
 */
export const isDragged = writable(false);

/**
 * Stores the last node touched.
 */
export const lastNodeTouched = writable(0);

/**
 * Stores whether a node is in view.
 */
export const inViewMap = writable(new Map<API.Uuid, Writable<boolean>>());

/**
 * Stores the last node that got into view..
 */
export const lastNodeInView = writable(0);

/**
 * Stores where the last scroll appeared, either in the read column or in the nav column. Read is true, nav is false.
 */
export const scrollOnRead = writable(true);

export const graphContainerStore: Writable<HTMLDivElement> = writable();
export const graphScrollX: Writable<number> = writable();
export const graphScrollY: Writable<number> = writable()

export const globalTimer: Writable<ReturnType<typeof setTimeout>> = writable(setTimeout(() => {
    console.log("Timer init")
}, 0))

