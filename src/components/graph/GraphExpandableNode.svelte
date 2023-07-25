<script lang="ts">
    import GraphNode from "./GraphNode.svelte";
    import GraphLeafNode from "./GraphLeafNode.svelte";

    import type API from "../../globals/socket.api.d.ts";

    import {graphNodeTypeMap} from "../../globals/Constants";
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import {createEventDispatcher, onMount} from "svelte";
    import StandardNode from "../standard_nodes/StandardNode.svelte";
    import {moveNode} from "../../globals/Api";

    export let node: API.Ast.Node;

    let children: API.Ast.Node[];
    $: if (node.node_type.type === "Expandable") {
        node.node_type.children = node.node_type.children;
    }

    let text: string;
    $: if (node.node_type.type === "Expandable")
        if (node.node_type.data.type === "Document")
            text = "Document";
        else if (node.node_type.data.type === "Segment")
            text = node.node_type.data.heading

    const handleConsider = (evt) => {
        console.log("consider " + evt.detail.info.id + " in " + node.uuid);
        console.log(evt.detail.items);

        if (node.node_type.type === "Expandable")
            children = evt.detail.items;
    }

    const handleFinalize = (evt) => {
            console.log("FINALIZE")
        //console.log(evt.detail.info.id)
        //console.log(evt.detail.items)
        //console.log(evt.detail.items.filter(e => e.uuid === evt.detail.info.id).length === 0)
        if (evt.detail.items.filter(e => e.uuid === evt.detail.info.id).length === 0) {
            return;
        }

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
        //dragStuff.classList.add("hidden");
        isDragged = true;
        console.log("startDrag");
    }

    function stopDrag() {
        //dragStuff.classList.remove("hidden");
        isDragged = false;
        console.log("stopDrag");
    }

    /*function checkForUuidInList(list: API.Ast.Node[], uuid: API.Uuid): boolean {
        let foundUuid = false;
        list.forEach((o) => {
            if (o.uuid === uuid)
                foundUuid = true;
            else
                if (o.node_type.type === "Expandable")
                    foundUuid = checkForUuidInList(o.node_type.children, uuid)
        })
        return foundUuid;
    }*/

</script>

<div class="my-2 py-4 flex flex-row">
    <div class=" flex justify-center items-center border-lightpurple border-r-4">
        <GraphNode on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag}
                   on:touchend={stopDrag}>
            {text}
        </GraphNode>
    </div>
    <div use:dndzone="{{items: children, dropTargetStyle: {'outline-offset': '2px',  'outline': '3px dashed #ccc', 'transition': 'padding 0.2s', 'padding-top': '8px' , 'padding-bottom': '8px', 'min-height': '60px', 'min-width': '110px'}}}"
         class="my-auto flex flex-col gap-1 ml-2"
         on:consider="{handleConsider}" on:finalize="{handleFinalize}">
        {#each children as new_node (new_node.uuid)}
            <div animate:flip="{{duration: 300}}">
                {#if !isDragged}
                    {#if new_node.node_type.type === "Expandable"}
                        <div>
                            <svelte:self {...{node: new_node}}/>
                        </div>

                    {:else if new_node.node_type.type === "Leaf"}
                        <GraphLeafNode>
                            <svelte:component this={graphNodeTypeMap.get(new_node.node_type.data.type)}
                                              {...{node: new_node}}/>
                        </GraphLeafNode>
                    {/if}
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
</style>