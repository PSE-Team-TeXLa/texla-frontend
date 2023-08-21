<script lang="ts">
    import StandardLeafNode from "./StandardLeafNode.svelte";
    import type API from "../../../globals/socket.api.d.ts";
    import {faTag} from "@fortawesome/free-solid-svg-icons";
    import Icon from "../../rendering/Icon.svelte";

    export let parent;
    export let node: API.Ast.Node<API.Ast.LeafType<API.Ast.Label>>;

</script>

<StandardLeafNode parent={parent} bind:node>
    <div class="flex mt-2 flex-row items-center bg-label opacity-50 text-opacity-60">
        <Icon icon={faTag} color="#000" class=" p-1 px-4 max-h-8" scale={2.4}/>
        <div class="flex flex-col cursor-default my-2 pl-2">
            <span class="whitespace-pre-wrap text-lg">{node.node_type.data.label}</span>
        </div>
    </div>
</StandardLeafNode>