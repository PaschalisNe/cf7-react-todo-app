import {Edit, Save, Trash2, X} from "lucide-react";
import type {TodoListProps} from "../types.ts";
import {useState} from "react";

// type Todo = {
//     id: number
//     text: string
// }
//
// type TodoListProps = {
//     todos: Todo[]
//     dispatch: React.Dispatch<{type: "DELETE_TODO" ; payload: number}>
// }

const TodoList = ({todos, dispatch}: TodoListProps) => {

    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");

    const handleEdit = (id: number, text: string) => () => {
        setEditId(id);
        setEditText(text);
    }

    const handleSave = (id: number) => () => {
        dispatch({type: "EDIT_TODO", payload: {id, newText: editText}});
        setEditId(null);
        setEditText("");
    }

    const handleCancel = () => {
        setEditId(null);
        setEditText("");
    }

    const handleDelete = (id: number) => ()=> {
    dispatch({type: "DELETE_TODO", payload: id})
}

    return (
        <>
            <ul className="space-y-2">
                {todos.map(todo => (

                    <li key={todo.id} className="flex items-center justify-between bg-gray-200 p-2 rounded">

                        { editId === todo.id ? (
                            <>
                                <div className="flex flex-1 gap-2" >

                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className=" flex-1 border rounded p-1"
                                    />

                                    <button
                                        className="text-cf-gray"
                                        onClick={handleSave(todo.id)}
                                    >
                                        <Save size={18} />
                                    </button>

                                    <button
                                        className="text-cf-dark-red hover:underline"
                                        onClick={handleCancel}
                                    >
                                        <X size={18} />
                                    </button>

                                </div>
                            </>
                        ) : (
                           <>
                               <span>{todo.text}</span>
                               <div className="flex gap-2">

                                   <button
                                       className="text-cf-gray"
                                       onClick={handleEdit(todo.id, todo.text)}
                                   >
                                       <Edit size={18} />
                                   </button>

                                   <button
                                       className="text-cf-dark-red hover:underline"
                                       onClick={handleDelete(todo.id)}
                                   >
                                       <Trash2 size={18} />
                                   </button>

                               </div>
                           </>
                        )
                        }

                    </li>
                    )
                )
                }


            </ul>
        </>
    )
}
export default TodoList;