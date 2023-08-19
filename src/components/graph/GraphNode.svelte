<script lang="ts">
    import {createEventDispatcher} from "svelte";

    let dispatch = createEventDispatcher();

    export let expColor;

    function handleMouseDown() {
        dispatch("mousedown", {})
    }

    function handleTouchStart() {
        dispatch("touchstart", {})
    }

    function handleMouseUp() {
        dispatch("mouseup", {})
    }

    function handleTouchEnd() {
        dispatch("touchend", {})
    }
</script>

<div on:mousedown={handleMouseDown} on:touchstart={handleTouchStart} on:mouseup={handleMouseUp}
     on:touchend={handleTouchEnd}
     class="p-2 mx-4 flex justify-center items-center border-4 rounded-3xl" style="border-color: {expColor};">
    <span><slot/></span>
</div>
