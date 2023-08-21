<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import Icon from "../rendering/Icon.svelte";
    import {faPlus} from "@fortawesome/free-solid-svg-icons";
    import resolveConfig from 'tailwindcss/resolveConfig'
    import tailwindConfig from './../../../tailwind.config.js'

    const fullConfig = resolveConfig(tailwindConfig)
    let dispatcher = createEventDispatcher();

    /**
     * Handle click event
     */
    function handleClick() {
        dispatcher('click', {});
    }
</script>


<div class="w-fit">
    <div on:keypress role="button" tabindex="0" on:click={handleClick}
         class="cursor-pointer opacity-50 hover:opacity-100 border-2 border-targetElement w-4 h-4 flex justify-center items-center">
        <Icon icon={faPlus} color={fullConfig.theme.colors.red} />
    </div>
</div>