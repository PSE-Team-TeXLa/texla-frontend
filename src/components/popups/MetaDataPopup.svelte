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
    //TODO Popup mit api verbinden, input für Notizen // write Feld mit aktuellen verkürzungen.
</script>

<StandardPopup title="Metadata">
    Metadaten
</StandardPopup>