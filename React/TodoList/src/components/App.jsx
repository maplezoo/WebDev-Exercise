import React, { useState } from "react";
import TodoItem from "./TodoItem";

function App() {
    const [todo, setTodo] = useState(["A Item", "Second"]);
    const [input, setInput] = useState("");

    function logTyping(e) {
        const newTodo = e.target.value;
        setInput(newTodo);
    }

    function addTodo() {
        setTodo((p) => {
            return [...p, input];
        });
        setInput("");
    }

    function deleteItem(id) {
        setTodo((p) => {
            return p.filter((item, idx) => {
                return idx !== id;
            });
        });
    }

    return (
        <div className="container">
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="form">
                <input onChange={logTyping} type="text" value={input} />
                <button onClick={addTodo}>
                    <span>Add</span>
                </button>
            </div>
            <div>
                <ul>
                    {todo.map((e, idx) => (
                        <TodoItem text={e} onChecked={deleteItem} id={idx} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
