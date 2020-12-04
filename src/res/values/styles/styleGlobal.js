import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  containerOutlet: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    borderColor: "gray",
    borderRadius: 25,
    borderWidth: 1,
    height: 60,
    paddingHorizontal: 25,
    fontSize: 18,
    marginBottom: 15
    //color: "#fff"
    // borderWidth: 0,
    // borderBottomWidth: 1
  },
  buttonSave: {
    padding: 15,
    backgroundColor: "#1892d6",
    borderRadius: 25,
    marginTop: 20
  },
  closeButton: {
    padding: 15,
    backgroundColor: "#f86c6b",
    borderRadius: 25,
    marginTop: 20
  },
  cancelButton: {
    padding: 15,
    backgroundColor: "#f57c1f",
    borderRadius: 25,
    marginTop: 20
  },
  registerButton: {
    padding: 15
  },
  textButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18
  },
  textButtonRegis: {
    color: "#000",
    textAlign: "center",
    fontSize: 18
  },
  centerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#def4f0"
  },
  centerViewNoBG: {
    width: "80%"
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 25,
    width: 400,
    height: 300,
    opacity: 0.7,
    padding: 30
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover"
    // justifyContent: "center",
    // alignItems: "center"
  },
  textLabel: {
    fontSize: 20
  },
  loginForm: {
    //backgroundColor: "#fff",
    borderRadius: 25,
    width: "80%",
    paddingVertical: 30
  },
  inputField: {
    marginTop: 30
  },

  // data table
  containerButtonBottom: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4
  },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    backgroundColor: "#2eadd3"
  },
  cell: {
    alignItems: "center",
    justifyContent: "center"
  },
  saveButton: {
    backgroundColor: "#2eadd3",
    width: "100%",
    alignItems: "center",
    padding: 10,
    justifyContent: "flex-end"
  },
  //Modal
  modalCenteredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "#99FFCC",
    borderRadius: 20,
    width: "80%",
    padding: 35,
    elevation: 20
  },
  modalTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    height: 50,
    borderColor: "gray",
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 25,
    fontSize: 18,
    marginBottom: 15
  },
  modalViewButton: {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
