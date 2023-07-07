<script>
    import ReadColumn from "../../components/node_columns/ReadColumn.svelte";
    import NavigationColumn from "../../components/node_columns/NavigationColumn.svelte";
    import {isEditorActive} from "../../globals/Variables.ts";
    import {nonEditorStandardReadSize, editorStandardNavSize} from "../../globals/Constants.ts";

    $: navColumnSize = $isEditorActive ? editorStandardNavSize : nonEditorStandardReadSize;

</script>

<div class="flex flex-row w-full h-full">
    <NavigationColumn width={`${navColumnSize}%`} />
    <ReadColumn width="{`${100-navColumnSize}%`}" />
</div>
