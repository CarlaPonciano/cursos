//sempre q tem JSX tem que importar o react
import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import params from '../params'
import Mine from './Mine'
import Flag from './Flag'

//componente funcional: baseado em função
export default props => {
    //operador destructuring
    const { mined, opened, nearMines, exploded, flagged } = props

    //estilo padrão
    const styleField = [styles.field]
    //quando está aberto
    if(opened) styleField.push(styles.opened)
    if(exploded) styleField.push(styles.exploded)
    if(flagged) styleField.push(styles.flagged)
    //estilo regular, é aplicado quando possui apenas um estilo
    if(!opened && !exploded) styleField.push(styles.regular)

    //cálculo para saber quantas minas estão presentes-> nível de perigo 
    //a cor varia de acordo com a quantidade de minas próximas
    let color = null
    if(nearMines > 0){
        if(nearMines == 1) color = '#2A28D7'
        if(nearMines == 2) color = '#2B520F'
        if(nearMines > 2 && nearMines < 6) color = '#F9060A'
        if(nearMines >= 6) color = '#F221A9'
    }

    return (
        //renderização condicional, só mostra se satisfazer os 3
        <TouchableWithoutFeedback onPress={props.onOpen}
            onLongPress={props.onSelect}>
            <View style={styleField}>
                {!mined && opened && nearMines > 0 ?
                    <Text style={[styles.label, {color: color}]}>
                        {nearMines}</Text> : false}
                {mined && opened ? <Mine /> : false}
                {flagged && !opened ? <Flag /> : false}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize,
    },
    regular: {
        backgroundColor: '#999',
        borderTopColor: '#CCC',
        borderLeftColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333',
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red',
    }
})