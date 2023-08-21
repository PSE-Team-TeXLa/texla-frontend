<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";

    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Document>>;
    export let layerShown: number;
</script>

{#key node.uuid}
    <NavColumnExpandableNode node_path={0} bind:node layerShown={layerShown}>
        <ScrollToExpandableButton uuid={node.uuid} class="bg-document">
            Document
        </ScrollToExpandableButton>
    </NavColumnExpandableNode>
{/key}

