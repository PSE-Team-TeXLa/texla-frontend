<script>
    import StandardColumn from "./StandardColumn.svelte";
    import UpButton from "../buttons/UpButton.svelte";
    import StandardTreeContainer from "./StandardTreeContainer.svelte";

    export let width;
</script>


<StandardColumn --c-width={width}>
    <div class="h-16 flex p-4 pl-10 justify-start items-center bg-lightpurple shadow-blue-400 drop-shadow-sm">
        <UpButton />
    </div>
    <StandardTreeContainer isNavColumn={true}/>
</StandardColumn>