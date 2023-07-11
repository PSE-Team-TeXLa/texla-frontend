<script lang="ts">
    import { onMount } from 'svelte';
    export let children;
    export let filename;

    export let isNavColumn;

    export let layerShown;
    let container;

    onMount(async () => {
        if (!isNavColumn)
            container.style.marginLeft = "2em";
    });
</script>



<div bind:this={container} class="flex flex-col my-4 ">
    DOCUMENTNODE {filename}
    {#each children as node}
        <svelte:component this={node.component.name} {...{...node.component, layerShown: layerShown + 1, isNavColumn}} />
    {/each}
</div>
