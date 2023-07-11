<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    export let children;
    let isEditorOpen = false;
    export let heading;

    export let isNavColumn;

    export let layerShown;
</script>


<StandardExpandableNode children={children} heading={heading} layerShown={layerShown} isNavColumn={isNavColumn} isEditorOpen={isEditorOpen} >
    <h1 class="text-4xl font-bold">{heading}</h1>
    <hr>
</StandardExpandableNode>

<style>
    hr {
        border-bottom: 6px solid theme('colors.darkpurple');
    }
</style>