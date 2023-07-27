<script lang="ts">
    import "$lib/latex";

    declare const latexjs: any;
    
    export let latex: string = "";
    
    // error handling strategy:
    // try rendering it
    // try rendering it with backslashes escaped
    // fallback: display latex as code
    let html: string;
    try {
        let generator = new latexjs.HtmlGenerator({
            styles: ["css/custom.css"]
        });
        generator = latexjs.parse(latex, {generator});
        const doc = generator.htmlDocument() as Document;
        html = doc.children[0].outerHTML;
    } catch (e) {
        try {
            latex = latex.replaceAll("\\", "\\textbackslash{}");
            let generator = new latexjs.HtmlGenerator({
                styles: ["css/custom.css"]
            });
            generator = latexjs.parse(latex, {generator});
            const doc = generator.htmlDocument() as Document;
            html = doc.children[0].outerHTML;        
        } catch (e) {}
    }

    // iframe takes 150px even if the content is much smaller -> we have to resize it to fit content
    let height = 0;
    function resizeIframe(e: Event) {
        const iframe = e.target as HTMLIFrameElement;
        const iframeWin = iframe.contentWindow;
        height = iframeWin.document.body.scrollHeight;
    }
</script>

<div class="relative">
    {#if html}
        <iframe class="inline-block w-full" title="latex-snippet" sandbox="allow-same-origin allow-scripts" srcdoc="{html}"
                on:load={resizeIframe} height="{height}"></iframe>
        <div class="facade absolute top-0 w-full z-50" style="height: {height}px;"></div>
    {:else}
        <code class="text-[16px]">
            {latex}
        </code>
    {/if}
</div>
