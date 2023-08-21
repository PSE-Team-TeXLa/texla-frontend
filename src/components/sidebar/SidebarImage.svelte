<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let image;
    export let isBigger = false;

    let dispatcher = createEventDispatcher();

    /**
     * Handle the click event
     */
    function handleClick() {
        dispatcher('click', {});
    }

</script>

{#if isBigger}
    <div on:keypress role="button" tabindex="0" on:click={handleClick}>
        <img src={image} alt="SidebarImage" class="cursor-pointer"/>
    </div>
{:else}
    <div on:keypress role="button" tabindex="0" on:click={handleClick}>
        <img src={image} alt="SidebarImage" class="px-1 cursor-pointer"/>
    </div>
{/if}

