<script lang="ts">
    import EditButton from "../buttons/EditButton.svelte";
    import {isEditorActive} from "../../globals/Variables";

    function enterEditMode() {

        if ($isEditorActive) {
            console.log("Editor already open");
        } else {
            $isEditorActive = true;
            isEditorOpen = true;
        }

    }

    export let isEditorOpen: boolean;

    let isHovered = false;

    function mouseEnter() {
        isHovered = true;
    }

    function mouseLeave() {
        isHovered = false;
    }
</script>

<div id="text-container" on:mouseenter={mouseEnter} on:mouseleave={mouseLeave} class="flex flex-col relative">
    <slot/>
    <div class="absolute left-[-40px]">
        {#if isHovered}
            <div class="w-[60px] h-[60px]">
                <EditButton on:click={enterEditMode}>
                    E
                </EditButton>
            </div>
        {/if}
    </div>
</div>

<style>
    #text-container:hover {
        outline: 2px dashed red;
        outline-offset: -2px;
    }
</style>