<script lang="ts">
    import GraphNode from "./GraphNode.svelte";
    import GraphLeafNode from "./GraphLeafNode.svelte";

    import type API from "../../globals/socket.api.d.ts";

    import {graphNodeTypeMap} from "../../globals/Constants";
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import {onMount} from "svelte";

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
            text = node.node_type.data.heading

    const handleConsider = (evt) => {
        if (node.node_type.type === "Expandable")
        node.node_type.children = evt.detail.items;
        console.log("consider");
        console.log(evt.detail.items);
    }

    const handleFinalize = (evt) => {
        if (evt.detail.items.filter(e => e.uuid === evt.detail.info.id).length === 0) {
            return;
        }
        if (node.node_type.type === "Expandable")
        node.node_type.children = evt.detail.items;
    }
    onMount(() => {
        console.info("NEW EXP")
    });

</script>

<div class="my-2 py-4 flex flex-row">
    <div class=" flex justify-center items-center border-lightpurple border-r-4">
        <GraphNode>
            {text}
        </GraphNode>
    </div>
    <div use:dndzone="{{items: children, dropTargetStyle: {'outline-offset': '2px',  'outline': '3px dashed #ccc', 'transition': 'padding 0.2s', 'padding-top': '8px' , 'padding-bottom': '8px', 'min-height': '60px', 'min-width': '110px'}}}"
         class="my-auto flex flex-col gap-1 ml-2"
         on:consider="{handleConsider}" on:finalize="{handleFinalize}">
        {#each children as new_node (new_node.uuid)}
            <div animate:flip="{{duration: 300}}">
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
            </div>
        {/each}
    </div>
</div>

<style>
</style>