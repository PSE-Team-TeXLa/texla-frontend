<script lang="ts">
import MiniEditor from "./MiniEditor.svelte";
import StandardNode from "./StandardNode.svelte";
import type API from "../../globals/socket.api.d.ts";

export let node: API.Ast.Node;
export let isEditorOpen: boolean;
</script>

{#if isEditorOpen}
    <MiniEditor bind:isEditorOpen bind:node />
{:else}
    <StandardNode uuid={node.uuid} bind:isEditorOpen>
        <slot />
    </StandardNode>
{/if}