<script lang="ts">
    import SidebarImage from "./SidebarImage.svelte";
    import {createEventDispatcher} from "svelte";

    let dispatcher = createEventDispatcher();

    function dispatch() {
        dispatcher('click', {});
    }
    export let icon;
</script>

<div on:click={dispatch} class="px-1">
    <SidebarImage image={icon}>
        <slot />
    </SidebarImage>
</div>