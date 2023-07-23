<script lang="ts">
    import {writable} from "svelte/store";
    let includeComments = writable(false);
    let includeMetaData = writable(false);
    let isOpen = false;

    function enterExportPopup() {
        isOpen = true;
        console.log("works?")
    }

    function handleCancel() {
        isOpen = false;
    }

    function handleExport() {
        // TODO handle export
    }


</script>

<button on:click={enterExportPopup()}
        class="bg-blue-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Export
</button>









<div class="h-20 w-96">
    EXPORT POPOPOPOPO
</div>