<script lang="ts">

    import StandardLeafNode from "./StandardLeafNode.svelte";

    export let text: string;

    export let uuid: bigint;

    $: newText = text;

    export let isNavColumn: boolean;

    let isEditorOpen;

</script>

{#if !isNavColumn}
    <div id="text-box" class="flex flex-col cursor-default bg-green-800">
        <StandardLeafNode bind:isEditorOpen bind:raw_latex={newText}>
            <div class="my-4">
                <span class="text-lg">{newText}</span>
            </div>
        </StandardLeafNode>
    </div>

{/if}