const carrinho = [                              //JSON
    '{ "nome": "Borracha", "preco": 3.45 }',
    '{ "nome": "Caderno", "preco": 13.90 }',
    '{ "nome": "Kit de Lapis", "preco": 41.22 }',
    '{ "nome": "Caneta" , "preco": 7.50 }'
]

console.log(carrinho[0].nome)

const paraObj = json => JSON.parse(json) //retorna um array de objetos

const somentePreco = produto => produto.nome

const resultado = carrinho.map(paraObj).map(somentePreco)

const obj = carrinho.map(paraObj)
const json = JSON.stringify(obj)
console.log(json)

console.log(obj)
console.log(obj[2].nome)

console.log(resultado)