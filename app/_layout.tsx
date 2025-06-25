import Header from "@/components/header";
import { Slot } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return <>
    <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
    <Slot />
  </>;
}
