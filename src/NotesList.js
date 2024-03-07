import React from "react";
import Note from "./Note.js"

const NotesList = (props) => {
    // console.log(props);
    const renderNote = (note) => <Note note={note} id={note.id} />
    const noteElements = props.notes.map(renderNote);
    return (
        <ul className="notes-list">
            {noteElements}
        </ul>
    )
};

export default NotesList;