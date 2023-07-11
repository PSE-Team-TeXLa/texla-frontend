<script lang="ts">
    import MiniEditor from "./MiniEditor.svelte";
    import StandardNode from "./StandardNode.svelte";

    export let imageTitle: string;

    export let url:string;

    export let isNavColumn: boolean;

    let isEditorOpen: boolean;
</script>

{#if !isNavColumn}
    <div class="pl-4 flex flex-col cursor-default">
        {#if isEditorOpen}
            <MiniEditor bind:isEditorOpen bind:raw_latex={url} />
        {:else}
                <StandardNode bind:isEditorOpen>
                    <img alt={imageTitle} src={url} class="w-3/4"> IMAGE {imageTitle}
                </StandardNode>
        {/if}
    </div>

{/if}