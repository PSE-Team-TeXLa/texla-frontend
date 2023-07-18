<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let node: API.Ast.Node;
    console.log(node.node_type);
    let heading;
    if (node.node_type.type === "Expandable" && node.node_type.data.type === "Segment" )
        heading = node.node_type.data.heading;

    export let isNavColumn;
    export let layerShown: number;
    let isEditorOpen: boolean;

</script>

<StandardExpandableNode bind:node isNavColumn={isNavColumn} layerShown={layerShown} isEditorOpen={isEditorOpen}>
    <h1 class="text-4xl font-bold mt-4 mb-2">{heading}</h1>
    <div class="w-full border-b-4 border-solid border-lightpurple mb-4"></div>
</StandardExpandableNode>