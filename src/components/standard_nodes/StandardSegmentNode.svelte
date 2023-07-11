<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";

    export let children;
    export let heading;
    export let isNavColumn;
    export let layerShown: number;
    let isEditorOpen: boolean;

</script>

<StandardExpandableNode children={children} heading={heading} isNavColumn={isNavColumn} layerShown={layerShown} isEditorOpen={isEditorOpen}>

</StandardExpandableNode>

