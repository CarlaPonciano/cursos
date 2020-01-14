import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import Swipeable from 'react-native-swipeable'

//importe dos ícones
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'

export default props => {
    //ícone para a tarefa concluída
    let check = null
    if(props.doneAt !== null) {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20} color={commonStyles.colors.secondary} />
            </View>
        )
    } else {
        check = <View style={styles.pending} />
    }

    //colocar uma linha cortando o texto se a tarefa for concluída
    //é condicional
    const descStyle = props.doneAt !== null ? 
        { textDecorationLine: 'line-through' } : {}

    //define o que vai aparecer do lado esquerdo e direito do swipe
    //conteúdo do lado esquerdo
    const leftContent = (
        <View style={styles.exclude}>
            <Icon name='trash' size={20} color={'#FFF'} />
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    )

    //vc pode colocar um array de opções de ações
    const rightContent = [
        <TouchableOpacity style={[styles.exclude, { justifyContent: 'flex-start', paddingLeft: 20  }]}
            onPress={() => props.onDelete(props.id)}>
            <Icon name='trash' size={20} color='#FFF' />
        </TouchableOpacity>,
    ]

    //toggle: mudança de estado: marcado/desmarcado
    //a task inteira é envolvida para habilitar o swipe em qualquer lugar da task
    //leftActionActivationDistance: quanto de distância irá percorrer até disparar o evento
    return (
        <Swipeable leftActionActivationDistance={200}
            onLeftActionActivate={() => props.onDelete(props.id)}
            leftContent={leftContent} rightButtons={rightContent}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
                    <View style={styles.checkContainer}>{check}</View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.description, descStyle]}>
                        {props.desc}
                    </Text>
                    <Text style={styles.date}>
                        {moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pending: {
        //desenha a bolinha
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555'
    },
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1, //coloca uma linha separando cada uma das tarefas
        borderColor: '#AAA',
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center', //alinha na row
        width: '20%'
    },
    description: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    },
    exclude: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10,
    }
})