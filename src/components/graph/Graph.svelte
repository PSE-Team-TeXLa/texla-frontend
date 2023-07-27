<script>
    import {json_ast} from "../../globals/Variables.ts";
    import GraphExpandableNode from "./GraphExpandableNode.svelte";
    import GraphSegmentNode from "./GraphSegmentNode.svelte";
</script>

<div class="w-full h-full overflow-scroll flex items-center">
    {#if $json_ast !== undefined}
        <GraphSegmentNode bind:node={$json_ast.root}/>
    {/if}
</div>