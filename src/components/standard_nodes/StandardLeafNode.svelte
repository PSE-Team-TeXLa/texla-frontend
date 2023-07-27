<script lang="ts">
    import type {ComponentType} from "svelte";
    import type API from "../../globals/socket.api.d.ts";

    import StandardNodeContent from "./StandardNodeContent.svelte";
    import StandardTextNode from "./StandardTextNode.svelte";
    import StandardImageNode from "./StandardImageNode.svelte";
    import StandardLabelNode from "./StandardLabelNode.svelte";
    import StandardCaptionNode from "./StandardCaptionNode.svelte";
    import StandardCommentNode from "./StandardCommentNode.svelte";
    import StandardMathNode from "./StandardMathNode.svelte";

    export let parent;
    export let node: API.Ast.Node;

    export const standardNodeTypeMap = new Map<string, ComponentType>(
      [["Text", StandardTextNode],
          ["Math", StandardMathNode],
          ["Image", StandardImageNode],
          ["Label", StandardLabelNode],
          ["Caption", StandardCaptionNode],
          ["Comment", StandardCommentNode]
      ]
    );

    let text: string;
    $: if (node.node_type.type === "Leaf")
        if (node.node_type.data)


</script>

<div class="ml-4">
    <StandardNodeContent parent={parent} node={node}>
        <slot/>
    </StandardNodeContent>
</div>
