<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";

    export let node: API.Ast.Node;
    export let layerShown: number;

</script>

<NavColumnExpandableNode bind:node layerShown={layerShown}>
    <ScrollToExpandableButton uuid={node.uuid}>
        <div class="flex w-[90%] h-full p-2 pl-8 bg-segment">
            {node.node_type.data.heading}
        </div>
    </ScrollToExpandableButton>
</NavColumnExpandableNode>

