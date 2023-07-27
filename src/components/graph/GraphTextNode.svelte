<script lang="ts">
    import type API from "../../globals/socket.api";
    import GraphLeafNode from "./GraphLeafNode.svelte";

    export let node: API.Ast.Node;

    let text
    if (node.node_type.data.type === "Text")
        text = node.node_type.data.text;

</script>
<GraphLeafNode>
    <div class="flex justify-center items-center">
        {text}
    </div>

</GraphLeafNode>
