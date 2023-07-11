<script lang="ts">
    import NavSegmentButton from "../buttons/NavSegmentButton.svelte";
    import {currentLayer} from "../../globals/Variables.ts";
    import MiniEditor from "./MiniEditor.svelte";
    import StandardNode from "./StandardNode.svelte";
    import {onMount} from "svelte";

    export let children;
    export let heading;
    export let isNavColumn;
    export let layerShown: number;
    export let isEditorOpen: boolean;

    let color;
    let buttonColor;

    onMount(async () => {
        color = `#${layerShown * 2}5${layerShown * 2}555`;
        buttonColor = `#${layerShown * 2}5${layerShown * 2}999`;
    });


</script>

{#if isNavColumn}
    <div class="flex flex-col ml-4 py-2">
        <NavSegmentButton isOnLayer={layerShown} color={color}>{heading}</NavSegmentButton>
        {#if layerShown < $currentLayer }
            {#each children as node}
                <svelte:component this={node.component.name}
                                  {...{...node.component, layerShown: layerShown + 1, isNavColumn}}/>
            {/each}
        {/if}
    </div>
{:else}
    <div class="flex flex-col my-2 py-2" style="background-color: {`#${layerShown * 2}5${layerShown * 2}555`}">
        {#if isEditorOpen}
            <MiniEditor bind:isEditorOpen bind:raw_latex={heading}/>

        {:else}
            <StandardNode bind:isEditorOpen>
                <h1 class="text-2xl pl-4">{heading}</h1>
            </StandardNode>
        {/if}

        {#if layerShown < $currentLayer + 1}
            {#each children as node}
                <svelte:component this={node.component.name}
                                  {...{...node.component, layerShown: layerShown + 1, isNavColumn}}/>
            {/each}
        {:else if layerShown === $currentLayer + 1}
            <NavSegmentButton isOnLayer={layerShown} color={buttonColor}>{heading}</NavSegmentButton>
        {/if}

    </div>
{/if}


