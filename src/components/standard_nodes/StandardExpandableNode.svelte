<script lang="ts">
    import {scrollToNode, standardNodeTypeMap} from "../../globals/Constants";
    import {inViewMap, isDragged, isEditorActive, isExpandedMap, lastNodeTouched} from "../../globals/Variables";
    import {dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID} from "svelte-dnd-action";
    import {moveNode} from "../../globals/Api";
    import {flip} from "svelte/animate";
    import {inview} from "svelte-inview";
    import type API from "../../globals/socket.api.d.ts";
    import StandardNodeContent from "./StandardNodeContent.svelte";
    import {onMount} from "svelte";
    import {writable} from "svelte/store";
    import Icon from "../rendering/Icon.svelte";
    import {faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";
    import CreateElementSpacer from "./CreateElementSpacer.svelte";

    export let node_path: string;
    export let expCol: string;
    export let parent;
    export let node: API.Ast.Node<API.Ast.ExpandableType>;
    export let layerShown: number;

    let children: API.Ast.Node[];
    $: children = node.node_type.children;

    const handleConsider = (evt) => {
        node.node_type.children = evt.detail.items;
    }

    const handleFinalize = (evt) => {
        node.node_type.children = evt.detail.items;
        let targetId = evt.detail.info.id;
        let lastChildIndex = node.node_type.children.findIndex((o: API.Ast.Node) => o.uuid === targetId) - 1;
        let position: API.Operation.Position = {
            parent: node.uuid,
            after_sibling: lastChildIndex === -1 || lastChildIndex === -2 ? null : evt.detail.items[lastChildIndex].uuid
        }
        $isDragged = false;
        moveNode(targetId, position)
    }

    $: dndOptions = {
        dragDisabled: $isEditorActive,
        items: children,
        dropTargetStyle: {
            //'border-left': '6px solid #2196F3',
            'background-color': '#ddffff',
            //'padding-top': '8px',
            //'padding-bottom': '8px'
        },
        flipDurationMs: 100
    }

    $: expandChangeCurrent = $isExpandedMap.get(node.uuid);
    $: isVisibleInRead = $inViewMap.get(node.uuid);

    onMount(() => {
        if (!$isExpandedMap.has(node.uuid)) {
            $isExpandedMap.set(node.uuid, writable(false));
            if (node.node_type.data.type === "Document") {
                $isExpandedMap.set(node.uuid, writable(true));
            }
        }
        $inViewMap.set(node.uuid, writable(false))
    });

    let dropout_icon;

    // TODO Fix Component Hierarchie Standard Nodes nach ganz außen und Content-Component hinzufügen
    // TODO fix navcolumn logic (navsegment buttons)
</script>

<div class="flex flex-col" use:inview={{}}
     on:inview_change={(evt) => {$isVisibleInRead = evt.detail.inView; console.log(evt.detail.inView + " on " + node.raw_latex)}}>
    <div class="cursor-pointer flex flex-row gap-12">
        <div on:keypress role="button" tabindex="0" bind:this={dropout_icon}
             class="flex justify-center items-center font-bold text-3xl origin-center"
             on:click={() => {
            $expandChangeCurrent = !$expandChangeCurrent;

            console.log($expandChangeCurrent + " " + $lastNodeTouched);
            lastNodeTouched.set(node.uuid);
            scrollToNode(node.uuid);
        }}>
            <div class="w-4">
                {#if $expandChangeCurrent}
                    <Icon icon={faCaretDown} color={expCol} scale={1.3}/>
                {:else}
                    <Icon icon={faCaretRight} color={expCol} scale={1.3}/>
                {/if}
            </div>

        </div>
        <StandardNodeContent node_path={node_path} parent={parent} node={node}>
            <slot/>
        </StandardNodeContent>
    </div>
    {#key $expandChangeCurrent}
        {#if $expandChangeCurrent}
            <div class="flex flex-row w-full">
                <div class="ml-2 border-l-4 border-dashed" style="border-color: {expCol}">

                </div>
                <div class="ml-6 w-full">
                    <div use:dndzone="{dndOptions}"
                         on:consider="{handleConsider}" on:finalize="{handleFinalize}">
                        {#each children.filter(item => item.uuid !== SHADOW_PLACEHOLDER_ITEM_ID) as new_node, i (new_node.uuid)}
                            <div animate:flip="{{duration: 100}}">
                                {#if new_node[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                                    <div class="h-[50px]">
                                    </div>
                                {:else}
                                    <svelte:component node_path={node_path + "/" + i} parent={node.uuid}
                                                      this={standardNodeTypeMap.get(new_node.node_type.data.type)}
                                                      {...{
                                                          node: new_node,
                                                          layerShown: layerShown + 1,
                                                      }}/>
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
    {/key}
    {#if node.node_type.data.type === "Environment" || node.node_type.data.type === "File"}
        <CreateElementSpacer parent={parent} after_sibling={node.uuid}/>
    {/if}
</div>