//cálculo da quantidade de campos (matriz do tabuleiro do jogo) de acordo com o display celular

import { Dimensions } from 'react-native'

//os parâmteros são passíveis de serem modificados
const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, //proporção 15% pro cabeçalho e 85% pra área do jogo
    difficultLevel: 0.1, //percentual de acorco com a quantidade de campos na tela -> 10% dos campos com mina
    //método para calcular a quantidade de colunas disponíveis baseado no tamanho do bloco
    getColumnsAmount() {
        const width = Dimensions.get('window').width //largura
        return Math.floor(width / this.blockSize) //floor: arredonda pra baixo para caber todos os blocos
    },
    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height //altura total
        const boardHeight = totalHeight * (1 - this.headerRatio) //tira o percentual do header
        return Math.floor(boardHeight / this.blockSize)
    }

}

export default params