<script lang="ts">
    import EditConfirmButton from "../buttons/EditConfirmButton.svelte";
    import {isEditorActive} from "../../globals/Variables";
    import {editNode} from "../../globals/Api";

    export let raw_latex: string;
    export let uuid: bigint;
    export let isEditorOpen: boolean;


    function leaveEditMode() {
        isEditorActive.set(false);
        isEditorOpen = false;

        editNode(uuid, raw_latex);
    }

</script>


<div class="flex flex-col items-end w-full">
    <textarea bind:value={raw_latex} class="p-2 w-full resize-none min-h-[200px] border-lightcyan border-solid border-4"/>
    <div class="flex ">
        <EditConfirmButton on:click={leaveEditMode}>
            <span class="font-bold">C</span>
        </EditConfirmButton>
    </div>
</div>
