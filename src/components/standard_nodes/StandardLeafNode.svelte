<script lang="ts">
import MiniEditor from "./MiniEditor.svelte";
import StandardNode from "./StandardNode.svelte";

export let isEditorOpen: boolean;
export let raw_latex: string;
</script>

{#if isEditorOpen}
    <MiniEditor bind:isEditorOpen bind:raw_latex/>
{:else}
    <StandardNode bind:isEditorOpen>
        <slot />
    </StandardNode>
{/if}