function btnGetShareLink(){
    let shareLink = 'share.html?id=' + this.id;
    let msg = 'The link has been copied to the clipboard.';
    copyToClip(shareLink, msg);
}

function getSurveysItem(sur, idx){
    let jumpLink = 'surveys-detail.html';
    let delLink = 'del.html'
    let jumpPares = {
        id: sur.id
    };
    let delPares = {
        id: sur.id
    };

    return '<div class="tr-li"><div class="tr-left"><a>'
               + idx
            +'</a></div><div class="tr-right"><div class="tr-r-con"><div class="tr-r-link"><a href="'
                    + linkMaker( jumpLink, jumpPares)//'surveys-detail.html?id=' + sur.id
                    + '">'
                    + sur.tit
                    + '</a> </div> <a class="tr-r-del" href="'
                    + linkMaker(delLink, delPares)
                    + '"></a> <div class="tr-r-share share-button" id="'
                    + sur.id
                    + '"></div> </div> </div> </div>';
}

function addSurveysList(sures){
    // $('#surveys-box')
    for (let i in sures)
        $('#surveys-box').innerHTML+=getSurveysItem(sures[i], Number(i)+1);
    let shareBox = $('.share-button');
    for (let i in shareBox)
        shareBox[i].addEventListener('click', btnGetShareLink);
}

function initPage(data){
    addSurveysList(data.surveys);
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
    let p_data = new DataStat(_jsp);

    initPage(try_jsp_data);
}
