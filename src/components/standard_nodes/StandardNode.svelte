<script lang="ts">
    import EditButton from "../buttons/EditButton.svelte";
    import {isEditorActive, scrollMap} from "../../globals/Variables";

    export let uuid;
    export let isEditorOpen: boolean;

    import {onMount} from "svelte";
    import DeleteButton from "../buttons/DeleteButton.svelte";
    import {deleteNode} from "../../globals/Api";
    import {createEventDispatcher} from "svelte";
    import CreateElementSpacer from "./CreateElementSpacer.svelte";

    function enterEditMode() {
        if ($isEditorActive) {
            console.log("Editor already open");
        } else {
            $isEditorActive = true;
            isEditorOpen = true;

            let target: HTMLElement = $scrollMap.get(uuid);
            target.scrollIntoView({behavior: "smooth"});
        }

    }

    let isHovered = false;

    function mouseEnter() {
        isHovered = true;
    }

    function mouseLeave() {
        isHovered = false;
    }

    let node;
    onMount(async () => {
        scrollMap.update((o) => o.set(uuid, node))
    })

    let dispatch = createEventDispatcher();
    function handleMouseDown() {
        console.log("mousedown")
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


    function handleDelete() {
        deleteNode(uuid);
    }
</script>
    <div on:mousedown={handleMouseDown} on:touchstart={handleTouchStart} on:mouseup={handleMouseUp}
         on:touchend={handleTouchEnd} bind:this={node} id="text-container" on:mouseenter={mouseEnter} on:mouseleave={mouseLeave}
         class="flex flex-col relative">
        <slot/>
        <div class="absolute left-[-40px] top-[-4px]">
            {#if isHovered}
                <div class="w-[60px] h-[60px]">
                    <EditButton on:click={enterEditMode}>
                        E
                    </EditButton>
                    <DeleteButton on:click={handleDelete}>
                        X
                    </DeleteButton>
                </div>
            {/if}
        </div>
    </div>
    <CreateElementSpacer />

<style>
    #text-container:hover {
        outline: 3px dashed theme('colors.red');
        outline-offset: -2px;
    }
</style>