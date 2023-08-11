<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import {onMount} from "svelte";
    import {expandChange, flipExpandChange, isExpandedMap} from "../../globals/Variables";

    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Document>>;
    export let layerShown: number;

    onMount(() => {
        $isExpandedMap.set(node.uuid, true);
        console.log($isExpandedMap);
        flipExpandChange()
    });
</script>

<!-- rerender entire tree when there is a new root -->
{#key node.uuid}
    <StandardExpandableNode node_path="0" parent={node.uuid} bind:node layerShown={layerShown}>
        <h1 class="text-4xl font-bold">Document</h1>
        <div class="w-full border-b-8 border-solid border-document mb-1"></div>
    </StandardExpandableNode>
{/key}
