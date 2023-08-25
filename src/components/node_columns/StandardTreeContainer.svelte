<script lang="ts">
    import {debounceRepeated, scrollBaseIntensity, scrollEdgeSize, scrollFrequency} from "../../globals/Constants";
    import {dragging, json_ast} from "../../globals/Variables";

    let scrollContainer;

    function autoScroll(event) {
        if (!$dragging) return;

        const mouseY = event.clientY;
        const viewportH = document.documentElement.clientHeight;

        let direction = 0, edgeDistance = 0, isAtEnd = false;
        if (mouseY < scrollEdgeSize) {
            direction = -1;
            edgeDistance = mouseY;
            isAtEnd = scrollContainer.scrollY > 0;
        }
        if (mouseY > viewportH - scrollEdgeSize) {
            direction = 1;
            edgeDistance = viewportH - mouseY;
            isAtEnd = scrollContainer.scrollY < scrollContainer.scrollHeight - scrollContainer.clientHeight;
        }

        if (!direction || isAtEnd) return;

        const edgeProximity = ((scrollEdgeSize - edgeDistance) / scrollEdgeSize) ** 2;
        const scrollDistance = direction * scrollBaseIntensity * edgeProximity;
        scrollContainer.scrollBy({top: scrollDistance, left: 0, behavior: "instant"});

        setTimeout(() => {
            debouncedAutoScroll(event);
        }, 0);
    }

    const debouncedAutoScroll = debounceRepeated(autoScroll, scrollFrequency);

</script>

<div on:keypress role="button" tabindex="0" on:scrollend on:mousemove={debouncedAutoScroll} bind:this={scrollContainer}
     class="snap-proximity snap-y h-full w-full p-4 overflow-scroll overflow-x-hidden">
    {#if $json_ast !== undefined}
        <slot/>
    {/if}
</div>

