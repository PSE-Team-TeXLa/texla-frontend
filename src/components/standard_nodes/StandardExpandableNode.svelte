<script lang="ts">
    import {isEditorActive, json_ast} from "../../globals/Variables";
    import {dndzone} from "svelte-dnd-action";
    import {moveNode} from "../../globals/Api";
    import {flip} from "svelte/animate";

    import type {ComponentType} from "svelte";
    import type API from "../../globals/socket.api.d.ts";

    import StandardDocumentNode from "./StandardDocumentNode.svelte";
    import StandardNodeContent from "./StandardNodeContent.svelte";
    import StandardSegmentNode from "./StandardSegmentNode.svelte";
    import StandardEnvironmentNode from "./StandardEnvironmentNode.svelte";
    import StandardFileNode from "./StandardFileNode.svelte";
    import StandardTextNode from "./StandardTextNode.svelte";
    import StandardMathNode from "./StandardMathNode.svelte";
    import StandardImageNode from "./StandardImageNode.svelte";
    import StandardLabelNode from "./StandardLabelNode.svelte";
    import StandardCaptionNode from "./StandardCaptionNode.svelte";
    import StandardCommentNode from "./StandardCommentNode.svelte";

    export let parent;
    export let node: API.Ast.Node;

    export const standardNodeTypeMap = new Map<string, ComponentType>(
        //Expandable
        [["Document", StandardDocumentNode],
            ["Segment", StandardSegmentNode],
            ["File", StandardFileNode],
            ["Environment", StandardEnvironmentNode],
            ["Text", StandardTextNode],
            ["Math", StandardMathNode],
            ["Image", StandardImageNode],
            ["Label", StandardLabelNode],
            ["Caption", StandardCaptionNode],
            ["Comment", StandardCommentNode]
        ]);

    let children: API.Ast.Node[];
    $: if (node.node_type.type === "Expandable") {
        children = node.node_type.children;
    }
    let text: string;
    $: if (node.node_type.type === "Expandable")
        if (node.node_type.data.type === "Document")
            text = "Document";
        else if (node.node_type.data.type === "Segment")
            text = node.node_type.data.heading;
        else if (node.node_type.data.type === "File")
            text = node.node_type.data.path
        else if (node.node_type.data.type === "Environment")
            text = node.node_type.data.name
    
    export let layerShown: number;

    const handleConsider = (evt) => {
        if (node.node_type.type === "Expandable")
            node.node_type.children = evt.detail.items;

        console.log($json_ast);
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
        dropTargetStyle: {
            'border-left': '6px solid #2196F3',
            'background-color': '#ddffff',
            'padding-top': '8px',
            'padding-bottom': '8px'
        },
        flipDurationMs: 100
    }

    let isDraggedLocal = false;
    let dragStuff;

    function startDrag() {
        if (!$isEditorActive) {
            isDraggedLocal = true;
        }
    }

    function stopDrag() {
        isDraggedLocal = false;
    }


    // TODO Fix Component Hierarchie Standard Nodes nach ganz außen und Content-Component hinzufügen
    // TODO fix navcolumn logic (navsegment buttons)
</script>

<div class="flex flex-col">
    <StandardNodeContent parent={parent} on:mousedown={startDrag} on:touchstart={startDrag}
                         on:mouseup={stopDrag}
                         on:touchend={stopDrag} node={node}>
        <slot/>
    </StandardNodeContent>

    <div class="ml-6 py-4">
        {#if !isDraggedLocal}
            <div bind:this={dragStuff} use:dndzone="{dndOptiions}"
                 on:consider="{handleConsider}" on:finalize="{handleFinalize}" class="mb-4">
                {#each children as new_node (new_node.uuid)}
                    <div animate:flip="{{duration: 100}}">
                        <svelte:component parent={node.uuid}
                                          this={standardNodeTypeMap.get(new_node.node_type.data.type)}
                                          {...{
                                              node: new_node,
                                              layerShown: layerShown + 1,
                                          }}/>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>