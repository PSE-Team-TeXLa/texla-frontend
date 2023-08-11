<script lang="ts">
    import {createEventDispatcher} from "svelte";

    let dispatch = createEventDispatcher();

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
     class="p-2 mx-4 w-[150px] flex justify-center items-center border-4 border-darkcyan rounded-3xl">
    <span><slot/></span>
</div>
