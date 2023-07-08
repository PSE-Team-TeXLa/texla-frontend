<script lang="ts">
    import EditButton from "../buttons/EditButton.svelte";
    import {isEditorActive} from "../../globals/Variables.ts"
    import EditConfirmButton from "../buttons/EditConfirmButton.svelte";

    export let imageTitle: string;

    export let url:string;

    export let isNavColumn: boolean;

    let isTextEditorActive = false;

    function enterEditMode() {
        isEditorActive.set(true);
        isTextEditorActive = true;
    }

    function leaveEditMode() {
        isEditorActive.set(false);
        isTextEditorActive = false;

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
                <img alt={imageTitle} src={url} class="w-3/4"> IMAGE {url}
                <div class="flex justify-end flex-row">
                    <div>
                        <EditConfirmButton on:click={leaveEditMode}>
                            C
                        </EditConfirmButton>
                    </div>
                </div>
            </div>

        {:else}
            <div id="container" on:mouseenter={mouseEnter} on:mouseleave={mouseLeave} class="flex flex-col">
                <div class="">
                    <img alt={imageTitle} src={url} class="w-3/4"> IMAGE {imageTitle}
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
    #container:hover {
        border-style: dashed;
        border-color: red;
        border-width: 2px;
    }
</style>