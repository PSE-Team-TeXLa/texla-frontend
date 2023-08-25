<script lang="ts">
    import type API from "../../globals/socket.api";
    import {scrollToNode} from "../../globals/Constants";
    import {isExpandedMap} from "../../globals/Variables";

    export let uuid: API.Uuid = 0;

    $: expandChangeCurrent = $isExpandedMap.get(uuid);

    /**
     * Handle click
     */
    function handleClick() {
        scrollToNode(uuid);
    }
</script>

<div on:keypress role="button" tabindex="0" on:click={handleClick}
     class="cursor-pointer flex justify-start items-center">
    <div class="flex w-[90%] max-w-[400px] h-full p-2 pl-8 {$$props.class} overflow-hidden"
         style="opacity: {$expandChangeCurrent ? '1' : '0.5'}">
        <slot/>
    </div>
</div>

