<script lang="ts">
    import EditButton from "../buttons/EditButton.svelte";
    import {isEditorActive} from "../../globals/Variables.ts"
    import EditConfirmButton from "../buttons/EditConfirmButton.svelte";

    export let text: string;

    let newText = text;

    export let isNavColumn: boolean;

    let isTextEditorActive = false;

    function enterEditMode() {
        isEditorActive.set(true);
        isTextEditorActive = true;
    }

    function leaveEditMode() {
        isEditorActive.set(false);
        isTextEditorActive = false;

        console.log(newText);
    }

    let isHovered = false;
    function mouseEnter() {
        isHovered = true;
    }
    function mouseLeave() {
        isHovered = false;
    }
</script>

{#if !isNavColumn}
    <div id="text-box" class="pl-4 flex flex-col cursor-default">
        {#if isTextEditorActive}
            <div class="flex flex-col">
                <textarea bind:value={newText} class="resize-none"/>
                <div class="flex justify-end flex-row">
                    <div>
                    <EditConfirmButton on:click={leaveEditMode}>
                        C
                    </EditConfirmButton>
                    </div>
                </div>
            </div>

        {:else}
            <div id="text-container" on:mouseenter={mouseEnter} on:mouseleave={mouseLeave} class="flex flex-col">
            <div class="">
                <span>TEXT {newText}</span>
            </div>
                {#if isHovered}
                    <EditButton on:click={enterEditMode}>
                        E
                    </EditButton>
                {/if}
            </div>
        {/if}
    </div>

{/if}

<style>
    #text-container:hover {
        border-style: dashed;
        border-color: red;
        border-width: 2px;
    }
</style>