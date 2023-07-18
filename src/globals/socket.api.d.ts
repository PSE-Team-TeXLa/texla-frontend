export default API;
namespace API {
    type Uuid = number;
    type Metadata = { [key: string]: string };

    export namespace Ast {
        // TODO

        interface Ast {
            root: Node;
            highest_level: number;
        }

        interface Node {
            uuid: Uuid;
            node_type: ExpandableType | LeafType;
            meta_data: Metadata;
            raw_latex: string;
        }

        interface ExpandableType extends GeneralNode {
            type: "Expandable";
            data: ExpandableData;
            children: Node[];
        }

        interface LeafType extends GeneralNode {
            type: "Leaf";
            data: LeafData;
        }

        type ExpandableData = Segment | Document; // TODO more
        type LeafData = Text | Image | Caption; // TODO more

        interface Document {
            type: "Document";
            preamble: string;
            postamble: string;
            filename: string;

        }
        interface Segment {
            type: "Segment";
            heading: string;
        }

        interface Text {
            type: "Text";
            text: string;
        }

        interface Image {
            type: "Image";
            path: string;
        }

        interface Caption {
            type: "Caption";
            caption: string;
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

