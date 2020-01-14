const alunos = [
    { nome: 'João', nota: 7.3, bolsista: true },
    { nome: 'Maria', nota: 9.2, bolsista: false },
    { nome: 'Pedro', nota: 9.8, bolsista: true },
    { nome: 'Ana', nota: 8.7, bolsista: true }
]

const resultado = alunos.map(a => a.nota).reduce(function (acumulador, atual){
    console.log(acumulador, atual)
    return acumulador + atual
}, 30)

console.log(resultado)

const resultado2 = alunos.filter(a => a.bolsista).map(a => a.nota).reduce(function (acumulador, atual){
    console.log(acumulador, atual)
    return acumulador + atual
})

console.log(resultado2)

console.log(alunos.map(a => a.bolsista).reduce((acumulador, atual) => acumulador && atual))

console.log(alunos.map(a => a.bolsista).reduce((acumulador, atual) => acumulador || atual))