<script lang="ts">
    import GraphNode from "./GraphNode.svelte";

    export let uuid: number;
</script>

<div class="p-2 ml-2 w-fit">
    <GraphNode uuid={uuid}>
        <slot/>
    </GraphNode>
</div>