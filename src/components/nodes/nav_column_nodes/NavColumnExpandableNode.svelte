<script lang="ts">
    import type API from "../../../globals/socket.api";
    import {isExpandedMap, scrollMapNav} from "../../../globals/Variables";
    import type {ComponentType} from "svelte";
    import NavColumnEnvironmentNode from "./NavColumnEnvironmentNode.svelte";
    import NavColumnSegmentNode from "./NavColumnSegmentNode.svelte";
    import NavColumnDocumentNode from "./NavColumnDocumentNode.svelte";
    import NavColumnFileNode from "./NavColumnFileNode.svelte";
    import {onMount} from "svelte";

    export let node: API.Ast.Node;

    export const navColumnNodeTypeMap = new Map<string, ComponentType>(
        [["Document", NavColumnDocumentNode],
            ["Segment", NavColumnSegmentNode],
            ["Environment", NavColumnEnvironmentNode],
            ["File", NavColumnFileNode],
        ]
    );

    let thisNode: HTMLElement;
    let children: API.Ast.Node[];

    $: if (node?.node_type.type === "Expandable") {
        children = node?.node_type.children;
    }

    $: expandChangeCurrent = $isExpandedMap.get(node?.uuid as API.Uuid);

    onMount(() => {
        scrollMapNav.set(node.uuid, thisNode);
    });
</script>

<div class="flex flex-col">
    <div bind:this={thisNode} class="mb-2">
        <slot/>
    </div>
    {#key $expandChangeCurrent}
        {#if $expandChangeCurrent }
            <div class="flex flex-col ml-12">
                {#each children as new_node}
                    {#if (new_node.node_type.type === "Expandable") }
                        <div class="w-full">
                            <svelte:component this={navColumnNodeTypeMap.get(new_node.node_type.data.type)}
                                              {...{node: new_node}}/>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
    {/key}
</div>