<script lang="ts">
    import {createEventDispatcher} from "svelte";

    let dispatcher = createEventDispatcher();

    /**
     * Handle the click event
     */
    function handleEvent() {
        dispatcher('click', {});
    }
</script>

<div on:keypress role="button" tabindex="0"  on:click={handleEvent}
     class="opacity-50 hover:opacity-100 cursor-pointer border-4 color border-green w-8 h-8 flex justify-center items-center text-purple-600 font-bold">
    <slot/>
</div>
