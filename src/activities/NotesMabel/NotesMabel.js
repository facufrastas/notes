import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, ScrollView, ActivityIndicator, Text, ToastAndroid, RefreshControl } from "react-native";
import AppButton from "../../components/AppButton";
import NoteMabel from "../../components/NoteMabel";
import { useIsFocused } from "@react-navigation/native";
import styles from "../../assets/styles/activities/NotesMabel";

const NotesMabel = ({ notes, getNotes, postNote, deleteNote, updateNote, loading, setNewNote, editNote, idEditNote, unsetEditNote, searchNote }) => {
  const isFocused = useIsFocused();

  // Update list (Get) after a Post, Put or Delete of a note
  useEffect(() => {
    getNotes();

    if (isFocused) {
      getNotes();
    }
  }, [postNote, deleteNote, updateNote, isFocused]);

  // Update 'editNote' value after every key press
  useEffect(() => {
    setNote(editNote.note), setFavourite(editNote.favourite ? editNote.favourite : false);
  }, [editNote]);

  const [note, setNote] = useState("");
  const [searchNoteInput, setSearchNoteInput] = useState("");
  const [favourite, setFavourite] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
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
    <ScrollView style={styles.notesMabel} ref={scrollRef} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.notesMabel__contentCenter}>
        <Text style={styles.notesMabel__title}>Buscar Nota</Text>
        <View style={styles.notesMabel__inputBar}>
          <TextInput style={styles.notesMabel__inputBar__text} onChangeText={setSearchNoteInput} value={searchNoteInput} placeholder={"Ingresá la nota a buscar"} />
          {searchNoteInput?.length > 0 && (
            <Text style={styles.notesMabel__inputBar__textDelete} onPress={() => setSearchNoteInput("")}>
              X
            </Text>
          )}
        </View>
        <View style={styles.notesMabel__contentCenter}>
          <View style={styles.notesMabel__horizontalAlign}>
            <View style={styles.notesMabel__extraMarginButton}>
              <AppButton title={"Buscar"} onPress={() => searchNote({ noteString: searchNoteInput })} />
            </View>
            <View style={styles.notesMabel__extraMarginButton}>
              <AppButton
                title={"CBU"}
                onPress={() => {
                  setShowFavourites(true);
                }}
              />
            </View>
            <View style={styles.notesMabel__extraMarginButton}>
              <AppButton
                title={"Todas las Notas"}
                onPress={() => {
                  getNotes();
                  setSearchNoteInput("");
                  setShowFavourites(false);
                }}
              />
            </View>
          </View>
        </View>
        <Text style={styles.notesMabel__title}>Agregar Nota</Text>
        <View style={styles.notesMabel__inputBar}>
          <TextInput style={styles.notesMabel__inputBar__text} placeholder="Escribí la nueva nota" onChangeText={setNote} value={note} onPress={() => setNewNote(note)} />
          {note?.length > 0 && (
            <Text
              style={styles.notesMabel__inputBar__textDelete}
              onPress={() => {
                setNote("");
                unsetEditNote();
              }}>
              X
            </Text>
          )}
        </View>
        <View style={styles.notesMabel__extraMargin}>
          {editNote && note ? (
            <AppButton
              title={"Cancelar"}
              onPress={() => {
                setNote("");
                unsetEditNote();
              }}
            />
          ) : null}
          {editNote && note ? <AppButton title={"Guardar Cambios"} onPress={() => updateNote({ id: idEditNote, note, favourite }).then(setNote("")).then(setFavourite(false))} /> : null}
          {editNote && editNote.note && editNote.note.length > 0 ? null : (
            <AppButton
              title={"Agregar Nota"}
              onPress={() => {
                if (note && note.length > 0) {
                  postNote({ note, favourite }).then(setNote("")).then(setFavourite(false));
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
          !showFavourites ? (
            notes.filter((note) => !note.favourite).length > 0 ? (
              notes.filter((note) => !note.favourite).map((note, index) => <NoteMabel key={index} note={note} index={index} />)
            ) : (
              <View style={styles.notesMabel__contentCenter}>
                <Text style={styles.notesMabel__title}>No hay Notas</Text>
              </View>
            )
          ) : (
            notes.filter((note) => note.favourite).map((note, index) => <NoteMabel key={index} note={note} index={index} />)
          )
        ) : (
          <View style={styles.notesMabel__contentCenter}>
            <Text style={styles.notesMabel__title}>No hay Resultados</Text>
          </View>
        )
      ) : (
        <ActivityIndicator size="large" color="#f8d533" />
      )}
    </ScrollView>
  );
};

export default NotesMabel;
