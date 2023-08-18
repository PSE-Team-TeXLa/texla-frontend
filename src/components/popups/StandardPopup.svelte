<script>
    export let title
</script>


<div class="flex flex-col">
    <h2 class="text-2xl font-bold mb-2">{title}</h2>

    <div>
        <slot/>
    </div>
</div>