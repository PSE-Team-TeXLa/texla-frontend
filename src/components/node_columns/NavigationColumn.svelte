<script>
    import StandardColumn from "./StandardColumn.svelte";
    import UpButton from "../buttons/UpButton.svelte";
    import StandardTreeContainer from "./StandardTreeContainer.svelte";
    import NavColumnDocumentNode from "../standard_nodes/nav_column_nodes/NavColumnDocumentNode.svelte";
    import {json_ast} from "../../globals/Variables.ts";

    export let width;
</script>


<StandardColumn --c-width={width}>
    <div id="container" class="flex flex-col h-full w-full">
        <div class="h-16 flex p-4 pl-10 justify-start items-center bg-lightpurple shadow-blue-400 drop-shadow-sm">
            <UpButton/>
        </div>
        <StandardTreeContainer>
            <NavColumnDocumentNode bind:node={$json_ast.root} layerShown={0}/>
        </StandardTreeContainer>
    </div>
</StandardColumn>