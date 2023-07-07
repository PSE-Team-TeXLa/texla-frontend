<script>
    export let text;

    export let isNavColumn;


</script>

{#if !isNavColumn}
<div id="text-box" class="pl-4">
    <span>TEXT {text}</span>
</div>

    {/if}


