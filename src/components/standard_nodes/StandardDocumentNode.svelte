<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    export let children;
    let isEditorOpen = false;
    export let heading;

    export let isNavColumn;

    export let layerShown;
</script>


<StandardExpandableNode children={children} heading={heading} layerShown={layerShown} isNavColumn={isNavColumn} isEditorOpen={isEditorOpen} >

</StandardExpandableNode>