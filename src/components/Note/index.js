import { connect } from "react-redux";
import { deleteNote, setEditNote } from "../../api/notes";

import Note from "./Note";

const mapDispatchToProps = (dispatch) => ({
  deleteNote: ({ id }) => deleteNote({ dispatch, id }),
  setEditNote: ({ id, editNote }) => setEditNote({ dispatch, id, editNote }),
});

export default connect(null, mapDispatchToProps)(Note);
