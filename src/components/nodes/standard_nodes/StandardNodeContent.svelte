<script lang="ts">
    import HoverMenuButton from "../../buttons/HoverMenuButton.svelte";
    import {isDragged, isEditorActive, lastNodeTouched, modal, scrollMap} from "../../../globals/Variables";
    import {createEventDispatcher, onMount} from "svelte";
    import {deleteNode, editNode, mergeNodes, sendActive} from "../../../globals/Api";
    import CreateElementSpacer from "../CreateElementSpacer.svelte";
    import MiniEditor from "../MiniEditor.svelte";
    import {bind} from "svelte-simple-modal";
    import MetaDataPopup from "../../popups/MetaDataPopup.svelte";
    import type API from "../../../globals/socket.api";
    import {scrollToNode} from "../../../globals/Constants";
    import {faBars, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
    import Icon from "../../rendering/Icon.svelte";
    import resolveConfig from 'tailwindcss/resolveConfig'
    import tailwindConfig from '../../../../tailwind.config.js'

    export let node: API.Ast.Node;
    export let parent;

    const fullConfig = resolveConfig(tailwindConfig)
    const targetElementColor = fullConfig.theme.colors.targetElement;

    let isEditorOpen: boolean;
    let isHovered = false;
    let new_node_html;
    let dispatch = createEventDispatcher();

    /**
     * Enter edit mode for this node
     */
    function enterEditMode() {
        if ($isEditorActive) {
            // NO PopUp
            console.error("Editor already open");
        } else {
            $isEditorActive = true;
            isEditorOpen = true;
            scrollToNode(node.uuid);
        }
    }

    /**
     * Handle mouse enter
     */
    function mouseEnter() {
        if (!$isDragged)
            isHovered = true;
    }

    /**
     * Handle mouse leave
     */
    function mouseLeave() {
        isHovered = false;
    }


    onMount(async () => {
        // Insert node into scrollMap
        scrollMap.set(node.uuid, new_node_html);
        if ($lastNodeTouched === node.uuid) {
            //scrollToNode(node.uuid);
        }
    })

    /**
     * Handle mouse down
     */
    function handleMouseDown() {
        startDrag();
        dispatch("mousedown", {})
    }

    /**
     * Handle touch start
     */
    function handleTouchStart() {
        startDrag();
        dispatch("touchstart", {})
    }

    /**
     * Handle mouse up
     */
    function handleMouseUp() {
        stopDrag()
        dispatch("mouseup", {})
    }

    /**
     * Handle touch end
     */
    function handleTouchEnd() {
        stopDrag()
        dispatch("touchend", {})
    }

    /**
     * Handle delete
     */
    function handleDelete() {
        deleteNode(node.uuid);
    }

    /**
     * Handle edit confirm
     * @param evt
     */
    function handleEditConfirm(evt) {
        mouseLeave();
        isEditorActive.set(false);
        isEditorOpen = false;
        editNode(node.uuid, evt.detail.new_latex);
    }

    /**
     * Handle meta edit
     */
    function handleMetaEdit() {
        modal.set(bind(MetaDataPopup, {uuid: node.uuid, meta_data: node.meta_data}))
    }

    /**
     * Handle merge nodes
     */
    function handleMergeNodes() {
        isEditorActive.set(false);
        isEditorOpen = false;
        let elementHeight = scrollMap.get(node.uuid).offsetHeight;
        mergeNodes(node.uuid);
        window.scrollBy(0, elementHeight);
    }

    /**
     * Handle start drag
     */
    function startDrag() {
        sendActive();
        $isDragged = true;
    }

    /**
     * Handle stop drag
     */
    function stopDrag() {
        $isDragged = false;
    }
</script>

<div class="flex w-[90%] flex-col" bind:this={new_node_html}>
    {#if isEditorOpen}
        <MiniEditor on:confirm={handleEditConfirm} on:mergeincoming={handleMergeNodes} raw_latex={node.raw_latex}/>
    {:else}
        <div on:keypress role="button" tabindex="0" on:mouseenter={mouseEnter}
             on:mouseleave={mouseLeave} class="text-container flex flex-col relative cursor-default">
            <div on:keypress role="button" tabindex="0" on:mousedown={handleMouseDown} on:touchstart={handleTouchStart}
                 on:mouseup={handleMouseUp}
                 on:touchend={handleTouchEnd}
                 class="z-0 px-2 pb-1">
                <slot/>
            </div>
            <div class="absolute left-[-40px] top-[-4px]">
                {#if isHovered}
                    <div class="relative max-z w-[60px] h-fit">
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

    .max-z {
        z-index: 7000 !important;
    }
</style>