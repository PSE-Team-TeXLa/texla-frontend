<script lang="ts">
    import EditButton from "../buttons/EditButton.svelte";
    import {isEditorActive, scrollMap} from "../../globals/Variables";

    export let uuid;

    import {dndzone} from "svelte-dnd-action";
    import {onMount} from "svelte";

    let items = [
        {
            id:1,
            title: "Post1"
        }
    ]
    function enterEditMode() {

        if ($isEditorActive) {
            console.log("Editor already open");
        } else {
            $isEditorActive = true;
            isEditorOpen = true;
        }

    }

    export let isEditorOpen: boolean;

    let isHovered = false;

    function mouseEnter() {
        isHovered = true;
    }

    function mouseLeave() {
        isHovered = false;
    }

    let node;
    onMount(async () => {
        scrollMap.update((o) => o.set(uuid, node))
        console.log($scrollMap);
    })
</script>

<div bind:this={node} id="text-container" on:mouseenter={mouseEnter} on:mouseleave={mouseLeave} class="flex flex-col relative my-4">
    {uuid} <slot/>
    <div class="absolute left-[-40px] top-[-4px]">
        {#if isHovered}
            <div class="w-[60px] h-[60px]">
                <EditButton on:click={enterEditMode}>
                    E
                </EditButton>
            </div>
        {/if}
    </div>
</div>

<style>
    #text-container:hover {
        outline: 3px dashed theme('colors.red');
        outline-offset: 2px;
    }
</style>