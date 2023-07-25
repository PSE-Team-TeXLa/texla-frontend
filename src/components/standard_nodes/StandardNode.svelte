<script lang="ts">
    import EditButton from "../buttons/EditButton.svelte";
    import {isEditorActive, scrollMap} from "../../globals/Variables";

    export let uuid;
    export let isEditorOpen: boolean;

    import {onMount} from "svelte";
    import DeleteButton from "../buttons/DeleteButton.svelte";
    import {deleteNode} from "../../globals/Api";

    function enterEditMode() {
        if ($isEditorActive) {
            console.log("Editor already open");
        } else {
            $isEditorActive = true;
            isEditorOpen = true;

            let target: HTMLElement = $scrollMap.get(uuid);
            target.scrollIntoView({behavior: "smooth"});
        }

    }

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
    })

    function handleDelete() {
        deleteNode(uuid);
    }
</script>

<div bind:this={node} id="text-container" on:mouseenter={mouseEnter} on:mouseleave={mouseLeave} class="flex flex-col relative">
    <slot/>
    <div class="absolute left-[-40px] top-[-4px]">
        {#if isHovered}
            <div class="w-[60px] h-[60px]">
                <EditButton on:click={enterEditMode}>
                    E
                </EditButton>
                <DeleteButton on:click={handleDelete}>
                    X
                </DeleteButton>
            </div>
        {/if}
    </div>
</div>

<style>
    #text-container:hover {
        outline: 3px dashed theme('colors.red');
        outline-offset: -2px;
    }
</style>