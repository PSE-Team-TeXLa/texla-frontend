<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import {onMount} from "svelte";
    import {currentLayer} from "../../globals/Variables";
    import DiveInNextLayerButton from "../buttons/DiveInNextLayerButton.svelte";

    export let parent;
    export let node: API.Ast.Node;
    export let isNavColumn;
    export let layerShown: number;

</script>


{#if layerShown === $currentLayer}
    <DiveInNextLayerButton isOnLayer={layerShown + 1 }>{node.node_type.data.heading}</DiveInNextLayerButton>
{:else}
    <StandardExpandableNode parent={parent} bind:node isNavColumn={isNavColumn} layerShown={layerShown}>
        <h1 class="text-3xl font-bold mt-2 mb-2">{layerShown} {node.node_type.data.heading}</h1>
        <div class="w-full border-b-4 border-solid border-lightpurple mb-1"></div>
    </StandardExpandableNode>
{/if}
