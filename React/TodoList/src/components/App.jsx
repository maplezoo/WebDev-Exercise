import React, { useState } from "react";
import TodoItem from "./TodoItem";
import InputArea from "./InputArea";

function App() {
    const [todo, setTodo] = useState(["A Item", "Second"]);
    const [input, setInput] = useState("");

    function handleChange(e) {
        const newTodo = e.target.value;
        setInput(newTodo);
    }

    function addItem() {
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
            <InputArea handleChange={handleChange} value={input} addItem={addItem} />
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
