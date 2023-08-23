<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../../globals/socket.api.d.ts";
    import resolveConfig from 'tailwindcss/resolveConfig'
    import tailwindConfig from '../../../../tailwind.config.js'
    import {firstXChars} from "../../../globals/Constants";

    export let parent;
    export let node_path: string;
    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Environment>>;
    export let layerShown: number;

    const fullConfig = resolveConfig(tailwindConfig);

</script>

<StandardExpandableNode node_path={node_path} parent={parent} bind:node layerShown={layerShown}
                        expCol={fullConfig.theme.colors.environment}>
    <h1 class="font-bold mt-2 mb-2">{firstXChars(node.node_type.data.name, 70)}</h1>
    <div class="w-full border-b-8 border-solid border-environment mb-1"></div>
</StandardExpandableNode>