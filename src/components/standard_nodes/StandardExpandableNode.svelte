<script lang="ts">
    import NavSegmentButton from "../buttons/NavSegmentButton.svelte";
    import {currentLayer, isEditorActive} from "../../globals/Variables";
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
    import {moveNode} from "../../globals/Api";


    export const standardNodeTypeMap = new Map<string, ComponentType>(
        [["Document", StandardDocumentNode],
            ["Segment", StandardSegmentNode],
            ["Text", StandardTextNode],
            ["StandardImageNode", StandardImageNode],
        ]
    );

    export let node: API.Ast.Node;

    let children: API.Ast.Node[];
    $: if (node.node_type.type === "Expandable") {
        children = node.node_type.children;
    }

    let text: string;
    $: if (node.node_type.type === "Expandable")
        if (node.node_type.data.type === "Document")
            text = "Document";
        else if (node.node_type.data.type === "Segment")
            text = node.node_type.data.heading

    export let isNavColumn: boolean;
    export let layerShown: number;
    export let isEditorOpen;

    const handleConsider = (evt) => {
        if (node.node_type.type === "Expandable")
            node.node_type.children = evt.detail.items;

    }

    const handleFinalize = (evt) => {
        if (evt.detail.items.filter(e => e.uuid === evt.detail.info.id).length === 0) {
            return;
        }
        if (node.node_type.type === "Expandable")
            node.node_type.children = evt.detail.items;
        let target = evt.detail.info.id;
        let childrenArray;
        if (node.node_type.type === "Expandable")
            childrenArray = node.node_type.children;
        let lastChildIndex = childrenArray.findIndex((o: API.Ast.Node) => o.uuid === target) - 1;
        let position: API.Operation.Position = {
            parent: node.uuid,
            after_sibling: lastChildIndex === -1 ? null : evt.detail.items[lastChildIndex].uuid
        }
        moveNode(target, position)
    }

 $: dndOptiions = {
     dragDisabled: $isEditorActive,
     items: children,
     dropTargetStyle: {'border-left': '6px solid #2196F3', 'background-color': '#ddffff', 'padding-top': '8px' , 'padding-bottom': '8px'},
     flipDurationMs: 100
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
        <div class="flex flex-col ml-8 ">
            {#if isEditorOpen}
                <MiniEditor bind:node bind:isEditorOpen/>
            {:else}
                {#if layerShown < $currentLayer }
                    <StandardNode uuid={node.uuid} bind:isEditorOpen>
                        <slot/>
                    </StandardNode>
                    <div use:dndzone="{dndOptiions}"
                         on:consider="{handleConsider}" on:finalize="{handleFinalize}" class="mb-4">
                        {#each children as node (node.uuid)}
                            <div animate:flip="{{duration: 100}}">
                                <svelte:component this={standardNodeTypeMap.get(node.node_type.data.type)}
                                                  {...{node, layerShown: layerShown + 1, isNavColumn}}/>
                            </div>
                        {/each}
                    </div>
                {:else if layerShown === $currentLayer }
                    <NavSegmentButton uuid={node.uuid} isShort={true} isOnLayer={layerShown + 1 }>{text}</NavSegmentButton>
                {/if}
            {/if}
        </div>
    {/if}
</div>
