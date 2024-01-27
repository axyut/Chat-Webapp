import React, { useState } from "react";
import Heading from "./Heading";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(incomingNote) {
    setNotes((prevNotes) => {
      return [incomingNote, ...prevNotes];
    });
  }

  function deleteRequest(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((item, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div>
      <Heading />
      <CreateArea passNote={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            title={note.title}
            content={note.content}
            key={index}
            id={index}
            onDelete={deleteRequest}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
