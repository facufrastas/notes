import { StyleSheet } from "react-native";

export default StyleSheet.create({
  notesMabel: {
    backgroundColor: "#202125",
    height: "100%",
  },
  notesMabel__contentCenter: {
    alignItems: "center",
  },
  notesMabel__title: {
    color: "#fff",
    marginVertical: 10,
    fontSize: 20,
  },
  notesMabel__inputBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  notesMabel__inputBar__text: {
    width: "80%",
    height: 50,
    paddingLeft: 20,
    paddingRight: 45,
    fontSize: 20,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    color: "#000",
  },
  notesMabel__inputBar__textDelete: {
    color: "#cecece",
    position: "absolute",
    right: 10,
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
  },
  notesMabel__horizontalAlign: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  notesMabel__extraMarginButton: {
    marginVertical: 10,
  },
  notesMabel__extraMargin: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
});
