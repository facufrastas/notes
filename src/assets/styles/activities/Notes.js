import { StyleSheet } from "react-native";

export default StyleSheet.create({
  notes: {
    backgroundColor: "#202125",
    height: "100%",
  },
  notes__contentCenter: {
    alignItems: "center",
  },
  notes__title: {
    color: "#fff",
    marginVertical: 10,
    fontSize: 20,
  },
  notes__inputBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  notes__inputBar__text: {
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
  notes__inputBar__textDelete: {
    color: "#cecece",
    position: "absolute",
    right: 10,
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
  },
  notes__horizontalAlign: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  notes__extraMarginButton: {
    marginVertical: 10,
  },
  notes__extraMargin: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
});
