<script lang="ts">
    import StandardPopup from "./StandardPopup.svelte";
    import type API from "../../globals/socket.api.d.ts";


    export let meta_data: API.Metadata;

    function addMetaData() {
        ;
    }
</script>

<StandardPopup title="Metadata">
    Metadaten
</StandardPopup>