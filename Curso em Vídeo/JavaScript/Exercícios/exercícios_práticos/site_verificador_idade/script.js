function verificar(){
    var data_atual = new Date()
    var ano_atual = data_atual.getFullYear()

    var form_ano = window.document.getElementById('txtano')
    var res = window.document.getElementById('res')

    if(form_ano.value.length == 0 || Number(form_ano.value) > ano_atual){
        window.alert('[ERRO] Preencha os dados e tente novamente!')
    }else{
        var form_sex = window.document.getElementsByName('radsex')
        var idade = ano_atual - Number(form_ano.value)
        var img  = document.createElement('img')
        img.setAttribute('id', 'foto')

        var genero = (form_sex[0].checked) ? 'Mulher' : 'Homem'

        switch(genero){
            case 'Homem':
                if(idade >= 0 && idade < 10){
                    res.innerHTML = `Criança com ${idade} anos<br><br>`
                    img.setAttribute('src', 'img/menino.png')
                }else if(idade < 21){
                    res.innerHTML = `Jovem com ${idade} anos<br><br>`
                    img.setAttribute('src', 'img/jovem_homem.png')
                }else if(idade < 50){
                    res.innerHTML = `Adulto com ${idade} anos<br><br>`
                    img.setAttribute('src', 'img/adulto.png')
                }else{
                    res.innerHTML = `Idoso com ${idade} anos<br><br>`
                    img.setAttribute('src', 'img/idoso.png')
                }
                break;
            case 'Mulher':
                if(idade >= 0 && idade < 10){
                    res.innerHTML = `Criança com ${idade} anos<br><br>`
                    img.setAttribute('src', 'img/menina.png')
                }else if(idade < 21){
                    res.innerHTML = `Jovem com ${idade} anos<br><br>`
                    img.setAttribute('src', 'img/jovem_mulher.png')
                }else if(idade < 50){
                    res.innerHTML = `Adulta com ${idade} anos<br><br>`
                    img.setAttribute('src', 'img/adulta.png')
                }else{
                    res.innerHTML = `Idosa com ${idade} anos<br><br>`
                    img.setAttribute('src', 'img/idosa.png')
                }
                break
        }

        res.style.textAlign = 'center'
        res.appendChild(img)
    }
}