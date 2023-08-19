<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";

    export let node_path: string;
    export let node: API.Ast.Node;
    export let layerShown: number;

</script>

<NavColumnExpandableNode node_path={node_path} bind:node layerShown={layerShown}>
    <ScrollToExpandableButton uuid={node.uuid}>
        <div class="flex w-[100%] h-full max-w-[400px] p-2 pl-8 bg-file">
            {node.node_type.data.path}
        </div>
    </ScrollToExpandableButton>
</NavColumnExpandableNode>
