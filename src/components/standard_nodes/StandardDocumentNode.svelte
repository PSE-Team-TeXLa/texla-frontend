<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import resolveConfig from 'tailwindcss/resolveConfig'
    import tailwindConfig from './../../../tailwind.config.js'

    const fullConfig = resolveConfig(tailwindConfig)

    export let node: API.Ast.Node<API.Ast.ExpandableType<API.Ast.Document>>;
    export let layerShown: number;

</script>

<!-- rerender entire tree when there is a new root -->
{#key node.uuid}
    <StandardExpandableNode node_path="0" parent={node.uuid} bind:node layerShown={layerShown}
                            expCol={fullConfig.theme.colors.document}>
        <h1 class="text-4xl font-bold">Document</h1>
        <div class="w-full border-b-8 border-solid border-document mb-1"></div>
    </StandardExpandableNode>
{/key}
