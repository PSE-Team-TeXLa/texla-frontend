<script>
    import "../app.css";
    import Sidebar from "../components/sidebar/Sidebar.svelte";
    import "../globals/Api"
</script>


<div class="w-screen h-screen flex flex-row">
    <Sidebar />
    <slot />
</div>

