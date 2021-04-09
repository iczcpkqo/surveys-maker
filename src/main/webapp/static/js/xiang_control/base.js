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
