<script lang="ts">
    import SidebarImage from "./SidebarImage.svelte";
    import {createEventDispatcher} from "svelte";

    let dispatcher = createEventDispatcher();

    function dispatch() {
        dispatcher('click', {});
    }
    export let icon;
</script>

<div on:click={dispatch} class="px-3">
    <SidebarImage image={icon}>
        <slot />
    </SidebarImage>
</div>