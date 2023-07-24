<script>
  export let title
</script>


<div class="flex flex-col">
  <h2 class="text-xl font-semibold mb-2">{title}</h2>

  <div>
    <slot/>
  </div>
</div>