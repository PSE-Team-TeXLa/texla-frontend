<script lang="ts">
    export let title: string;
</script>

<div class="relative z-[9999] flex flex-col">
    <h2 class="text-2xl font-bold mb-8 border-b-4 border-darkpurple">{title}</h2>
    <div class="flex flex-col gap-4">
        <slot/>
    </div>
</div>