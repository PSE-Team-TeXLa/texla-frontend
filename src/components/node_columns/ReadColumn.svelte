<script>
    import StandardColumn from "./StandardColumn.svelte";
    import StandardTreeContainer from "./StandardTreeContainer.svelte";

    export let width;
</script>

<StandardColumn --c-width={width} >
    <StandardTreeContainer isNavColumn={false} />
</StandardColumn>
