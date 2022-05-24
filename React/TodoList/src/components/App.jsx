import React, { useState } from "react";
import TodoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
    const [todo, setTodo] = useState(["A Item", "Second"]);

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
            <InputArea setTodo={setTodo} />
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
