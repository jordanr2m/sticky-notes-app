import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true,
      },
    ],

    searchText: "search for me",
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    const updatedNotes = this.state.notes.map(note => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({notes: updatedNotes});
  }

  addNote = () => {
    // create new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };
    // add new note to existing notes array in state
    const newNotes = [newNote, ...this.state.notes]
    this.setState({ notes: newNotes });
  }

  render() {
    return (
      < div >
        <Header searchText={this.state.searchText} addNote={this.addNote}/>
        <NotesList notes={this.state.notes} onType={this.onType}/>
      </div >
    );
  }
}

export default App;