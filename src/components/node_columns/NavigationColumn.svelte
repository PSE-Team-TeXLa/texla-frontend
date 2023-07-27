<script>
    import UpButton from "../buttons/UpButton.svelte";
    import StandardTreeContainer from "./StandardTreeContainer.svelte";
    import NavColumnDocumentNode from "../standard_nodes/nav_column_nodes/NavColumnDocumentNode.svelte";
    import {json_ast} from "../../globals/Variables.ts";
</script>


<div class="flex flex-col min-h-screen h-full w-[30%]">
    <UpButton/>
    <StandardTreeContainer>
        <NavColumnDocumentNode bind:node={$json_ast.root} layerShown={0}/>
    </StandardTreeContainer>
</div>