<script lang="ts">
    import StandardPopup from "./StandardPopup.svelte";
    import type API from "../../globals/socket.api.d.ts";


    export let meta_data: API.Metadata;

    function addMetaData() {
        ;
    }
    //TODO Popup mit api verbinden, input für Notizen // write Feld mit aktuellen verkürzungen.
</script>

<StandardPopup title="Metadata">
    Metadaten
</StandardPopup>