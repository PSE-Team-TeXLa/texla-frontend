<script lang="ts">

    import StandardLeafNode from "./StandardLeafNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import Latex from "../rendering/Latex.svelte";

    export let parent;
    export let node: API.Ast.Node;

    //TODO test after Tutorium (change div placeholder), change input Latex File in backend.
</script>


<StandardLeafNode parent={parent} bind:node>
    <div class="flex flex-col cursor-default my-2">
        <span class="whitespace-pre-wrap text-lg">
            <Latex latex="{node.node_type.data.caption}"/>
        </span>
    </div>
</StandardLeafNode>