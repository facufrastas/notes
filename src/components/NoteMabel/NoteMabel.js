import React from "react";
import { View, Text, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import * as Clipboard from "expo-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "../../assets/styles/components/NoteMabel";

const NoteMabel = ({ note, index, setEditNote, deleteNote }) => {
  const copyToClipboard = () => {
    Clipboard.setString(note?.note);
    ToastAndroid.show("¡Texto copiado exitosamente!", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.noteMabel} key={index}>
      <Text style={styles.noteMabel__content} onPress={copyToClipboard}>
        {index + 1} - {note.note} {note.favourite ? " - ★" : null}
      </Text>
      <View style={styles.noteMabel__crudButtons}>
        <TouchableOpacity
          onPress={() => {
            setEditNote({ editNote: note, id: note._id });
          }}>
          <Text style={styles.noteMabel__crudButtons__button}>
            <FontAwesomeIcon icon={faEdit} size={27} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Borrar Nota", "¿Estás seguro que querés borrar esta nota?", [
              {
                text: "Cancelar",
                style: "cancel",
              },
              { text: "Borrar", onPress: () => deleteNote({ id: note._id }) },
            ])
          }>
          <Text style={styles.noteMabel__crudButtons__button}>
            <FontAwesomeIcon icon={faTrashAlt} size={27} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteMabel;
