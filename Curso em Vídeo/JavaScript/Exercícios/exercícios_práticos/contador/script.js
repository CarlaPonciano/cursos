function contar(){
    let inicio = window.document.getElementById('txt_inicio')
    let fim = window.document.getElementById('txt_fim')
    let passo = window.document.getElementById('txt_passo')
    let res = window.document.getElementById('res')

    if(inicio.value.length == 0 || fim.value.length == 0 || passo.value.length == 0){
        window.alert('[ERRO] Preencha os campos!')
        res.innerHTML = 'Faltam Dados!'
    }else{
        if(Number(passo.value) == 0){
            window.alert('Passo inválido! Considerando passo igual a 1')
            passo.value = 1
        }
        res.innerHTML = 'Contando: <br>'
        if(Number(inicio.value) < Number(fim.value)){
            for(let i = Number(inicio.value); i <= Number(fim.value); i+= Number(passo.value)){
                res.innerHTML += ` ${i} \u{1F449}`
            }
        }else{
            for(let i = Number(inicio.value); i >= Number(fim.value); i-= Number(passo.value)){
                res.innerHTML += ` ${i} \u{1F449}`
            }
        }
        res.innerHTML += `\u{1F3C1}`
    }
}