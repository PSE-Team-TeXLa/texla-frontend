<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import DiveInNextLayerButton from "../buttons/DiveInNextLayerButton.svelte";
    import {currentLayer, expandChange, flipExpandChange, isExpandedMap} from "../../globals/Variables";
    import {onMount} from "svelte";

    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.File>>;
    export let node_path: string;
    export let layerShown: number;

    onMount(() => {
        if (!$isExpandedMap.has(node.uuid)) {
            $isExpandedMap.set(node.uuid, false);
            console.log($isExpandedMap)
            console.log("file mount");
            flipExpandChange();
        }
    });

</script>
{#key $expandChange}
    {#if !$isExpandedMap.get(node.uuid)}
        <DiveInNextLayerButton node_path={node_path} uuid={node.uuid} isOnLayer={layerShown + 1 }>
            <div class="flex py-1 pl-8 w-full bg-file">
                {node.node_type.data.path}
            </div>
        </DiveInNextLayerButton>
    {:else}
        <StandardExpandableNode node_path={node_path} parent={parent} bind:node layerShown={layerShown}>
            <div class="w-[70%]">
                <h1 class="text-xl font-bold mt-2 mb-2">{node.node_type.data.path}</h1>
                <div class="w-full border-b-8 border-solid border-file mb-1"></div>
            </div>
        </StandardExpandableNode>
    {/if}
{/key}