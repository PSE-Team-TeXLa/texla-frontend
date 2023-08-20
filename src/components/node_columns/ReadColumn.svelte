<script>
    import StandardTreeContainer from "./StandardTreeContainer.svelte";
    import StandardDocumentNode from "../standard_nodes/StandardDocumentNode.svelte";
    import {json_ast, lastNodeInView, scrollOnRead} from "../../globals/Variables.ts";
    import {scrollToNodeNav} from "../../globals/Constants.ts";

    function handleScroll() {
        $scrollOnRead = true;
        scrollToNodeNav($lastNodeInView);
    }
</script>

<div class="flex flex-col w-[70%] min-h-screen">
    <StandardTreeContainer on:scrollend={handleScroll}>
        <div class="">
            <StandardDocumentNode bind:node={$json_ast.root} layerShown={0}/>
        </div>
    </StandardTreeContainer>
</div>

