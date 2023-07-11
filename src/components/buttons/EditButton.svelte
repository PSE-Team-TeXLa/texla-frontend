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
             class="red-button hover:border-none hover:bg-red-500 hover:text-gray-800 border-4 border-red-500 w-8 h-8 flex justify-center items-center text-red-500 font-bold">
            <slot/>
        </div>
    </Button>
</div>

<style>
    .red-button::before {
        content: '';
        position: absolute;
        border-radius: 50%;
        width: 500%;
        height: 500%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        border: 1px solid green; /* for demo purposes */

    }
</style>
