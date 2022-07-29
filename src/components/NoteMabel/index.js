import { connect } from "react-redux";
import { deleteNote, setEditNote } from "../../api/notesMabel";

import NoteMabel from "./NoteMabel";

const mapDispatchToProps = (dispatch) => ({
  deleteNote: ({ id }) => deleteNote({ dispatch, id }),
  setEditNote: ({ id, editNote }) => setEditNote({ dispatch, id, editNote }),
});

export default connect(null, mapDispatchToProps)(NoteMabel);
