import { Alert, Button, View } from 'react-native'
import { supabase } from '../services/supabase'

export default function TestScreen() {

  const probarConexion = async () => {

    const { data, error } = await supabase
      .from('estado_alerta')
      .select('*')

    if (error) {
      console.log(error)
      Alert.alert('Error', error.message)
      return
    }

    console.log(data)

    Alert.alert(
      'Conexión exitosa',
      JSON.stringify(data)
    )
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button
        title="Probar Supabase"
        onPress={probarConexion}
      />
    </View>
  )
}