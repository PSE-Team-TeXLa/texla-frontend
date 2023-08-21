<script lang="ts">
    import {backendUrl} from "../../globals/Constants";
    import StandardLeafNode from "./StandardLeafNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Image>>;
    export let parent;

    // TODO: canonicalize path (probably in backend)
    const src = `${backendUrl}/user-assets/${node?.node_type.data.path}`;
</script>

<StandardLeafNode parent={parent} bind:node>
    <div class="my-4 flex flex-col items-center">
        <img alt={node.node_type.data.path} {src} class="max-h-20 w-auto"/>
    </div>
</StandardLeafNode>
