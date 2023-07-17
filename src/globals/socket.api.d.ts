export default API;
export namespace API {
    type Uuid = number;
    type Metadata = {[key: string]: string};
    
    export namespace Ast {
        // TODO
        type Ast = any;
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

