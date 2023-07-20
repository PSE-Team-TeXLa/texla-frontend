<script lang="ts">
    import type API from "../../globals/socket.api";

    export let node: API.Ast.Node;

    let text
    if (node.node_type.data.type === "Text")
     text = node.node_type.data.text;

</script>

<div class="flex justify-center items-center">
    {text}
</div>