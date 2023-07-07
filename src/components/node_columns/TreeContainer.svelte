<script>
    import StandardSegmentNode from "../standard_nodes/StandardSegmentNode.svelte";
    import { currentNavLayer } from "../../globals/Variables.ts";

    export let buttonsOnly;

    $: currentReadLayer = $currentNavLayer + 1;
</script>

<div class="h-full w-full p-10">

{#if buttonsOnly}
    NAVSPALTE {$currentNavLayer}
    <svelte:component this={StandardSegmentNode}></svelte:component>

{:else}
    LESESPALTE {currentReadLayer}
{/if}
</div>

