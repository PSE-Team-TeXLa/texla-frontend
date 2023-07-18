<script>
    import "../app.css";
    import Sidebar from "../components/sidebar/Sidebar.svelte";
    import "../globals/Api"


    import {overrideItemIdKeyNameBeforeInitialisingDndZones} from "svelte-dnd-action";
    overrideItemIdKeyNameBeforeInitialisingDndZones("uuid");
</script>


<div class="w-screen h-screen flex flex-row">
    <Sidebar />
    <slot />
</div>

