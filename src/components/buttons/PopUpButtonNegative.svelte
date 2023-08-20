<script>
    import PopUpButton from "./PopUpButton.svelte";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch("click");
    }
</script>

<PopUpButton on:click={handleClick} class="{$$props.class} bg-red text-white">
    <slot/>
</PopUpButton>