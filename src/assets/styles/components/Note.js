import { StyleSheet } from "react-native";

export default StyleSheet.create({
  note: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#f8d533",
    borderRadius: 20,
    marginVertical: 15,
  },
  note__content: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 17,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#f8d533",
    color: "#000",
    fontSize: 20,
    width: "80%",
  },
  note__crudButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "20%",
  },
  note__crudButtons__button: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#f8d533",
    color: "#000",
    fontSize: 20,
  },
});
