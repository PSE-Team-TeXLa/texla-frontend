<script>
    import StandardTreeContainer from "./StandardTreeContainer.svelte";
    import StandardDocumentNode from "../standard_nodes/StandardDocumentNode.svelte";
    import {json_ast, lastNodeInView, scrollOnRead} from "../../globals/Variables.ts";
    import {readColumnSize, scrollToNodeNav} from "../../globals/Constants.ts";

    function handleScroll() {
        // is being scolled in readcolumn
        $scrollOnRead = true;
        // every time the scroll stops jump to current node
        scrollToNodeNav($lastNodeInView);
    }
</script>

<div class="flex flex-col min-h-screen" style="width: {readColumnSize}%">
    <StandardTreeContainer on:scrollend={handleScroll}>
        <div class="">
            <StandardDocumentNode bind:node={$json_ast.root} layerShown={0}/>
        </div>
    </StandardTreeContainer>
</div>

