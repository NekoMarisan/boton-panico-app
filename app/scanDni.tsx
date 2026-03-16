import { View, Text, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

export default function ScanDni() {

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <Text>Cargando cámara...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Necesitamos permiso para usar la cámara</Text>
        <Text onPress={requestPermission}>Conceder permiso</Text>
      </View>
    );
  }

  const handleScan = ({ data }: any) => {

    router.push({
      pathname: "/login-face",
      params: { qrData: data }
    });

  };

  return (

    <View style={styles.container}>

      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"]
        }}
        onBarcodeScanned={handleScan}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>
          Escanee el QR del carnet
        </Text>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container:{ flex:1 },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  overlay:{
    position:"absolute",
    top:100,
    width:"100%",
    alignItems:"center"
  },

  title:{
    color:"white",
    fontSize:20,
    fontWeight:"bold"
  }

});