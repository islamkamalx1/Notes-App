import { v4 as uuid4 } from "uuid";
import moment from "moment";
let notes = [];

// * Read existing notes from local storage and return them *
const loadNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// * Save the notes to local storage *
const saveNotes = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// * Expose notes from module *
const getNotes = () => notes;

// * Push note and return it's id *
const createNotes = () => {
  const id = uuid4();
  const createdAt = moment().valueOf();

  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: createdAt,
    updatedAt: createdAt,
  });

  saveNotes();

  return id;
};

// * Remove a note from a list *
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => {
    note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    saveNotes();
  }
};

// * Sort your notes by one of three ways *
const sortNotes = (sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => a.updatedAt - b.updatedAt);
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => a.createdAt - b.createdAt);
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => b.title.toLowerCase() - a.title.toLowerCase());
  } else {
    return notes;
  }
};

// * Update Notes *
const updateNotes = (id, updates) => {
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return;
  }

  if (typeof updates.title === "string") {
    note.title = updates.title;
    note.updatedAt = moment().valueOf();
  }

  if (typeof updates.body === "string") {
    note.body = updates.body;
    note.updatedAt = moment().valueOf();
  }

  saveNotes();
  return note;
};

notes = loadNotes();

export { getNotes, createNotes, removeNote, sortNotes, updateNotes };
