function setTit(txt){
    $('#tip-tit').innerHTML = txt;
}

function setDes(txt){
    $('#tip-des').innerHTML = txt;
}

function setView(txt, idx){
    // let o = () =>

}

function pageJump(type, pares){
    let addr = type;
    console.log(pares);
    // switch (type){
    //     case 'login':
    //         addr += '../login/login.html';
    //         break;
    //     case 'register':
    //         addr += '../register/register';
    //         break;
    //     default:
    //         console.log('default');
    // }

    addr += '?';
    for (let i in pares)
        addr += i + '=' + pares[i] + '&';
    addr = addr.substring(0, addr.length - 1);

    window.location.replace(addr);
}

window.onload = function(){
    let p_data = g_jsp_data;

    /*** temp ***/
    console.log(p_data);
    $('#temp').addEventListener('click', () => {
        pageJump(p_data.type, p_data.pares);
    });
    /*** temp END ***/

    // pageJump(p_data.type, p_data.pares);
}

