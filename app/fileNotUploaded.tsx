import { styles } from "@/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function fileNotUploaded() {
    return <SafeAreaView style={{ height: '100%' }}>
        <View style={{
            display: 'flex',
            alignItems: 'center', height: '100%',
            justifyContent: 'center',
            gap: 20
        }}>
            <MaterialIcons name="sync-problem" size={100} color="red" />
            <Text style={{ fontSize: 25 }}>
                Unable to upload file to the server.
            </Text>
            <Link style={styles.button} href={'/'}> Go Home </Link>
        </View>
    </SafeAreaView>
}
export default fileNotUploaded;
