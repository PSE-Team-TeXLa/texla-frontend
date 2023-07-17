<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import API from "../../globals/socket.api";
    export let node: API.Ast.Node;


    export let isNavColumn: boolean;
    export let layerShown: number;
    let isEditorOpen = false;
</script>


<StandardExpandableNode bind:node layerShown={layerShown} heading={node.node_type.data.filename} isNavColumn={isNavColumn} isEditorOpen={isEditorOpen} >
    <h1 class="text-4xl font-bold">{node.node_type}</h1>
    <hr>
</StandardExpandableNode>

<style>
    hr {
        border-bottom: 6px solid theme('colors.darkpurple');
    }
</style>