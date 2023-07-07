<script>
    import StandardColumn from "./StandardColumn.svelte";
    import StandardDocumentNode from "./TreeContainer.svelte";

    export let width;
</script>

<StandardColumn --bgcolor="cyan" --c-width={width} >
    <StandardDocumentNode buttonsOnly={false} />
</StandardColumn>
