<script lang="ts">
    import StandardPopup from "./StandardPopup.svelte";
    import {sendPrepareExport} from "../../globals/Api";
    import {modal} from "../../globals/Variables.ts";
    import type API from "../../globals/socket.api.d.ts";
    import PopUpButtonNegative from "../buttons/PopUpButtonNegative.svelte";
    import PopUpButtonPositive from "../buttons/PopUpButtonPositive.svelte";

    let includeComments = false;
    let includeMetadata = false;

    /**
     * Handles the export of the current project
     */
    const handleExport = () => {
        // export logic goes here
        let stringificationOptions: API.StringificationOptions = {
            include_comments: includeComments,
            include_metadata: includeMetadata
        }
        sendPrepareExport(stringificationOptions);
        handleClose();
    };

    /**
     * Closes the popup
     */
    const handleClose = () => {
        includeComments = false;
        includeMetadata = false;
        modal.set(null);
    };

</script>

<StandardPopup title="Export">
    <p class="mb-4 text-xl">Choose your export settings:</p>
    <div>
        <label class="items-center mb-3 flex cursor-pointer select-none">
            <input type="checkbox" bind:checked={includeComments} class=" mr-2 form-checkbox"/>
            <span class="text-lg  ">Include comments</span>
        </label>
        <label class="items-center mb-4 flex cursor-pointer select-none">
            <input type="checkbox" bind:checked={includeMetadata} class=" mr-2 form-checkbox"/>
            <span class="text-lg ">Include metadata</span>
        </label>
    </div>
    <div class="flex justify-end">
        <PopUpButtonPositive on:click={handleExport} class="mr-4">Export</PopUpButtonPositive>
        <!-- TODO FiX THIS-->
        <PopUpButtonNegative on:click={handleClose}>Cancel</PopUpButtonNegative>
    </div>
</StandardPopup>