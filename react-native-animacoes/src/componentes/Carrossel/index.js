// import React, { useState, useRef, useEffect } from "react";
// import { View, FlatList, Image } from 'react-native';
// import styles from './styles';

import { useEffect, useRef, useState } from "react";
import { FlatList, Image, View } from "react-native";
import style from "./style";

export function Carrossel({ data, tempoAnimacao = 1000 }) {
    const [indice, setIndice] = useState(0);
    const carrosselRef = useRef();

    function alteraPosicaoObjeto() {
        if (indice < data.length - 1) {
            setIndice(indice + 1);
        }
        else {
            setIndice(0);
        }
    }

    useEffect(() => {
        carrosselRef.current.scrollToIndex({ index: indice })

        const intervalo = setInterval(() => {
            alteraPosicaoObjeto();
        }, tempoAnimacao)

        return () => clearInterval(intervalo);
    }, [indice])

    return (
        <View style={style.container}>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <Image
                        source={item.imagem}
                        style={[style.image,
                        index == data.length - 1 ? { marginRight: 200 } : null
                        ]}
                        resizeMode="contain"
                    />
                )}
                ref={carrosselRef}
            />
        </View>
    )
}