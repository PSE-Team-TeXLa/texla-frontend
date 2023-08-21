<script lang="ts">
    import {backendUrl} from "../../globals/Constants";
    import type API from "../../globals/socket.api";
    import GraphLeafNode from "./GraphLeafNode.svelte";

    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Image>>;

    const src = `${backendUrl}/user-assets/${node?.node_type.data.path}`;
</script>

<GraphLeafNode uuid={node.uuid}>
    <div class="flex justify-center items-center" title={node.raw_latex}>
        <img {src} alt={node.node_type.data.path} class="max-h-20 h-auto"/>
    </div>
</GraphLeafNode>
