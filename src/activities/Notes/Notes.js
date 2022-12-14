import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, ScrollView, ActivityIndicator, Text, ToastAndroid, RefreshControl, Switch } from "react-native";
import AppButton from "../../components/AppButton";
import Note from "../../components/Note";
import { useIsFocused } from "@react-navigation/native";
import styles from "../../assets/styles/activities/Notes";

const Notes = ({ notes, getNotes, postNote, deleteNote, updateNote, loading, setNewNote, editNote, unsetEditNote, searchNote }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    getNotes();
  }, []);

  // Update list (Get) after a Post, Put or Delete of a note
  useEffect(() => {
    getNotes();

    if (isFocused) {
      getNotes();
    }
  }, [postNote, deleteNote, updateNote, isFocused]);

  // Update 'editNote' value after every key press
  useEffect(() => {
    setNote(editNote.note), setImportant(editNote.important ? editNote.important : false);
  }, [editNote]);

  const [note, setNote] = useState("");
  const [searchNoteInput, setSearchNoteInput] = useState("");
  const [important, setImportant] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const scrollRef = useRef();

  useEffect(
    () =>
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      }),
    [editNote],
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getNotes().then(() => setRefreshing(false));
    }, 500);
  };

  return (
    <ScrollView style={styles.notes} ref={scrollRef} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.notes__contentCenter}>
        <Text style={styles.notes__title}>Buscar Nota</Text>
        <View style={styles.notes__inputBar}>
          <TextInput style={styles.notes__inputBar__text} onChangeText={setSearchNoteInput} value={searchNoteInput} placeholder={"Ingresá la nota a buscar"} />
          {searchNoteInput?.length > 0 && (
            <Text style={styles.notes__inputBar__textDelete} onPress={() => setSearchNoteInput("")}>
              X
            </Text>
          )}
        </View>
        <View style={styles.notes__contentCenter}>
          <View style={styles.notes__horizontalAlign}>
            <View style={styles.notes__extraMarginButton}>
              <AppButton title={"Buscar"} onPress={() => searchNote({ noteString: searchNoteInput })} />
            </View>
            <View style={styles.notes__extraMarginButton}>
              <AppButton
                title={"Todas las Notas"}
                onPress={() => {
                  getNotes();
                  setSearchNoteInput("");
                }}
              />
            </View>
          </View>
        </View>
        <Text style={styles.notes__title}>Agregar Nota</Text>
        <View style={styles.notes__inputBar}>
          <TextInput style={styles.notes__inputBar__text} placeholder="Escribí la nueva nota" onChangeText={setNote} value={note} onPress={() => setNewNote(note)} />
          {note?.length > 0 && (
            <Text
              style={styles.notes__inputBar__textDelete}
              onPress={() => {
                setNote("");
                unsetEditNote();
              }}>
              X
            </Text>
          )}
        </View>
        <View style={styles.notes__horizontalAlign}>
          <Text style={styles.notes__title}>Importante</Text>
          <Switch trackColor={{ false: "#767577", true: "#f8d533" }} thumbColor={"#f8d533"} onValueChange={setImportant} value={important} />
        </View>
        <View style={styles.notes__extraMargin}>
          {editNote && note ? (
            <AppButton
              title={"Cancelar"}
              onPress={() => {
                setNote("");
                unsetEditNote();
              }}
            />
          ) : null}
          {editNote && note ? <AppButton title={"Guardar Cambios"} onPress={() => updateNote({ id: editNote.id, note, important, done: editNote.done }).then(setNote("")).then(setImportant(false))} /> : null}
          {editNote && editNote.note && editNote.note.length > 0 ? null : (
            <AppButton
              title={"Agregar Nota"}
              onPress={() => {
                if (note && note.length > 0) {
                  postNote({ note, important }).then(setNote("")).then(setImportant(false));
                } else {
                  ToastAndroid.show("¡No podés agregar una nota vacía!", ToastAndroid.SHORT);
                }
              }}
            />
          )}
        </View>
      </View>
      {!loading ? (
        notes && notes.length > 0 ? (
          notes.sort((a, b) => b.important - a.important).map((note, index) => <Note key={index} note={note} index={index} />)
        ) : (
          <View style={styles.notes__contentCenter}>
            <Text style={styles.notes__title}>No hay Resultados</Text>
          </View>
        )
      ) : (
        <ActivityIndicator size="large" color="#f8d533" />
      )}
    </ScrollView>
  );
};

export default Notes;
