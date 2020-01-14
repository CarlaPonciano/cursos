const produtos = [
    { nome: "Notebook", preco: 2499, fragil: true},
    { nome: "iPad Pro", preco: 4199, fragil: false},
    { nome: "Copo de Vidro", preco: 12.49, fragil: true},
    { nome: "Copo de Plástico", preco: 18.99, fragil: false}
]

console.log(produtos.filter( a => a.fragil && a.preco >= 500 ))

const caro = a => a.preco >= 500
const fragil = a => a.fragil

console.log(produtos.filter(caro).filter(fragil))