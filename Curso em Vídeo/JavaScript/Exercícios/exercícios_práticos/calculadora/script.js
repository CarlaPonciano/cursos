function tabuada(){
    let tnum = window.document.getElementById('txtnum')
    let tab = window.document.getElementById('select_tabuada')

    if(tnum.value.length == 0){
        window.alert('Por favor, digite um número!')
    }else{
        let num = Number(tnum.value)
        tab.length = 0
        for(let i=1; i<=10; i++){
            let item = document.createElement('option')
            item.text = `${num} x ${i} = ${num*i}`
            item.value = `tab${i}`
            tab.appendChild(item)
        }
    }

}