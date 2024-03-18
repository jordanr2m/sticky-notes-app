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

  removeNote = (noteId) => {
    /* remove note by id of note that the user clicked on */
    const notIdMatch = (note) => note.id !== noteId;
    // filter notes array
    const updatedNotes = this.state.notes.filter(notIdMatch);
    // update state
    this.setState({notes: updatedNotes});
  }

  componentDidUpdate() {
    /* after each render, save notes data to local storage */
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  componentDidMount() {
    /* after rendering for the first time, read saved
    notes data from local storage and pass that data
    to component state if it exists */
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({notes: savedNotes});
    }
  }

  render() {
    return (
      < div >
        <Header searchText={this.state.searchText} addNote={this.addNote} onSearch={this.onSearch}/>
        <NotesList notes={this.state.notes} onType={this.onType} removeNote={this.removeNote} />
      </div >
    );
  };
};

export default App;