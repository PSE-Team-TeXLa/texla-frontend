<script lang="ts">
    import {graphContainerStore, json_ast} from "../../globals/Variables.ts";
    import GraphExpandableNode from "./GraphExpandableNode.svelte";
    import {onMount} from "svelte";

    let graphContainer: HTMLDivElement;

    onMount(() => {
        graphContainerStore.set(graphContainer);
    })

</script>

<div bind:this={graphContainer} class="w-full h-full overflow-scroll">
    {#if $json_ast !== undefined}
        <GraphExpandableNode bind:node={$json_ast.root}/>
    {/if}
</div>
