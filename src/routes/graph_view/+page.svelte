<script lang="ts">
    import Graph from "../../components/graph/Graph.svelte";
    import {onDestroy, onMount} from "svelte";
    import {isGraphActive} from "../../globals/Variables";

    onMount(() => {
        isGraphActive.set(true);
    });

    onDestroy(() => {
        isGraphActive.set(false);
    })
</script>

<div class="w-full h-full">
    <Graph/>
</div>
