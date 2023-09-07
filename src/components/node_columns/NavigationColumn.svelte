<script>
    import StandardTreeContainer from "./StandardTreeContainer.svelte";
    import NavColumnDocumentNode from "../nodes/nav_column_nodes/NavColumnDocumentNode.svelte";
    import {json_ast, scrollOnRead} from "../../globals/Variables.ts";
    import {navColumnSize} from "../../globals/Constants";

    function handleScroll() {
        // is being scrolled in navcolumn
        $scrollOnRead = false;
    }
</script>


<div class="flex flex-col min-h-screen h-full" style="width: {navColumnSize}%">
    <StandardTreeContainer on:scrollend={handleScroll}>
        <NavColumnDocumentNode bind:node={$json_ast.root} />
    </StandardTreeContainer>
</div>