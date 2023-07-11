<script>

</script>

<div class="container flex flex-col min-h-screen bg-verylightcyan" >
    <slot />
</div>

<style>
    div {
        width: var(--c-width);
        transition: width;
        transition-duration: 0.08s;
        transition-timing-function: ease-out;
    }
</style>

