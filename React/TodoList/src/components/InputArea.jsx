import React, { useState } from "react";

function InputArea(props) {
    const [input, setInput] = useState("");

    function handleChange(e) {
        const newTodo = e.target.value;
        setInput(newTodo);
    }

    function addItem(inputText) {
        props.setTodo((p) => {
            return [...p, inputText];
        });
        setInput("");
    }

    return (
        <div className="form">
            <input onChange={handleChange} type="text" value={input} />
            <button onClick={() => addItem(input)}>
                <span>Add</span>
            </button>
        </div>
    );
}

export default InputArea;
