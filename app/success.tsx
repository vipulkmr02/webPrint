import Header from "@/components/header";
import { styles } from "@/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Success() {
  return <SafeAreaView style={{ height: '100%' }}>
    <Header heading="Easy Print" />
    <View style={{
      display: 'flex',
      alignItems: 'center', height: '100%',
      justifyContent: 'center',
      gap: 20
    }}>
      <MaterialIcons name="check-circle" size={100} color="red" />
      <Text style={{ fontSize: 25 }}>Done!</Text>
      <Link style={styles.button} href={'/'}> Go Home </Link>
    </View>
  </SafeAreaView>
}
export default Success;
