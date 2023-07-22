<script lang="ts">
    import Button from "./Button.svelte";
    import {currentLayer, scrollMap} from "../../globals/Variables.ts";

    export let isShort: boolean;
    export let isOnLayer: number;
    export let uuid;

    function setCurrentLayer() {
        if (isOnLayer > $currentLayer)
            currentLayer.set(isOnLayer);
    }

    function scrollToNode() {
        let target: HTMLElement = $scrollMap.get(uuid);
        target.scrollIntoView({behavior: "smooth"});
        //console.log(target);
    }
</script>

<Button>
    {#if isShort}
        <div on:click={setCurrentLayer}
             class="flex justify-start items-center ml-12 p-2 pl-8 mb-2 w-3/4 bg-darkcyan">
            <slot/>
        </div>
    {:else}
        <div on:click={scrollToNode}
             class="flex justify-start items-center p-2 pl-8 w-full bg-darkcyan">
            <slot/>
        </div>
    {/if}

</Button>
