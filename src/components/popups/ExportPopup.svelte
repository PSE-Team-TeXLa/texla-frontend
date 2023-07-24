<script lang="ts">
    let includeComments = false;
    let includeMetadata = false;

    const handleExport = () => {
        // export logic goes here
        console.log("hmm");
    };
</script>

<div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md z-50">
    <h2 class="text-xl font-semibold mb-2">Export</h2>
    <p class="mb-4">Choose your export settings</p>

    <label class="inline-flex items-center mb-3">
        <input type="checkbox" bind:checked={includeComments} class="mr-2 form-checkbox" />
        <span>Include comments</span>
    </label>
    <label class="inline-flex items-center mb-4">
        <input type="checkbox" bind:checked={includeMetadata} class="mr-2 form-checkbox" />
        <span>Include metadata</span>
    </label>

    <div class="flex justify-end">
        <button on:click={() => (includeComments = includeMetadata = false)} class="bg-red-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
        <button on:click={handleExport} class="bg-green-500 text-white px-4 py-2 rounded">Export</button>
    </div>
</div>