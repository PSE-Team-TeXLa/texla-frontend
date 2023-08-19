<script lang="ts">
    import Button from "./Button.svelte";
    import type API from "../../globals/socket.api";
    import {scrollToNode} from "../../globals/Constants";

    export let uuid: API.Uuid;

    function scrollTo() {
        scrollToNode(uuid);
    }
</script>

<Button>
    <div on:keypress role="button" tabindex="0" on:click={scrollTo}
         class="cursor-pointer flex justify-start items-center mb-2">
        <slot/>
    </div>
</Button>
