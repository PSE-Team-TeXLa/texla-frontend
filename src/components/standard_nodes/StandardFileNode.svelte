<script lang="ts">
    import StandardExpandableNode from "./StandardExpandableNode.svelte";
    import type API from "../../globals/socket.api.d.ts";

    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.File>>;
    export let node_path: string;
    export let layerShown: number;

</script>

        <StandardExpandableNode node_path={node_path} parent={parent} bind:node layerShown={layerShown}>
            <div class="w-[70%]">
                <h1 class="text-xl font-bold mt-2 mb-2">{node.node_type.data.path}</h1>
                <div class="w-full border-b-8 border-solid border-file mb-1"></div>
            </div>
        </StandardExpandableNode>