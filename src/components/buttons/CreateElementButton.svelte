<script lang="ts">
    import Button from "./Button.svelte";
    import {createEventDispatcher} from "svelte";
    import plus_icon from "$lib/assets/icons/plus.svg";

    let dispatcher = createEventDispatcher();

    function handleClick() {
        dispatcher('click', {});
    }
</script>


<div class="w-fit">
    <Button>
        <div on:click={handleClick}
             class="cursor-pointer opacity-50 hover:opacity-100 border-2 border-red w-4 h-4 flex justify-center items-center">
            <img src={plus_icon} alt="+"/>
        </div>
    </Button>
</div>