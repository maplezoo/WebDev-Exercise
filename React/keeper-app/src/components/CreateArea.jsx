import React, { useState } from "react";

function CreateArea(props) {
    const [inputNote, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setNote((p) => ({ ...p, [name]: value }));
    }

    function handleClick(e) {
        props.setNote((p) => [...p, inputNote]);
        e.preventDefault();
    }

    return (
        <div>
            <form>
                <input onChange={handleChange} name="title" placeholder="Title" />
                <textarea
                    onChange={handleChange}
                    name="content"
                    placeholder="Take a note..."
                    rows="3"
                />
                <button onClick={handleClick}>Add</button>
            </form>
        </div>
    );
}

export default CreateArea;
