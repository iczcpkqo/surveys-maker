// 跳转参数: {
//     surveys-id: '当前问卷的编号',
//      topic-idx: '当前主题是第几个主题',
//           sels: '每一个quiz的答案'
// }

// TODO:
//         - [x] 1. 设计数据结构
//         - [x] 2. 根据传参，使用数据处理库获取数据
//         - [x] 3. 循环装填
//         - [x] 4. 设置文本
//         - [x] 5. 事件绑定
//         - [x] 6. 选项点击切换
//         - [ ] 7. 跳转内容计算
//         - [ ] 8. 跳转内容执行

function pourList(quizes){
    for (let i in quizes)
    $('#topics-list-box').innerHTML += '<div class="quiz-li"> <div class="radio-box-1"> <div class="rb-1-tit"> <a class="label-1">'
                    + quizes[i]
             + '</a> </div> <div class="rb-1-con find-box"> <div class="rb-1-li"> <div class="rb-1-left"> <a class="ico-1-green"> </a> </div> <div class="rb-1-right"> <a class="label-2"> My business has this in place / I am happy with our approach / I feel that I have sufficient knowledge. </a> </div> </div> <div class="rb-1-li"> <div class="rb-1-left"> <a class="ico-1-amber"></a> </div> <div class="rb-1-right"> <a class="label-2"> My business has something in place, but I feel it could be improved / i feel that i would need some support if this situation arose. </a> </div> </div> <div class="rb-1-li"> <div class="rb-1-left"> <a class="ico-1-red"></a> </div> <div class="rb-1-right"> <a class="label-2"> My business does not have provision for this / I feel unprepared for this situation. </a> </div> </div> </div> </div> </div>';
}

function initText(txt){
    $('#surveys-tit').innerHTML = txt.surveys_name;
    $('#cur-topic-tit').innerHTML = txt.topic_name;
    $('#cur-index').innerHTML = txt.idx+1;
    $('#topics-amount').innerHTML = txt.amount;
}

function bindSelsClick(){
    let radios = $('.find-box');
    for (let i=0; i<radios.length; i++)
        for (let j=0; j < radios[i].children.length; j++) {
            radios[i].children[j].addEventListener('click', function () {
                for (let k=0; k<this.parentNode.children.length; k++)
                    this.parentNode.children[k].classList.remove('sel-radio');
                this.classList.add('sel-radio');
            });
        }
}

function getChosen(){
    let sels_li = $('.sel-radio');
    let result = [];
    for (let i=0; i<sels_li.length; i++){
        let cls = sels_li[i].children[0].children[0].className;
        result.push(cls.split('-')[2]);
    }
    return result;
}

function bindOperation(txt, chosen){
    let btnPrev = $('#opera-btn-prev');
    let btnNext = $('#opera-btn-next');
    let btnSub = $('#opera-btn-submit');

    let linkPrev = 'client-view';
    let linkNext = linkPrev;
    let linkSub = linkPrev;

    let par = {
        client_id: txt.client_id,
        topic_idx: txt.idx,
        topic_res: '',
        jump_type: ''
    };

    // TODO: 判断选择数量，截断操作

    btnPrev.addEventListener('click', ()=>{
        par.topic_idx -= 1;
        par.topic_res = getChosen();
        par.jump_type = 'prev'
        window.location.href = linkMaker(linkPrev, par);
    });
    btnNext.addEventListener('click', ()=>{
        par.topic_idx += 1;
        par.topic_res = getChosen();
        par.jump_type = 'next'
        window.location.href = linkMaker(linkNext, par);
    });
    btnSub.addEventListener('click', ()=>{
        par.topic_idx += 1;
        par.topic_res = getChosen();
        par.jump_type = 'sub'
        window.location.href = linkMaker(linkSub, par);
    });
}

function initPage(data){
    pourList(data.quizes);
    initText(data.txt);
    bindSelsClick();
    bindOperation(data.txt, getChosen().toString());
}

/**
 * @param
 */
window.onload = function(){
    let _p_data = {
        quizes: ['quiztitle1111111', 'quiz 2222222222222222', 'quiz33333333333333', 'quiz444444444444444'],
        txt: {
            surveys_name: 'Corpor==sdate Employee Happiness Survey.',
            amount: 2,
            idx: 1,
            topic_name: 'Hours of Work and Leave'
        },
    };

    // 原始数据
    let _jsp = g_jsp_data;
    _jsp.client_id = _jsp.client_id || '';

    //页面数据
    let p_data = new DataView(_jsp);

    initPage(p_data);
}
