export default API;
namespace API {
    type Uuid = number;

    interface Metadata {
        short_form?: string;
        note?: string;

        [key: string]: string;
    }

    export namespace Ast {
        // TODO

        interface Ast {
            root: Node;
            highest_level: number;
        }

        interface Node<T extends ExpandableType | LeafType = ExpandableType | LeafType> {
            uuid: Uuid;
            node_type: T;
            meta_data: Metadata;
            raw_latex: string;
        }

        interface ExpandableType {
            type: "Expandable";
            data: ExpandableData;
            children: Node[];
        }

        interface LeafType {
            type: "Leaf";
            data: LeafData;
        }

        type ExpandableData = Document | Segment | Environment | File;
        type LeafData = Text | Math | Image | Label | Caption | Comment;

        interface Document {
            type: "Document";
            preamble: string;
            postamble: string;

        }

        interface Segment {
            type: "Segment",
            heading: string
        }

        interface File {
            type: "File",
            path: string
        }

        interface Environment {
            type: "Environment",
            name: string
        }

        interface Text {
            type: "Text";
            text: string;
        }

        interface Math {
            type: "Math";
            content: string
        }

        interface Image {
            type: "Image";
            path: string;
        }

        interface Label {
            type: "Label";
            label: string;
        }

        interface Caption {
            type: "Caption";
            caption: string;
        }

        interface Comment {
            type: "Comment"
            comment: string;
        }
    }

    export namespace Operation {
        type Operation = AddNode | MoveNode | EditNode | DeleteNode | MergeNodes | EditMetadata | DeleteMetadata;
        type OperationData =
            AddNodeData
            | MoveNodeData
            | EditNodeData
            | DeleteNodeData
            | MergeNodesData
            | EditMetadataData
            | DeleteMetadataData;

        interface AddNode {
            type: "AddNode";
            arguments: AddNodeData;
        }

        interface MoveNode {
            type: "MoveNode";
            arguments: MoveNodeData;
        }

        interface EditNode {
            type: "EditNode";
            arguments: EditNodeData;
        }

        interface DeleteNode {
            type: "DeleteNode";
            arguments: DeleteNodeData;
        }

        interface MergeNodes {
            type: "MergeNodes";
            arguments: MergeNodesData;
        }

        interface EditMetadata {
            type: "EditMetadata";
            arguments: EditMetadataData;
        }

        interface DeleteMetadata {
            type: "DeleteMetadata";
            arguments: DeleteMetadataData;
        }


        interface AddNodeData {
            destination: Position;
            raw_latex: string;
        }

        interface MoveNodeData {
            target: Uuid;
            destination: Position;
        }

        interface EditNodeData {
            target: Uuid;
            raw_latex: string;
        }

        interface DeleteNodeData {
            target: Uuid;
        }

        interface MergeNodesData {
            second_node: Uuid;
        }


        interface EditMetadataData {
            target: Uuid;
            new: Metadata;
        }

        interface DeleteMetadataData {
            target: Uuid;
            key: string;
        }


        interface Position {
            parent: Uuid;
            after_sibling: Uuid | null;
        }
    }

    interface StringificationOptions {
        include_comments: boolean;
        include_metadata: boolean;
    }
}

