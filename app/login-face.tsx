import { View, Text, Button } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function LoginFace() {

  const { qrData } = useLocalSearchParams();

  const validarRostro = () => {

    router.push({
      pathname: "/register",
      params: { qrData }
    });

  };

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

      <Text style={{fontSize:22,fontWeight:"bold"}}>
        Verificación facial
      </Text>

      <Text style={{margin:20}}>
        Simulación de selfie para validar identidad
      </Text>

      <Button
        title="Tomar selfie"
        onPress={validarRostro}
      />

    </View>
  );
}