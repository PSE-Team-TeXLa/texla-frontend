<script lang="ts">
    import Button from "./Button.svelte";
    import {createEventDispatcher} from "svelte";

    let dispatcher = createEventDispatcher();

    function handleClick() {
        dispatcher('click', {});
    }
</script>


<div class="w-fit">
    <Button>
        <div on:click={handleClick}
             class="cursor-pointer red-button hover:border-none hover:bg-red hover:text-white border-2 border-red w-3 h-3 flex text-[16px] justify-center items-center text-red font-bold">
            <slot/>
        </div>
    </Button>
</div>