<script>
    import StandardTreeContainer from "./StandardTreeContainer.svelte";
    import StandardDocumentNode from "../nodes/standard_nodes/StandardDocumentNode.svelte";
    import {json_ast, lastNodeInView, scrollOnRead} from "../../globals/Variables.ts";
    import {readColumnSize, scrollToNodeNav} from "../../globals/Constants";

    function handleScroll() {
        // is being scrolled in read column
        $scrollOnRead = true;
        // every time the scroll stops jump to current node
        scrollToNodeNav($lastNodeInView);
    }
</script>

<div class="flex flex-col min-h-screen" style="width: {readColumnSize}%">
    <StandardTreeContainer on:scrollend={handleScroll}>
        <div class="mb-20">
            <StandardDocumentNode bind:node={$json_ast.root}/>
        </div>
    </StandardTreeContainer>
</div>

