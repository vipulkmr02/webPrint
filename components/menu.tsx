import { useWindowDimensions, Text, View, Pressable, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Printer } from '@/interfaces/printer';
import { appContext } from '@/app/index';

// TODO: Implement Server Side Events support
// TODO: Implemnet keyboard navigation

export default function PrinterMenu(props: {
  sse: boolean,
  onSelect: () => void
  onUnselect: () => void
}) {
  const { sse } = props;
  const { width } = useWindowDimensions();
  const [selected, select] = useState(-1);

  const styles = StyleSheet.create({
    rootBox: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      // justifyContent: 'space-around',
      gap: 10,
    }, heading: {
      fontSize: 25,
      textAlign: 'center',
      backgroundColor: 'black',
      color: 'white',
      width: '100%',
      padding: 10,
      fontWeight: 'bold',
      marginBottom: 5,
    }, description: {
      textAlign: 'right',
      alignSelf: 'flex-end'
    }, box: {
      flexGrow: 1,
      userSelect: 'none',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: width < 768 ? '100%' : 300,
      padding: 10,
    }, name: {
      fontSize: 20
    }, availability: {
      fontWeight: 'bold',
    }, active: {
      backgroundColor: 'black',
      color: 'white',
      borderRadius: width < 768 ? 0 : 5
    }
  })

  const [printers, updatePrinters] = useState([] as Printer[]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const AC = useContext(appContext);


  useEffect(() => {
    AC.printer = printers[selected];
  }, [selected])

  // fetching printers from the server
  useEffect(() => {
    setLoading(true);
    const HOST = AC.settings.serverConfig.HOST;
    const PORT = AC.settings.serverConfig.PORT;
    const url = `http://${HOST}:${PORT}/${sse ? 'printers' : 'printers_instant'}`;

    // TODO: Implement Server Side Events support
    if (sse) console.warn('SSE not implemented yet!')
    else fetch(url).then(
      list => list.json()
    ).then(
      json => updatePrinters(json.printers)
    ).catch(
      () => setEmpty(true)
    ).finally(
      () => setLoading(false)
    )
  }, [])

  return <>
    <View style={styles.rootBox}>
      <Text style={styles.heading}>Select Your Printer 🖨️</Text>
      {
        loading ?
          <Text style={{ width: '100%', fontWeight: "bold", padding: 10, textAlign: 'center' }}>
            Fetching Printers... Please Wait.
          </Text> :
          empty ?
            <Text style={{ width: '100%', fontWeight: "bold", padding: 10, textAlign: 'center' }}>
              No Printers Found.
            </Text> :
            printers.map((x, i) => <Pressable
              key={i}
              style={[i === selected ? styles.active : {}, styles.box]}
              onPress={() => {
                select(i === selected ? -1 : i)
                i === selected ? props.onUnselect() : props.onSelect()
              }}>
              <View>
                <Text style={
                  [styles.name,
                  i === selected ? { color: 'white' } : null
                  ]} >
                  {x.name}</Text>
                <Text style={[styles.availability, i === selected ? { color: 'white' } : {}]}>
                  Status: {x.available ? "Available" : "Not Available"}</Text>
              </View>

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={
                  [styles.description,
                  i === selected ? { color: 'white' } : {}
                  ]}> {x.description}</Text>
              </View>
            </Pressable>
            )
      }
    </View>
  </>
}
