<script lang="ts">
    import {scrollToNode, standardNodeTypeMap} from "../../globals/Constants";
    import {isEditorActive, json_ast, lastDovenIn} from "../../globals/Variables";
    import {dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID} from "svelte-dnd-action";
    import {moveNode, sendActive} from "../../globals/Api";
    import {flip} from "svelte/animate";

    import type API from "../../globals/socket.api.d.ts";

    import StandardNodeContent from "./StandardNodeContent.svelte";
    import {onMount} from "svelte";

    export let parent;
    export let node: API.Ast.Node<API.Ast.ExpandableType>;


    let children: API.Ast.Node[];
    $: children = node.node_type.children;

    export let layerShown: number;

    const handleConsider = (evt) => {
        node.node_type.children = evt.detail.items;
    }

    const handleFinalize = (evt) => {
        node.node_type.children = evt.detail.items;
        let targetId = evt.detail.info.id;
        let lastChildIndex = node.node_type.children.findIndex((o: API.Ast.Node) => o.uuid === targetId) - 1;
        let position: API.Operation.Position = {
            parent: node.uuid,
            after_sibling: lastChildIndex === -1 ? null : evt.detail.items[lastChildIndex].uuid
        }
        moveNode(targetId, position)
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

    let isDragged = false;

    // TODO: this is never called
    function startDrag() {
        sendActive();
        // TODO: is this if necessary?
        if (!$isEditorActive) {
            isDragged = true;
        }
    }

    function stopDrag() {
        isDragged = false;
    }


    onMount(() => {
        if ($lastDovenIn === node.uuid) {
            scrollToNode(node.uuid);
        }
    })

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
        <div use:dndzone="{dndOptions}"
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
