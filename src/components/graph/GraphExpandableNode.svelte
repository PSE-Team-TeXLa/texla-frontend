<script lang="ts">
    import GraphNode from "./GraphNode.svelte";

    import type API from "../../globals/socket.api.d.ts";

    import {graphNodeTypeMap} from "../../globals/Constants";
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import {moveNode} from "../../globals/Api";

    export let node: API.Ast.Node;

    let children: API.Ast.Node[];
    $: if (node.node_type.type === "Expandable") {
        children = node.node_type.children;
    }


    const handleConsider = (evt) => {
        console.log("consider " + evt.detail.info.id + " in " + node.uuid);
        console.log(evt.detail.items);

        /*let target: API.Uuid = evt.detail.info.id;
        let targetIndex = evt.detail.items.findIndex((o) => o.uuid === target)
        console.log(target + " " + targetIndex)
        if (evt.detail.items[targetIndex].node_type.type === "Expandable" && evt.detail.items[targetIndex].node_type.children.filter((o) => o.uuid === target) !== 0)
            return;*/

        if (node.node_type.type === "Expandable")
            node.node_type.children = evt.detail.items;
    }

    const handleFinalize = (evt) => {
        if (evt.detail.items.filter(e => e.uuid === evt.detail.info.id).length === 0) {
            return;
        }
        console.log("FINALIZE")

        if (node.node_type.type === "Expandable")
            node.node_type.children = evt.detail.items;

        // TODO MAKE method for getting position
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
    <GraphNode on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag}
               on:touchend={stopDrag}>
        <slot/>
    </GraphNode>
    <div use:dndzone="{{items: node.node_type.children, dropTargetStyle: {'outline-offset': '2px',  'outline': '3px dashed #ccc', 'transition': 'padding 0.2s', 'padding-top': '8px' , 'padding-bottom': '8px', 'min-height': '60px', 'min-width': '110px'}}}"
         class="my-auto flex flex-col gap-1 ml-2 border-lightpurple border-l-2"
         on:consider="{handleConsider}" on:finalize="{handleFinalize}">
        {#each node.node_type.children as new_node (new_node.uuid)}
            <div animate:flip="{{duration: 300}}">
                {#if !isDragged}
                    <svelte:component this={graphNodeTypeMap.get(new_node.node_type.data.type)} {...{node: new_node}}/>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
</style>