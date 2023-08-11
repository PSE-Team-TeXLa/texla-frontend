<!--<script lang="ts">
    import {
        currentLayer,
        isExpandedMap,
        lastNodeTouched,
    } from "../../globals/Variables.ts";
    import {createEventDispatcher} from "svelte";
    import {writable} from "svelte/store";

    export let node_path: string;
    export let isOnLayer: number;
    export let uuid;

    let clickBox;
    let dispatch = createEventDispatcher();

    function setCurrentLayer() {
        $isExpandedMap.set(uuid, writable(true));
        console.log($isExpandedMap);
        if (isOnLayer > $currentLayer)
            currentLayer.set(isOnLayer);
        lastNodeTouched.set(uuid);
        dispatch('click');
    }

</script>

<div bind:this={clickBox} on:click={setCurrentLayer}
     class="cursor-pointer flex justify-start items-center my-2 w-3/4">
    <slot/>
</div>-->
