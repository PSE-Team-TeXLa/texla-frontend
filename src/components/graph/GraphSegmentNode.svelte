<script lang="ts">
    import GraphExpandableNode from "./GraphExpandableNode.svelte";

    export let node;

    // TODO: this should be in GraphExpandableNode
    let text: string;
    $: if (node.node_type.type === "Expandable")
        if (node.node_type.data.type === "Document")
            text = "Document";
        else if (node.node_type.data.type === "Segment")
            text = node.node_type.data.heading
        else if (node.node_type.data.type === "Environment")
            text = node.node_type.data.name
        else if (node.node_type.data.type === "File")
            text = node.node_type.data.path

</script>

<GraphExpandableNode bind:node>
    <div class="flex justify-center items-center ">
        {text}
    </div>
</GraphExpandableNode>
