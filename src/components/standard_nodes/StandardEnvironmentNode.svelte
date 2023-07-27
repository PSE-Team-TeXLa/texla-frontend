<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import DiveInNextLayerButton from "../buttons/DiveInNextLayerButton.svelte";
    import {currentLayer} from "../../globals/Variables";

    export let parent;
    export let node: API.Ast.Node;
    export let layerShown: number;


</script>
{#if layerShown === $currentLayer}
    <DiveInNextLayerButton isOnLayer={layerShown + 1 }>
        <div class="flex py-1 pl-8 w-full bg-environment">
            {node.node_type.data.name}
        </div>
    </DiveInNextLayerButton>
{:else}
    <StandardExpandableNode parent={parent} bind:node layerShown={layerShown}>
        <div class="w-[70%]">
            <h1 class="font-bold mt-2 mb-2">{node.node_type.data.name}</h1>
            <div class="w-full border-b-8 border-solid border-environment mb-1"></div>
        </div>
    </StandardExpandableNode>
{/if}