<script lang="ts">
    import {standardNodeTypeMap} from "../../globals/Constants";
    import {isEditorActive, json_ast} from "../../globals/Variables";
    import {dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID} from "svelte-dnd-action";
    import {moveNode} from "../../globals/Api";
    import {flip} from "svelte/animate";

    import type API from "../../globals/socket.api.d.ts";

    import StandardNodeContent from "./StandardNodeContent.svelte";

    export let parent;
    export let node: API.Ast.Node<API.Ast.ExpandableType>;


    let children: API.Ast.Node[];
    $: children = node.node_type.children;
    let text: string;
    $: if (node.node_type.type === "Expandable")
        if (node.node_type.data.type === "Document")
            text = "Document";
        else if (node.node_type.data.type === "Segment")
            text = node.node_type.data.heading;
        else if (node.node_type.data.type === "File")
            text = node.node_type.data.path
        else if (node.node_type.data.type === "Environment")
            text = node.node_type.data.name

    export let layerShown: number;

    const handleConsider = (evt) => {
        node.node_type.children = evt.detail.items;

        console.log($json_ast);
    }

    const handleFinalize = (evt) => {
        if (evt.detail.items.filter(e => e.uuid === evt.detail.info.id).length === 0) {
            return;
        }
        node.node_type.children = evt.detail.items;
        let target = evt.detail.info.id;
        let childrenArray;
        childrenArray = node.node_type.children;
        let lastChildIndex = childrenArray.findIndex((o: API.Ast.Node) => o.uuid === target) - 1;
        let position: API.Operation.Position = {
            parent: node.uuid,
            after_sibling: lastChildIndex === -1 ? null : evt.detail.items[lastChildIndex].uuid
        }
        moveNode(target, position)
    }

    $: dndOptions = {
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

    let isDraggedLocal = false;
    let dragStuff;

    function startDrag() {
        if (!$isEditorActive) {
            isDraggedLocal = true;
        }
    }

    function stopDrag() {
        isDraggedLocal = false;
    }


    // TODO Fix Component Hierarchie Standard Nodes nach ganz außen und Content-Component hinzufügen
    // TODO fix navcolumn logic (navsegment buttons)
</script>

<div class="flex flex-col">
    <StandardNodeContent parent={parent} on:mousedown={startDrag} on:touchstart={startDrag}
                         on:mouseup={stopDrag}
                         on:touchend={stopDrag} node={node}>
        <slot/>
    </StandardNodeContent>

    <div class="ml-6 my-4">
        <div bind:this={dragStuff} use:dndzone="{dndOptions}"
             on:consider="{handleConsider}" on:finalize="{handleFinalize}" class="mb-4">
            {#each children.filter(item => item.uuid !== SHADOW_PLACEHOLDER_ITEM_ID) as new_node (new_node.uuid)}
                <div animate:flip="{{duration: 100}}">
                    {#if new_node[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                        <div class="h-[50px]">
                        </div>
                    {:else}
                        <svelte:component parent={node.uuid}
                                          this={standardNodeTypeMap.get(new_node.node_type.data.type)}
                                          {...{
                                              node: new_node,
                                              layerShown: layerShown + 1,
                                          }}/>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>
