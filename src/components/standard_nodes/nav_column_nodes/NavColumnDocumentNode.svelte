<script lang="ts">
    import type API from "../../../globals/socket.api";
    import NavColumnExpandableNode from "./NavColumnExpandableNode.svelte";
    import ScrollToExpandableButton from "../../buttons/ScrollToExpandableButton.svelte";
    import {onMount} from "svelte";
    import {flipExpandChange} from "../../../globals/Variables";

    export let node: API.Ast.Node;
    export let layerShown: number;

    onMount(() => {
        flipExpandChange();
    });
</script>

{#key node.uuid}
    <NavColumnExpandableNode node_path={0} bind:node layerShown={layerShown}>
        <ScrollToExpandableButton uuid={node.uuid}>
            <div class="flex w-full h-full p-2 pl-8 bg-document">
                Document
            </div>
        </ScrollToExpandableButton>
    </NavColumnExpandableNode>
{/key}

