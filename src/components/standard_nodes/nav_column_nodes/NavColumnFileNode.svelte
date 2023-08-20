<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";
    import {inViewMap} from "../../../globals/Variables";

    export let node_path: string;
    export let node: API.Ast.Node;
    export let layerShown: number;

    $: isVisibleInRead = $inViewMap.get(node.uuid);
</script>

<NavColumnExpandableNode node_path={node_path} bind:node layerShown={layerShown}>
    {#key $isVisibleInRead}
        <div class="{$isVisibleInRead ? 'isVisibleInRead' : ''}">
            <ScrollToExpandableButton uuid={node.uuid}>
                <div class="flex w-[100%] h-full max-w-[400px] p-2 pl-8 bg-file">
                    {node.node_type.data.path}
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