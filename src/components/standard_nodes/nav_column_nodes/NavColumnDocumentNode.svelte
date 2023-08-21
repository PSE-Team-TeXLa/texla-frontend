<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";

    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Document>>;
    export let layerShown: number;
</script>

{#key node.uuid}
    <NavColumnExpandableNode node_path={0} bind:node layerShown={layerShown}>
        <ScrollToExpandableButton uuid={node.uuid}>
            <div class="flex h-full w-full max-w-[400px] p-2 pl-8 bg-document">
                Document
            </div>
        </ScrollToExpandableButton>
    </NavColumnExpandableNode>
{/key}

