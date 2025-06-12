import TodoForm from "./TodoForm.tsx";
import {useEffect, useReducer} from "react";
import TodoList from "./TodoList.tsx";
import type  {TodoProps, ActionProps} from "../types.ts";

// type TodoProps = {
//     id: number;
//     text: string;
// }
//
// type ActionProps =
//     | {type: "ADD_TODO"; payload: string}
//     | {type: "DELETE_TODO"; payload: number};

const getInitialTodos = () => {
    const stored = localStorage.getItem("todos")
    return stored ? JSON.parse(stored) : [];
}

const todoReducer = (state: TodoProps[], action: ActionProps): TodoProps[]  => {
    switch (action.type) {

        // case "ADD_TODO": {
        //     const newTodo: TodoProps = {
        //         id: Date.now(),
        //         text: action.payload,
        //     }
        //     return [...state, newTodo]
        // }
// Με αλλο τροπο το αποπανω
        case "ADD_TODO":
            return [
                ...state,
                {
                    id: Date.now(),
                    text: action.payload,
                    completed: false,
                }
            ]

        case "DELETE_TODO":
                return state.filter(todo => todo.id !== action.payload)

            case "EDIT_TODO":
                return state.map( todo =>
                    todo.id === action.payload.id
                    ? {...todo, text: action.payload.newText}
                        : todo
                )

        case "COMPLETE_TODO":
            return state.map(todo =>
                todo.id === action.payload
                ? {...todo, completed: !todo.completed}
                : todo
            )

        case "CLEAR_ALL":
            return []

        default:
            return  state
}
}

const Todo = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos)

    const totalTasks: number = todos.length
    const completedTasks: number = todos.filter(t => t.completed).length
    const pendingTasks : number = totalTasks - completedTasks

    useEffect( () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const handleClearAll = () => {
        dispatch({type: "CLEAR_ALL"})
    }

    return (
        <>
            <div className="max-w-md mx-auto p-6">

            <h1 className = "text-center text-2xl pt-4 mb-4">To-Do List</h1>

            <TodoForm dispatch = {dispatch}/>

            <TodoList todos = {todos} dispatch = {dispatch}/>

                {todos.length > 0 && (
                    <>
                        <div className="flex justify-between border-t pt-2 mt-4 text-cf-gray">
                            <span> Total: {totalTasks} </span>
                            <span> Pending: {pendingTasks} </span>
                            <span> Completed: {completedTasks} </span>
                        </div>

                        <div className="text-end mt-4">
                            <button className= "bg-cf-dark-red text-white py-2 px-4 rounded" onClick={handleClearAll}
                            >
                                Clear All
                            </button>
                        </div>
                    </>
                )}



            </div>
        </>
    )
}
export default Todo
