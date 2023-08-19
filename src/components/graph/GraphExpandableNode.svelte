<script lang="ts">
    import {dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID} from "svelte-dnd-action";
    import {flip} from "svelte/animate";
    import {moveNode, sendActive} from "../../globals/Api";

    import {graphNodeTypeMap} from "../../globals/Constants";

    import type API from "../../globals/socket.api.d.ts";
    import GraphNode from "./GraphNode.svelte";
    import {isExpandedMap, lastNodeTouched} from "../../globals/Variables";
    import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
    import Icon from "../rendering/Icon.svelte";
    import resolveConfig from 'tailwindcss/resolveConfig'
    import tailwindConfig from './../../../tailwind.config.js'


    export let node: API.Ast.Node<API.Ast.ExpandableType>;

    const fullConfig = resolveConfig(tailwindConfig)
    let expColor = fullConfig.theme.colors[node.node_type.data.type.toLowerCase()];

    let children: API.Ast.Node[];
    $: children = node.node_type.children;

    // see https://svelte.dev/repl/fe8c9eca04f9417a94a8b6041df77139?version=3.59.2
    $: dndOptions = {
        items: children,
        // centreDraggedOnCursor: true,
        flipDurationMs: 300,
        dropTargetStyle: {
            'outline-offset': '2px',
            'outline':
                '3px dashed #ccc',
            'transition': 'padding 0.2s',
            'padding-top': '8px',
            'padding-bottom': '8px',
            'min-height':
                '20px',
            'min-width': '110px'
        }
    }

    function compactForm(node: API.Ast.Node<API.Ast.ExpandableType>) {
        const data = node.node_type.data;
        if (data.type === "Document") {
            return "Document";
        } else if (data.type === "Segment") {
            return data.heading;
        } else if (data.type === "Environment") {
            return data.name;
        } else if (data.type === "File") {
            return data.path;
        }
    }

    const handleConsider = (evt) => {
        node.node_type.children = evt.detail.items;
    }

    const handleFinalize = (evt) => {
        node.node_type.children = evt.detail.items;

        // TODO MAKE method for getting position
        let targetId: API.Uuid = evt.detail.info.id;
        let previousChildIndex = node.node_type.children.findIndex((child: API.Ast.Node) => child.uuid === targetId) - 1;
        let position: API.Operation.Position = {
            parent: node.uuid,
            after_sibling: previousChildIndex === -1 ? null : node.node_type.children[previousChildIndex].uuid
        }
        moveNode(targetId, position)
    }

    let isDragged = false;

    // TODO: this is never called
    function startDrag() {
        sendActive();
        isDragged = true;
    }

    function stopDrag() {
        isDragged = false;
    }

    $: expandChangeCurrent = $isExpandedMap.get(node.uuid);

</script>

<div class="my-2 py-4 flex flex-row items-center">
    <div class="flex-none">
        <GraphNode expColor={expColor} on:mousedown={startDrag} on:touchstart={startDrag} on:mouseup={stopDrag}
                   on:touchend={stopDrag}>
            {compactForm(node)}
        </GraphNode>
    </div>
    <div on:click={() =>{
            $expandChangeCurrent = !$expandChangeCurrent;
            console.log($expandChangeCurrent + " " + $lastNodeTouched);
            lastNodeTouched.set(node.uuid);
            }} class="flex justify-center items-center mx-2">
        {#if !$expandChangeCurrent}
            <Icon icon={faArrowRight} color={expColor} scale={1.4}/>
        {:else}
            {#if node.node_type.data.type !== "Document"}
                <Icon icon={faArrowLeft} color={expColor} scale={1.4}/>
            {/if}
        {/if}
    </div>
    {#key $expandChangeCurrent}
        {#if $expandChangeCurrent}
            <div use:dndzone="{dndOptions}"
                 class="flex flex-col gap-1 ml-2 border-l-4 min-w-[300px]" style="border-color: {expColor}"
                 on:consider="{handleConsider}" on:finalize="{handleFinalize}">
                {#each node.node_type.children.filter(child => child.uuid.toString() !== SHADOW_PLACEHOLDER_ITEM_ID) as child
                    (child.uuid)}
                    <div animate:flip="{{duration: 300}}">
                        {#if child[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                            <div class="h-[50px]"></div>
                        {:else}
                            {#if child.node_type.type === "Expandable"}
                                <svelte:self node={child}></svelte:self>
                            {:else}
                                <svelte:component this={graphNodeTypeMap.get(child.node_type.data.type)}
                                                  {...{node: child}}/>
                            {/if}
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    {/key}

</div>
