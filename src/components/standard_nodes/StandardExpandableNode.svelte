<script lang="ts">
    import NavSegmentButton from "../buttons/NavSegmentButton.svelte";
    import {currentLayer} from "../../globals/Variables";
    import MiniEditor from "./MiniEditor.svelte";
    import StandardNode from "./StandardNode.svelte";
    import {flip} from "svelte/animate";
    import type {ComponentType} from "svelte";


    import {dndzone} from "svelte-dnd-action";
    import StandardDocumentNode from "./StandardDocumentNode.svelte";
    import StandardSegmentNode from "./StandardSegmentNode.svelte";
    import StandardTextNode from "./StandardTextNode.svelte";
    import StandardImageNode from "./StandardImageNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export const standardNodeTypeMap = new Map<string, ComponentType>(
        [["Document", StandardDocumentNode],
            ["Segment", StandardSegmentNode],
            ["Text", StandardTextNode],
            ["StandardImageNode", StandardImageNode],
        ]
    );

    export let node: API.Ast.Node;

    let children: API.Ast.Node[];
    if (node.node_type.type === "Expandable") {
        children = node.node_type.children;
    }

    let text: string;
    if (node.node_type.type === "Expandable")
        if (node.node_type.data.type === "Document")
            text = "Document";
        else if (node.node_type.data.type === "Segment")
            text = node.node_type.data.heading

    export let isNavColumn: boolean;
    export let layerShown: number;
    export let isEditorOpen;

    //children.forEach((o, i) => children[i] = {...o, id: o.uuid})
    //children.forEach(e => console.log(e));


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
            <NavSegmentButton uuid={node.uuid} isOnLayer={layerShown}>{text}</NavSegmentButton>
            <!-- Anzeigedetail, ob die neuen Layers in der rechten Spalte angezeigt werden sollen-->
            {#if layerShown < $currentLayer - 1 }
                {#each children as node}
                    <svelte:component this={standardNodeTypeMap.get(node.node_type.data.type)}
                                      {...{node, layerShown: layerShown + 1, isNavColumn}}/>
                {/each}
            {/if}
        </div>
    {:else}
        <div class="flex flex-col mt-2">
            {#if isEditorOpen}
                <MiniEditor bind:raw_latex={node.raw_latex} bind:isEditorOpen/>
            {:else}
                {#if layerShown < $currentLayer }

                    <StandardNode uuid={node.uuid} bind:isEditorOpen>
                        <slot/>
                    </StandardNode>
                    <div use:dndzone="{{items: children, info: {id: 'uuid'}, flipDurationMs: 100}}"
                         on:consider="{handleConsider}" on:finalize="{handleFinalize}" class="mb-4">
                        {#each children as node (node.uuid)}
                            <div animate:flip="{{duration: 100}}">
                                <svelte:component this={standardNodeTypeMap.get(node.node_type.data.type)}
                                                  {...{node, layerShown: layerShown + 1, isNavColumn}}/>
                            </div>
                        {/each}
                    </div>
                {:else if layerShown === $currentLayer }
                    <NavSegmentButton isShort={true} isOnLayer={layerShown + 1 }>{text}</NavSegmentButton>
                {/if}
            {/if}
        </div>
    {/if}
</div>
