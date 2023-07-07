<script>
    export let children;
    export let heading;

    export let currentNavLayer;

    export let isNavColumn;

    let color = `#${currentNavLayer}5${currentNavLayer}555`
</script>
{#if isNavColumn}

<div style="background-color: {color}" class="pl-4 py-2 my-2 bg-red-400">
    SEGMENT {heading} {currentNavLayer}
    {#each children as node}
        <svelte:component this={node.component.name} {...{...node.component, currentNavLayer: currentNavLayer + 1, isNavColumn}}/>
    {/each}
</div>

{/if}


