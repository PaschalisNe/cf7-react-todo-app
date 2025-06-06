export type TodoProps = {
    id: number;
    text: string;
}

export type ActionProps =
    | {type: "ADD_TODO"; payload: string}
    | {type: "DELETE_TODO"; payload: number};

export type TodoFormProps = {
    dispatch: React.Dispatch<ActionProps>
}

export type TodoListProps = {
    todos: TodoProps[]
    dispatch: React.Dispatch<ActionProps>
}