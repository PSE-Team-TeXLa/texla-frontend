<script lang="ts">
    import {Fa} from "svelte-fa";

    export let icon;
    export let color = "#abcdef";
    export let scale = 1.0;
</script>

<Fa icon={icon} color={color} scale={scale} class="{$$props.class}"/>