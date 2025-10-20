import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { INote } from '../utils/interfaces';

export interface stateProps {
  notes: INote[];
  loading: boolean;
  newNote: string;
  edit: boolean;
  editNote: INote;
}

const initialState: stateProps = {
  notes: [],
  loading: false,
  newNote: '',
  edit: false,
  editNote: {
    id: '',
    note: '',
    important: false,
    done: false
  }
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    loadingFunction: (state) => {
      state.loading = true;
    },
    getNotes: (state, action: PayloadAction<INote[]>) => {
      state.loading = false;
      state.notes = action.payload;
      state.edit = false;
    },
    setNewNote: (state, action: PayloadAction<INote>) => {
      state.newNote = action?.payload?.note;
    },
    setEditNote: (state, action: PayloadAction<INote>) => {
      state.edit = true;
      state.editNote = action.payload;
    },
    deleteEditNote: (state) => {
      state.editNote = {
        id: '',
        note: '',
        important: false,
        done: false
      };
      state.edit = false;
    }
  }
});

export const { loadingFunction, getNotes, setNewNote, setEditNote, deleteEditNote } = notesSlice.actions;

export default notesSlice.reducer;
