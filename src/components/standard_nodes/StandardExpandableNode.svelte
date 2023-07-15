<script lang="ts">
    import NavSegmentButton from "../buttons/NavSegmentButton.svelte";
    import {currentLayer} from "../../globals/Variables";
    import MiniEditor from "./MiniEditor.svelte";
    import StandardNode from "./StandardNode.svelte";
    import {flip} from "svelte/animate";

    import {dndzone} from "svelte-dnd-action";

    export let isNavColumn: boolean;
    export let layerShown: number;
    export let heading: string;
    export let children;
    export let isEditorOpen;
    export let uuid;

    children.forEach((o, i) => children[i] = {...o, id: o.component.uuid})
    children.forEach(e => console.log(e));


    const handleConsider = (evt) => {
        console.log("consider");
        children = evt.detail.items;
    }

    const handleFinalize = (evt) => {
        console.log("FInalize");
        children = evt.detail.items;
        console.log(children)
    }


</script>

<div>
{#if isNavColumn}
    <div class="flex flex-col ml-4 mt-2">
        <NavSegmentButton uuid={uuid} isOnLayer={layerShown}>{heading}</NavSegmentButton>
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

            <StandardNode uuid={uuid} bind:isEditorOpen>
                <slot />
            </StandardNode>
            <div use:dndzone="{{items: children, flipDurationMs: 100}}" on:consider="{handleConsider}" on:finalize="{handleFinalize}" class="mb-4">
            {#each children as node (node.id)}
                <div animate:flip="{{duration: 100}}">
                    <svelte:component this={node.component.name}
                                  {...{...node.component, layerShown: layerShown + 1, isNavColumn}} />
                </div>
            {/each}
            </div>
        {:else if layerShown === $currentLayer }
            <NavSegmentButton isShort={true} isOnLayer={layerShown + 1 }>{heading}</NavSegmentButton>
        {/if}
        {/if}
    </div>
{/if}
</div>
