<script lang="ts">
    import Button from "../buttons/Button.svelte";
    import {createEventDispatcher} from "svelte";

    let dispatcher = createEventDispatcher();

    function dispatch() {
        dispatcher('click', {});
    }

    export let image;
</script>


<Button>
    <img on:click={dispatch} src={image} alt="SidebarImage"/>
</Button>
