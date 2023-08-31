<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../../globals/socket.api.d.ts";
    import resolveConfig from 'tailwindcss/resolveConfig'
    import tailwindConfig from '../../../../tailwind.config.js'
    import {getContentFromNode} from "../../../globals/Constants";

    export let parent;
    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Segment>>;
    export let layerShown: number;

    const fullConfig = resolveConfig(tailwindConfig)
</script>

<StandardExpandableNode parent={parent} bind:node layerShown={layerShown}
                        expCol={fullConfig.theme.colors.segment}>
    <h1 class="text-xl font-bold overflow-hidden">{getContentFromNode(node, 70, true)}</h1>
    <div class="w-full border-b-8 border-solid border-segment mb-1"></div>
</StandardExpandableNode>

