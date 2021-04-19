function getTopicsItem(sur, idx){
    let jumpLink = 'topic/topic-detail';
    let delLink = 'topic/topic-delete'
    let jumpPares = {
        id: sur.topic_id
    };
    let delPares = {
        id: sur.topic_id
    };

    return '<div class="tr-li"><div class="tr-left"><a>'
               + idx
            +'</a></div><div class="tr-right"><div class="tr-r-con"><div class="tr-r-link"><a href="'
                    + linkMaker(jumpLink, jumpPares)//'surveys-detail.html?id=' + sur.id
                    + '">'
                    + sur.topic_tit
                    + '</a> </div> <a class="tr-r-del" href="'
                    + linkMaker(delLink, delPares)
                    + '"></a></div></div></div>';
}

function addTopicsList(topics){
    for (let i in topics)
        $('#topics-box').innerHTML += getTopicsItem(topics[i], Number(i)+1);
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
            topic_tit: 'surrrr1111111',
            topic_id: 'dfslkj3ljdsljfls'
        },{
            topic_tit: 'sur22222222',
            topic_id: 'dfslkj3lfls'
        },{
            topic_tit: '3333333susssssj',
            topic_id: 'dfslk3ljdsls'
        }]
    };

    // 原始数据
    let _jsp = g_jsp_data;
    console.log(_jsp);
    //页面数据
    let p_data = new TopicList(_jsp);

    console.log(p_data);
    console.log(p_data.topics);

    // initPage(try_jsp_data);
    initPage(try_jsp_data);
}
