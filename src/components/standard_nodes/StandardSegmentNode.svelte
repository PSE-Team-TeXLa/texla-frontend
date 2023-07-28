<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import {currentLayer} from "../../globals/Variables";
    import DiveInNextLayerButton from "../buttons/DiveInNextLayerButton.svelte";

    export let parent;
    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Segment>>;
    export let layerShown: number;

</script>


{#if layerShown === $currentLayer}
    <DiveInNextLayerButton isOnLayer={layerShown + 1 }>
        <div class="flex py-1 pl-8 w-full bg-segment">
            {node.node_type.data.heading}
        </div>
    </DiveInNextLayerButton>
{:else}
    <StandardExpandableNode parent={parent} bind:node layerShown={layerShown}>
        <h1 class="text-xl font-bold">{node.node_type.data.heading}</h1>
        <div class="w-full border-b-8 border-solid border-segment mb-1"></div>
    </StandardExpandableNode>
{/if}
