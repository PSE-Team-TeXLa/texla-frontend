<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let node: API.Ast.Node;

    export let layerShown: number;
</script>

<!-- rerender entire tree when there is a new root -->
{#key node.uuid}
    <StandardExpandableNode parent={node.uuid} bind:node layerShown={layerShown}>
        <h1 class="text-4xl font-bold">Document</h1>
        <div class="w-full border-b-8 border-solid border-document mb-1"></div>
    </StandardExpandableNode>
{/key}
