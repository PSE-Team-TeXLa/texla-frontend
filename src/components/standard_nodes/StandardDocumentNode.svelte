<script lang="ts">
    export let children;
    export let filename;

    export let isNavColumn;

    export let layerShown;
</script>

<div class="flex flex-col my-4">
    DOCUMENTNODE {filename}
    {#each children as node}
        <svelte:component this={node.component.name} {...{...node.component, layerShown: layerShown + 1, isNavColumn}} />
    {/each}
</div>
