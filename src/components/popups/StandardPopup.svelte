<script>
    export let title
</script>


<div class="relative z-[9999] flex flex-col">
    <h2 class="text-2xl font-bold mb-2">{title}</h2>
    <div>
        <slot/>
    </div>
</div>