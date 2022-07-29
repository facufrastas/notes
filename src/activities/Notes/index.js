import { connect } from "react-redux";
import { getNotes, postNote, updateNote, setNewNote, unsetEditNote, searchNote } from "../../api/notes";

import Notes from "./Notes";

const mapStateToProps = (state) => ({
  notes: state.notesReducer.notes,
  loading: state.notesReducer.loading,
  editNote: state.notesReducer.editNote,
  idEditNote: state.notesReducer.idEditNote,
});

const mapDispatchToProps = (dispatch) => ({
  getNotes: () => getNotes(dispatch),
  postNote: ({ note, favourite }) => postNote({ dispatch, note, favourite }),
  updateNote: ({ id, note, favourite }) => updateNote({ dispatch, id, note, favourite }),
  setNewNote: ({ newNote }) => setNewNote({ dispatch, newNote }),
  unsetEditNote: () => unsetEditNote(dispatch),
  searchNote: ({ noteString }) => searchNote({ dispatch, noteString }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
