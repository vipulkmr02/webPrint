import { View, Text, Switch, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles";
import { useContext, useState } from "react";
import { appContext } from "./index";
import { Link, router } from "expo-router";
import Header from "@/components/header";
import { PrintJob } from "@/interfaces/printJob";
import fetch from 'expo-fetch';

export default function printPage() {
  const AppContext = useContext(appContext);
  const [doubleSide, setDoubleSide] = useState(AppContext.settings.DoubleSided);
  const [landscape, setLandscape] = useState(AppContext.settings.Landscape);
  const [copies, setCopies] = useState(1);

  const { HOST, PORT } = AppContext.settings.serverConfig;
  const serverAddr = `http://${HOST}:${PORT}`;

  function submitJob() {
    const job: PrintJob = {
      copies: copies,
      doubleSided: doubleSide,
      fileName: AppContext.file?.name ?? '<no-file>',
      printer: AppContext.printer?.name ?? ' '
    }
    const formData = new FormData();
    formData.append(
      'job',
      new File(
        [JSON.stringify(job)],
        `${new Date().getTime()}.job`,
        { type: 'application/json' }
      )
    );

    console.log('sending job to', serverAddr + '/fileUpload')
    fetch(serverAddr + '/fileUpload', {
      method: 'POST',
      body: formData,
      headers: {
        "Accept": "application/json",
      }
    }).then((res) => {
      console.log('response', res)
      if (res.ok) {
        console.log('all ok');
        doubleSide && router.navigate('/evenPagePrint') || router.navigate('/success');
      } else {
        console.error("error in sending file")
      }
    })
  }

  if (AppContext.file !== null) {
    return <SafeAreaView style={styles.root}>
      <Header heading="Print" />
      <View style={[styles.layoutPrint]}>
        <View>
          <View
            style={[
              styles.twoEnds,
              styles.fullWidth,
              styles.subheader, {
                marginBottom: 30,
              }
            ]}
          >
            <Text style={[styles.header]}>File Selected</Text>
            <Text style={[styles.highlight, { width: 150 }]}>
              {AppContext.file.name}
            </Text>
          </View>

          <Text style={styles.subheader}>Print Options</Text>
          <View className="form">

            <View style={styles.formInput}>
              <Text>Copies</Text>
              <View style={styles.twoEnds}>
                <Text style={[
                  styles.button,
                  copies <= 1 ? styles.disabled : {},
                  { fontFamily: 'monospace' }
                ]} onPress={() => {
                  if (copies > 1) {
                    setCopies(copies - 1)
                  }
                }}> - </Text>
                <TextInput
                  value={copies.toString() === "NaN" ? "" : copies.toString()}
                  style={[
                    styles.input,
                    styles.copiesInput
                  ]}
                  onChange={e => {
                    setCopies(parseInt(e.nativeEvent.text))
                  }}
                  keyboardType="numeric"
                />
                <Text style={[
                  styles.button,
                  copies >= 99 ? styles.disabled : {},
                  { fontFamily: 'monospace' }
                ]} onPress={() => {
                  if (copies) {
                    setCopies(copies + 1)
                  }
                }}> + </Text>
              </View>
            </View>
            <View style={styles.formInput}>
              <Text>Landscape</Text>

              <Switch
                value={landscape}
                onValueChange={() => {
                  setLandscape(!landscape)
                }}
              />
            </View>

            <View style={styles.formInput}>
              <Text>Double Sided</Text>

              <Switch
                value={doubleSide}
                onValueChange={() => {
                  setDoubleSide(!doubleSide)
                }}
              />
            </View>

          </View>
        </View>

        <View>
          <Text
            style={[styles.button, styles.button]}
            onPress={submitJob}
          > Print </Text>
        </View>
      </View>
    </SafeAreaView>;

  } else {
    return <SafeAreaView style={[styles.root, styles.errorPage]}>
      <Text style={[styles.subheader, styles.centerText]}> Oops! Select a file first.</Text>
      <Link style={styles.button} href={'/'}>Go Home</Link>
    </SafeAreaView>
  }
}
