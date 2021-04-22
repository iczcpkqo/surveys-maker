function iniPage(id){
    let link = 'start';
    let par = {
        surveys_id: id
    }

    $('#transit-tit').innerHTML = '点击开始答题';
    $('#transit-des').innerHTML = '点击后你将开始答题了';
    $('#transit-remark').innerHTML = '备注信息';

    $('#transit-operation').innerHTML = '<a id="transit-button" class="btn-1"></a>';
    $('#transit-button').addEventListener('click', ()=>{
        window.location.replace(linkMaker(link, par));
    })
}

window.onload = function(){
    let surveys_id = getPar('surveys_id');
    iniPage(surveys_id);
}
