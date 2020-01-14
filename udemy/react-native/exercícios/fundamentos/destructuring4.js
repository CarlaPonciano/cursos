function rand( [min = 0, max = 1000] = []){ //desestruturação
    if(min > max) [min, max] = [max, min]  //muda os valores da variável utilizando desestruturação a partir da criação de um array com max, min
    const valor = Math.random() * (max - min) + min
    return Math.floor(valor)
}

console.log(rand([50, 40]))
console.log(rand([992]))
console.log(rand([, 10]))
console.log(rand([]))
console.log(rand())