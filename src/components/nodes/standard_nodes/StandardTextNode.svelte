<script lang="ts">
    import Latex from "../../rendering/Latex.svelte";
    import StandardLeafNode from "./StandardLeafNode.svelte";
    import type API from "../../../globals/socket.api.d.ts";

    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Text>>;
</script>

<StandardLeafNode parent={parent} bind:node>
    <div class="flex flex-col cursor-default my-2">
        <span class="text-lg">
            <Latex latex="{node.node_type.data.text}"></Latex>
        </span>
    </div>
</StandardLeafNode>