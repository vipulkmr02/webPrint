import { router } from "expo-router";
import { useContext, useState } from "react";
import { View, Text, Platform, ToastAndroid, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles";
import * as DocumentPicker from 'expo-document-picker';
import { createContext } from "react";
import Header from "@/components/header";
import PrinterMenu from "@/components/menu";
import { contextType } from "@/interfaces/contextType";
import fetch from 'expo-fetch';

export const appContext = createContext<contextType>({
  file: null,
  jobName: null,
  settings: {
    DoubleSided: false,
    Landscape: false,
    serverConfig: {
      HOST: Platform.OS !== 'android' ?
        'localhost' :
        '192.168.1.229',
      PORT: 8999
    },
  }, printer: null
});

const App = () => {
  const noPrinterSelected = () => {
    if (Platform.OS === 'android')
      ToastAndroid.show('Please select a printer first', ToastAndroid.SHORT);
    else if (Platform.OS === 'web')
      alert('Please select a printer first');
  };
  const AppContext = useContext(appContext);
  const { HOST, PORT } = AppContext.settings.serverConfig;
  const serverAddr = `http://${HOST}:${PORT}/`;
  const [uploadStatus, setUploadStatus] = useState(null as 'uploaded' | 'uploading' | null);
  const [printerOn, setPrinterOn] = useState(false);

  const selectFile = () => {
    DocumentPicker.getDocumentAsync().then(
      result => {
        if (result.canceled) {
          console.log("user canceled")
        } else {
          router.push('/printPage');
          const document = result.assets[0];
          const fd = new FormData();
          fd.append('file', document.file!)

          AppContext.file = {
            name: result.assets[0].name,
            uploadStatus: uploadStatus,
            setUploadStatus: setUploadStatus,
            uri: result.assets[0].uri,
            type: (() => {
              const array = result.assets[0].name.split('.')
              return array[array.length - 1];
            })(),
          };

          fetch(serverAddr + 'fileUpload', {
            method: 'POST', body: fd
          }).then(() => {
            setUploadStatus('uploaded');
          }).catch(() => {
            setUploadStatus(null);
            router.push('/fileNotUploaded');
          })
        }
      }
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <Header heading="Easy Print" />
      <View style={styles.indexLayout}>
        <PrinterMenu
          sse={false}
          onSelect={() => { setPrinterOn(true) }}
          onUnselect={() => { setPrinterOn(false) }}
        />
        <Text
          style={[
            styles.button,
            !printerOn ? styles.disabled : {}
          ]}
          onPress={printerOn ? selectFile : noPrinterSelected}
        >Select File
        </Text>
      </View>
    </SafeAreaView >
  );
};


export default App;
