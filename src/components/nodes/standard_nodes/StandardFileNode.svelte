<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../../globals/socket.api.d.ts";
    import resolveConfig from 'tailwindcss/resolveConfig'
    import tailwindConfig from '../../../../tailwind.config.js'
    import {getContentFromNode} from "../../../globals/Constants";

    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.File>>;
    export let node_path: string;
    export let layerShown: number;

    const fullConfig = resolveConfig(tailwindConfig)
</script>

<StandardExpandableNode node_path={node_path} parent={parent} bind:node layerShown={layerShown}
                        expCol={fullConfig.theme.colors.file}>
    <h1 class="text-xl overflow-hidden font-bold mt-2 mb-2">{getContentFromNode(node, 70, true)}</h1>
    <div class="w-full border-b-8 border-solid border-file mb-1"></div>
</StandardExpandableNode>