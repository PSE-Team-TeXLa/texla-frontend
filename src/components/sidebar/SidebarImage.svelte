<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let image;
    export let isBigger = false;

    let dispatcher = createEventDispatcher();

    function dispatch() {
        dispatcher('click', {});
    }

</script>

{#if isBigger}
    <img on:click={dispatch} src={image} alt="SidebarImage" class="cursor-pointer"/>
{:else}
    <img on:click={dispatch} src={image} alt="SidebarImage" class="px-1 cursor-pointer"/>
{/if}

