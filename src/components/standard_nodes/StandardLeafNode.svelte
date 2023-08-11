<script lang="ts">
    import type API from "../../globals/socket.api.d.ts";

    import StandardNodeContent from "./StandardNodeContent.svelte";
    import {onMount} from "svelte";
    import {lastNodeTouched} from "../../globals/Variables";
    import {scrollToNode} from "../../globals/Constants";


    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType>;

    onMount(() => {
        if ($lastNodeTouched === node.uuid) {
            scrollToNode(node.uuid);
            console.log(node.raw_latex)
        }
    })

</script>

<div class="flex ml-4">
    <StandardNodeContent parent={parent} node={node}>
        <slot/>
    </StandardNodeContent>
</div>
