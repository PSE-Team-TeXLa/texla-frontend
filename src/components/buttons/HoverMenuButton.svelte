<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import Button from "./Button.svelte";

    let dispatcher = createEventDispatcher();

    function enterEdit() {
        dispatcher('click', {});
    }
</script>
<div class="w-fit">
    <Button>
        <div on:click={enterEdit}
             class="mb-1 red-button hover:border-none hover:bg-red hover:text-white border-4 border-red w-8 h-8 flex justify-center items-center text-red font-bold">
            <slot/>
        </div>
    </Button>
</div>

<style>
</style>
