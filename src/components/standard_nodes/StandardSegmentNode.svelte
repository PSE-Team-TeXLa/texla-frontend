<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let parent;
    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Segment>>;
    export let layerShown: number;
    export let node_path: string;
</script>

<StandardExpandableNode node_path={node_path} parent={parent} bind:node layerShown={layerShown}>
    <h1 class="text-xl font-bold">{node.node_type.data.heading}</h1>
    <div class="w-full border-b-8 border-solid border-segment mb-1"></div>
</StandardExpandableNode>

