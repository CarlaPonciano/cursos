import React, { Component } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ImageBackground,
    FlatList,
    TouchableOpacity, 
    Platform,
    AsyncStorage
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br' //datas formatadas no padrão brasileiro
// não precisa colocar um nome pq não irá referenciá-lo dentro do arquivo. está apenas carregando

import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'

//imagebackground: coloca como background uma imagem
//o moment pega a data atual
//ddd: dia da semana / D: dia do mês / MMMM: mês por extenso
export default class Agenda extends Component {
    state = {
        tasks: [],
        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false,
    }

    //adicionar umas task
    addTask = task => {
        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: task.desc,
            estimateAt: task.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTask: false }, this.filterTasks)
    }

    //filtrar as tasks
    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            //se a expressão retornar true, o elemento estará no array final
            //se retornar false, não estará
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({ visibleTasks }) 
        //pega o estado atual e persiste no async storage
        //seta o item com o nome tasks
        //transforma as tasks em uma string através do JSON.stringify
        AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))

    }

    //realiza o toggle do filtro
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks}, this.filterTasks )
        //a função setState é uma função assíncrona, dessa forma, se vc colocar o comando pra
        //chamar a função na próxima linha, ela poderá ser chamada antes de mudar o estado
        //assim, o certo é colocar chamando a função como segundo parâmetro no setState
        //dessa forma, ele muda o estado e, em seguida, chama a função
    }

    //deve ser chamado também qnd o componente for renderizado (filterTasks)
    //qnd o componente é montado
    componentDidMount = async () => {
        //carrega as tasks do store
        //faz funcionar de forma síncrona (async é assíncrono)
        //await: espera a execução
        const data = await AsyncStorage.getItem('tasks')
        //transforma a string data em um array
        //|| [] pq deve receber um array, se n tiver dados coloca um array vazio
        const tasks = JSON.parse(data) || []
        this.setState({ tasks }, this.filterTasks)
    }

    toggleTask = id => {
        //const tasks = [...this.state.tasks]
        //é possível fazer usando map
        /*tasks.forEach(task => {
            if(task.id === id){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })*/

        const tasks = this.state.tasks.map(task => {
            if (task.id === id) {
                task = {...task}
                task.doneAt = task.doneAt ? null : new Date()
            }
            return task
        })
        this.setState({ tasks }, this.filterTasks)
    }

    //excluir a task
    deleteTask = id => {
        //o filter gera um novo array, por isso n tem problema colocar o comando direto no estado
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({ tasks }, this.filterTasks)
    }

    //keyextractor: sempre em um array vc precisa definir qual sera a chave q será gerada
    //propriedade para renderizar o item
    render() {
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onSave={this.addTask}
                    onCancel={() => { this.setState({ showAddTask: false }) }} />
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                    size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => 
                            <Task {...item} 
                                onToggleTask={this.toggleTask} 
                                            onDelete={this.deleteTask} />} />
                </View>
                <ActionButton buttonColor={commonStyles.colors.today}
                    onPress={() => { this.setState({ showAddTask: true }) }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end', //alinhado a direita
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    taskContainer: {
        flex: 7,
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
})

