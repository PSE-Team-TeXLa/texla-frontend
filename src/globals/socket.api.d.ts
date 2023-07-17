export default API;
export namespace API {
    type Uuid = number;
    type Metadata = { [key: string]: string };

    export namespace Ast {
        // TODO

        interface Ast {
            root: Document;
            highest_level: number;
        }

        interface Document {
            uuid: Uuid;
            node_type: {
                type: "Expandable";
                data: {
                    type: "Document";
                    preamble: string;
                    postamble: string;
                }
                children: Node[];
            }
        }

        type Node = ExpandableNode | LeafNode;

        interface GeneralNode {
            uuid: Uuid;
            type: "Expandable" | "Leaf";
            raw_latex: string
            data: ExpandableData | LeafData;
            meta_data: Metadata;
        }

        interface ExpandableNode extends GeneralNode {
            type: "Expandable";
            data: ExpandableData;
            children: Node[];
        }

        interface LeafNode extends GeneralNode {
            type: "Leaf";
            data: LeafData;
        }

        type ExpandableData = Segment; // TODO more
        type LeafData = Text; // TODO more

        interface Segment {
            type: "Segment";
            heading: string;
        }

        interface Text {
            type: "Text";
            text: string;
        }
    }

    export namespace Operation {
        // TODO: da fehlt noch die Information, welche Operation es sein soll, also so type: ...
        type Operation = AddNode | MoveNode | EditNode | DeleteNode | MergeNodes | EditMetadata | DeleteMetadata;

        interface AddNode {
            destination: Position;
            raw_latex: string;
        }

        interface MoveNode {
            target: Uuid;
            destination: Position;
        }

        interface EditNode {
            target: Uuid;
            raw_latex: string;
        }

        interface DeleteNode {
            target: Uuid;
        }

        interface MergeNodes {
            second_node: Uuid;
        }


        interface EditMetadata {
            target: Uuid;
            new: Metadata;
        }

        interface DeleteMetadata {
            target: Uuid;
            key: string;
        }

        interface Position {
            parent: Uuid;
            after_sibling: Uuid | null;
        }
    }
}

