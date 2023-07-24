<script>
    import StandardPopup from "./StandardPopup.svelte";
    export let message
    import {modal} from "../../globals/Variables.ts";

    const handleClose = () => {
        modal.set(null);
    };
</script>



<StandardPopup title="Error">

    <div class="text-red">
        <p> {message} </p>
    </div>

    <div class="flex justify-end">
        <button on:click={handleClose} class="bg-red text-white px-4 py-2 rounded mr-2">Understood</button>
    </div>

</StandardPopup>