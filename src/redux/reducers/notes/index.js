import { GET_NOTES, GET_NOTES_SUCCESSFULLY, SET_NEW_NOTE, SET_EDIT_NOTE, DELETE_EDIT_NOTE } from "../../actions/notes";

const initState = {
  notes: [],
  loading: false,
  newNote: "",
  editNote: "",
};

const notesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_NOTES:
      return { ...state, loading: true };
    case GET_NOTES_SUCCESSFULLY:
      return { ...state, notes: action.data, loading: false };
    case SET_NEW_NOTE:
      return { ...state, newNote: action.data };
    case SET_EDIT_NOTE:
      return { ...state, editNote: action.data };
    case DELETE_EDIT_NOTE:
      return { ...state, editNote: "" };
    default:
      return { ...state };
  }
};

export default notesReducer;
