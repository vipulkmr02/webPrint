import { View, Text  } from 'react-native'
import React from 'react'
import { colors, styles } from '@/styles'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';

export default function Header(props: { heading: string }) {
  const buttonSize = 25

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      padding: 20,
      marginLeft: 5,
      marginRight: 5,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
    }}>
      <MaterialIcons
        name="arrow-back"
        size={buttonSize}
        color={(() => !router.canGoBack() ? colors.gray : colors.black)()}
        style={{ cursor: 'pointer' }}
        onPress={() => router.canGoBack() ? router.back() : null}
      />
      <MaterialIcons
        name="home"
        size={buttonSize}
        style={{ cursor: 'pointer' }}
        onPress={() => router.dismissTo('/')}
      />
      <Text style={[styles.header, { padding: 0, flexGrow: 1 }]}>
        {props.heading}
      </Text>
      <MaterialIcons
        name="settings"
        size={buttonSize}
        color={(() => { return props.heading === "Settings" ? "transparent" : "black" })()}
        style={{ padding: 0, cursor: 'pointer' }}
        onPress={() => router.push('/settings')}
      />
    </View>
  )
}
