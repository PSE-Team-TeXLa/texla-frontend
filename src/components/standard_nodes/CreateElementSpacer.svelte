<script lang="ts">
    import CreateElementButton from "../buttons/CreateElementButton.svelte";
    import {isEditorActive} from "../../globals/Variables.ts";
    import MiniEditor from "./MiniEditor.svelte";
    import type API from "../../globals/socket.api";
    import {addNode} from "../../globals/Api";

    export let after_sibling;
    export let parent;

    let isEditorOpen = false;

    function createElement() {
        if (!$isEditorActive) {
            isEditorActive.set(true);
            isEditorOpen = true;
            console.log("Start Create");
        }
    }

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
    <div id="bar-container" class="h-2 w-[90%] items-center">
        <div class="w-full hidden flex-row items-center">
            <div class="w-full mr-2 border-b-2 border-red border-dashed"></div>
            <CreateElementButton on:click={createElement}>+</CreateElementButton>
            <div class="w-full ml-2 border-b-2 border-red border-dashed"></div>
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
