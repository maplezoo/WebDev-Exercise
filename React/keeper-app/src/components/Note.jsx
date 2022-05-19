import React from "react";
import Content from "../notes";

function Note(props) {
    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </div>
    );
}

function listNote() {
    return Content.map((note) => (
        <Note title={note.title} content={note.content} />
    ));
}

export default listNote;
export { Note };
