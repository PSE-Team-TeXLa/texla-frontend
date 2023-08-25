<script lang="ts">
    import {createEventDispatcher} from "svelte";

    let dispatcher = createEventDispatcher();

    /**
     * Handle click event
     */
    function handleClick() {
        dispatcher('click', {});
    }
</script>

<div class="w-fit bg-[#fff]">
    <div on:keypress role="button" tabindex="0" on:click={handleClick}
         class="cursor-pointer p-1 opacity-50 hover:opacity-100 mb-1 border-4 border-targetElement w-8 h-8 flex justify-center items-center text-targetElement font-bold">
        <slot/>
    </div>
</div>