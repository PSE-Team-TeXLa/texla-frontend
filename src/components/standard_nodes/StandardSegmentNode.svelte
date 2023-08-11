<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import {currentLayer, expandChange, flipExpandChange, isExpandedMap, test} from "../../globals/Variables";
    import DiveInNextLayerButton from "../buttons/DiveInNextLayerButton.svelte";
    import {onMount} from "svelte";

    export let parent;
    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Segment>>;
    export let layerShown: number;
    export let node_path: string;
    let content;

    onMount(() => {
        if (!$isExpandedMap.has(node.uuid)) {
            $isExpandedMap.set(node.uuid, false);
            console.log($isExpandedMap)
            console.log("segment mount");
            flipExpandChange();
        }
    });


</script>
{#key $expandChange}
    {#if !$isExpandedMap.get(node.uuid)}
        <DiveInNextLayerButton node_path={node_path} uuid={node.uuid} bind:this={content} isOnLayer={layerShown + 1 }>
            <div class="flex py-1 pl-8 w-full bg-segment">
                {node.node_type.data.heading}
            </div>
        </DiveInNextLayerButton>
    {:else}
        <StandardExpandableNode node_path={node_path} parent={parent} bind:node layerShown={layerShown}>
            <h1 class="text-xl font-bold">{node.node_type.data.heading}</h1>
            <div class="w-full border-b-8 border-solid border-segment mb-1"></div>
        </StandardExpandableNode>
    {/if}
{/key}

