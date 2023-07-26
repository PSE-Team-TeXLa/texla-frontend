<script lang="ts">
    import {json_ast} from "../../globals/Variables";
</script>

<div class="snap-proximity snap-y h-full w-full p-4 mt-2 overflow-scroll overflow-x-hidden">
    {#if $json_ast !== undefined}
        <slot/>
    {/if}
</div>

