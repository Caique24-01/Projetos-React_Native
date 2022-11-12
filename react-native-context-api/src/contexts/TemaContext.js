import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { claro, escuro } from "../estilosGlobais";

export const TemaContext = createContext({})

export function TemaProvider( {children} ) {
    const [temaAtual, setTemaAtual] = useState('escuro')

    const temas = {
        'escuro' : escuro,
        'claro' : claro
    }

    useEffect(async () => {
        const temaSalvo = await AsyncStorageLib.getItem('@tema')
        if(temaSalvo) {
            setTemaAtual(temaSalvo)
        }
    }, [])

    async function salvarTemaNoDispositivo(tema) {
        await AsyncStorageLib.setItem('@tema', tema)
        setTemaAtual(tema)
    }
     
    return (
        <TemaContext.Provider value={{
            temaAtual, 
            setTemaAtual, 
            temaEscolhido: temas[temaAtual],
            salvarTemaNoDispositivo
        }}>
            { children }
        </TemaContext.Provider>
    )
}