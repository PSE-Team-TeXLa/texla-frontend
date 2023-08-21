<script lang="ts">
    import type API from "../../../globals/socket.api";
    import {isExpandedMap, scrollMapNav} from "../../../globals/Variables";
    import type {ComponentType} from "svelte";
    import NavColumnEnvironmentNode from "./NavColumnEnvironmentNode.svelte";
    import NavColumnSegmentNode from "./NavColumnSegmentNode.svelte";
    import NavColumnDocumentNode from "./NavColumnDocumentNode.svelte";
    import NavColumnFileNode from "./NavColumnFileNode.svelte";
    import {onMount} from "svelte";

    export let node_path: string;
    export let node: API.Ast.Node;
    export let layerShown: number;

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

<div class="flex flex-col flex-wrap">
    <div bind:this={thisNode} class="mb-2">
        <slot/>
    </div>
    {#key $expandChangeCurrent}
        {#if $expandChangeCurrent }
            <div class="flex flex-col ml-12">
                {#each children as new_node, i}
                    {#if (new_node.node_type.type === "Expandable") }
                        <div class="w-full">
                            <svelte:component node_path={node_path + "/" + i}
                                              this={navColumnNodeTypeMap.get(new_node.node_type.data.type)}
                                              {...{node: new_node, layerShown: layerShown + 1}}/>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
    {/key}
</div>