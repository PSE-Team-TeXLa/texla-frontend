<script lang="ts">
    import Button from "../buttons/Button.svelte";
    import {createEventDispatcher} from "svelte";

    export let image;

    let dispatcher = createEventDispatcher();

    function dispatch() {
        dispatcher('click', {});
    }

</script>


<img on:click={dispatch} src={image} alt="SidebarImage" class="cursor-pointer "/>

