<script lang="ts">
    import {graphContainerStore, json_ast} from "../../globals/Variables.ts";
    import GraphExpandableNode from "./GraphExpandableNode.svelte";
    import {onMount} from "svelte";

    let graphContainer: HTMLDivElement;
    let zoom = 1.0;
    let ctrl = false;

    onMount(() => {
        graphContainerStore.set(graphContainer);
    })

    function handleWheel(event) {
        if (ctrl) {
            event.preventDefault();
            console.log("wheel " + zoom + " " + event.deltaY);
            let newZoomDif = zoom * 0.1 * ((event.deltaY > 0) ? -1.0 : 1.0);
            if (newZoomDif + zoom > 0.001 && newZoomDif + zoom < 2.0) {
                zoom += newZoomDif
                graphContainer.style.zoom = zoom;
            }
        }
    }

    function handleKeydown(evt) {
        if (evt.key === "Control") {
            ctrl = true;
        }
    }

    function handleKeyup(evt) {
        if (evt.key === "Control") {
            ctrl = false;
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup}/>

<div bind:this={graphContainer} on:wheel={handleWheel}
     class="w-full h-full overflow-scroll">
    {#if $json_ast !== undefined}
        <GraphExpandableNode bind:node={$json_ast.root}/>
    {/if}
</div>
