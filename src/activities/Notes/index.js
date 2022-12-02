import { connect } from "react-redux";

import {
  getNotes,
  postNote,
  updateNote,
  setNewNote,
  unsetEditNote,
  searchNote,
} from "../../api/notes";

import Notes from "./Notes";

const mapStateToProps = (state) => ({
  notes: state.notesReducer.notes,
  loading: state.notesReducer.loading,
  editNote: state.notesReducer.editNote,
});

const mapDispatchToProps = (dispatch) => ({
  getNotes: () => getNotes(dispatch),
  postNote: ({ note, important }) => postNote({ dispatch, note, important }),
  updateNote: ({ id, note, important, done }) =>
    updateNote({ dispatch, id, note, important, done }),
  setNewNote: ({ newNote }) => setNewNote({ dispatch, newNote }),
  unsetEditNote: () => unsetEditNote(dispatch),
  searchNote: ({ noteString }) => searchNote({ dispatch, noteString }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
