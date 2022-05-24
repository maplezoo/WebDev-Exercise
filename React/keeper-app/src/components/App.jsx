import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
    const [noteList, setNote] = useState([]);

    function deleteNote(id) {
        setNote((p) => {
            return p.filter((item, idx) => {
                return idx !== id;
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea setNote={setNote} />
            {noteList.map((e, idx) => {
                return (
                    <Note
                        key={idx}
                        id={idx}
                        title={e.title}
                        content={e.content}
                        onDelete={deleteNote}
                    />
                );
            })}
            <Footer />
        </div>
    );
}

export default App;
