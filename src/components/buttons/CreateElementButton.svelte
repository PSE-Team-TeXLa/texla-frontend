<script>
import Button from "./Button.svelte";
</script>


<div class="w-fit">
    <Button>
        <div class="red-button hover:border-none hover:bg-red hover:text-white border-2 border-red w-3 h-3 flex text-[16px] justify-center items-center text-red font-bold">
            <slot/>
        </div>
    </Button>
</div>