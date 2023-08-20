<script lang="ts">
    import type API from "../../globals/socket.api.d.ts";

    import StandardNodeContent from "./StandardNodeContent.svelte";
    import {onMount} from "svelte";

    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType>;

    onMount(() => {

    })

</script>

<div class="flex ml-16">
    <StandardNodeContent parent={parent} node={node}>
        <slot/>
    </StandardNodeContent>
</div>
