const pessoa = {
    nome: 'Carla',
    idade: 19,
    endereco: {
        nome: 'Nome',
        rua: 'Rua',
        bairro: 'Bairro'
    }
}

const {nome:n, idade:i, endereco} = pessoa
const {endereco : {nome:n_end, rua:r_end, bairro:b_end}} = pessoa

console.log(n_end, r_end, b_end)

//console.log(nome, idade)
console.log(n, i, endereco)

const { sexo, estado_civil = 'solteira' } = pessoa
console.log(sexo, estado_civil)