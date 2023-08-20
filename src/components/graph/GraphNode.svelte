<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {sendActive} from "../../globals/Api";
    import {isDragged} from "../../globals/Variables";
    import {goto} from "$app/navigation";
    import {scrollToNode} from "../../globals/Constants";

    export let uuid: number;

    let dispatch = createEventDispatcher();

    function handleClick() {
        //goto('/standard_view')
        //console.log("click", uuid)
        //scrollToNode(uuid)
    }

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

<div on:keypress role="button" tabindex="0" on:click={handleClick} on:mousedown={handleMouseDown}
     on:touchstart={handleTouchStart}
     on:mouseup={handleMouseUp}
     on:touchend={handleTouchEnd}>
    <slot/>
</div>
