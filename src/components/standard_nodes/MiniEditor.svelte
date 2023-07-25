<script lang="ts">
    import EditConfirmButton from "../buttons/EditConfirmButton.svelte";
    import type monaco from 'monaco-editor';
    import {createEventDispatcher, onMount} from 'svelte';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
    import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
    import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

    export let raw_latex: string;


    let divEl: HTMLDivElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco;


    onMount(async () => {
        // @ts-ignore
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                if (label === 'json') {
                    return new jsonWorker();
                }
                if (label === 'css' || label === 'scss' || label === 'less') {
                    return new cssWorker();
                }
                if (label === 'html' || label === 'handlebars' || label === 'razor') {
                    return new htmlWorker();
                }
                if (label === 'typescript' || label === 'javascript') {
                    return new tsWorker();
                }
                return new editorWorker();
            }
        };

        Monaco = await import('monaco-editor');
        editor = Monaco.editor.create(divEl, {
            value: raw_latex,
            language: 'latex'
        });

        return () => {
            editor.dispose();
        };
    });

    let dispatcher = createEventDispatcher();

    function handleConfirm() {
        let new_latex = editor.getValue();
        console.log(new_latex)
        dispatcher('confirm', {
            new_latex
        });
    }

</script>


<div class="flex flex-col items-end w-full">
    <!--<textarea bind:value={node.raw_latex} class="p-2 w-full resize-none min-h-[200px] border-lightcyan border-solid border-4"/>-->
    <div bind:this={divEl} class="h-[300px] w-full mt-4 border-lightcyan border-2"/>
    <div class="flex">
        <EditConfirmButton on:click={handleConfirm}>
            <span class="font-bold">C</span>
        </EditConfirmButton>
    </div>
</div>
