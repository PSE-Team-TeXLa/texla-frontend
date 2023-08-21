<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import Icon from "../rendering/Icon.svelte";

    let dispatcher = createEventDispatcher();

    /**
     * Handle the click event
     */
    function handleClick() {
        dispatcher('click', {});
    }

    export let icon;
</script>

<div on:click={handleClick} on:keypress role="button" tabindex="0"
     class="px-1 cursor-pointer flex items-center justify-center">
    <Icon icon={icon} scale={1.6} color="#fff"/>
</div>