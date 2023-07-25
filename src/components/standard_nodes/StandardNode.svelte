<script lang="ts">
    import EditButton from "../buttons/EditButton.svelte";
    import {isEditorActive, scrollMap} from "../../globals/Variables";

    export let node;
    export let parent;
    export let isEditorOpen: boolean;

    import {onMount} from "svelte";
    import DeleteButton from "../buttons/DeleteButton.svelte";
    import {deleteNode, editNode} from "../../globals/Api";
    import {createEventDispatcher} from "svelte";
    import CreateElementSpacer from "./CreateElementSpacer.svelte";
    import MiniEditor from "./MiniEditor.svelte";

    function enterEditMode() {
        if ($isEditorActive) {
            console.log("Editor already open");
        } else {
            $isEditorActive = true;
            isEditorOpen = true;

            let target: HTMLElement = $scrollMap.get(node.uuid);
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

    let new_node_html;
    onMount(async () => {
        scrollMap.update((o) => o.set(node.uuid, new_node_html))
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
        isEditorActive.set(false);
        isEditorOpen = false;
        editNode(node.uuid, evt.detail.new_latex);
    }
</script>

{#if isEditorOpen}
    <MiniEditor on:confirm={handleEditConfirm} raw_latex={node.raw_latex}/>
{:else}
    <div on:mousedown={handleMouseDown} on:touchstart={handleTouchStart} on:mouseup={handleMouseUp}
         on:touchend={handleTouchEnd} bind:this={new_node_html} id="text-container" on:mouseenter={mouseEnter}
         on:mouseleave={mouseLeave}
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
    <CreateElementSpacer parent={parent} after_sibling={node.uuid === parent ? null : node.uuid}/>
{/if}

<style>
    #text-container:hover {
        outline: 3px dashed theme('colors.red');
        outline-offset: -2px;
    }
</style>