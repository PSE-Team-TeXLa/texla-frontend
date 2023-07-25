<script>
    import CreateElementButton from "../buttons/CreateElementButton.svelte";
</script>

<div id="bar-container" class="h-2 w-[90%] items-center">
    <div class="w-full hidden flex-row items-center">
        <div class="w-full mr-2 border-b-2 border-red border-dashed"></div>
        <CreateElementButton>+</CreateElementButton>
        <div class="w-full ml-2 border-b-2 border-red border-dashed"></div>
    </div>
</div>

<style>
    #bar-container:hover > div {
        display: flex !important;
    }
</style>
