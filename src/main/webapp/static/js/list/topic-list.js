function getTopicsItem(sur, idx){
    let jumpLink = 'topic/topic-detail';
    let delLink = 'topic/topic-delete'
    let jumpPares = {
        id: sur.id
    };
    let delPares = {
        id: sur.id
    };

    return '<div class="tr-li"><div class="tr-left"><a>'
               + idx
            +'</a></div><div class="tr-right"><div class="tr-r-con"><div class="tr-r-link"><a href="'
                    + linkMaker(jumpLink, jumpPares)//'surveys-detail.html?id=' + sur.id
                    + '">'
                    + sur.tit
                    + '</a> </div> <a class="tr-r-del" href="'
                    + linkMaker(delLink, delPares)
                    + '"></a></div></div></div>';
}

function addTopicsList(sures){
    for (let i in sures)
        $('#topics-box').innerHTML += getTopicsItem(sures[i], Number(i)+1);
}

function addNewTopic(){
    $('#new-topic').addEventListener('click',()=>{
        window.location.href = "topic-detail";
    });
}

function initPage(data){
    addTopicsList(data.topics);
    addPaging(data.page, data.page_amount);
    addNewTopic();
}

/**
 * @type
 */

/**
 * @param
 */
window.onload = function(){
    let try_jsp_data = {
        page: 24,
        page_amount: 48,
        topics:[{
            tit: 'surrrr1111111',
            id: 'dfslkj3ljdsljfls'
        },{
            tit: 'sur22222222',
            id: 'dfslkj3lfls'
        },{
            tit: '3333333susssssj',
            id: 'dfslk3ljdsls'
        }]
    };

    // 原始数据
    let _jsp = g_jsp_data;
    console.log(_jsp);
    //页面数据
    let p_data = new DataList(_jsp);

    console.log(p_data);

    // initPage(try_jsp_data);
    initPage(try_jsp_data);
}
