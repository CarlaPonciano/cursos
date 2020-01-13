import params from './src/params'
import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { 
  createMinedBoard, 
  cloneBoard, 
  openField, 
  hadExplosion, 
  wonGame, 
  showMines, 
  invertFlag,
  flagsUsed
} from './src/functions'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import LevelSelection from './src/screens/LevelSelection'

export default class App extends Component {

  //construtor para chamar a funçao inicial
  constructor(props){
    //chama o super para criar o componente de forma correta
    super(props)
    //cria o estado, se fosse modificar seria this.setState
    this.state = this.createState()
  }

  //função responsável por criar a quantidade de minas no tabuleiro
  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  //cria o estado (estado do jogo - tabuleiro: quais minas foram abertos, campos com minas, campos com flag..) do componente
  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    //retorna o objeto
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  //passa o clone
  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeu!', 'Você perdeu o jogo!')
    }

    if (won) {
      Alert.alert('Parabéns!', 'Você ganhou o jogo!')
    }

    //muda o estado do componente para refletir na interface
    this.setState({ board, lost, won })
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabéns!', 'Você ganhou o jogo!')
    }

    this.setState({ board, won })
  }

  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render(){
    return(
      //cria a área para poder ser clicada
      <View style={styles.container}>
        <LevelSelection isVisible={this.state.showLevelSelection}
                onLevelSelected={this.onLevelSelected}
                onCancel={() => this.setState({ showLevelSelection: false })} />
        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
                onNewGame={() => this.setState(this.createState())}
                onFlagPress={() => this.setState({ showLevelSelection: true })}/>
        <View style={styles.board}>
          <MineField board={this.state.board} 
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
