<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import Button from "./Button.svelte";

    let dispatcher = createEventDispatcher();

    function handleEvent() {
        dispatcher('click', {});
    }
</script>


<Button>
    <div on:click={handleEvent}
         class="opacity-50 hover:opacity-100 cursor-pointer border-4 color border-green w-8 h-8 flex justify-center items-center text-purple-600 font-bold">
        <slot/>
    </div>
</Button>
