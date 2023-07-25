<script lang="ts">

    import StandardLeafNode from "./StandardLeafNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let parent;
    export let node: API.Ast.Node;
    let text;
    if (node.node_type.type === "Leaf" && node.node_type.data.type === "Text")
        text = node.node_type.data.text;

    export let isNavColumn: boolean;
    let isEditorOpen;
    export let layerShown;

</script>

{#if !isNavColumn}
    <div id="text-box" class="flex flex-col cursor-default">
        <StandardLeafNode parent={parent} bind:node bind:isEditorOpen>
            <div class="my-2">
                <span class="text-lg">{layerShown + " "}{text}</span>
            </div>
        </StandardLeafNode>
    </div>
{/if}