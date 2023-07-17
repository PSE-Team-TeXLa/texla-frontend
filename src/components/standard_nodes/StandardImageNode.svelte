<script lang="ts">
    import StandardLeafNode from "./StandardLeafNode.svelte";

    export let imageTitle: string;

    export let url: string;

    export let isNavColumn: boolean;
    export let uuid;

    let isEditorOpen: boolean;
</script>

{#if !isNavColumn}
    <div class="flex flex-col cursor-default bg-amber-300">
        <StandardLeafNode uuid={uuid} bind:isEditorOpen bind:raw_latex={url}>
            <div class="my-4 flex flex-col items-center">
                <img alt={imageTitle} src={url} class="max-h-20 w-auto"/>
                <div class="p-2 mt-2">
                    <span class="text-2xl font-bold">{imageTitle}</span>
                </div>
            </div>
        </StandardLeafNode>
    </div>

{/if}