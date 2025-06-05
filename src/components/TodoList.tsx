import {Trash2} from "lucide-react";

type Todo = {
    id: number
    text: string
}

type TodoListProps = {
    todos: Todo[]
    dispatch: React.Dispatch<{type: "DELETE_TODO" ; payload: number}>
}

const TodoList = ({todos, dispatch}: TodoListProps) => {

const handleDelete = (id: number) => ()=> {
    dispatch({type: "DELETE_TODO", payload: id})
}

    return (
        <>
            <ul className="space-y-2">
                {todos.map(todo => (
                    <li key={todo.id} className="flex items-center justify-between bg-gray-200 p-2 rounded">
                        <span>{todo.text}</span>
                        <button className="text-cf-dark-red hover:underline" onClick={handleDelete(todo.id)}
                        >Delete <Trash2 size={18} />
                        </button>
                    </li>
                    )
                )
                }


            </ul>
        </>
    )
}
export default TodoList;