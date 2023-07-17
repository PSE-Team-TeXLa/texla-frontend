import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type API from "./socket.api";

export const json_ast: Writable<API.Ast.Ast> = writable({
    "root": {
        "uuid": 6,
        "raw_latex": "main.tex",
        "node_type": {
            "type": "Expandable",
            "data": {
                "type": "Document",
                "preamble": "",
                "postamble": "",
                "filename": "main.tex",
            },
            "children": [
                {
                    "uuid": 4,
                    "raw_latex": "Title1",
                    "node_type": {
                        "type": "Expandable",
                        "data": {
                            "type": "Segment",
                            "heading": "Title1"
                        },
                        "children": [
                            {
                                "uuid": 1,
                                "raw_latex": "Block\nof\nText\n",
                                "node_type": {
                                    "type": "Leaf",
                                    "data": {
                                        "type": "Text",
                                        "text": "Block\nof\nText\n"
                                    }
                                },
                                "meta_data": {}
                            },
                            {
                                "uuid": 3,
                                "raw_latex": "Subtitle",
                                "node_type": {
                                    "type": "Expandable",
                                    "data": {
                                        "type": "Segment",
                                        "heading": "Subtitle"
                                    },
                                    "children": [
                                        {
                                            "uuid": 2,
                                            "raw_latex": "another Block of text\naaaaa\n",
                                            "node_type": {
                                                "type": "Leaf",
                                                "data": {
                                                    "type": "Text",
                                                    "text": "another Block of text\naaaaa\n"
                                                }
                                            },
                                            "meta_data": {}
                                        }
                                    ]
                                },
                                "meta_data": {}
                            }
                        ]
                    },
                    "meta_data": {}
                },
                {
                    "uuid": 5,
                    "raw_latex": "Title2",
                    "node_type": {
                        "type": "Expandable",
                        "data": {
                            "type": "Segment",
                            "heading": "Title2"
                        },
                        "children": []
                    },
                    "meta_data": {}
                }
            ]
        },
        "meta_data": {}
    },
    "highest_level": 2
});

export const currentLayer = writable(2);
export const isEditorActive = writable(false);
export const isGraphActive = writable(false);

export const scrollMap = writable(new Map<number, HTMLElement>());


export const isFrozen = writable(false);

