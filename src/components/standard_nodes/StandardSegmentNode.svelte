<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";

    export let children;
    export let heading;
    export let isNavColumn;
    export let layerShown: number;
    let isEditorOpen: boolean;

</script>

<StandardExpandableNode children={children} heading={heading} isNavColumn={isNavColumn} layerShown={layerShown} isEditorOpen={isEditorOpen}>
    <h1 class="text-4xl font-bold mt-8 mb-3">{heading}</h1>
    <div class="w-full border-b-4 border-solid border-lightpurple mb-4"></div>
</StandardExpandableNode>