<script lang="ts">

    import StandardLeafNode from "./StandardLeafNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    import commentIcon from "$lib/assets/icons/commentnode.svg"

    export let parent;
    export let node: API.Ast.Node;

    //TODO test after Tutorium (change div placeholder), change input Latex File in backend.
</script>


<StandardLeafNode parent={parent} bind:node>
    <div class="flex mt-2 flex-row items-center bg-comment opacity-70">
        <img src={commentIcon} alt="SidebarImage" class="px-4 p-1 cursor-pointer max-h-8"/>
        <div class="flex flex-col cursor-default my-2">
            <span class="whitespace-pre-wrap text-lg">{node.node_type.data.comment}</span>
        </div>
    </div>
</StandardLeafNode>