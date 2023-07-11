<script lang="ts">
    import MiniEditor from "./MiniEditor.svelte";
    import StandardNode from "./StandardNode.svelte";

    export let text: string;

    export let uuid: bigint;

    $: newText = text;

    export let isNavColumn: boolean;

    let isEditorOpen;

</script>

{#if !isNavColumn}
    <div id="text-box" class="flex flex-col cursor-default bg-green-800">
        {#if isEditorOpen}
            <MiniEditor bind:isEditorOpen bind:raw_latex={newText}/>
        {:else}
            <StandardNode bind:isEditorOpen>
                <div class="">
                    <span>TEXT {newText}</span>
                </div>
            </StandardNode>
        {/if}
    </div>

{/if}