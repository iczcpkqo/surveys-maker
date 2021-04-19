function templateFooter(){

}

function templateHeader(id, sel){
    $('#id').innerHTML = '<div class="bar-top-1">'
            + '<p class="tit">Surveys Maker System</p>'
            + '<div class="account">Xiang.Mao@outlook.com</div>'
            + '<div class="nav-con">'
                + '<a class="nav-li sel">Surveys List</a>'
                + '<a class="nav-li">Topic List</a>'
            + '</div>'
        + '</div>';
}

window.onload = function(){
    // templateHeader();
}