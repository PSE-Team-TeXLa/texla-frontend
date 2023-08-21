<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";
    import {inViewMap, isExpandedMap} from "../../../globals/Variables";

    export let node_path: string;
    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Segment>>;
    export let layerShown: number;

    $: isVisibleInRead = $inViewMap.get(node?.uuid as API.Uuid);
</script>

<NavColumnExpandableNode node_path={node_path} bind:node layerShown={layerShown}>
    {#key $isVisibleInRead}
        <div class="{$isVisibleInRead ? 'isVisibleInRead' : ''}">
            <ScrollToExpandableButton uuid={node.uuid} class="bg-segment">
                {node.node_type.data.heading}
            </ScrollToExpandableButton>
        </div>
    {/key}
</NavColumnExpandableNode>
