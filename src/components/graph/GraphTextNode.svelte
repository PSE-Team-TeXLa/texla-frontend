<script lang="ts">
    import {firstXChars} from "../../globals/Constants";
    import type API from "../../globals/socket.api";
    import GraphLeafNode from "./GraphLeafNode.svelte";

    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Text>>;
</script>

<GraphLeafNode uuid={node.uuid}>
    <div id="text" class="flex justify-center items-center" title={node.raw_latex}>
        {firstXChars(node.node_type.data.text, 50)}
    </div>
</GraphLeafNode>
