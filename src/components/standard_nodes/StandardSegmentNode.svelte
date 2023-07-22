<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import {onMount} from "svelte";

    export let node: API.Ast.Node;
    let heading;
    if (node.node_type.type === "Expandable" && node.node_type.data.type === "Segment" )
        heading = node.node_type.data.heading;

    export let isNavColumn;
    export let layerShown: number;
    let isEditorOpen: boolean;

    let color;
    let fontsize;

    onMount(async () => {
        color = `#${10-layerShown*2}6${layerShown*2}1EB`;
        fontsize = `${2.2 - layerShown*(1/3)}rem`;
    });

</script>

<StandardExpandableNode bind:node isNavColumn={isNavColumn} layerShown={layerShown} isEditorOpen={isEditorOpen}>
    <h1 style="font-size: {fontsize}" class="font-bold mt-2 mb-2">{layerShown} {heading}</h1>
    <div style="border-color: {color}" class="w-full border-b-4 border-solid border-lightpurple mb-1"></div>
</StandardExpandableNode>
