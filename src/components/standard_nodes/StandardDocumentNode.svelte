<script>
    export let children;
    export let filename;

    export let currentNavLayer

    export let isNavColumn;
</script>

<div class="flex flex-col my-4">
    DOCUMENTNODE {filename} {currentNavLayer}
    {#each children as node}
        <svelte:component this={node.component.name} {...{...node.component, currentNavLayer, isNavColumn}} />
    {/each}
</div>
