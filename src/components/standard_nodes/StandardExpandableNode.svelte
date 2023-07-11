<script lang="ts">
    import NavSegmentButton from "../buttons/NavSegmentButton.svelte";
    import {currentLayer} from "../../globals/Variables";
    import MiniEditor from "./MiniEditor.svelte";
    import StandardNode from "./StandardNode.svelte";
    import {onMount} from "svelte";

    export let isNavColumn: boolean;
    export let layerShown: number;
    export let heading: string;
    export let children;
    export let isEditorOpen;

</script>

{#if isNavColumn}
    <div class="flex flex-col ml-4 mt-2">
        <NavSegmentButton isOnLayer={layerShown}>{heading}</NavSegmentButton>
        <!-- Anzeigedetail, ob die neuen Layers in der rechten Spalte angezeigt werden sollen-->
        {#if layerShown < $currentLayer - 1 }
            {#each children as node}
                <svelte:component this={node.component.name}
                                  {...{...node.component, layerShown: layerShown + 1, isNavColumn}}/>
            {/each}
        {/if}
    </div>
{:else}
    <div class="flex flex-col mt-2">
        {#if isEditorOpen}
            <MiniEditor bind:isEditorOpen bind:raw_latex={heading}/>
        {:else}
        {#if layerShown < $currentLayer }
            <StandardNode bind:isEditorOpen>
                <slot />
            </StandardNode>
            {#each children as node}
                <svelte:component this={node.component.name}
                                  {...{...node.component, layerShown: layerShown + 1, isNavColumn}}/>
            {/each}
        {:else if layerShown === $currentLayer }
            <NavSegmentButton isShort={true} isOnLayer={layerShown + 1 }>{heading}</NavSegmentButton>
        {/if}
        {/if}


    </div>
{/if}