<script>
    import StandardTreeContainer from "./StandardTreeContainer.svelte";
    import StandardDocumentNode from "../standard_nodes/StandardDocumentNode.svelte";
    import {json_ast} from "../../globals/Variables.ts";

</script>

<div class="flex flex-col w-full min-h-screen">
    <StandardTreeContainer>
        <div class="ml-12">
            <StandardDocumentNode bind:node={$json_ast.root} layerShown={0}/>
        </div>
    </StandardTreeContainer>
</div>

