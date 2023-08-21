<script>
    import StandardPopup from "./StandardPopup.svelte";
    import {modal} from "../../globals/Variables.ts";
    import PopUpButtonNegative from "../buttons/PopUpButtonNegative.svelte";

    export let message

    /**
     * Closes the popup
     */
    const handleClose = () => {
        modal.set(null);
    };
</script>

<StandardPopup title="Error">
    <div class="text-red">
        <p class="text-lg"> {message} </p>
    </div>
    <div class="flex justify-end">
        <PopUpButtonNegative on:click={handleClose} class="bg-red">Understood</PopUpButtonNegative>
    </div>
</StandardPopup>