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
             class="cursor-pointer p-1 opacity-50 hover:opacity-100 mb-1 border-4 red-button border-red w-8 h-8 flex justify-center items-center text-red font-bold">
            <slot/>
        </div>
    </Button>
</div>

<style>
</style>
