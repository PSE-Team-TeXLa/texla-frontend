<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../../globals/socket.api.d.ts";
    import resolveConfig from 'tailwindcss/resolveConfig'
    import tailwindConfig from '../../../../tailwind.config.js'
    import {getContentFromNode} from "../../../globals/Constants";

    export let parent;
    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Environment>>;

    const fullConfig = resolveConfig(tailwindConfig);

</script>

<StandardExpandableNode parent={parent} bind:node
                        expCol={fullConfig.theme.colors.environment}>
    <h1 class="text-xl font-bold overflow-hidden mt-2 mb-2">{getContentFromNode(node, 70, true)}</h1>
    <div class="w-full border-b-8 border-solid border-environment mb-1"></div>
</StandardExpandableNode>