<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let parent;
    export let node: API.Ast.Node;

    let name;
    if (node.node_type.type === "Expandable" && node.node_type.data.type === "Environment")
        name = node.node_type.data.name;

    export let isNavColumn;
    export let layerShown: number;
</script>

<StandardExpandableNode parent={parent} bind:node isNavColumn={isNavColumn} layerShown={layerShown}>
    <div class="w-[70%]">
        <h1 class="font-bold mt-2 mb-2">{layerShown} {name}</h1>
        <div class="w-full border-b-4 border-solid border-green mb-1"></div>
    </div>
</StandardExpandableNode>
