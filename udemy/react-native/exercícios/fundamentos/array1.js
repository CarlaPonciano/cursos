const nomes = ['Carla', 'Patrícia', 'Julianna']

nomes.sort()
nomes.splice(0, 1, 'Carlos', 'Guilherme')
delete nomes[0]
nomes.push('Jéssica')
nomes.pop()
nomes.shift() 
delete nomes[0]
nomes.shift()
nomes.unshift('Carla')
console.log(nomes, nomes.length)

const as_mais_lindas = nomes.slice(1)
console.log(as_mais_lindas)
const as_mais_lindas2 = nomes.slice(0, 1)
console.log(as_mais_lindas2)