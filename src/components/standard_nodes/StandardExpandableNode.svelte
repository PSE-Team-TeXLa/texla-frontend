<script lang="ts">
    import NavSegmentButton from "../buttons/NavSegmentButton.svelte";
    import {currentLayer, isEditorActive} from "../../globals/Variables";
    import StandardNodeContent from "./StandardNodeContent.svelte";
    import {flip} from "svelte/animate";
    import type {ComponentType} from "svelte";


    import {dndzone} from "svelte-dnd-action";
    import StandardDocumentNode from "./StandardDocumentNode.svelte";
    import StandardSegmentNode from "./StandardSegmentNode.svelte";
    import StandardTextNode from "./StandardTextNode.svelte";
    import StandardEnvironmentNode from "./StandardEnvironmentNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import {moveNode} from "../../globals/Api";


    export const standardNodeTypeMap = new Map<string, ComponentType>(
        [["Document", StandardDocumentNode],
            ["Segment", StandardSegmentNode],
            ["Text", StandardTextNode],
            ["Environment", StandardEnvironmentNode],
        ]
    );

    export let parent;
    export let node: API.Ast.Node;

    let children: API.Ast.Node[];
    $: if (node.node_type.type === "Expandable") {
        children = node.node_type.children;
    }

    let text: string;
    $: if (node.node_type.type === "Expandable")
        if (node.node_type.data.type === "Document")
            text = "Document";
        else if (node.node_type.data.type === "Segment")
            text = node.node_type.data.heading;
        else if (node.node_type.data.type === "Environment")
            text = node.node_type.data.name

    export let isNavColumn: boolean;
    export let layerShown: number;

    const handleConsider = (evt) => {
        if (node.node_type.type === "Expandable")
            node.node_type.children = evt.detail.items;

    }

    const handleFinalize = (evt) => {
        if (evt.detail.items.filter(e => e.uuid === evt.detail.info.id).length === 0) {
            return;
        }
        if (node.node_type.type === "Expandable")
            node.node_type.children = evt.detail.items;
        let target = evt.detail.info.id;
        let childrenArray;
        if (node.node_type.type === "Expandable")
            childrenArray = node.node_type.children;
        let lastChildIndex = childrenArray.findIndex((o: API.Ast.Node) => o.uuid === target) - 1;
        let position: API.Operation.Position = {
            parent: node.uuid,
            after_sibling: lastChildIndex === -1 ? null : evt.detail.items[lastChildIndex].uuid
        }
        moveNode(target, position)
    }

    $: dndOptiions = {
        dragDisabled: $isEditorActive,
        items: children,
        dropTargetStyle: {
            'border-left': '6px solid #2196F3',
            'background-color': '#ddffff',
            'padding-top': '8px',
            'padding-bottom': '8px'
        },
        flipDurationMs: 100
    }

    let isDragged = false;
    let dragStuff;

    function startDrag() {
        //dragStuff.classList.add("hidden");
        isDragged = true;
        console.log("startDrag");
    }

    function stopDrag() {
        //dragStuff.classList.remove("hidden");
        isDragged = false;
        console.log("stopDrag");
    }


    // TODO Fix Component Hierarchie Standard Nodes nach ganz außen und Content-Component hinzufügen
    //TODO fix navcolumn logic (navsegment buttons)
</script>

{#if isNavColumn}
    <div class="flex flex-col ml-4 mt-2">
        <NavSegmentButton uuid={node.uuid} isNavColumn={isNavColumn}
                          isOnLayer={layerShown}>{text}</NavSegmentButton>
        <!-- Anzeigedetail, ob die neuen Layers in der rechten Spalte angezeigt werden sollen-->
        {#if layerShown < $currentLayer - 1 }
            {#each children as new_node}
                {#if (new_node.node_type.type !== "Leaf") }
                    <svelte:component parent={node.uuid}
                                      this={standardNodeTypeMap.get(new_node.node_type.data.type)}
                                      {...{node: new_node, layerShown: layerShown + 1, isNavColumn}}/>
                {/if}
            {/each}
        {/if}
    </div>
{:else}
    <div class="flex flex-col ml-3">
        {#if layerShown < $currentLayer }
            <div class=" py-4">
                <StandardNodeContent parent={parent} on:mousedown={startDrag} on:touchstart={startDrag}
                                     on:mouseup={stopDrag}
                                     on:touchend={stopDrag} node={node}>
                    <slot/>
                </StandardNodeContent>
                {#if !isDragged}
                    <div bind:this={dragStuff} use:dndzone="{dndOptiions}"
                         on:consider="{handleConsider}" on:finalize="{handleFinalize}" class="mb-4">
                        {#each children as new_node (new_node.uuid)}
                            <div animate:flip="{{duration: 100}}">
                                <div>

                                    <svelte:component parent={node.uuid}
                                                      this={standardNodeTypeMap.get(new_node.node_type.data.type)}
                                                      {...{
                                                          node: new_node,
                                                          layerShown: layerShown + 1,
                                                          isNavColumn
                                                      }}/>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {:else if layerShown === $currentLayer }
            <NavSegmentButton uuid={node.uuid} isNavColumn={isNavColumn}
                              isOnLayer={layerShown + 1 }>{text}</NavSegmentButton>
        {/if}
    </div>
{/if}

<style>
    .hidden {
        height: 0;
        transition: height 0.2s;
    }
</style>