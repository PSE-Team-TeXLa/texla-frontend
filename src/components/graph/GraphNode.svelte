<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import {sendActive} from "../../globals/Api";
    import {globalTimer, isDragged, lastNodeTouched} from "../../globals/Variables";
    import type API from "../../globals/socket.api";
    import {scrollToNode} from "../../globals/Constants";
    import {goto} from "$app/navigation";

    // uuid to jump to standardviewnode
    export let uuid: API.Uuid = 0;

    let dispatch = createEventDispatcher();

    onMount(() => {
        console.log(uuid);
    })

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

    function handleClick() {
        console.log("click");
        $globalTimer = setTimeout(() => {
            scrollToNode(uuid)
            console.log("scroll with timer to node" + uuid);
        }, 900);
        goto('/standard_view');
    }
</script>

<div on:keypress role="button" tabindex="0" on:mousedown={handleMouseDown}
     on:touchstart={handleTouchStart}
     on:mouseup={handleMouseUp}
     on:touchend={handleTouchEnd}
     on:click={handleClick}>
    <slot/>
</div>
