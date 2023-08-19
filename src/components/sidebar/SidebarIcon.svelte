<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import Icon from "../rendering/Icon.svelte";

    let dispatcher = createEventDispatcher();

    function dispatch() {
        dispatcher('click', {});
    }

    export let icon;
</script>

<div on:click={dispatch} on:keypress role="button" tabindex="0"
     class="px-1 cursor-pointer flex items-center justify-center">
    <Icon icon={icon} scale={1.6} color="#fff"/>
</div>