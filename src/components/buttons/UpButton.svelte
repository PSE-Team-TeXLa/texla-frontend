<script>
    import { currentLayer } from "../../globals/Variables.ts";

    function upLayer() {
        if ($currentLayer > 1)
            currentLayer.update((n) => n - 1)
    }
</script>

<button on:click={upLayer}>Up</button>