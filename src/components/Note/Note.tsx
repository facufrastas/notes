import React from 'react';
import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { deleteNote, setEditNote } from '../../api/notes';
import { useAppDispatch } from '../../app/hooks';
import styles from '../../styles/components/Note';

import { Props } from './';

const Note = ({ note, index }: Props) => {
  const dispatch = useAppDispatch();
  const copyToClipboard = () => {
    Clipboard.setString(note?.note);
    ToastAndroid.show('¡Texto copiado exitosamente!', ToastAndroid.SHORT);
  };

  return (
    <View key={index} style={[!note.important ? styles.note : styles.note__important]}>
      <Text style={[!note.important ? styles.note__content : styles.note__content__important, note.done && styles.note__content__done]} onPress={copyToClipboard}>
        {index + 1} - {note.note}
      </Text>
      <View style={styles.note__crudButtons}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setEditNote({ editNote: note }));
          }}
        >
          <Text style={[!note.important ? styles.note__crudButtons__button : styles.note__crudButtons__button__important]}>
            <FontAwesomeIcon icon={faEdit} size={27} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Borrar Nota', '¿Estás seguro que querés borrar esta nota?', [
              {
                text: 'Cancelar',
                style: 'cancel'
              },
              { text: 'Borrar', onPress: () => dispatch(deleteNote({ id: note.id })) }
            ])
          }
        >
          <Text style={[!note.important ? styles.note__crudButtons__button : styles.note__crudButtons__button__important]}>
            <FontAwesomeIcon icon={faTrashAlt} size={27} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Note;
