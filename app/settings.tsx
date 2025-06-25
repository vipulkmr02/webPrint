import { useContext, useState } from "react";
import { TextInput, View, Switch, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appContext } from "./index";
import { Text } from "react-native";
import Header from "@/components/header";
import { styles } from "@/styles";

function Settings() {
  const AppContext = useContext(appContext);
  AppContext.heading = 'Settings';

  const labelMap = new Map<keyof typeof AppContext.settings, string>([
    ['DoubleSided', 'Always ON'],
    ['serverConfig', 'Print Server Configuration']
  ])

  const [duplex, setDuplex] = useState(AppContext.settings.DoubleSided);
  const [serverConfig, setServerConfig] = useState(AppContext.settings.serverConfig);

  return <SafeAreaView style={styles.root}>
      <Header heading="Settings" />
    <View>
      <View style={styles.centered}>
        {
          (Object.keys(AppContext.settings) as Array<keyof typeof AppContext.settings>).map(
            (x) => {
              if (x === 'serverConfig') {
                return <View key='serverConfig' style={[styles.responsiveContainer, styles.settingsRows, { flexDirection: 'column' }]}>
                  <Text
                    style={[styles.header, styles.alignStart]}
                    key={x}> {labelMap.get(x)} </Text>
                  <View style={[styles.fullWidth, styles.twoEnds]}>
                    <Text style={styles.settingsKey}> Host </Text>
                    <TextInput
                      style={[{ textAlign: 'right' }, styles.input]}
                      value={serverConfig.HOST}
                      onChange={(e) => {
                        const newHost = e.nativeEvent.text;
                        AppContext.settings.serverConfig.HOST = newHost;
                        setServerConfig({ HOST: newHost, PORT: serverConfig.PORT })
                      }}
                    ></TextInput>
                  </View>
                  <View style={[styles.fullWidth, styles.twoEnds]}>
                    <Text style={styles.settingsKey}> Port </Text>
                    <TextInput
                      style={[{ textAlign: 'right' }, styles.input]}
                      value={serverConfig.PORT.toString()}
                      keyboardType="numeric"
                      onChange={(e) => {
                        const newPORT = parseInt(e.nativeEvent.text);
                        AppContext.settings.serverConfig.PORT = newPORT;
                        setServerConfig({ PORT: newPORT, HOST: serverConfig.HOST })
                      }}
                    ></TextInput>
                  </View>
                </View>
              }

              if (x === 'Landscape') return

              return <View key='Duplex Options'
                style={styles.settingsRows}
              >
                <Text style={[styles.header, styles.alignStart]}>Duplex Printing</Text>
                <View style={[styles.fullWidth, styles.twoEnds]}>
                  <Text style={styles.settingsKey} key={x}> {labelMap.get(x)} </Text>
                  <Switch
                    value={duplex}
                    onValueChange={(newValue) => {
                      AppContext.settings.DoubleSided = newValue;
                      setDuplex(newValue)
                    }} />
                </View>
              </View>
            }
          )
        }
      </View>
    </View>
  </SafeAreaView>
}

export default Settings;
