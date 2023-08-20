<script>
    import StandardTreeContainer from "./StandardTreeContainer.svelte";
    import NavColumnDocumentNode from "../standard_nodes/nav_column_nodes/NavColumnDocumentNode.svelte";
    import {json_ast, scrollOnRead} from "../../globals/Variables.ts";

    function handleScroll() {
        $scrollOnRead = false;
    }
</script>


<div class="flex flex-col min-h-screen h-full w-[30%]">

    <StandardTreeContainer on:scrollend={handleScroll}>
        <NavColumnDocumentNode bind:node={$json_ast.root} layerShown={0}/>
    </StandardTreeContainer>
</div>