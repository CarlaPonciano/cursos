import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import Button from './src/components/Button'
import Display from './src/components/Display'

//estado inicial 
const initialState = {
    displayValue: '0',
    clearDisplay: false, //informa se o display precisa ser limpo no próximo digito a ser pressionado 
    operation: null, //qual operação está setada
    values: [0, 0], //array de valores - lógica da calculadora
    current: 0, //qual o índice do array no momento
}

export default class App extends Component {
  state = { ...initialState } //operador Spread - pega todos os atributos
  //clone do objeto, criou um novo objeto com os mesmos valores

  //adiciona os dígitos padrões no display (0..9)
  addDigit = n => {
    //limpa o display se estiver setado em 0 ou com a variavel de limpar true
    const clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay

    //validação do '.' - não pode adicionar se já existir
    if( n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue
    //concatenação dos valores (strings)
    const displayValue = currentValue + n
    //seta o estado
    this.setState({ displayValue, clearDisplay: false })

    if( n !== '.' ){
      const newValue = parseFloat(displayValue)
      //cria um novo vetor para depois fazer a atulização
      const values = [...this.state.values]
      values[this.state.current] = newValue
      //muda o estado
      this.setState({ values })
    }
  }

  //limpa o display quando pressiona o AC
  clearMemory = () => {
    //restaura o estado inicial da calculadora
    this.setState({ ...initialState })
  }

  //acionado quando pressionado os dígitos de operações (+ , - , * , /, =)
  setOperation = operation => {
    if(this.current === 0){ //caso inicial
      this.setState({ operation, current: 1, clearDisplay: true}) 
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        values[0] = 
          eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`, //garante que é uma string para não dar erro 
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        //clearDisplay: !equals,
        clearDisplay: true,
        values, //mesmo nome do atributo, nao precisa colocar values = values
      })
    }
  }

  //no operation coloca arrow function pois precisa passar um parâmetro
  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='*' operation onClick={this.setOperation} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={this.setOperation} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='0' double onClick={this.addDigit} />
          <Button label='.' onClick={this.addDigit} />
          <Button label='=' operation onClick={this.setOperation} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap' //quebrar a linha
  }
})