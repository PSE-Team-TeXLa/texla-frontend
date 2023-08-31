<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";
    import {inViewMap} from "../../../globals/Variables";
    import {getContentFromNode} from "../../../globals/Constants";

    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Document>>;
    export let layerShown: number;

    $: isVisibleInRead = $inViewMap.get(node?.uuid as API.Uuid);
</script>

{#key node.uuid}
    <NavColumnExpandableNode bind:node layerShown={layerShown}>
        {#key $isVisibleInRead}
            <ScrollToExpandableButton uuid={node.uuid} class="bg-document">
                {getContentFromNode(node, 40, true)}
            </ScrollToExpandableButton>
        {/key}
    </NavColumnExpandableNode>
{/key}

