<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";
    import {inViewMap, scrollOnRead} from "../../../globals/Variables";
    import {scrollToNodeNav} from "../../../globals/Constants";

    export let node_path: string;
    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.File>>;
    export let layerShown: number;

    $: isVisibleInRead = $inViewMap.get(node?.uuid as API.Uuid);

    $ : {
        if ($isVisibleInRead && $scrollOnRead) {
            scrollToNodeNav(node?.uuid as API.Uuid);
        }
    }
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