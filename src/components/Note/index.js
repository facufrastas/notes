import { connect } from "react-redux";
import { deleteNote, setEditNote } from "../../api/notes";

import Note from "./Note";

const mapDispatchToProps = (dispatch) => ({
  deleteNote: ({ id }) => deleteNote({ dispatch, id }),
  setEditNote: ({ editNote }) => setEditNote({ dispatch, editNote }),
});

export default connect(null, mapDispatchToProps)(Note);
