import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, ScrollView, ActivityIndicator, Text, ToastAndroid, RefreshControl, Switch } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getNotes, postNote, updateNote, setNewNote, unsetEditNote, searchNote } from '../../api/notes';
import AppButton from '../../components/AppButton';
import Note from '../../components/Note';
import styles from '../../styles/screens/Notes';

const Notes = () => {
  const dispatch = useAppDispatch();
  const { notes, loading, edit, editNote } = useAppSelector((state) => state.notes);

  const isFocused = useIsFocused();
  const [note, setNote] = useState('');
  const [searchNoteInput, setSearchNoteInput] = useState('');
  const [important, setImportant] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    dispatch(getNotes());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update list (Get) after a Post, Put or Delete of a note
  useEffect(() => {
    dispatch(getNotes());

    if (isFocused) {
      dispatch(getNotes());
    }
  }, [postNote, updateNote, isFocused]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update 'editNote' value after every key press
  useEffect(() => {
    setNote(editNote.note), setImportant(editNote.important ? editNote.important : false);
  }, [editNote]);

  useEffect(
    () =>
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true
      }),
    [editNote]
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getNotes());
      setRefreshing(false);
    }, 500);
  };

  return (
    <ScrollView ref={scrollRef} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.notes}>
      <View style={styles.notes__contentCenter}>
        <Text style={styles.notes__title}>Buscar Nota</Text>
        <View style={styles.notes__inputBar}>
          <TextInput placeholder={'Ingresá la nota a buscar'} style={styles.notes__inputBar__text} value={searchNoteInput} onChangeText={setSearchNoteInput} />
          {searchNoteInput?.length > 0 && (
            <Text
              style={styles.notes__inputBar__textDelete}
              onPress={() => {
                setSearchNoteInput('');
                dispatch(unsetEditNote());
              }}
            >
              X
            </Text>
          )}
        </View>
        <View style={styles.notes__contentCenter}>
          <View style={styles.notes__horizontalAlign}>
            <View style={styles.notes__extraMarginButton}>
              <AppButton title={'Buscar'} onPress={() => dispatch(searchNote({ noteString: searchNoteInput }))} />
            </View>
            <View style={styles.notes__extraMarginButton}>
              <AppButton
                title={'Todas las Notas'}
                onPress={() => {
                  dispatch(getNotes());
                  setSearchNoteInput('');
                }}
              />
            </View>
          </View>
        </View>
        <Text style={styles.notes__title}>Agregar Nota</Text>
        <View style={styles.notes__inputBar}>
          <TextInput placeholder="Escribí la nueva nota" style={styles.notes__inputBar__text} value={note} onChangeText={setNote} onPress={() => dispatch(setNewNote({ note }))} />
          {note?.length > 0 && (
            <Text
              style={styles.notes__inputBar__textDelete}
              onPress={() => {
                setNote('');
                dispatch(unsetEditNote());
              }}
            >
              X
            </Text>
          )}
        </View>
        <View style={styles.notes__horizontalAlign}>
          <Text style={styles.notes__title}>Importante</Text>
          <Switch thumbColor={'#f8d533'} trackColor={{ false: '#767577', true: '#f8d533' }} value={important} onValueChange={setImportant} />
        </View>
        <View style={styles.notes__extraMargin}>
          {editNote && editNote.note.length > 0 && note ? (
            <AppButton
              title={'Cancelar'}
              onPress={() => {
                setNote('');
                dispatch(unsetEditNote());
              }}
            />
          ) : null}
          <AppButton
            title={edit ? 'Guardar Cambios' : 'Agregar Nota'}
            onPress={() => {
              if (editNote && edit) {
                dispatch(
                  updateNote({
                    id: editNote.id,
                    note,
                    important,
                    done: editNote.done
                  })
                );
              } else {
                if (note.length > 0) {
                  dispatch(postNote({ note, important }));
                } else {
                  ToastAndroid.show('¡No podés agregar una nota vacía!', ToastAndroid.SHORT);
                }
              }
              setNote('');
              setImportant(false);
            }}
          />
        </View>
      </View>
      {!loading ? (
        notes && notes.length > 0 ? (
          [...notes].sort((a, b) => b.important - a.important).map((note, index) => <Note key={index} index={index} note={note} />)
        ) : (
          <View style={styles.notes__contentCenter}>
            <Text style={styles.notes__title}>{searchNoteInput?.length > 0 ? 'No hay Resultados' : 'No hay Notas'}</Text>
          </View>
        )
      ) : (
        <ActivityIndicator color="#f8d533" size="large" />
      )}
    </ScrollView>
  );
};

export default Notes;
