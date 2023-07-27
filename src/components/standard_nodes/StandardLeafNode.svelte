<script lang="ts">
    import StandardNodeContent from "./StandardNodeContent.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import type { ComponentType } from "svelte";
    import StandardTextNode from "./StandardTextNode.svelte";
    import StandardImageNode from "./StandardImageNode.svelte";
    import StandardLabelNode from "./StandardLabelNode.svelte";
    import StandardCaptionNode from "./StandardCaptionNode.svelte";
    import StandardCommentNode from "./StandardCommentNode.svelte";

    export let node: API.Ast.Node;
    export let parent;

    export const standardNodeType = new Map<string, ComponentType>(
      [["Text", StandardTextNode],
          ["Math", ],
          ["Image", StandardImageNode],
          ["Label", StandardLabelNode],
          ["Caption", StandardCaptionNode],
          ["Comment", StandardCommentNode]
      ]
    );

</script>

<div class="ml-4">
    <StandardNodeContent parent={parent} node={node}>
        <slot/>
    </StandardNodeContent>
</div>
