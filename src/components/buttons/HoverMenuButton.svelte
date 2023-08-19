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
        <div on:keypress role="button" tabindex="0" on:click={enterEdit}
             class="cursor-pointer p-1 opacity-50 hover:opacity-100 mb-1 border-4 border-targetElement w-8 h-8 flex justify-center items-center text-targetElement font-bold">
            <slot/>
        </div>
    </Button>
</div>

<style>
</style>
