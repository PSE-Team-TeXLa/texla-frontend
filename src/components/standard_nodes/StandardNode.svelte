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

<div id="text-container" on:mouseenter={mouseEnter} on:mouseleave={mouseLeave} class="flex flex-col">
    <slot />
    {#if isHovered}
        <EditButton on:click={enterEditMode}>
            E
        </EditButton>
    {/if}
</div>

<style>
    #text-container:hover {
        border-style: dashed;
        border-color: red;
        border-width: 2px;
    }
</style>