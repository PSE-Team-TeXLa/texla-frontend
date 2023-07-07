<script>
    import StandardColumn from "./StandardColumn.svelte";

    export let width;
</script>

<StandardColumn --bgcolor="blue" --c-width={width} >
    <slot />
</StandardColumn>
