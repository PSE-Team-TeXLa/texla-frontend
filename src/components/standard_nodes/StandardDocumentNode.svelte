<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let node: API.Ast.Node;

    export let isNavColumn: boolean;
    export let layerShown: number;
    let isEditorOpen = false;
</script>

<!-- rerender entire tree when there is a new root -->
{#key node.uuid}
    <StandardExpandableNode parent={node.uuid} bind:node layerShown={layerShown} isNavColumn={isNavColumn}
                            isEditorOpen={isEditorOpen}>
        <h1 class="text-4xl font-bold">Document</h1>
        <hr>
    </StandardExpandableNode>
{/key}

<style>
    hr {
        border-bottom: 6px solid theme('colors.darkpurple');
    }
</style>
