<script lang="ts">

    import StandardLeafNode from "./StandardLeafNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import caption_icon from "$lib/assets/icons/caption.svg";

    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Caption>>;

    //TODO test after Tutorium (change div placeholder), change input Latex File in backend.
</script>


<StandardLeafNode parent={parent} bind:node>
    <div class="flex mt-2 flex-row items-center bg-caption opacity-50 text-opacity-60">
        <img src={caption_icon} alt="SidebarImage" class="px-4 p-1 cursor-pointer max-h-8"/>
        <div class="flex flex-col cursor-default my-2 pl-2">
            <span class="whitespace-pre-wrap text-lg">{node.node_type.data.caption}</span>
        </div>
    </div>
</StandardLeafNode>