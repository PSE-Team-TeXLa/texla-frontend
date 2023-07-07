<script>
    import {currentLayer} from "../../globals/Variables.ts";
    import { ast } from "../../globals/Ast.ts";

    export let isNavColumn;

    $: currentNavLayer = $currentLayer;
    $: currentReadLayer = $currentLayer + 1;

</script>

<div class="w-full p-10 overflow-scroll">

{#if isNavColumn}
    NAVSPALTE {$currentLayer}
    <svelte:component this={ast.component.name} {...{...ast.component, currentNavLayer, isNavColumn}} />

{:else}
    LESESPALTE {currentReadLayer}
{/if}
</div>

