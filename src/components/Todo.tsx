import TodoForm from "./TodoForm.tsx";
import {useReducer} from "react";
import TodoList from "./TodoList.tsx";

type TodoProps = {
    id: number;
    text: string;
}

type ActionProps =
    | {type: "ADD_TODO"; payload: string}
    | {type: "DELETE_TODO"; payload: number};


const todoReducer = (state: TodoProps[], action: ActionProps): TodoProps[]  => {
    switch (action.type) {
        case "ADD_TODO": {
            const newTodo: TodoProps = {
                id: Date.now(),
                text: action.payload,
            }
            return [...state, newTodo]
        }

            case "DELETE_TODO":
                return state.filter(todo => todo.id !== action.payload)


                default: return  state
}
}

const Todo = () => {

    const [todos, dispatch] = useReducer(todoReducer, [])

    return (
        <>
            <div className="max-w-md mx-auto p-6">

            <h1 className = "text-center text-2xl pt-4 mb-4">To-Do List</h1>

            <TodoForm dispatch= {dispatch}/>

            <TodoList todos= {todos} dispatch= {dispatch}/>

            </div>
        </>
    )
}
export default Todo
