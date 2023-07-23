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


<!-- Here's your popup -->
{#if isOpen}
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h2 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Export</h2>
                    <p>Choose your export settings</p>

                    <div class="mt-2">
                        <label class="flex items-center">
                            <input type="checkbox" bind:checked={$includeComments} class="form-checkbox h-5 w-5 text-blue-600" />
                            <span class="ml-2 text-gray-700">Include Comments</span>
                        </label>
                        <label class="flex items-center mt-2">
                            <input type="checkbox" bind:checked={$includeMetaData} class="form-checkbox h-5 w-5 text-blue-600" />
                            <span class="ml-2 text-gray-700">Include Meta Data</span>
                        </label>
                    </div>
                </div>

                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button on:click={handleExport} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                        Export
                    </button>
                    <button on:click={handleCancel} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}