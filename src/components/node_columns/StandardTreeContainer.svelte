<script lang="ts">
    import {ast} from "../../globals/Ast.ts";
    import {onMount} from "svelte";
    import StandardDocumentNode from "../standard_nodes/StandardDocumentNode.svelte";

    export let isNavColumn: boolean;


    let layerShown = 0;

    let container;

    onMount(async () => {
        if (!isNavColumn)
            container.style.marginLeft = "2em";
    });

</script>

<div class="snap-proximity snap-y h-full w-full p-10 overflow-scroll overflow-x-hidden">

    {#if isNavColumn}
            <StandardDocumentNode uuid={ast.component.uuid} heading={ast.component.heading} layerShown={layerShown} isNavColumn="{isNavColumn}" children={ast.component.children}/>
    {:else}
        <div bind:this={container}>
            <StandardDocumentNode uuid={ast.component.uuid} heading={ast.component.heading} layerShown={layerShown} isNavColumn="{isNavColumn}" children={ast.component.children}/>
        </div>
    {/if}
</div>

