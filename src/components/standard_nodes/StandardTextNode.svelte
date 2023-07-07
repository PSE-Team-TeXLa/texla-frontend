<script lang="ts">
    export let text: string;

    export let isNavColumn: boolean;
</script>

{#if !isNavColumn}
<div class="pl-4">
    <span>TEXT {text}</span>
</div>

    {/if}
