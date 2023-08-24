<script lang="ts">
    import {getContentFromNode} from "../../globals/Constants";
    import type API from "../../globals/socket.api";
    import GraphLeafNode from "./GraphLeafNode.svelte";

    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Math>>;
</script>

<GraphLeafNode uuid={node.uuid}>
    <div class="flex justify-center items-center" title={node.raw_latex}>
        {getContentFromNode(node, 50, true)}
    </div>
</GraphLeafNode>
