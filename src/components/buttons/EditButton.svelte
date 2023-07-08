<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import Button from "./Button.svelte";

    let options = false;

    let dispatcher = createEventDispatcher();

    function enterEdit() {
        dispatcher('click', {});
    }
</script>
<div class="w-fit">

<Button>
    <div on:click={enterEdit} class="border-4 color border-red-500 w-8 h-8 flex justify-center items-center text-red-500 font-bold">
        <slot/>
    </div>
</Button>
</div>
