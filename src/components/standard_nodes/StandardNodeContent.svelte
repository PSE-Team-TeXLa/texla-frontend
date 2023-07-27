<script lang="ts">
    import HoverMenuButton from "../buttons/HoverMenuButton.svelte";
    import {isDragged, isEditorActive, modal, scrollMap} from "../../globals/Variables";
    import {onMount} from "svelte";
    import {deleteNode, editNode, mergeNodes} from "../../globals/Api";
    import {createEventDispatcher} from "svelte";
    import CreateElementSpacer from "./CreateElementSpacer.svelte";
    import MiniEditor from "./MiniEditor.svelte";
    import {bind} from "svelte-simple-modal";
    import MetaDataPopup from "../popups/MetaDataPopup.svelte";
    import type API from "../../globals/socket.api";
    import {scrollToNode} from "../../globals/Constants";

    export let node: API.Ast.Node;
    export let parent;
    let isEditorOpen: boolean;

    function enterEditMode() {
        if ($isEditorActive) {
            console.error("Editor already open");
        } else {
            $isEditorActive = true;
            isEditorOpen = true;
            scrollToNode(node.uuid);
        }

    }

    let isHovered = false;

    function mouseEnter() {
        if (!$isDragged)
            isHovered = true;
    }

    function mouseLeave() {
        isHovered = false;
    }


    let new_node_html;
    onMount(async () => {
        scrollMap.set(node.uuid, new_node_html);
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
        deleteNode(node.uuid);
    }

    function handleEditConfirm(evt) {
        mouseLeave();
        isEditorActive.set(false);
        isEditorOpen = false;
        if (evt.detail.new_latex !== node.raw_latex)
            editNode(node.uuid, evt.detail.new_latex);
    }

    function handleMetaEdit() {
        modal.set(bind(MetaDataPopup, {meta_data: node.meta_data}))
    }

    function handleMergeNodes() {
        isEditorActive.set(false);
        isEditorOpen = false;
        mergeNodes(node.uuid);
    }
</script>

<div class="flex w-[90%] flex-col" bind:this={new_node_html}>

    {#if isEditorOpen}
        <MiniEditor on:confirm={handleEditConfirm} on:mergeincoming={handleMergeNodes} raw_latex={node.raw_latex}/>
    {:else}
        <div on:mouseenter={mouseEnter}
             on:mouseleave={mouseLeave} class="text-container flex flex-col relative">
            <div on:mousedown={handleMouseDown} on:touchstart={handleTouchStart}
                 on:mouseup={handleMouseUp}
                 on:touchend={handleTouchEnd} class="px-2 pb-1">
                <slot/>
            </div>
            <div class="absolute left-[-40px] top-[-4px]">
                {#if isHovered}
                    <div class="w-[60px] h-fit">
                        <HoverMenuButton on:click={enterEditMode}>
                            E
                        </HoverMenuButton>
                        <HoverMenuButton on:click={handleDelete}>
                            X
                        </HoverMenuButton>
                        <HoverMenuButton on:click={handleMetaEdit}>
                            M
                        </HoverMenuButton>
                    </div>
                {/if}
            </div>
        </div>
        <CreateElementSpacer parent={parent} after_sibling={node.uuid === parent ? null : node.uuid}/>
    {/if}
</div>

<style>
    .text-container:hover {
        outline: 3px dashed theme('colors.red');
        outline-offset: 0;
    }
</style>