function setTit(txt){
    $('#tip-tit').innerHTML = txt;
}

function setDes(txt){
    $('#tip-des').innerHTML = txt;
}

function setView(idx, type, pares){
    let o = (idx, type, pares) => {
        if(idx < 0)
            pageJump(type, pares);
        $('#tip-view').innerHTML = idx--;
        setTimeout(o, 1000, idx, type, pares);
    }
    o(idx, type, pares);
}

function pageJump(type, pares){
    let addr = type;

    if(pares)
        addr += '?';
        for (let i in pares)
            addr += i + '=' + pares[i] + '&';
        addr = addr.substring(0, addr.length - 1);

    window.location.replace(addr);
}

window.onload = function(){
    let p_data = g_jsp_data;

    setTit(p_data.tit);
    setDes(p_data.des);
    setView(3, p_data.type, p_data.pares);
}

