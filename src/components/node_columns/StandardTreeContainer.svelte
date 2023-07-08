<script lang="ts">
    import {currentLayer} from "../../globals/Variables.ts";
    import { ast } from "../../globals/Ast.ts";

    export let isNavColumn: boolean;

    $: currentNavLayer = $currentLayer;
    $: currentReadLayer = $currentLayer + 1;

    let layerShown = 0;

</script>

<div class="snap-proximity snap-y w-full p-10 overflow-scroll">

{#if isNavColumn}
    NAVSPALTE {$currentLayer}
    <svelte:component this={ast.component.name} {...{...ast.component, layerShown, isNavColumn}} />

{:else}
    LESESPALTE {currentReadLayer}
    <svelte:component this={ast.component.name} {...{...ast.component, layerShown, isNavColumn}} />
{/if}
</div>

