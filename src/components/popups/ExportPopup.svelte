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
        class="bg-blue-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
</button>

{#if isOpen}
    <div class="fixed bg-white p-3 rounded shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Export</h2>
        <p>Choose your export settings</p>

        <label class="block mt-2">
            <input type="checkbox" bind:checked={includeComments} class="mr-2" /> Include Comments
        </label>
        <label class="block mt-2">
            <input type="checkbox" bind:checked={includeMetaData} class="mr-2" /> Include Meta Data
        </label>

        <div class="mt-2">
            <button on:click={() => (isOpen = false)} class="bg-red-500 text-white px-2 py-1 rounded mr-2">Cancel</button>
            <button on:click={handleExport} class="bg-green-500 text-white px-2 py-1 rounded mr-2">Export</button>
        </div>
    </div>
{/if}