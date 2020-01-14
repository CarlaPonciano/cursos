const nums = [1, 2, 3, 4, 5]

const soma10 = a => a+10
const triplo = a => a * 3
const formtReal = a => a.toLocaleString('pt-BR', {style: 'currency', currency: "EUR"}).replace('.', ',')

const novo_array = nums.map(soma10).map(triplo).map(formtReal)

console.log(novo_array)