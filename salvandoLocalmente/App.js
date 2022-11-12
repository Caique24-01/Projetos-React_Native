//import AsyncStorageLib from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import { Nota } from "./src/componentes/Nota";
import NotaEditor from "./src/componentes/NotaEditor"
import { buscaNotas, criaTabela } from "./src/services/Nota";

export default function App() {
  useEffect(() => {
    criaTabela()
    mostraNotas()
  }, [])
  
  const [ notas , setNotas ] = useState([])
  const [notaSelecionada, setNotaSelecionada] = useState({})

  async function mostraNotas() {
    const todasNotas = await buscaNotas()
    // const todasChaves = await AsyncStorageLib.getAllKeys();
    // const todasNotas = await AsyncStorageLib.multiGet(todasChaves);
    setNotas(todasNotas)
    console.log(todasNotas)
  }


  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>}
        keyExtractor={nota => nota.id}
      />  
      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

 