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
            <div class="">
                <span>TEXT {text}</span>
            </div>
            <div>
                <EditButton on:click={enterEditMode}>
                    E
                </EditButton>
            </div>
        {/if}
    </div>

{/if}


