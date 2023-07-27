<script lang="ts">

    import StandardLeafNode from "./StandardLeafNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let parent;
    export let node: API.Ast.Node;

    //TODO test after Tutorium (change div placeholder), change input Latex File in backend.
</script>


<StandardLeafNode parent={parent} bind:node>
    <div class="flex flex-col cursor-default my-2">
        <span class="whitespace-pre-wrap text-lg">{node.node_type.data.label}</span>
    </div>
</StandardLeafNode>