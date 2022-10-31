import { connect } from "react-redux";

import { deleteNote, setEditNote, setDone } from "../../api/notes";

import Note from "./Note";

const mapDispatchToProps = (dispatch) => ({
  deleteNote: ({ id }) => deleteNote({ dispatch, id }),
  setEditNote: ({ editNote }) => setEditNote({ dispatch, editNote }),
  setDone: ({ id }) => setDone({ dispatch, id }),
});

export default connect(null, mapDispatchToProps)(Note);
