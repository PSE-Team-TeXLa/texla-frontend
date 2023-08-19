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
    import trash_icon from "$lib/assets/icons/trash.svg";
    import edit_icon from "$lib/assets/icons/edit.svg";
    import meta_icon from "$lib/assets/icons/metaedit.svg";

    import {faEdit} from "@fortawesome/free-solid-svg-icons";
    import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
    import {faBars} from "@fortawesome/free-solid-svg-icons";
    import {faCheck} from "@fortawesome/free-solid-svg-icons";
    import Icon from "../rendering/Icon.svelte";

    import resolveConfig from 'tailwindcss/resolveConfig'
    import tailwindConfig from './../../../tailwind.config.js'

    const fullConfig = resolveConfig(tailwindConfig)
    const targetElementColor = fullConfig.theme.colors.targetElement;

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
        modal.set(bind(MetaDataPopup, {uuid: node.uuid, meta_data: node.meta_data}))
    }

    function handleMergeNodes() {
        isEditorActive.set(false);
        isEditorOpen = false;
        let elementHeight = scrollMap.get(node.uuid).offsetHeight;
        mergeNodes(node.uuid);
        window.scrollBy(0, elementHeight);
    }
</script>

<div class="flex w-[90%] flex-col" bind:this={new_node_html}>

    {#if isEditorOpen}
        <MiniEditor on:confirm={handleEditConfirm} on:mergeincoming={handleMergeNodes} raw_latex={node.raw_latex}/>
    {:else}
        <div on:mouseenter={mouseEnter}
             on:mouseleave={mouseLeave} class="text-container flex flex-col relative cursor-default">
            <div on:mousedown={handleMouseDown} on:touchstart={handleTouchStart}
                 on:mouseup={handleMouseUp}
                 on:touchend={handleTouchEnd} class="px-2 pb-1">
                <slot/>
            </div>
            <div class="absolute left-[-40px] top-[-4px]">
                {#if isHovered}
                    <div class="w-[60px] h-fit">
                        <HoverMenuButton on:click={enterEditMode}>
                            <Icon icon={faEdit} color={targetElementColor}/>
                        </HoverMenuButton>
                        <HoverMenuButton on:click={handleDelete}>
                            <Icon icon={faTrashAlt} color={targetElementColor}/>
                        </HoverMenuButton>
                        <HoverMenuButton on:click={handleMetaEdit}>
                            <Icon icon={faBars} color={targetElementColor}/>
                        </HoverMenuButton>
                    </div>
                {/if}
            </div>
        </div>
        <CreateElementSpacer parent={node.node_type.type === "Expandable" ? node.uuid : parent}
                             after_sibling={node.node_type.type === "Expandable" ? null : node.uuid}/>
    {/if}
</div>

<style>
    .text-container:hover {
        outline: 3px dashed theme('colors.targetElement');
        outline-offset: 0;
    }
</style>