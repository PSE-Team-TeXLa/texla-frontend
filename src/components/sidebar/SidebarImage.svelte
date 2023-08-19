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
    <div on:keypress role="button" tabindex="0" on:click={dispatch}>
        <img src={image} alt="SidebarImage" class="cursor-pointer"/>
    </div>
{:else}
    <div on:keypress role="button" tabindex="0" on:click={dispatch}>
        <img src={image} alt="SidebarImage" class="px-1 cursor-pointer"/>
    </div>
{/if}

