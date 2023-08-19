<script>
    import StandardTreeContainer from "./StandardTreeContainer.svelte";
    import StandardDocumentNode from "../standard_nodes/StandardDocumentNode.svelte";
    import {json_ast} from "../../globals/Variables.ts";

</script>

<div class="flex flex-col w-[70%] min-h-screen">
    <StandardTreeContainer>
        <div class="">
            <StandardDocumentNode bind:node={$json_ast.root} layerShown={0}/>
        </div>
    </StandardTreeContainer>
</div>

