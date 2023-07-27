<script lang="ts">
    import {currentLayer} from "../../globals/Variables.ts";
    import {createEventDispatcher} from "svelte";

    export let isOnLayer: number;

    let dispatch = createEventDispatcher();

    function setCurrentLayer() {

        dispatch('myclick', {});
        if (isOnLayer > $currentLayer)
            currentLayer.set(isOnLayer);
    }


</script>

<div on:click={setCurrentLayer}
     class="cursor-pointer flex justify-start items-center ml-12 my-2 w-3/4">
    <slot/>
</div>
