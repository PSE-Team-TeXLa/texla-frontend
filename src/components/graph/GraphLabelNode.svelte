<script lang="ts">
    import {firstXChars} from "../../globals/Constants";
    import type API from "../../globals/socket.api";
    import GraphLeafNode from "./GraphLeafNode.svelte";

    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Label>>;
</script>
<GraphLeafNode>
    <div class="flex justify-center items-center">
        {firstXChars(node.node_type.data.label, 50)}
    </div>
</GraphLeafNode>
