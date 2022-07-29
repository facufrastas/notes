import axios from "axios";
import { URI } from "..";
import { GET_NOTES, GET_NOTES_SUCCESSFULLY, SET_NEW_NOTE, SET_EDIT_NOTE, DELETE_EDIT_NOTE } from "../../redux/actions/notes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNotes = async (dispatch) => {
  try {
    dispatch({ type: GET_NOTES });
    const response = await AsyncStorage.getItem("notes");
    dispatch({ type: GET_NOTES_SUCCESSFULLY, data: JSON.parse(response) });
    return;
  } catch (err) {
    console.error(err);
  }
};

export const searchNote = async ({ dispatch, noteString }) => {
  try {
    const notes = await AsyncStorage.getItem("notes");
    let notesJSON;

    if (!notes) {
      notesJSON = [];
    } else {
      notesJSON = JSON.parse(notes);
    }
    dispatch({ type: GET_NOTES });
    const response = notesJSON.filter((note) => note.note.toLowerCase().includes(noteString.toLowerCase()));
    console.log(response);
    dispatch({ type: GET_NOTES_SUCCESSFULLY, data: response });
    return;
  } catch (err) {
    console.error(err);
  }
};

export const postNote = async ({ dispatch, note, favourite }) => {
  try {
    const notes = await AsyncStorage.getItem("notes");
    let notesJSON;

    if (!notes) {
      notesJSON = [];
    } else {
      notesJSON = JSON.parse(notes);
    }
    notesJSON.push({ id: notesJSON.length === 0 ? 0 : notesJSON.length + 1, note, favourite });
    await AsyncStorage.setItem("notes", JSON.stringify(notesJSON));
    getNotes(dispatch);
    return;
  } catch (err) {
    console.error(err);
  }
};

export const deleteNote = async ({ dispatch, id }) => {
  try {
    const notes = await AsyncStorage.getItem("notes");
    let notesJSON;

    if (!notes || notes.length === 0) {
      notesJSON = [];
    } else {
      notesJSON = JSON.parse(notes);
    }
    const index = notesJSON.findIndex((note) => note.id === id);
    if (!isNaN(index) && notesJSON.length > 1) {
      notesJSON.splice(index, 1);
    } else if (notesJSON.length === 1) {
      notesJSON = [];
    }

    await AsyncStorage.setItem("notes", JSON.stringify(notesJSON));
    getNotes(dispatch);
    return;
  } catch (err) {
    console.error(err);
  }
};

export const updateNote = async ({ dispatch, id, note, favourite }) => {
  try {
    const notes = await AsyncStorage.getItem("notes");
    let notesJSON;

    if (!notes) {
      notesJSON = [];
    } else {
      notesJSON = JSON.parse(notes);
    }
    const index = notesJSON.findIndex((note) => note.id === id);
    notesJSON[index].note = note;
    notesJSON[index].favourite = favourite;
    await AsyncStorage.setItem("notes", JSON.stringify(notesJSON));
    unsetEditNote(dispatch);
    getNotes(dispatch);
    return;
  } catch (err) {
    console.error(err);
  }
};

export const setNewNote = ({ dispatch, newNote }) => {
  dispatch({ type: SET_NEW_NOTE, data: newNote });
};

export const setEditNote = ({ dispatch, editNote }) => {
  dispatch({ type: SET_EDIT_NOTE, data: editNote });
};

export const unsetEditNote = (dispatch) => {
  dispatch({ type: DELETE_EDIT_NOTE });
};
