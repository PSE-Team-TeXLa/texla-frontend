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


<div class="flex flex-col">
    <textarea bind:value={raw_latex} class="resize-none"/>
    <div class="flex justify-end flex-row">
        <div>
            <EditConfirmButton on:click={leaveEditMode}>
                C
            </EditConfirmButton>
        </div>
    </div>
</div>
