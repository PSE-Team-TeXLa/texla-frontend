<script lang="ts">
    import StandardNode from "./StandardNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let node: API.Ast.Node;
    export let parent;

</script>
<StandardNode parent={parent} node={node}>
    <slot/>
</StandardNode>