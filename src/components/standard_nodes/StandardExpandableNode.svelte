<script lang="ts">
    import {scrollToNode, standardNodeTypeMap} from "../../globals/Constants";
    import {
        inViewMap,
        isDragged,
        isEditorActive,
        isExpandedMap, lastNodeInView,
        lastNodeTouched,
    } from "../../globals/Variables";
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

    let children: API.Ast.Node[];

    $: children = node?.node_type.children as API.Ast.Node[];

    /**
     * Option object for svelte-dnd-action dropzone.
     */
    $: dndOptions = {
        dragDisabled: $isEditorActive,
        items: children,
        dropTargetStyle: {
            'background-color': '#ddffff',
        },
        flipDurationMs: 100
    }

    /**
     * Is the node currently expanded?
     */
    $: expandChangeCurrent = $isExpandedMap.get(node?.uuid as API.Uuid);

    /**
     * Is the node currently in view in read column?
     */
    $: isVisibleInRead = $inViewMap.get(node?.uuid as API.Uuid);

    /**
     * Considers the new position of the dragged node and updates the node's children accordingly.
     *
     * @param evt
     */
    const handleConsider = (evt) => {
        node.node_type.children = evt.detail.items;
    }

    /**
     * Finds the new position of the dragged node.
     *
     * @param targetId
     */
    function findPosition(targetId): API.Operation.Position{
        let previousChildIndex = node.node_type.children.findIndex((child: API.Ast.Node) => child.uuid === targetId) - 1;
        return {
            parent: node.uuid,
            after_sibling: previousChildIndex === -1 ? null : node.node_type.children[previousChildIndex].uuid
        };
    }

    /**
     * Finalizes the new position of the dragged node and updates the node's children accordingly.
     *
     * @param evt
     */
    const handleFinalize = (evt) => {
        node.node_type.children = evt.detail.items;

        $isDragged = false;
        moveNode(evt.detail.info.id, findPosition(evt.detail.info.id))
    }

    onMount(() => {
        // Initialize isExpandedMap
        if (!$isExpandedMap.has(node.uuid)) {
            $isExpandedMap.set(node.uuid, writable(false));
            if (node.node_type.data.type === "Document") {
                $isExpandedMap.set(node.uuid, writable(true));
            }
        }
        //Initialize inViewMap
        $inViewMap.set(node.uuid, writable(false))
    });

    /**
     * Handles a in view change of the node?
     *
     * @param evt
     */
    function handleInViewChange(evt) {
        $isVisibleInRead = evt.detail.inView;
        if ($isVisibleInRead) {
            $lastNodeInView = node.uuid;
        }
    }

    /**
     * Handles a change of the node's expand state.
     */
    function handleExpandChange() {
        $expandChangeCurrent = !$expandChangeCurrent;
        lastNodeTouched.set(node.uuid);
        scrollToNode(node.uuid);
    }
</script>

<div class="flex flex-col" use:inview={{}}
     on:inview_change={handleInViewChange}>
    <div class="cursor-pointer flex flex-row gap-12">
        <div on:keypress role="button" tabindex="0"
             class="flex justify-center items-center font-bold text-3xl origin-center"
             on:click={handleExpandChange}>
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