<script lang="ts">
    import {currentLayer, lastDovenIn} from "../../globals/Variables.ts";
    import {createEventDispatcher} from "svelte";

    export let isOnLayer: number;
    export let uuid;

    let clickBox;
    let dispatch = createEventDispatcher();

    function setCurrentLayer() {
        if (isOnLayer > $currentLayer)
            currentLayer.set(isOnLayer);
        lastDovenIn.set(uuid)
        dispatch('click');
    }

</script>

<div bind:this={clickBox} on:click={setCurrentLayer}
     class="cursor-pointer flex justify-start items-center ml-12 my-2 w-3/4">
    <slot/>
</div>
