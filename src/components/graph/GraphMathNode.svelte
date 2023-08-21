<script lang="ts">
    import {firstXChars} from "../../globals/Constants";
    import type API from "../../globals/socket.api";
    import GraphLeafNode from "./GraphLeafNode.svelte";

    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Math>>;
</script>

<GraphLeafNode uuid={node.uuid}>
    <div class="flex justify-center items-center" title={node.raw_latex}>
        {firstXChars(node.node_type.data.content, 50)}
    </div>
</GraphLeafNode>
