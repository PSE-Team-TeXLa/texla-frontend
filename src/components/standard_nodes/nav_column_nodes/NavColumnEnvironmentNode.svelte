<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";
    import {inViewMap} from "../../../globals/Variables";

    export let node_path: string;
    export let node: API.Ast.Node;
    export let layerShown: number;

    let text: string;
    if (node.node_type.data.type === "Environment")
        text = node.node_type.data.name;

    $: isVisibleInRead = $inViewMap.get(node.uuid);
</script>

<NavColumnExpandableNode node_path={node_path} bind:node layerShown={layerShown}>
    {#key $isVisibleInRead}
        <div class="{$isVisibleInRead ? 'isVisibleInRead' : ''}">
            <ScrollToExpandableButton uuid={node.uuid}>
                <div class="flex w-full max-w-[400px] h-full p-2 pl-8 bg-environment">
                    {text}
                </div>
            </ScrollToExpandableButton>
        </div>
    {/key}
</NavColumnExpandableNode>

<style>
    .isVisibleInRead {
        padding-left: 10px;
        border-left: 7px solid theme('colors.red');
    }
</style>