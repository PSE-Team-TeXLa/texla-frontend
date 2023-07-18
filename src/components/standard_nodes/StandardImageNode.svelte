<script lang="ts">
    import StandardLeafNode from "./StandardLeafNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let node: API.Ast.Node;
    let path: string;
    if (node.node_type.type === "Leaf")
        if (node.node_type.data.type === "Image")
            path = node.node_type.data.path;

    export let isNavColumn: boolean;

    let isEditorOpen: boolean;
</script>

{#if !isNavColumn}
    <div class="flex flex-col cursor-default bg-amber-300">
        <StandardLeafNode bind:node bind:isEditorOpen >
            <div class="my-4 flex flex-col items-center">
                <img alt={path} src={path} class="max-h-20 w-auto"/>
            </div>
        </StandardLeafNode>
    </div>

{/if}