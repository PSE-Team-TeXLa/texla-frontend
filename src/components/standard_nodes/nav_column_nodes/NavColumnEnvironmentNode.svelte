<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";
    import {inViewMap, scrollOnRead} from "../../../globals/Variables";
    import {scrollToNodeNav} from "../../../globals/Constants";

    export let node_path: string;
    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Environment>>;
    export let layerShown: number;

    let text: string = node?.node_type.data.name as string;

    $: isVisibleInRead = $inViewMap.get(node?.uuid as API.Uuid);

    $ : {
        if ($isVisibleInRead && $scrollOnRead) {
            scrollToNodeNav(node.uuid);
        }
    }
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