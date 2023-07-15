import StandardDocumentNode from "../components/standard_nodes/StandardDocumentNode.svelte";
import StandardTextNode from "../components/standard_nodes/StandardTextNode.svelte";
import StandardSegmentNode from "../components/standard_nodes/StandardSegmentNode.svelte";
import StandardImageNode from "../components/standard_nodes/StandardImageNode.svelte";

export const ast = {
    component: {
        uuid: 1,
        name: StandardDocumentNode,
        heading: "main.tex",
        children: [
            {
                component: {
                    uuid: 2,
                    name: StandardSegmentNode,
                    heading: "Preamble",
                    children: [
                        {
                            component: {
                                uuid: 3,
                                name: StandardTextNode,
                                text: "Das ist ein ganz lange Text $x = \\textbf{N}$ !",
                            },
                        }, {
                            component: {
                                uuid: 4,
                                name: StandardImageNode,
                                url: "/img/surfaces2.png",
                                imageTitle: "surface.png"
                            },
                        },
                        {
                            component: {
                                uuid: 5,
                                name: StandardSegmentNode,
                                heading: "Bitch Teil",
                                children: [],
                            },
                        },
                        {
                            component: {
                                uuid: 6,
                                name: StandardSegmentNode,
                                heading: "Yusuf Teil",
                                children: [{
                                    component: {
                                        uuid: 7,
                                        name: StandardSegmentNode,
                                        heading: "Dietmar Teil",
                                        children: [],
                                    },
                                },
                                    {
                                        component: {
                                            uuid: 8,
                                            name: StandardSegmentNode,
                                            heading: "Zweiter Teil",
                                            children: [{
                                                component: {
                                                    uuid: 8,
                                                    name: StandardSegmentNode,
                                                    heading: "Eerster Teil",
                                                    children: [],
                                                },
                                            },
                                                {
                                                    component: {
                                                        uuid: 9,
                                                        name: StandardSegmentNode,
                                                        heading: "Zweiter    Teil",
                                                        children: [{
                                                            component: {
                                                                uuid: 10,
                                                                name: StandardSegmentNode,
                                                                heading: "Eerster Teil",
                                                                children: [{
                                                                    component: {
                                                                        uuid: 11,
                                                                        name: StandardTextNode,
                                                                        text: "Das ist ein ganz lange Text $x = \\textbf{N}$ !",
                                                                    }
                                                                }],
                                                            },
                                                        },
                                                            {
                                                                component: {
                                                                    uuid: 12,
                                                                    name: StandardSegmentNode,
                                                                    heading: "Zweiter Teil",
                                                                    children: [{
                                                                        component: {
                                                                            uuid: 13,
                                                                            name: StandardSegmentNode,
                                                                            heading: "Eerster Teil",
                                                                            children: [],
                                                                        },
                                                                    },
                                                                        {
                                                                            component: {
                                                                                uuid: 14,
                                                                                name: StandardSegmentNode,
                                                                                heading: "Zweiter Teil",
                                                                                children: [{
                                                                                    component: {
                                                                                        uuid: 15,
                                                                                        name: StandardTextNode,
                                                                                        text: "Das ist ein ganz lange Text $x = \\textbf{N}$ !",
                                                                                    }
                                                                                }]
                                                                            },
                                                                        }]
                                                                },
                                                            }]
                                                    },
                                                }]
                                        },
                                    }]
                            },
                        }],
                }
            },
            {
                component: {
                    uuid: 16,
                    name: StandardSegmentNode,
                    heading: "Preamble",
                    children: [
                        {
                            component: {
                                uuid: 17,
                                name: StandardSegmentNode,
                                heading: "Erster Teil",
                                children: [],
                            },
                        },
                        {
                            component: {
                                uuid: 18,
                                name: StandardSegmentNode,
                                heading: "Zweiter Teil",
                                children: [{
                                    component: {
                                        uuid: 19,
                                        name: StandardTextNode,
                                        text: "Das ist Text",
                                    }
                                }, {
                                    component: {
                                        uuid: 20,
                                        name: StandardSegmentNode,
                                        heading: "Erster Teil",
                                        children: [],
                                    },
                                },
                                    {
                                        component: {
                                            uuid: 21,
                                            name: StandardSegmentNode,
                                            heading: "Zweiter Teil",
                                            children: [{
                                                component: {
                                                    uuid: 22,
                                                    name: StandardSegmentNode,
                                                    heading: "Erster Teil",
                                                    children: [],
                                                },
                                            },
                                                {
                                                    component: {
                                                        uuid: 23,
                                                        name: StandardSegmentNode,
                                                        heading: "Zweiter Teil",
                                                        children: [{
                                                            component: {
                                                                uuid: 24,
                                                                name: StandardSegmentNode,
                                                                heading: "Eerster Teil",
                                                                children: [],
                                                            },
                                                        },
                                                            {
                                                                component: {
                                                                    uuid: 25,
                                                                    name: StandardSegmentNode,
                                                                    heading: "Zweiter Teil",
                                                                    children: [{
                                                                        component: {
                                                                            uuid: 26,
                                                                            name: StandardSegmentNode,
                                                                            heading: "Eerster Teil",
                                                                            children: [],
                                                                        },
                                                                    },
                                                                        {
                                                                            component: {
                                                                                uuid: 27,
                                                                                name: StandardSegmentNode,
                                                                                heading: "Zweiter Teil",
                                                                                children: []
                                                                            },
                                                                        }]
                                                                },
                                                            }]
                                                    },
                                                }]
                                        },
                                    }]
                            },
                        }],
                }
            },
            {
                component: {
                    uuid: 28,
                    name: StandardSegmentNode,
                    heading: "Einführung",
                    children: [],
                },
            },
            {
                component: {
                    uuid: 29,
                    name: StandardSegmentNode,
                    heading: "Diffgeo",
                    children: [],
                },
            }, {
                component: {
                    uuid: 30,
                    name: StandardSegmentNode,
                    heading: "Einführung",
                    children: [],
                },
            },
            {
                component: {
                    uuid: 31,
                    name: StandardSegmentNode,
                    heading: "Diffgeo",
                    children: [],
                },
            }, {
                component: {
                    uuid: 32,
                    name: StandardSegmentNode,
                    heading: "Einführung",
                    children: [],
                },
            },
            {
                component: {
                    uuid: 33,
                    name: StandardSegmentNode,
                    heading: "Preamble",
                    children: [
                        {
                            component: {
                                uuid: 34,
                                name: StandardSegmentNode,
                                heading: "Eerster Teil",
                                children: [],
                            },
                        },
                        {
                            component: {
                                uuid: 35,
                                name: StandardSegmentNode,
                                heading: "Zweiter Teil",
                                children: [{
                                    component: {
                                        uuid: 36,
                                        name: StandardSegmentNode,
                                        heading: "Eerster Teil",
                                        children: [],
                                    },
                                },
                                    {
                                        component: {
                                            uuid: 37,
                                            name: StandardSegmentNode,
                                            heading: "Zweiter Teil",
                                            children: [{
                                                component: {
                                                    uuid: 38,
                                                    name: StandardSegmentNode,
                                                    heading: "Eerster Teil",
                                                    children: [],
                                                },
                                            },
                                                {
                                                    component: {
                                                        uuid: 39,
                                                        name: StandardSegmentNode,
                                                        heading: "Zweiter Teil",
                                                        children: [{
                                                            component: {
                                                                uuid: 40,
                                                                name: StandardSegmentNode,
                                                                heading: "Eerster Teil",
                                                                children: [],
                                                            },
                                                        },
                                                            {
                                                                component: {
                                                                    uuid: 41,
                                                                    name: StandardSegmentNode,
                                                                    heading: "Zweiter Teil",
                                                                    children: [{
                                                                        component: {
                                                                            uuid: 42,
                                                                            name: StandardSegmentNode,
                                                                            heading: "Eerster Teil",
                                                                            children: [],
                                                                        },
                                                                    },
                                                                        {
                                                                            component: {
                                                                                uuid: 43,
                                                                                name: StandardSegmentNode,
                                                                                heading: "Zweiter Teil",
                                                                                children: []
                                                                            },
                                                                        }]
                                                                },
                                                            }]
                                                    },
                                                }]
                                        },
                                    }]
                            },
                        }],
                }
            },
            {
                component: {
                    uuid: 44,
                    name: StandardSegmentNode,
                    heading: "Diffgeo",
                    children: [],
                },
            }, {
                component: {
                    uuid: 45,
                    name: StandardSegmentNode,
                    heading: "Einführung",
                    children: [],
                },
            },
            {
                component: {
                    uuid: 46,
                    name: StandardSegmentNode,
                    heading: "Preamble",
                    children: [
                        {
                            component: {
                                uuid: 47,
                                name: StandardSegmentNode,
                                heading: "Eerster Teil",
                                children: [],
                            },
                        },
                        {
                            component: {
                                uuid: 48,
                                name: StandardSegmentNode,
                                heading: "Zweiter Teil",
                                children: [{
                                    component: {
                                        uuid: 49,
                                        name: StandardSegmentNode,
                                        heading: "Eerster Teil",
                                        children: [],
                                    },
                                },
                                    {
                                        component: {
                                            uuid: 50,
                                            name: StandardSegmentNode,
                                            heading: "Zweiter Teil",
                                            children: [{
                                                component: {
                                                    uuid: 51,
                                                    name: StandardSegmentNode,
                                                    heading: "hjhfh",
                                                    children: [],
                                                },
                                            },
                                                {
                                                    component: {
                                                        uuid: 52,
                                                        name: StandardSegmentNode,
                                                        heading: "Zweiter Teil",
                                                        children: [{
                                                            component: {
                                                                uuid: 53,
                                                                name: StandardSegmentNode,
                                                                heading: "Eerster Teil",
                                                                children: [],
                                                            },
                                                        },
                                                            {
                                                                component: {
                                                                    uuid: 54,
                                                                    name: StandardSegmentNode,
                                                                    heading: "Zweiter Teil",
                                                                    children: [{
                                                                        component: {
                                                                            uuid: 55,
                                                                            name: StandardSegmentNode,
                                                                            heading: "Eerster Teil",
                                                                            children: [],
                                                                        },
                                                                    },
                                                                        {
                                                                            component: {
                                                                                uuid: 56,
                                                                                name: StandardSegmentNode,
                                                                                heading: "Zweiter Teil",
                                                                                children: []
                                                                            },
                                                                        }]
                                                                },
                                                            }]
                                                    },
                                                }]
                                        },
                                    }]
                            },
                        }],
                }
            },
            {
                component: {
                    uuid: 57,
                    name: StandardSegmentNode,
                    heading: "Diffgeo",
                    children: [],
                },
            }
        ],
    }
}