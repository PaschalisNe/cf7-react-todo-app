export type TodoProps = {
    id: number;
    text: string;
    completed: boolean;
}

export type ActionProps =
    | {type: "ADD_TODO"; payload: string}
    | {type: "DELETE_TODO"; payload: number}
    | {type: "EDIT_TODO"; payload: {id: number ; newText: string} }
    | {type: "COMPLETE_TODO"; payload: number}
    | {type: "CLEAR_ALL"}

export type TodoFormProps = {
    dispatch: React.Dispatch<ActionProps>
}

export type TodoListProps = {
    todos: TodoProps[]
    dispatch: React.Dispatch<ActionProps>
}