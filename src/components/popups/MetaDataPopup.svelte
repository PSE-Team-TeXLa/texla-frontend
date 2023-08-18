<script lang="ts">
    import StandardPopup from "./StandardPopup.svelte";
    import type API from "../../globals/socket.api.d.ts";
    import {editMetadata} from "../../globals/Api";
    import {meta_data_items} from "../../globals/Constants";
    import {modal} from "../../globals/Variables";
    import PopUpConfirm from "../buttons/PopUpConfirm.svelte";

    export let meta_data: API.Metadata;
    export let uuid: API.Uuid;

    function onConfirm() {
        editMetadata(uuid, meta_data);
        modal.set(null);
    }

</script>

<StandardPopup title="Metadata">
    <div class="grid grid-cols-2 gap-4 p-4 center" style="grid-template-columns: min-content auto">

        {#each meta_data_items as key}
            <span class="font-bold text-lg my-auto">{key}</span>
            <input class="ml-4 border-lightpurple border-2 p-2 w-full" type="text" bind:value={meta_data[key]}
                   placeholder={key}/>
        {/each}
    </div>
    <PopUpConfirm on:click={onConfirm}>Confirm</PopUpConfirm>
</StandardPopup>