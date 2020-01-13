//lógica do jogo

//função que cria o tabuleiro
//criação da matriz (array de arrays): retorna um objeto {row: row, column: column}
const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

//função que espalha as minas dentro do tabuleiro
const spreadMines = (board, minesAmount) => {
    //pega a quantidade de linhas
    const rows = board.length
    //pega a quantidade de colunas (de um índice pois é uma matriz simétrica)
    const columns = board[0].length
    let minesPlanted = 0
    while (minesPlanted < minesAmount) {
        //gera um número aleatório inteiro entre 0 e o núm de linhas, na base 10 - decimal (react native pode reclamar da base)
        const rowSel = parseInt(Math.random() * rows, 10)
        const columnSel = parseInt(Math.random() * columns, 10)

        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}

//função que chama as duas primeiras - cria um tabuleiro ja com as minas plantadas
//única função que é exportada, só esta pode ser visualizada
const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

//de acordo com o princípio funcional, vc não modifica o estado de um componente diretamente
//vc cria um clone e dps atualiza, pois, em situações em que um componente possui várias referências, é mais seguro atualizá-lo
//apenas qnd as mudanças forem efetivadas por completo. 
//Isso gera um menor acoplamento.
const cloneBoard = (board) => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

//pega os vizinhos
const getNeighbors = (board, row, column) => {
    const neighbors = []
    //pega as possibilidades - anterior e posterior
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]

    //tratamento: deve excluir o próprio campo e também aqueles que ultrapassam o tabuleiro
    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            //pode adicionar o vizinho na lista 
            if(different && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

//verifica se a vizinhança é segura
const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

//função que abre o campo ao clicar/pressionar
//função recursiva pois pode ir abrindo os campos vizinhos dos vizinhos se não houver mina
const openField = (board, row, column) => {
    const field = board[row][column]
    //se o campo não estiver aberto
    if(!field.opened){
        field.opened = true
        if(field.mined) {
            field.exploded = true
        } else if(safeNeighborhood(board, row, column)) { //se a vizinhança for segura
            getNeighbors(board, row, column).forEach(n => openField(board, n.row, n.column)) //abre os campos vizinhos recursivamente
        } else {
            //calcula quantas minas estão ao redor, só calcula quando o campo abre 
            //(não calcula todos ao início do jogo, pois estratégia lazy - não gasta poder computacional nem a bateria do celular)
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

//percorre todos os campos
//junta todos os arrays em um único array com todos os campos de forma linear
//substitui fazer um for dentro do outro
const fields = board => [].concat(...board)

//verifica se teva uma explosão para saber se o jogo terminou ou nao
const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0

//verifica se existe campos pendentes
//campos pendentes são aqueles que o usuário não abriu ainda, ou um campo que possui uma mina mas não foi marcado com a flag
const pendding = field => (field.mined && !field.flagged)
                || (!field.mined && !field.opened)

//verifica se ganhou o jogo
const wonGame = board => fields(board).filter(pendding).length === 0

//exibir as minas
const showMines = board => fields(board).filter(field => field.mined)
                .forEach(field => field.opened = true)

const invertFlag = (board, row, column) => {
    const field = board[row][column]
    //inverte o estado: se tiver marcado com a bandeira desmarca e se ñ estiver marcado marca com a bandeira
    field.flagged = !field.flagged
}

//calcula quantas flags já foram utilizadas
const flagsUsed = board => fields(board).filter(field => field.flagged).length

export { 
    createMinedBoard,
    cloneBoard,
    openField, 
    hadExplosion, 
    wonGame, 
    showMines,
    invertFlag,
    flagsUsed,
}