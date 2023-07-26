<script lang="ts">
    import Button from "./Button.svelte";
    import {scrollMap} from "../../globals/Variables.ts";
    import type API from "../../globals/socket.api";

    export let uuid: API.Uuid;

    function scrollToNode() {
        console.log($scrollMap)
        console.log(uuid)
        let node_target: HTMLElement = $scrollMap.get(uuid);
        console.log(node_target);
        node_target.scrollIntoView({behavior: "smooth"});
    }
</script>

<Button>
    <div on:click={scrollToNode}
         class="flex justify-start items-center w-[500px] max-w-[80%] mb-2">
        <slot/>
    </div>
</Button>
