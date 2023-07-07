<script>
    import { currentNavLayer } from "../../globals/Variables.ts";

    function upLayer() {
        if ($currentNavLayer > 0)
            currentNavLayer.update((n) => n - 1)
    }
</script>

<button on:click={upLayer}>Up</button>