<script lang="ts">
    import {dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID} from "svelte-dnd-action";
    import {flip} from "svelte/animate";
    import {moveNode} from "../../globals/Api";

    import {graphNodeTypeMap} from "../../globals/Constants";

    import type API from "../../globals/socket.api.d.ts";
    import GraphNode from "./GraphNode.svelte";

    export let node: API.Ast.Node<API.Ast.ExpandableType>;

    let children: API.Ast.Node[];
    $: children = node.node_type.children;

    // see https://svelte.dev/repl/fe8c9eca04f9417a94a8b6041df77139?version=3.59.2
    $: dndOptions = {
        items: children,
        // centreDraggedOnCursor: true,
        flipDurationMs: 300,
        dropTargetStyle: {
            'outline-offset': '2px',
            'outline':
                '3px dashed #ccc',
            'transition': 'padding 0.2s',
            'padding-top': '8px',
            'padding-bottom': '8px',
            'min-height':
                '20px',
            'min-width': '110px'
        }
    }


    const handleConsider = (evt) => {
        console.log("consider " + evt.detail.info.id + " in " + node.uuid);
        console.log("children:", evt.detail.items);

        node.node_type.children = evt.detail.items;
    }

    const handleFinalize = (evt) => {
        console.log("FINALIZE")
        node.node_type.children = evt.detail.items;

        // TODO MAKE method for getting position
        let targetId: API.Uuid = evt.detail.info.id;
        let previousChildIndex = node.node_type.children.findIndex((child: API.Ast.Node) => child.uuid === targetId) - 1;
        let position: API.Operation.Position = {
            parent: node.uuid,
            after_sibling: previousChildIndex === -1 ? null : node.node_type.children[previousChildIndex].uuid
        }
        moveNode(targetId, position)
    }

    let isDragged = false;

    function startDrag() {
        isDragged = true;
        console.log("startDrag");
    }

    function stopDrag() {
        isDragged = false;
        console.log("stopDrag");
    }

</script>

<div class="my-2 py-4 flex flex-row items-center">
    <div class="flex-none">
        <GraphNode on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag}
                   on:touchend={stopDrag}>
            <slot/>
        </GraphNode>
    </div>
    <div use:dndzone="{dndOptions}"
         class="flex flex-col gap-1 ml-2 border-lightpurple border-l-2 min-w-[300px]"
         on:consider="{handleConsider}" on:finalize="{handleFinalize}">
        {#each node.node_type.children.filter(item => item.uuid != SHADOW_PLACEHOLDER_ITEM_ID) as new_node (new_node.uuid)}
            <div animate:flip="{{duration: 300}}">
                {#if new_node[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                    <div class="h-[50px]"></div>
                {:else}
                    <svelte:component this={graphNodeTypeMap.get(new_node.node_type.data.type)} {...{node: new_node}}/>
                {/if}
            </div>
        {/each}
    </div>
</div>
