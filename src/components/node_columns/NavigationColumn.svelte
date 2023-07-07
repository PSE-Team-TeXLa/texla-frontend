<script>
    import StandardColumn from "./StandardColumn.svelte";

    export let width;
</script>


<StandardColumn --bgcolor="green" --c-width={width}>
    <slot />
</StandardColumn>