<script lang="ts">
    import StandardLeafNode from "./StandardLeafNode.svelte";
    import type API from "../../../globals/socket.api.d.ts";
    import {getContentFromNode} from "../../../globals/Constants";

    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Comment>>;

</script>

<StandardLeafNode parent={parent} bind:node>
    <div class="flex mt-2 flex-row items-center bg-comment opacity-50 text-opacity-70">
        <div class="flex flex-col cursor-default my-2 pl-2">
            <span class="whitespace-pre-wrap text-lg">{getContentFromNode(node, 0, true)}</span>
        </div>
    </div>
</StandardLeafNode>