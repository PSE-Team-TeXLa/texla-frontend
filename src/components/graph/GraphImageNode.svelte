<script lang="ts">
    import type API from "../../globals/socket.api";
    import GraphLeafNode from "./GraphLeafNode.svelte";

    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Image>>;
</script>
<GraphLeafNode>
    <div class="flex justify-center items-center">
        <img src={node.node_type.data.path} alt={node.node_type.data.path} class="w-96 h-auto"/>
    </div>
</GraphLeafNode>
