import AsyncStorage from '@react-native-async-storage/async-storage';

import { INote } from '../../utils/interfaces';
import { AppDispatch } from '../../app/store';
import { loadingFunction, getNotes as getNotesFunction, setNewNote as setNewNoteFunction, setEditNote as setEditNoteFunction, deleteEditNote } from '../../features/notesSlice';

export const getNotes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadingFunction());

    const response = await AsyncStorage.getItem('notes');

    const notes: INote[] = response ? JSON.parse(response) : [];

    dispatch(getNotesFunction(notes));

    return;
  } catch (err) {
    console.error(err);
  }
};

export const searchNote =
  ({ noteString }: { noteString: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const notesResponse = await AsyncStorage.getItem('notes');

      const notes: INote[] = notesResponse ? JSON.parse(notesResponse) : [];

      const response = notes.filter((note: INote) => note.note.toLowerCase().includes(noteString.toLowerCase()));

      dispatch(getNotesFunction(response));

      return;
    } catch (err) {
      console.error(err);
    }
  };

export const postNote =
  ({ note, important }: { note: string; important: boolean }) =>
  async (dispatch: AppDispatch) => {
    try {
      const notesResponse = await AsyncStorage.getItem('notes');

      const notes: INote[] = notesResponse ? JSON.parse(notesResponse) : [];

      notes.push({
        id: notes.length === 0 ? '0' : (notes.length + 1).toString(),
        note,
        important,
        done: false
      });

      dispatch(unsetEditNote());

      await AsyncStorage.setItem('notes', JSON.stringify(notes));

      dispatch(getNotesFunction(notes));

      return;
    } catch (err) {
      console.error(err);
    }
  };

export const deleteNote =
  ({ id }: { id: string | number }) =>
  async (dispatch: AppDispatch) => {
    try {
      const notesResponse = await AsyncStorage.getItem('notes');

      let notes: INote[] = notesResponse ? JSON.parse(notesResponse) : [];

      const index = notes.findIndex((note) => note.id === id);

      if (!isNaN(index) && notes.length > 1) {
        notes.splice(index, 1);
      } else if (notes.length === 1) {
        notes = [];
      }

      dispatch(unsetEditNote());

      await AsyncStorage.setItem('notes', JSON.stringify(notes));

      dispatch(getNotesFunction(notes));

      return;
    } catch (err) {
      console.error(err);
    }
  };

export const updateNote =
  ({ id, note, important, done }: INote) =>
  async (dispatch: AppDispatch) => {
    try {
      const notesResponse = await AsyncStorage.getItem('notes');

      const notes: INote[] = notesResponse ? JSON.parse(notesResponse) : [];

      const index = notes.findIndex((note) => note.id === id);

      notes[index].note = note;
      notes[index].important = important;
      notes[index].done = done;

      dispatch(unsetEditNote());

      await AsyncStorage.setItem('notes', JSON.stringify(notes));

      dispatch(getNotesFunction(notes));

      return;
    } catch (err) {
      console.error(err);
    }
  };

export const setDone =
  ({ id }: { id: string | number }) =>
  async (dispatch: AppDispatch) => {
    try {
      const notesResponse = await AsyncStorage.getItem('notes');

      const notes: INote[] = notesResponse ? JSON.parse(notesResponse) : [];

      const index = notes.findIndex((note) => note.id === id);

      notes[index].done = !notes[index].done;

      await AsyncStorage.setItem('notes', JSON.stringify(notes));

      dispatch(getNotesFunction(notes));

      return;
    } catch (err) {
      console.error(err);
    }
  };

export const setNewNote =
  ({ newNote }: { newNote: INote }) =>
  (dispatch: AppDispatch) => {
    dispatch(setNewNoteFunction(newNote));
  };

export const setEditNote =
  ({ editNote }: { editNote: INote }) =>
  (dispatch: AppDispatch) => {
    dispatch(setEditNoteFunction(editNote));
  };

export const unsetEditNote = () => (dispatch: AppDispatch) => {
  dispatch(deleteEditNote());
};
