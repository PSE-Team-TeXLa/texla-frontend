<script lang="ts">
    import Button from "./Button.svelte";
    import {currentLayer, scrollMap} from "../../globals/Variables.ts";
    import type API from "../../globals/socket.api";

    export let isNavColumn = false;
    export let isOnLayer: number;
    export let uuid: API.Uuid;

    function scrollToNode() {
        console.log($scrollMap)
        console.log(uuid)
        let node_target: HTMLElement = $scrollMap.get(uuid);
        console.log(node_target);
        node_target.scrollIntoView({behavior: "smooth"});
    }

    function setCurrentLayer() {
        if (isOnLayer > $currentLayer)
            currentLayer.set(isOnLayer);

        scrollToNode();
    }

</script>

<Button>
    {#if !isNavColumn}
        <div on:click={setCurrentLayer}
             class="flex justify-start items-center ml-12 py-1 pl-8 my-2 w-3/4 bg-darkcyan">
            <slot/>
        </div>
    {:else}
        <div on:click={scrollToNode}
             class="flex justify-start items-center p-2 pl-8 w-full bg-darkcyan">
            <slot/>
        </div>
    {/if}

</Button>
