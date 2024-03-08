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

    searchText: "",
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
    this.setState({ notes: updatedNotes });
  };

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
  };

  onSearch = (text) => {
    // convert incoming text to lowercase for comparison
    const newSearchText = text.toLowerCase();

    // Map over notes and return notes that match search
    const updatedNotes = this.state.notes.map(note => {
      if (!newSearchText) {
        /* If the search field is empty, then
          we set the doesMatchSearch value for every note to true. */
        note.doesMatchSearch = true;
        return note;
      } else {
        // convert title and description to lowercase
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        // create variables for matching titles and descriptions
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        // hasMatch is true if there is a match in either a title or a description. Otherwise, it is false
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch; // set doesMatchSearch property
        return note;
      }
    });
    // update state
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText,
    })
  };

  render() {
    return (
      < div >
        <Header searchText={this.state.searchText} addNote={this.addNote} />
        <NotesList notes={this.state.notes} onType={this.onType} />
      </div >
    );
  };
};

export default App;