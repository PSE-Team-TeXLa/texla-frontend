<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";

    export let node: API.Ast.Node;
    export let layerShown: number;

    let text: string;
    if (node.node_type.data.type === "Environment")
        text = node.node_type.data.name;
</script>

<NavColumnExpandableNode bind:node layerShown={layerShown}>
    <ScrollToExpandableButton uuid={node.uuid}>
        <div class="flex w-[500px] h-full p-2 pl-8 bg-green">
            {text}
        </div>
    </ScrollToExpandableButton>
</NavColumnExpandableNode>

