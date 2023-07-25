<script lang="ts">
    export let spin = false;

</script>

{#if spin}
    <div class="flex justify-center w-full py-2 spin-it">
        <slot/>
    </div>
{:else}
    <div class="flex justify-center w-full py-2">
        <slot/>
    </div>
{/if}


<style>
    .spin-it {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
