<script lang="ts">
    import {json_ast} from "../../globals/Variables";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    function handleScroll() {
        dispatch('scrollend')
    }
</script>

<div on:scrollend={handleScroll} class="snap-proximity snap-y h-full w-full p-4 mt-2 overflow-scroll overflow-x-hidden">
    {#if $json_ast !== undefined}
        <slot/>
    {/if}
</div>

