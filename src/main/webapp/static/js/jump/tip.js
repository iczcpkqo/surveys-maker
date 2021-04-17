window.onload = function(){
    let p_data = g_jsp_data;

    pageJump(p_data.type, p_data.pares);
}
function pageJump(type, pares){
    let addr = '';

    switch (type){
        case 'login':
            addr += '../login/login.html';
            break;
        case 'register':
            addr += '../register/register';
            break;
        default:
            console.log('default');
    }

    addr += '?';
    for (let i in pares)
        addr += i + '=' + pares[i] + '&';

    window.location.replace(addr);
}
