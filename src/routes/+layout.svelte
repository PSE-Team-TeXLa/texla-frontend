<script>
    import "../app.css";
    import Sidebar from "../components/sidebar/Sidebar.svelte";
    import "../globals/Api"
    import Modal from 'svelte-simple-modal';
    import {modal} from "../globals/Variables.ts"

    import {overrideItemIdKeyNameBeforeInitialisingDndZones} from "svelte-dnd-action";

    overrideItemIdKeyNameBeforeInitialisingDndZones("uuid");


</script>

<Modal transitionBgProps={{duration: 30}} closeButton={false} show={$modal}/>

<div class="w-screen h-screen flex flex-row">
    <Sidebar/>
    <slot/>
</div>

