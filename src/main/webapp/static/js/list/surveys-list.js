function btnGetShareLink(btn, host){
    host += '/client/transit'
    let par = {
        surveys_id: btn.id
    }
    let shareLink = linkMaker(host, par);
    let msg = 'The link has been copied to the clipboard.';
    copyToClip(shareLink, msg);
}

function getSurveysItem(sur, idx){
    console.log(sur);
    console.log(idx);
    let jumpLink = 'surveys-view';
    let delLink = 'surveys-delete'
    let jumpPares = {
        surveys_id: sur.id
    };
    let delPares = {
        surveys_id: sur.id
    };

    return '<div class="tr-li"><div class="tr-left"><a>'
               + idx
            +'</a></div><div class="tr-right"><div class="tr-r-con"><div class="tr-r-link"><a href="'
                    + linkMaker(jumpLink, jumpPares)//'surveys-detail.html?id=' + sur.id
                    + '">'
                    + sur.tit
                    + '</a> </div> <a class="tr-r-del" href="'
                    + linkMaker(delLink, delPares)
                    + '"></a> <div class="tr-r-share share-button" id="'
                    + sur.id
                    + '"></div> </div> </div> </div>';
}

function addSurveysList(sures, host){
    for (let i in sures)
        $('#surveys-box').innerHTML+=getSurveysItem(sures[i], Number(i)+1);
    let shareBox = $('.share-button');
    for (let i=0; i<shareBox.length; i++)
        shareBox[i].addEventListener('click', ()=>{ btnGetShareLink(shareBox[i], host); });
}

function initPage(data){
    addSurveysList(data.surveys, data.host);
    addPaging(data.page, data.page_amount);
}

/**
 * @type
 */

/**
 * @param
 */
window.onload = function(){
    let try_jsp_data = {
        page: 3,
        page_amount: 7,
        surveys:[{
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
    //页面数据
    let p_data = new DataList(_jsp);

    // initPage(try_jsp_data);
    initPage(p_data);
}
