<script lang="ts">
    import CreateElementButton from "../buttons/CreateElementButton.svelte";
    import {isEditorActive} from "../../globals/Variables.ts";
    import MiniEditor from "./MiniEditor.svelte";
    import type API from "../../globals/socket.api";
    import {addNode} from "../../globals/Api";

    export let after_sibling;
    export let parent;

    let isEditorOpen = false;
    let editor;

    /**
     * Opens editor and scrolls the editor into view and sets the editor to active.
     */
    function createElement() {
        if (!$isEditorActive) {
            $isEditorActive = true;
            isEditorOpen = true;

            editor.scrollIntoView({behavior: "smooth"});
        }
    }

    /**
     * Handles the confirm event of the editor and adds the node to the tree.
     */
    function handleConfirm(evt) {
        isEditorActive.set(false);
        isEditorOpen = false;

        let raw_latex: string = evt.detail.new_latex;
        let destination: API.Operation.Position = {
            parent: parent,
            after_sibling: after_sibling
        }
        addNode(destination, raw_latex);
    }
</script>

{#if !isEditorOpen}
    <div bind:this={editor} id="bar-container" class="h-3 w-[90%] items-center">
        <div class="w-full hidden flex-row items-center justify-center">
            <div class="w-full mr-2 border-b-2 border-targetElement border-dashed border-opacity-50"></div>
            <CreateElementButton on:click={createElement}></CreateElementButton>
            <div class="w-full ml-2 border-b-2 border-targetElement border-opacity-50 border-dashed"></div>
        </div>
    </div>
{:else}
    <MiniEditor on:confirm={handleConfirm} raw_latex={""}/>
{/if}

<style>
    #bar-container:hover > div {
        display: flex !important;
    }
</style>
