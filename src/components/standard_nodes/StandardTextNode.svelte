<script>
    export let text;

    export let showLeaves;
</script>

{#if showLeaves}
<div class="pl-2">
    <span>TEXT {text}</span>
</div>

    {/if}
