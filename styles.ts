import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  root: {
    marginHorizontal: "auto",
    fontFamily: 'Manrope',
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  responsiveContainer: {
    width: width < 768 ? "100%" : "70%",
    margin: "auto",
  },
  indexLayout: {
    marginVertical: "auto",
    marginHorizontal: "auto",
    width: "80%",
    height: "60%",
    justifyContent: "space-between",
  },
  printers: {
    width: "100%",
    height: "60%",
    display: "flex",
  },
  header: {
    // fontFamily: "Merriweather",
    fontSize: width < 768 ? 25 : 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    userSelect: "none",
    textTransform: "capitalize",
    fontWeight: "bold",
    textAlign: "center",
    // fontFamily: "Manrope",
    backgroundColor: "black",
    color: "white",
    borderRadius: 50,
    padding: 10,
    fontSize: 20,
    boxShadow: "0 0 5px",
  },
  disabled: {
    boxShadow: "none",
    backgroundColor: "gray",
  },
  layoutPrint: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: "auto",
    width: width < 768 ? "80%" : "50%",
    height: "80%",
  },
  input: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: 100,
  },
  formInput: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  subheader: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "left",
  },
  centerText: {
    textAlign: "center",
  },
  errorPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: "2rem",
  },
  highlight: {
    backgroundColor: "black",
    borderRadius: 5,
    color: "white",
    padding: 5,
  },
  settingsKey: {
    fontSize: 15,
    fontWeight: "bold",
  },
  settingsRows: {
    width: width < 768 ? "80%" : "40%",
    margin: width < 768 ? 20 : "auto",
    marginTop: 16,
    display: "flex",
    justifyContent: "space-between",
    gap: 5,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  alignStart: {
    alignSelf: "flex-start",
  },
  fullWidth: {
    width: "100%",
  },
  twoEnds: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  copiesInput: {
    fontSize: 20,
    borderBottomWidth: 0,
    width: 20,
    textAlign: "center",
  }, centered: {
    display: "flex",
    alignItems: "center",
  }
});

const colors = {
  gray: '#808080',
  black: '#000',
  white: '#fff',
}

export { styles, colors };
