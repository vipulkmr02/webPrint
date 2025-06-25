import { useWindowDimensions, Text, View, Pressable, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Printer } from '@/interfaces/printer';
import { appContext } from '@/app/index';
import { colors } from '@/styles';
import { MaterialIcons } from '@expo/vector-icons';

// TODO: Implement Server Side Events support
// TODO: Implemnet keyboard navigation

export default function PrinterMenu(props: {
  sse: boolean,
  onSelect: (x: Printer) => void
  onUnselect: () => void
}) {
  const { sse } = props;
  const [selected, select] = useState(-1);

  const styles = StyleSheet.create({
    rootBox: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      borderWidth: 1,
      borderRadius: 5,
      boxShadow: "0 0 5px",
    }, heading: {
      fontSize: 25,
      textAlign: 'center',
      backgroundColor: 'black',
      color: 'white',
      width: '100%',
      padding: 10,
      fontWeight: 'bold',
    }, description: {
      display: 'flex',
      alignSelf: 'flex-end',
    }, box: {
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      userSelect: 'none',
      padding: 10,
    }, name: {
      fontSize: 20
    }, availability: {
      fontWeight: 'bold',
    }, active: {
      backgroundColor: 'blue',
      color: 'white',
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
  const [fp, setFP] = useState(true);
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
      json => {
        setEmpty(false);
        updatePrinters(json.printers)
      }
    ).catch(() => setEmpty(true)
    ).finally(() => setLoading(false))
  }, [fp])

  return <>
    <View style={styles.rootBox}>
      <Text style={styles.heading}>Select Your Printer</Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: "100%"
      }}>
        {loading ? <View style={{ width: '100%', margin: 15, }}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Fetching Printers... Please Wait.
          </Text> </View>
          : empty ? <View style={{
            display: 'flex',
            flexDirection: "row",
            alignItems: "center",
            margin: 15
          }}>
            <Text><MaterialIcons size={25}
              name="close"
              color={colors.gray}
            /></Text>
            <Text> No Printers Found </Text>
          </View> : printers.map((x, i) => x.available && <Pressable
            key={i}
            style={[
              i === selected ? styles.active : {},
              styles.box,
            ]}
            onPress={() => {
              select(i === selected ? -1 : i)
              i === selected ? props.onUnselect() : props.onSelect(x)
            }}>
            <View>
              <Text style={
                [styles.name,
                i === selected ? { color: 'white' } : null
                ]} >{x.name}</Text>
              <Text style={[styles.availability, i === selected ? { color: 'white' } : {}]}>
                Status: {x.available ? "Available" : "Not Available"}
              </Text>
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
      <Pressable onPress={() => {
        setFP(!fp);
      }} style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2
      }}>
        <MaterialIcons name="refresh" style={{
          fontSize: 20,
          color: colors.white
        }} />
        <Text style={{
          textAlign: 'center',
          margin: 10,
          color: colors.white
        }}> Refresh </Text>
      </Pressable>
    </View>
  </>
}
