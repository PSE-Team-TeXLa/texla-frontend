import StandardDocumentNode from "../components/standard_nodes/StandardDocumentNode.svelte";
import StandardTextNode from "../components/standard_nodes/StandardTextNode.svelte";
import StandardSegmentNode from "../components/standard_nodes/StandardSegmentNode.svelte";

export const ast = {
    component: {
        name: StandardDocumentNode,
        filename: "main.tex",
        children: [
            {component: {
                    name: StandardSegmentNode,
                    heading: "Preamble",
                    children: [
                        {
                            component: {
                                name: StandardTextNode,
                                text: "Das ist ein ganz lange Text $x = \\textbf{N}$ !",
                            },
                        },
                        {
                            component: {
                                name: StandardSegmentNode,
                                heading: "Eerster Teil",
                                children: [],
                            },
                        },
                        {
                            component: {
                                name: StandardSegmentNode,
                                heading: "Zweiter Teil",
                                children: [{
                                    component: {
                                        name: StandardSegmentNode,
                                        heading: "Eerster Teil",
                                        children: [],
                                    },
                                },
                                    {
                                        component: {
                                            name: StandardSegmentNode,
                                            heading: "Zweiter Teil",
                                            children: [{
                                                component: {
                                                    name: StandardSegmentNode,
                                                    heading: "Eerster Teil",
                                                    children: [],
                                                },
                                            },
                                                {
                                                    component: {
                                                        name: StandardSegmentNode,
                                                        heading: "Zweiter Teil",
                                                        children: [{
                                                            component: {
                                                                name: StandardSegmentNode,
                                                                heading: "Eerster Teil",
                                                                children: [{
                                                                    component: {
                                                                        name: StandardTextNode,
                                                                        text: "Das ist ein ganz lange Text $x = \\textbf{N}$ !",
                                                                    }}],
                                                            },
                                                        },
                                                            {
                                                                component: {
                                                                    name: StandardSegmentNode,
                                                                    heading: "Zweiter Teil",
                                                                    children: [{
                                                                        component: {
                                                                            name: StandardSegmentNode,
                                                                            heading: "Eerster Teil",
                                                                            children: [],
                                                                        },
                                                                    },
                                                                        {
                                                                            component: {
                                                                                name: StandardSegmentNode,
                                                                                heading: "Zweiter Teil",
                                                                                children: [{
                                                                                    component: {
                                                                                        name: StandardTextNode,
                                                                                        text: "Das ist ein ganz lange Text $x = \\textbf{N}$ !",
                                                                                    }}]
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
            {component: {
                    name: StandardSegmentNode,
                    heading: "Preamble",
                    children: [
                        {
                            component: {
                                name: StandardSegmentNode,
                                heading: "Erster Teil",
                                children: [],
                            },
                        },
                        {
                            component: {
                                name: StandardSegmentNode,
                                heading: "Zweiter Teil",
                                children: [{
                                    component: {
                                        name: StandardTextNode,
                                        text: "Das ist Text",
                                    }},{
                                    component: {
                                        name: StandardSegmentNode,
                                        heading: "Erster Teil",
                                        children: [],
                                    },
                                },
                                    {
                                        component: {
                                            name: StandardSegmentNode,
                                            heading: "Zweiter Teil",
                                            children: [{
                                                component: {
                                                    name: StandardSegmentNode,
                                                    heading: "Erster Teil",
                                                    children: [],
                                                },
                                            },
                                                {
                                                    component: {
                                                        name: StandardSegmentNode,
                                                        heading: "Zweiter Teil",
                                                        children: [{
                                                            component: {
                                                                name: StandardSegmentNode,
                                                                heading: "Eerster Teil",
                                                                children: [],
                                                            },
                                                        },
                                                            {
                                                                component: {
                                                                    name: StandardSegmentNode,
                                                                    heading: "Zweiter Teil",
                                                                    children: [{
                                                                        component: {
                                                                            name: StandardSegmentNode,
                                                                            heading: "Eerster Teil",
                                                                            children: [],
                                                                        },
                                                                    },
                                                                        {
                                                                            component: {
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
            {component: {
                    name: StandardSegmentNode,
                    heading: "Einführung",
                    children: [],
                },
            },
            {component: {
                    name: StandardSegmentNode,
                    heading: "Diffgeo",
                    children: [],
                },
            },{component: {
                    name: StandardSegmentNode,
                    heading: "Einführung",
                    children: [],
                },
            },
            {component: {
                    name: StandardSegmentNode,
                    heading: "Diffgeo",
                    children: [],
                },
            },{component: {
                    name: StandardSegmentNode,
                    heading: "Einführung",
                    children: [],
                },
            },
            {component: {
                    name: StandardSegmentNode,
                    heading: "Preamble",
                    children: [
                        {
                            component: {
                                name: StandardSegmentNode,
                                heading: "Eerster Teil",
                                children: [],
                            },
                        },
                        {
                            component: {
                                name: StandardSegmentNode,
                                heading: "Zweiter Teil",
                                children: [{
                                    component: {
                                        name: StandardSegmentNode,
                                        heading: "Eerster Teil",
                                        children: [],
                                    },
                                },
                                    {
                                        component: {
                                            name: StandardSegmentNode,
                                            heading: "Zweiter Teil",
                                            children: [{
                                                component: {
                                                    name: StandardSegmentNode,
                                                    heading: "Eerster Teil",
                                                    children: [],
                                                },
                                            },
                                                {
                                                    component: {
                                                        name: StandardSegmentNode,
                                                        heading: "Zweiter Teil",
                                                        children: [{
                                                            component: {
                                                                name: StandardSegmentNode,
                                                                heading: "Eerster Teil",
                                                                children: [],
                                                            },
                                                        },
                                                            {
                                                                component: {
                                                                    name: StandardSegmentNode,
                                                                    heading: "Zweiter Teil",
                                                                    children: [{
                                                                        component: {
                                                                            name: StandardSegmentNode,
                                                                            heading: "Eerster Teil",
                                                                            children: [],
                                                                        },
                                                                    },
                                                                        {
                                                                            component: {
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
            {component: {
                    name: StandardSegmentNode,
                    heading: "Diffgeo",
                    children: [],
                },
            },{component: {
                    name: StandardSegmentNode,
                    heading: "Einführung",
                    children: [],
                },
            },
            {component: {
                    name: StandardSegmentNode,
                    heading: "Preamble",
                    children: [
                        {
                            component: {
                                name: StandardSegmentNode,
                                heading: "Eerster Teil",
                                children: [],
                            },
                        },
                        {
                            component: {
                                name: StandardSegmentNode,
                                heading: "Zweiter Teil",
                                children: [{
                                    component: {
                                        name: StandardSegmentNode,
                                        heading: "Eerster Teil",
                                        children: [],
                                    },
                                },
                                    {
                                        component: {
                                            name: StandardSegmentNode,
                                            heading: "Zweiter Teil",
                                            children: [{
                                                component: {
                                                    name: StandardSegmentNode,
                                                    heading: "hjhfh",
                                                    children: [],
                                                },
                                            },
                                                {
                                                    component: {
                                                        name: StandardSegmentNode,
                                                        heading: "Zweiter Teil",
                                                        children: [{
                                                            component: {
                                                                name: StandardSegmentNode,
                                                                heading: "Eerster Teil",
                                                                children: [],
                                                            },
                                                        },
                                                            {
                                                                component: {
                                                                    name: StandardSegmentNode,
                                                                    heading: "Zweiter Teil",
                                                                    children: [{
                                                                        component: {
                                                                            name: StandardSegmentNode,
                                                                            heading: "Eerster Teil",
                                                                            children: [],
                                                                        },
                                                                    },
                                                                        {
                                                                            component: {
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
            {component: {
                    name: StandardSegmentNode,
                    heading: "Diffgeo",
                    children: [],
                },
            }
        ],
    }
}