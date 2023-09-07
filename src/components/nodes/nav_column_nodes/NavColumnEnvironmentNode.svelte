<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";
    import {inViewMap, scrollOnRead} from "../../../globals/Variables";
    import {getContentFromNode, scrollToNodeNav} from "../../../globals/Constants";

    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Environment>>;

    $: isVisibleInRead = $inViewMap.get(node?.uuid as API.Uuid);

    $ : {
        if ($isVisibleInRead && $scrollOnRead) {
            scrollToNodeNav(node?.uuid as API.Uuid);
        }
    }
</script>

<NavColumnExpandableNode bind:node>
    {#key $isVisibleInRead}
        <div class="{$isVisibleInRead ? 'isVisibleInRead' : ''}">
            <ScrollToExpandableButton uuid={node.uuid} class="bg-environment">
                {getContentFromNode(node, 40, true)}
            </ScrollToExpandableButton>
        </div>
    {/key}
</NavColumnExpandableNode>
