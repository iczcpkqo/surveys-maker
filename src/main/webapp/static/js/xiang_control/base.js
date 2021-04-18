function addClass(obj, cls) {
    let objCls = obj.getAttribute('class');
    objCls = objCls || '';
    if(objCls.indexOf(cls) !== -1)
        return false;
    objCls += ' ' + cls;
    objCls = objCls.trim();
    obj.setAttribute('class', objCls);

    return obj;
}

function delItem(){
    let li = this.parentNode.parentNode;
    let liBox = this.parentNode.parentNode.parentNode;
    liBox.removeChild(li);
}

function loadJS(src, o=false) {
    let script = document.createElement('script');
    let head = document.getElementsByTagName('head')[0];

    script.type = 'text/javascript';
    script.src = src;

    if (script.addEventListener) {
        script.addEventListener('load', function () {
            if (o)
                o();
            else
                console.log('Load Successfully: ' + src);
        }, false);
    }

    head.appendChild(script);
}

function $(id){
    let model = id.slice(0,1);
    id = id.slice(1);
    switch(model){
        case '#':
            return document.getElementById(id);
        case '.':
            return document.getElementsByClassName(id);

    }
}


/**
 *
 * @param addr {string}, The http address of this link.
 * @param pares {json}, pares = {
 *                                  parameter 1: value of parameter 1,
 *                                  parameter 2: value of parameter 2
 *                                  ...
 *                                  parameter n: value of parameter n
 *                              }
 * @returns link {string}, The whole address of this link.
 */
function linkMaker(addr, pares){
    if(!pares || !addr)
        return addr;

    let link = addr + '?';
    for(let i in pares)
        link += i + '=' + pares[i] + '&'
    link = link.substring(0, link.length - 1);

    return link;
}

/**
 * 复制内容到粘贴板
 * content : 需要复制的内容
 * message : 复制完后的提示，不传则默认提示"复制成功"
 */
function copyToClip(content, message) {
    var aux = document.createElement("input");
    aux.setAttribute("value", content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    if (message == null) {
        alert("The link has been copied to the clipboard.");
    } else{
        alert(message);
    }
}
