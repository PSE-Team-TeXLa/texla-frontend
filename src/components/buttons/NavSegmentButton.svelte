<script lang="ts">
    import Button from "./Button.svelte";
    import {currentLayer} from "../../globals/Variables.ts";

    export let isShort: boolean;
    export let isOnLayer: number;

    function setCurrentLayer() {
        if (isOnLayer > $currentLayer)
            currentLayer.set(isOnLayer);
    }
</script>

<Button>
    {#if isShort}
        <div on:click={setCurrentLayer}
             class="flex justify-start items-center ml-12 p-2 pl-8 w-3/4 bg-darkcyan">
            <slot/>
        </div>
    {:else}
        <div on:click={setCurrentLayer}
             class="flex justify-start items-center p-2 pl-8 w-full bg-darkcyan">
            <slot/>
        </div>
    {/if}

</Button>
