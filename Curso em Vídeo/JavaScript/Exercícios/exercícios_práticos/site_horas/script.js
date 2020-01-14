function carregar(){
    var msg = window.document.getElementById('msg')
    var img = window.document.getElementById('img')

    var data = new Date()
    var hora = data.getHours()
    //var hora = 22

    msg.innerHTML = `Agora são ${hora} horas.`

    if(hora >= 5 && hora < 12){
        msg.innerHTML += '<br><strong>Bom Dia!</strong>'
        img.src = 'img/manha.png'
        document.body.style.background = '#c8d7ba'
    }else if(hora >= 12 && hora < 18){
        msg.innerHTML += '<br><strong>Boa Tarde!</strong>'
        img.src = 'img/tarde.png'
        document.body.style.background = '#c74e48'
    }else{
        msg.innerHTML += '<br><strong>Boa Noite!</strong>'
        img.src = 'img/noite.png'
        document.body.style.background = '#173437'
    }
}