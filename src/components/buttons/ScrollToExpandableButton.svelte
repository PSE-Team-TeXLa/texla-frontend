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
    <div on:click={scrollTo} class="cursor-pointer flex justify-start items-center w-[500px] max-w-[80%] mb-2">
        <slot/>
    </div>
</Button>
