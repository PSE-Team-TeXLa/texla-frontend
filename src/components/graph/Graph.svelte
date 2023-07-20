<script>
    import {json_ast} from "../../globals/Variables.ts";
    import GraphExpandableNode from "./GraphExpandableNode.svelte";
</script>

<div class="bg-lightcyan w-full h-full overflow-scroll flex items-center">
    {#if $json_ast !== undefined}
        <GraphExpandableNode bind:node={$json_ast.root}/>
    {/if}
</div>