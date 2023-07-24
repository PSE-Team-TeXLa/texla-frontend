<script lang="ts">
    import StandardPopup from "./StandardPopup.svelte";
    import {sendPrepareExport} from "../../globals/Api";
    import type API from "../../globals/socket.api.d.ts";

    let includeComments = false;
    let includeMetadata = false;

    const handleExport = () => {
        // export logic goes here
        let stringificationOptions: API.StringificationOptions =  {
            include_comments: includeComments,
            include_metadata: includeMetadata
        }
        sendPrepareExport(stringificationOptions);
    };
</script>

<StandardPopup title="Export">

    <p class="mb-4">Choose your export settings</p>

    <label class="items-center mb-3 flex">
        <input type="checkbox" bind:checked={includeComments} class="mr-2 form-checkbox" />
        <span>Include comments</span>
    </label>
    <label class="items-center mb-4 flex">
        <input type="checkbox" bind:checked={includeMetadata} class="mr-2 form-checkbox" />
        <span>Include metadata</span>
    </label>

    <div class="flex justify-end">
        <button on:click={() => (includeComments = includeMetadata = false)} class="bg-red text-white px-4 py-2 rounded mr-2">Cancel</button>
        <button on:click={handleExport} class="bg-darkcyan px-4 py-2 rounded">Export</button>
    </div>
</StandardPopup>