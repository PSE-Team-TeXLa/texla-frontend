<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {sendActive} from "../../globals/Api";
    import {isDragged} from "../../globals/Variables";

    let dispatch = createEventDispatcher();

    function handleMouseDown() {
        startDrag();
        dispatch("mousedown", {})
    }

    function handleTouchStart() {
        startDrag();
        dispatch("touchstart", {})
    }

    function handleMouseUp() {
        stopDrag()
        dispatch("mouseup", {})
    }

    function handleTouchEnd() {
        stopDrag()
        dispatch("touchend", {})
    }

    function startDrag() {
        sendActive();
        $isDragged = true;
    }

    function stopDrag() {
        $isDragged = false;
    }
</script>

<div on:keypress role="button" tabindex="0" on:mousedown={handleMouseDown} on:touchstart={handleTouchStart}
     on:mouseup={handleMouseUp}
     on:touchend={handleTouchEnd}>
    <slot/>
</div>
