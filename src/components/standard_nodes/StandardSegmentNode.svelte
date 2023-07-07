<script lang="ts">
    import NavSegmentButton from "../buttons/NavSegmentButton.svelte";
    import {currentLayer} from "../../globals/Variables.ts";

    export let children;
    export let heading;

    export let isNavColumn;

    export let layerShown: number;

    let color = `#${layerShown*2}5${layerShown*2}555`
</script>
{#if isNavColumn}

<div class="flex flex-col ml-4 py-2">
    <NavSegmentButton isOnLayer={layerShown} color={color}>{heading}</NavSegmentButton>
    {#if layerShown < $currentLayer }
    {#each children as node}
        <svelte:component this={node.component.name} {...{...node.component, layerShown: layerShown + 1, isNavColumn}}/>
    {/each}
    {/if}
</div>
{:else}
    <div class="flex flex-col ml-4 my-2 py-2" style="background-color: {color}">
    {#if layerShown < $currentLayer+1}
        {heading}
        {#each children as node}
            <svelte:component this={node.component.name} {...{...node.component, layerShown: layerShown + 1, isNavColumn}}/>
        {/each}
        {:else if layerShown === $currentLayer+1}
        <NavSegmentButton isOnLayer={layerShown} color={color}>{heading}</NavSegmentButton>
    {/if}

    </div>
{/if}


