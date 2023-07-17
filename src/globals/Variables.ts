import {writable} from "svelte/store";

export const json_ast = writable({
    "root": {
        "uuid": 6,
        "node_type": {
            "type": "Expandable",
            "data": {
                "type": "Document",
                "preamble": "",
                "postamble": ""
            },
            "children": [
                {
                    "uuid": 4,
                    "node_type": {
                        "type": "Expandable",
                        "data": {
                            "type": "Segment",
                            "heading": "Title1"
                        },
                        "children": [
                            {
                                "uuid": 1,
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
                                "node_type": {
                                    "type": "Expandable",
                                    "data": {
                                        "type": "Segment",
                                        "heading": "Subtitle"
                                    },
                                    "children": [
                                        {
                                            "uuid": 2,
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

