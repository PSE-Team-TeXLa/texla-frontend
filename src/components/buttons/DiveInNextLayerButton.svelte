<script lang="ts">
    import Button from "./Button.svelte";
    import {currentLayer} from "../../globals/Variables.ts";

    export let isOnLayer: number;

    function setCurrentLayer() {
        if (isOnLayer > $currentLayer)
            currentLayer.set(isOnLayer);
    }

</script>

<Button>
    <div on:click={setCurrentLayer}
         class="flex justify-start items-center ml-12 py-1 pl-8 my-2 w-3/4 bg-darkcyan">
        <slot/>
    </div>
</Button>
