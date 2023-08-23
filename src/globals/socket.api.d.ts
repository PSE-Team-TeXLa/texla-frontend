export default API;
/**
 * The API is the interface between the frontend and the backend.
 */
namespace API {
    /**
     * A UUID is a number that uniquely identifies a node in the AST.
     */
    type Uuid = number;

    /**
     * A Metadata object contains information about a node.
     */
    interface Metadata {
        short_form?: string;
        note?: string;
    }

    export namespace Ast {
        /**
         * The AST is a tree of nodes. With the root node being the document node.
         */
        interface Ast {
            root: Node;
            highest_level: number;
        }

        /**
         * A node in the AST.
         */
        interface Node<T extends ExpandableType | LeafType = ExpandableType | LeafType> {
            uuid: Uuid;
            node_type: T;
            meta_data: Metadata;
            raw_latex: string;
        }

        /**
         * A node that can have children.
         */
        interface ExpandableType<T extends ExpandableData = ExpandableData> {
            type: "Expandable";
            data: T;
            children: Node[];
        }

        /**
         * A node that cannot have children.
         */
        interface LeafType<T extends LeafData = LeafData> {
            type: "Leaf";
            data: T;
        }

        /**
         * The data of a node that can have children.
         */
        type ExpandableData = Document | Segment | Environment | File;

        /**
         * The data of a node that cannot have children.
         */
        type LeafData = Text | Math | Image | Label | Caption | Comment;

        /**
         * The data of a document node.
         */
        interface Document {
            type: "Document";
            preamble: string;
            postamble: string;

        }

        /**
         * The data of a segment node.
         */
        interface Segment {
            type: "Segment",
            heading: string
        }

        /**
         * The data of a file node.
         */
        interface File {
            type: "File",
            path: string
        }

        /**
         * The data of an environment node.
         */
        interface Environment {
            type: "Environment",
            name: string
        }

        /**
         * The data of a text node.
         */
        interface Text {
            type: "Text";
            text: string;
        }

        /**
         * The data of a math node.
         */
        interface Math {
            type: "Math";
            content: string;
            kind: string;
        }

        /**
         * The data of an image node.
         */
        interface Image {
            type: "Image";
            path: string;
        }

        /**
         * The data of a label node.
         */
        interface Label {
            type: "Label";
            label: string;
        }

        /**
         * The data of a caption node.
         */
        interface Caption {
            type: "Caption";
            caption: string;
        }

        /**
         * The data of a comment node.
         */
        interface Comment {
            type: "Comment"
            comment: string;
        }
    }

    export namespace Operation {
        /**
         * The operation that can be sent to the backend.
         */
        type Operation = AddNode | MoveNode | EditNode | DeleteNode | MergeNodes | EditMetadata | DeleteMetadata;

        /**
         * The data of an operation.
         */
        type OperationData =
            AddNodeData
            | MoveNodeData
            | EditNodeData
            | DeleteNodeData
            | MergeNodesData
            | EditMetadataData
            | DeleteMetadataData;

        /**
         * The add node operation.
         */
        interface AddNode {
            type: "AddNode";
            arguments: AddNodeData;
        }

        /**
         * The move node operation.
         */
        interface MoveNode {
            type: "MoveNode";
            arguments: MoveNodeData;
        }

        /**
         * the edit node operation.
         */
        interface EditNode {
            type: "EditNode";
            arguments: EditNodeData;
        }

        /**
         * The delete node operation.
         */
        interface DeleteNode {
            type: "DeleteNode";
            arguments: DeleteNodeData;
        }

        /**
         * The merge nodes operation.
         */
        interface MergeNodes {
            type: "MergeNodes";
            arguments: MergeNodesData;
        }

        /**
         * The edit metadata operation.
         */
        interface EditMetadata {
            type: "EditMetadata";
            arguments: EditMetadataData;
        }

        /**
         * The delete metadata operation.
         */
        interface DeleteMetadata {
            type: "DeleteMetadata";
            arguments: DeleteMetadataData;
        }

        /**
         * The data of an add node operation.
         */
        interface AddNodeData {
            destination: Position;
            raw_latex: string;
        }

        /**
         * The data of a move node operation.
         */
        interface MoveNodeData {
            target: Uuid;
            destination: Position;
        }

        /**
         * The data of an edit node operation.
         */
        interface EditNodeData {
            target: Uuid;
            raw_latex: string;
        }

        /**
         * The data of a delete node operation.
         */
        interface DeleteNodeData {
            target: Uuid;
        }

        /**
         * The data of a merge nodes operation.
         */
        interface MergeNodesData {
            second_node: Uuid;
        }

        /**
         * The data of an edit metadata operation.
         */
        interface EditMetadataData {
            target: Uuid;
            new: Metadata;
        }

        /**
         * The data of a delete metadata operation.
         */
        interface DeleteMetadataData {
            target: Uuid;
            key: string;
        }

        /**
         * The position of a node in the AST.
         */
        interface Position {
            parent: Uuid;
            after_sibling: Uuid | null;
        }
    }

    /**
     * export options for the backend
     */
    interface StringificationOptions {
        include_comments: boolean;
        include_metadata: boolean;
    }

    /**
     * An Error.
     */
    interface Error {
        message: string;
    }
}

