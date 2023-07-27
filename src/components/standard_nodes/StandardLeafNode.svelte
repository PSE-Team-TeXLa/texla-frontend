<script lang="ts">
    import type API from "../../globals/socket.api.d.ts";

    import StandardNodeContent from "./StandardNodeContent.svelte";


    export let parent;
    export let node: API.Ast.Node;

    let text: string;
    $: if (node.node_type.type === "Leaf")
        if (node.node_type.data.type === "Text")
            text = node.node_type.data.text;
        else if (node.node_type.data.type === "Math")
            text = node.node_type.data.content;
        else if (node.node_type.data.type === "Image")
            text = node.node_type.data.path;
        else if (node.node_type.data.type === "Label")
            text = node.node_type.data.label;
        else if (node.node_type.data.type === "Caption")
            text = node.node_type.data.caption;
        else if (node.node_type.data.type === "Comment")
            text = node.node_type.data.comment


</script>

<div class="ml-4">
    <StandardNodeContent parent={parent} node={node}>
        <slot/>
    </StandardNodeContent>
</div>
