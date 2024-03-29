import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  note: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#f8d533',
    borderRadius: 20,
    marginVertical: 5
  },
  note__important: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'tomato',
    borderRadius: 20,
    marginVertical: 5
  },
  note__content: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 35,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#f8d533',
    color: '#000',
    fontSize: 20,
    width: '80%'
  },
  note__content__important: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 17,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: 'tomato',
    color: '#000',
    fontSize: 20,
    width: '80%'
  },
  note__content__done: {
    textDecorationLine: 'line-through'
  },
  note__crudButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: Platform.OS === 'android' ? '20%' : '10%'
  },
  note__crudButtons__button: {
    paddingVertical: Platform.OS === 'android' ? 10 : 0,
    paddingHorizontal: 3,
    marginVertical: Platform.OS === 'android' ? 10 : 0,
    marginLeft: 5,
    marginRight: Platform.OS === 'android' ? 10 : 5,
    borderRadius: 10,
    backgroundColor: '#f8d533',
    color: '#000',
    fontSize: 20
  },
  note__crudButtons__button__important: {
    paddingVertical: Platform.OS === 'android' ? 10 : 0,
    paddingHorizontal: 3,
    marginVertical: Platform.OS === 'android' ? 10 : 0,
    marginLeft: 5,
    marginRight: Platform.OS === 'android' ? 10 : 5,
    borderRadius: 10,
    backgroundColor: 'tomato',
    color: '#000',
    fontSize: 20
  }
});
