import moment from "moment";
import { getFilters } from "./filter";
import { getNotes, sortNotes } from "./notes";

// * Generate the DOM structure for a note *
const generateNoteDom = (note) => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // *Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  // *Setup the link
  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  // *Setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);

  return noteEl;
};

// * Render application notes *
const renderNotes = () => {
  const notesEl = document.querySelector("#notes");

  const filters = getFilters();

  const notes = sortNotes(filters.sortBy);

  const filteredNotes = notes.filter((note) => {
    note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDom(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");

    emptyMessage.textContent = "No notes to show";

    emptyMessage.classList.add("empty-message");

    notesEl.appendChild(emptyMessage);
  }
};

// * Initializing the Edit page *
const initializeEditPage = (noteId) => {
  const titleEl = document.querySelector("#note-title");
  const bodyEl = document.querySelector("#note-body");
  const lastEditedEl = document.querySelector("#last-edited");

  const notes = getNotes();

  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    location.assign("/index.html");
  }

  titleEl.value = note.title;
  bodyEl.value = note.body;
  lastEditedEl.textContent = generateLastEdited(note.updatedAt);
};

// * Generate the Last edited message *
const generateLastEdited = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;

export { generateNoteDom, renderNotes, generateLastEdited, initializeEditPage };
