function setTit(txt){
    $('#tip-tit').innerHTML = txt;
}

function setDes(txt){
    $('#tip-des').innerHTML = txt;
}

function setView(idx, type, pares){
    let o = (idx, type, pares) => {
        if(idx < 1)
            pageJump(type, pares);
        $('#tip-view').innerHTML = idx--;
        setTimeout(o, 1000, idx, type, pares);
    }
    o(idx, type, pares);
}

function pageJump(type, pares){
    window.location.replace(linkMaker(type, pares));
}

window.onload = function(){
    let p_data = g_jsp_data;

    setTit(p_data.tit);
    setDes(p_data.des);
    setView(3, p_data.type, p_data.pares);
}

