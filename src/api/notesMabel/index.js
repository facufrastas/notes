import axios from "axios";
import { URI } from "..";
import { GET_NOTES, GET_NOTES_SUCCESSFULLY, SET_NEW_NOTE, SET_EDIT_NOTE, DELETE_EDIT_NOTE } from "../../redux/actions/notes";

export const getNotes = async (dispatch) => {
  try {
    dispatch({ type: GET_NOTES });
    const response = await axios.get(`${URI}/notesMabel`);
    dispatch({ type: GET_NOTES_SUCCESSFULLY, data: response.data });
    return;
  } catch (err) {
    console.error(err);
  }
};

export const searchNote = async ({ dispatch, noteString }) => {
  try {
    dispatch({ type: GET_NOTES });
    const response = await axios.get(`${URI}/notesMabel/${noteString}`);
    dispatch({ type: GET_NOTES_SUCCESSFULLY, data: response.data });
    return;
  } catch (err) {
    console.error(err);
  }
};

export const postNote = async ({ dispatch, note, favourite }) => {
  try {
    const response = await axios.post(`${URI}/notesMabel`, { note, favourite });
    getNotes(dispatch);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const deleteNote = async ({ dispatch, id }) => {
  try {
    const deletedNote = await axios.delete(`${URI}/notesMabel/${id}`);
    getNotes(dispatch);
    return deletedNote;
  } catch (err) {
    console.error(err);
  }
};

export const updateNote = async ({ dispatch, id, note, favourite }) => {
  try {
    const updatedNote = await axios.patch(`${URI}/notesMabel/${id}`, { note, favourite });
    unsetEditNote(dispatch);
    getNotes(dispatch);
    return updatedNote;
  } catch (err) {
    console.error(err);
  }
};

export const setNewNote = ({ dispatch, newNote }) => {
  dispatch({ type: SET_NEW_NOTE, data: newNote });
};

export const setEditNote = ({ dispatch, id, editNote }) => {
  dispatch({ type: SET_EDIT_NOTE, data: { editNote, id } });
};

export const unsetEditNote = (dispatch) => {
  dispatch({ type: DELETE_EDIT_NOTE });
};
