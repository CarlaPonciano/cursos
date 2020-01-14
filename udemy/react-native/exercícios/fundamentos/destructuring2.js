const a = [1,2,3]

const [b, ,d,e=0, f] = a
console.log(b,d,e, f)

const [, [, nota]] = [[, 8, 8] , [9, 6, 8]]
console.log(nota)