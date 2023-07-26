<script>
    import StandardColumn from "./StandardColumn.svelte";
    import StandardTreeContainer from "./StandardTreeContainer.svelte";
    import StandardDocumentNode from "../standard_nodes/StandardDocumentNode.svelte";
    import {json_ast} from "../../globals/Variables.ts";

    export let width;
</script>

<StandardColumn --c-width={width}>
    <StandardTreeContainer>
        <div class="ml-12">
            <StandardDocumentNode bind:node={$json_ast.root} layerShown={0} isNavColumn="{false}"/>
        </div>
    </StandardTreeContainer>
</StandardColumn>
