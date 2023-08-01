<script lang="ts">
    import {sendActive} from "../../globals/Api";
    import EditConfirmButton from "../buttons/EditConfirmButton.svelte";
    import type monaco from 'monaco-editor';
    import {createEventDispatcher, onMount} from 'svelte';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
    import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
    import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
    import check_icon from "$lib/assets/icons/checkicon.svg";

    export let raw_latex: string;


    let divEl: HTMLDivElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco;


    onMount(async () => {
        sendActive();
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
            language: 'latex',
            minimap: {
                enabled: false
            },
            lineNumbers: "off",
            glyphMargin: false,
            folding: false,
            // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0
        });

        const isCursorAtFront = editor.createContextKey('isCursorAtFront', false);

        editor.onDidChangeCursorPosition(e => {
            const position = e.position;
            if (position.column === 1 && position.lineNumber === 1) {
                isCursorAtFront.set(true);
            } else {
                isCursorAtFront.set(false);
            }
        });

        editor.addCommand(Monaco.KeyCode.Backspace,
            (e) => {
                console.log("merge");
                editor.dispose();
                dispatcher('mergeincoming', {});
            }, 'isCursorAtFront');

        editor.addCommand(Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.Enter,
            (e) => {
                console.log("confirm");
                handleConfirm()
            });


        return () => {
            editor.dispose();
            // TODO: send noop to backend (to end the active state)
        };
    });

    let dispatcher = createEventDispatcher();

    function handleConfirm() {
        let new_latex = editor.getValue();
        editor.dispose();
        dispatcher('confirm', {
            new_latex
        });
    }

</script>


<div class="flex flex-col items-start w-full h-[300px] gap-4">
    <!--<textarea bind:value={node.raw_latex} class="p-2 w-full resize-none min-h-[200px] border-lightcyan border-solid border-4"/>-->
    <div class="p-1 flex w-full h-full mt-4 border-editor border-8 border-opacity-60">
        <div bind:this={divEl} class="flex w-full h-full"/>
    </div>
    <div class="flex flex-row justify-end w-full">
        <EditConfirmButton on:click={handleConfirm}>
            <img src={check_icon} alt="C"/>
        </EditConfirmButton>
    </div>
</div>
