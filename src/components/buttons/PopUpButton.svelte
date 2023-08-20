<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch("click");
    }
</script>

<button on:click={handleClick} class="{$$props.class} px-4 py-2 rounded text-lg opacity-90 hover:opacity-100">
    <span class="opacity-100">
        <slot/>
    </span>
</button>