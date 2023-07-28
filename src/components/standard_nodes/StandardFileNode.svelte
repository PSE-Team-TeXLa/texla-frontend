<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import DiveInNextLayerButton from "../buttons/DiveInNextLayerButton.svelte";
    import {currentLayer} from "../../globals/Variables";
    import {scrollToNode} from "../../globals/Constants";

    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.File>>;

    export let layerShown: number;

    function handleClick() {
        console.log("scroll to " + node.uuid);
        scrollToNode(node.uuid);
    }

</script>
{#if layerShown === $currentLayer}
    <DiveInNextLayerButton on:myclick={handleClick} isOnLayer={layerShown + 1 }>
        <div class="flex py-1 pl-8 w-full bg-file">
            {node.node_type.data.path}
        </div>
    </DiveInNextLayerButton>
{:else}
    <StandardExpandableNode parent={parent} bind:node layerShown={layerShown}>
        <div class="w-[70%]">
            <h1 class="text-xl font-bold mt-2 mb-2">{node.node_type.data.path}</h1>
            <div class="w-full border-b-8 border-solid border-file mb-1"></div>
        </div>
    </StandardExpandableNode>
{/if}