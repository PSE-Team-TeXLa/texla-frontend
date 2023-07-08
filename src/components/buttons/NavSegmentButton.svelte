<script lang="ts">
    import Button from "./Button.svelte";
    import {currentLayer} from "../../globals/Variables.ts";

    export let color;

    export let isOnLayer: number;
    function setCurrentLayer() {
        currentLayer.set(isOnLayer);
    }
</script>

<Button>
<div on:click={setCurrentLayer} style="background-color: {color}" class="flex justify-start items-center p-2 pl-8 w-full">
    <slot />
</div>

</Button>
