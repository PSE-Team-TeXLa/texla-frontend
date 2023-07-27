<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import DiveInNextLayerButton from "../buttons/DiveInNextLayerButton.svelte";
    import {currentLayer} from "../../globals/Variables";

    export let parent;
    export let node: API.Ast.Node;
    export let isNavColumn;
    export let layerShown: number;

</script>
{#if layerShown === $currentLayer}
    <DiveInNextLayerButton isOnLayer={layerShown + 1 }>{node.node_type.data.path}</DiveInNextLayerButton>
{:else}
    <StandardExpandableNode parent={parent} bind:node isNavColumn={isNavColumn} layerShown={layerShown}>
        <div class="w-[70%]">
            <h1 class="text-xl font-bold mt-2 mb-2">{node.node_type.data.path}</h1>
            <div class="w-full border-b-4 border-solid border-green mb-1"></div>
        </div>
    </StandardExpandableNode>
{/if}