<script lang="ts">
    import type API from "../../globals/socket.api.d.ts";

    import StandardNodeContent from "./StandardNodeContent.svelte";


    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType>;

</script>

<div class="flex ml-4">
    <StandardNodeContent parent={parent} node={node}>
        <slot/>
    </StandardNodeContent>
</div>
