<script lang="ts">
    import type API from "../../globals/socket.api";
    import {scrollToNode} from "../../globals/Constants";

    export let uuid: API.Uuid;

    /**
     * Handle click
     */
    function handleClick() {
        scrollToNode(uuid);
    }
</script>

<div on:keypress role="button" tabindex="0" on:click={handleClick}
     class="cursor-pointer flex justify-start items-center">
    <slot/>
</div>

