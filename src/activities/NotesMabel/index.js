import { connect } from "react-redux";
import { getNotes, postNote, updateNote, setNewNote, unsetEditNote, searchNote } from "../../api/notesMabel";

import NotesMabel from "./NotesMabel";

const mapStateToProps = (state) => ({
  notes: state.notesMabelReducer.notes,
  loading: state.notesMabelReducer.loading,
  editNote: state.notesMabelReducer.editNote,
  idEditNote: state.notesMabelReducer.idEditNote,
});

const mapDispatchToProps = (dispatch) => ({
  getNotes: () => getNotes(dispatch),
  postNote: ({ note, favourite }) => postNote({ dispatch, note, favourite }),
  updateNote: ({ id, note, favourite }) => updateNote({ dispatch, id, note, favourite }),
  setNewNote: ({ newNote }) => setNewNote({ dispatch, newNote }),
  unsetEditNote: () => unsetEditNote(dispatch),
  searchNote: ({ noteString }) => searchNote({ dispatch, noteString }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesMabel);
