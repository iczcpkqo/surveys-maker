function btnGetShareLink(){
    let shareLink = 'share.html?id=' + this.id;
    let msg = 'The link has been copied to the clipboard.';
    copyToClip(shareLink, msg);
}

function getSurveysItem(sur, idx){
    let jumpLink = 'surveys/surveys-detail';
    let delLink = 'surveys/surveys-delete'
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
                    + '"></a> <div class="tr-r-share share-button" id="'
                    + sur.id
                    + '"></div> </div> </div> </div>';
}

function addSurveysList(sures){
    for (let i in sures)
        $('#surveys-box').innerHTML+=getSurveysItem(sures[i], Number(i)+1);
    let shareBox = $('.share-button');
    for (let i=0; i<shareBox.length; i++)
        shareBox[i].addEventListener('click', btnGetShareLink);
}

function addPaging(page, page_amount){
    let num = 3;
    let page_con = $('#page-num');
    let cls = '';

    for (let i = page-num>0? page-num: 1; i<(page+num>page_amount? page_amount: page+num+1); i++) {
        if (i === Number(page))
            cls = 'paging-li sel';
        else
            cls = 'paging-li';

        page_con.innerHTML += '<div class="'
                                + cls
                                + '">'
                                + '<a href="'
                                + 'surveys-list?page='
                                + i
                                +'">'
                                + i
                                + '</a>'
                            + '</div>'
    }
}

function initPage(data){
    addSurveysList(data.surveys);
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
    console.log(_jsp);
    //页面数据
    let p_data = new DataList(_jsp);

    console.log(p_data);

    // initPage(try_jsp_data);
    initPage(p_data);
}
