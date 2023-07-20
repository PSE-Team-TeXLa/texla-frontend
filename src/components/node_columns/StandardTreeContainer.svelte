<script lang="ts">
    import {onMount} from "svelte";
    import StandardDocumentNode from "../standard_nodes/StandardDocumentNode.svelte";
    import {json_ast} from "../../globals/Variables";

    export let isNavColumn: boolean;


    let layerShown = 0;

    let container;

    onMount(async () => {
        if (!isNavColumn)
            container.style.marginLeft = "2em";
    });

</script>

<div class="snap-proximity snap-y h-full w-full p-10 overflow-scroll overflow-x-hidden">

    {#if $json_ast !== undefined}
        {#if isNavColumn}
            <!--<StandardDocumentNode uuid={$json_ast.root.uuid} filename={$json_ast.root.node_type.data.filename} children={$json_ast.root.node_type.children} layerShown={layerShown} isNavColumn="{isNavColumn}" />-->
            <StandardDocumentNode bind:node={$json_ast.root} layerShown={layerShown} isNavColumn="{isNavColumn}"/>
        {:else}
            <div bind:this={container}>
                <StandardDocumentNode bind:node={$json_ast.root} layerShown={layerShown} isNavColumn="{isNavColumn}"/>
                <!--<StandardDocumentNode uuid={$json_ast.root.uuid} filename={$json_ast.root.node_type.data.filename} children={$json_ast.root.node_type.children} layerShown={layerShown} isNavColumn="{isNavColumn}" />-->
            </div>
        {/if}
    {/if}
</div>

