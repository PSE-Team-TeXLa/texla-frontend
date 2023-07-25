<script lang="ts">
    import StandardNodeContent from "./StandardNodeContent.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let node: API.Ast.Node;
    export let parent;

</script>

<StandardNodeContent parent={parent} node={node}>
    <slot/>
</StandardNodeContent>