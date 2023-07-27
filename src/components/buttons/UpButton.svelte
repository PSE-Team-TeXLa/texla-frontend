<script>
    import {currentLayer} from "../../globals/Variables.ts";
    import Button from "./Button.svelte";

    function upLayer() {
        if ($currentLayer > 1)
            currentLayer.update((n) => n - 1)
    }
</script>
<Button>
    <div on:click={upLayer}
         class="cursor-pointer h-16 flex p-4 pl-10 justify-start items-center bg-lightpurple shadow-blue-400 drop-shadow-sm w-full">
        <span class="text-lg font-bold">Up</span>
    </div>
</Button>
