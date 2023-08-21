<script lang="ts">
    import SidebarContentWrapper from "./SidebarContentWrapper.svelte";
    import SidebarSlot from "./SidebarSlot.svelte";
    import SidebarImage from "./SidebarImage.svelte";
    import SidebarIcon from "./SidebarIcon.svelte";
    import ExportPopup from "../popups/ExportPopup.svelte";
    import {isFrozen, isGraphActive, remoteUrl} from "../../globals/Variables";
    import {modal} from "../../globals/Variables.ts";
    import {bind} from "svelte-simple-modal";
    import {goto} from "$app/navigation";
    import logo from "$lib/assets/logo/logo.svg"
    import overleaf_icon from "$lib/assets/icons/Overleaflogo.svg"
    import {faFileExport} from '@fortawesome/free-solid-svg-icons'
    import {faSync} from '@fortawesome/free-solid-svg-icons'
    import {faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
    import {faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";
    import {faDoorOpen} from "@fortawesome/free-solid-svg-icons";
    import {sendQuit} from "../../globals/Api.ts"

    /**
     * Enter the graph mode
     */
    function enterGraphMode() {
        goto('/graph_view');
    }

    /**
     * Leave the graph mode
     */
    function leaveGraphMode() {
        goto('/standard_view')
    }

    /**
     * Open the remote repository in a new tab
     */
    function openOverleaf() {
        console.log("Overleaf");
        const url = $remoteUrl;
        if (url === null) {
            alert("no well-known remote repository hoster connected");
        } else {
            open(url, "_blank");
        }
    }

    /**
     * Open the export Popup
     */
    function startExport() {
        modal.set(bind(ExportPopup, {}));
        console.log("Export");
    }

    /**
     * Reload the page
     */
    function reloadPage() {
        window.location.replace(".");
    }

</script>

<div class="p-3 w-16 h-full bg-darkpurple flex flex-col items-center justify-between shrink-0">
    <SidebarContentWrapper>
        <SidebarSlot>
            <SidebarImage on:click={reloadPage} image="{logo}" isBigger={true}/>
        </SidebarSlot>
        <SidebarSlot>
            <SidebarIcon on:click={startExport} icon={faFileExport}/>
        </SidebarSlot>
        <SidebarSlot>
            <SidebarImage on:click={openOverleaf} image={overleaf_icon}/>
        </SidebarSlot>
    </SidebarContentWrapper>
    <SidebarContentWrapper>
        {#if $isFrozen}
            <SidebarSlot spin={true}>
                <SidebarIcon icon={faSync}/>
            </SidebarSlot>
        {/if}
        <SidebarSlot>
            {#if !$isGraphActive}
                <SidebarIcon on:click={enterGraphMode} icon={faProjectDiagram}/>
            {:else}
                <SidebarIcon on:click={leaveGraphMode} icon={faArrowAltCircleLeft}/>
            {/if}
        </SidebarSlot>
        <SidebarSlot>
            <SidebarIcon on:click={sendQuit} icon={faDoorOpen}/>
        </SidebarSlot>
    </SidebarContentWrapper>
</div>
