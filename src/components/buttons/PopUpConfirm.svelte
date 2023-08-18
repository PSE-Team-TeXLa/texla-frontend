<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch("click");
    }
</script>

<button on:click={handleClick} class="bg-green px-4 py-2 rounded">
    <slot/>
</button>