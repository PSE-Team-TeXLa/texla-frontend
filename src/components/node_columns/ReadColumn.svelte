<script>
    import StandardColumn from "./StandardColumn.svelte";
    import StandardTreeContainer from "./StandardTreeContainer.svelte";

    export let width;
</script>

<StandardColumn --bgcolor="cyan" --c-width={width} >
    <StandardTreeContainer isNavColumn={false} />
</StandardColumn>
