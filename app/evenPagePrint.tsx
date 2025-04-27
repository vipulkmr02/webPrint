import { styles } from "@/styles";
import { Button, View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { appContext } from "./index";
import Header from "@/components/header";

export default function EvenPagesPrint() {
  const [jobComplete, setJC] = useState(false);
  const AppContext = useContext(appContext);
  const serverAddr = `http://${AppContext.settings.serverConfig.HOST}:${AppContext.settings.serverConfig.PORT}`;
  const evenPagePrintEndpoint = `${serverAddr}/complete-duplex/${AppContext.file!.name}`.replace(
    / /g, "%20"
  );

  return <SafeAreaView style={styles.root}>
    <Header heading="Duplex Printing" />
    <View style={[
      styles.errorPage,
      {
        width: Dimensions.get("window").width < 768 ? "100%" : "70%",
        margin: "auto"
      }
    ]}>
      <Text style={[styles.button]} onPress={() => {
        console.log("Printing left pages");
        console.log(evenPagePrintEndpoint);
        fetch(evenPagePrintEndpoint, { method: 'POST' }).then(
          (res) => {
            if (res.ok && !jobComplete) {
              setJC(true);
            }
          }
        )
      }}>Print left Pages</Text>
    </View>

    {
      jobComplete &&
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.centerText}>Duplex printing completed successfully</Text>
      </View>
    }
  </SafeAreaView>
}
