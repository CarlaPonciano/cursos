import React from 'react'
import { View, StyleSheet } from 'react-native'
import Field from './Field'

export default props => {
    //transforma cada campo em um componente JSX (Field)
    const rows = props.board.map((row, r) => {
        const columns = row.map((field, c) => {
            //retorna a chave pq sempre que você retorna um elemento JSX tem q retornar também a chave se n gera uma advertência
            //é utilizado pelo react mara mexer exatamente no componente correto (identificação única)
            return <Field {...field} key={c}
                    onOpen={() => props.onOpenField(r, c)} 
                    onSelect={e => props.onSelectField(r, c)}/>
        })
        return <View key={r} style={{flexDirection: 'row'}}>{columns}</View>
    })
    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: '#EEE',
    }
})