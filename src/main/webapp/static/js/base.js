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
