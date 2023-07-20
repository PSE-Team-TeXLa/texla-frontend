<script lang="ts">
    import SidebarContentWrapper from "./SidebarContentWrapper.svelte";
    import SidebarSlot from "./SidebarSlot.svelte";
    import SidebarImage from "./SidebarImage.svelte";
    import SidebarIcon from "./SidebarIcon.svelte";

    import ExportPopup from "../popups/ExportPopup.svelte";
    import ErrorPopup from "../popups/ErrorPopup.svelte";

    import {isFrozen, isGraphActive} from "../../globals/Variables";
    import {modal} from "../../globals/Variables.ts";
    import {bind} from "svelte-simple-modal";
    import {goto} from "$app/navigation";

    import logo from "$lib/assets/logo/logo.svg"
    import export_icon from "$lib/assets/icons/Export.svg"
    import overleaf_icon from "$lib/assets/icons/Overleaflogo.svg"
    import spinner from "$lib/assets/icons/spinner.svg"
    import quit from "$lib/assets/icons/Quit.svg"
    import back from "$lib/assets/icons/Back.svg"
    import graph from "$lib/assets/icons/graph.svg"

    function enterGraphMode() {
        isGraphActive.set(true);
        goto('/graph_view');
        console.log("cool");
    }
    function leaveGraphMode() {
        isGraphActive.set(false);
        goto('/standard_view')
    }

    function openOverleaf() {
        console.log("Overleaf");
    }

    function startExport() {
        modal.set(bind(ExportPopup, {}));
        console.log("Export");
    }

    function quitTexla() {
        close();
        modal.set(bind(ErrorPopup, { message: "It's a modal!" }));
        console.log("QUIT");
    }

</script>

<div class="p-3 w-20 h-full bg-darkpurple flex flex-col items-center justify-between shrink-0" >
    <SidebarContentWrapper>
        <SidebarSlot>
            <SidebarImage on:click={leaveGraphMode} image="{logo}"/>
        </SidebarSlot>
        <SidebarSlot>
            <SidebarIcon popup={ExportPopup} on:click={startExport} icon={export_icon}/>
        </SidebarSlot>
        <SidebarSlot>
            <SidebarIcon on:click={openOverleaf} icon={overleaf_icon}/>
        </SidebarSlot>
    </SidebarContentWrapper>
    <SidebarContentWrapper>
        {#if $isFrozen}
            <SidebarSlot spin={true}>
                <SidebarIcon icon={spinner}/>
            </SidebarSlot>
        {/if}
        <SidebarSlot>
            {#if !$isGraphActive}
            <SidebarIcon on:click={enterGraphMode} icon={graph}/>
            {:else}
            <SidebarIcon on:click={leaveGraphMode} icon={back}/>
            {/if}
        </SidebarSlot>
        <SidebarSlot>
            <SidebarIcon on:click={quitTexla} icon={quit}/>
        </SidebarSlot>
    </SidebarContentWrapper>
</div>
