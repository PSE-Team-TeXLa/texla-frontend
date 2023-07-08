<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import Button from "./Button.svelte";

    let options = false;

    let dispatcher = createEventDispatcher();

    function handleEvent() {
        dispatcher('click', {});
    }
</script>
<div>
<Button>
    <div on:click={handleEvent} class="border-4 color border-purple-600 w-8 h-8 flex justify-center items-center text-purple-600 font-bold">
        <slot/>
    </div>
</Button>

</div>
