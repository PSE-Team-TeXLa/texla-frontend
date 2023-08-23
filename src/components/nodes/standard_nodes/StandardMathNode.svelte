<script lang="ts">
    import StandardLeafNode from "./StandardLeafNode.svelte";
    import type API from "../../../globals/socket.api.d.ts";
    import Latex from "../../rendering/Latex.svelte";

    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Math>>;

    // latex.js can only render $...$ and $$...$$ math, but no other math-environments
    // -> we convert from them to $$...$$
    let latex = node.node_type.data.content;
    latex = latex.replaceAll("&", "");
    latex = `$$${latex}$$`;
</script>

<StandardLeafNode parent={parent} bind:node>
    <div class="flex flex-col cursor-default my-2">
        <span class="text-lg">
            <Latex {latex}></Latex>
        </span>
    </div>
</StandardLeafNode>
