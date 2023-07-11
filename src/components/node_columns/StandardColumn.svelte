<script>

</script>

<div class="container flex flex-col min-h-screen" >
    <slot />
</div>

<style>
    div {
        width: var(--c-width);
        background-color: var(--bgcolor);
        transition: width;
        transition-duration: 0.08s;
        transition-timing-function: ease-out;
    }
</style>

