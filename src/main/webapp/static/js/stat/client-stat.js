// TODO: 第一个主题统计结果，需修改为当前页面展示的。

/**
 *
 * @type  g_state_charts = [{
 *     value:{
 *      green: int,
 *      amber: int,
 *      red
 *     },
 *     charts:[],
 *     position: String
 * }]
 */
var g_state_charts = [];
var g_charts_type_box = [BarChart, PieChart];




/**
 * 设置一个主题图表，用于一次只看一个主题的静态加载方式
 * @param dataBox =[{
 *     green: int,
 *     amber: int,
 *     red: int,
 *     position: {
 *     }
 * }]
 */
function setStat(dataBox){
    let len = g_state_charts.length;
    g_state_charts.push({
        value:{
            green: '',
            amber: '',
            red: ''
        },
        charts: [],
        position: ''
    });
    for(let j in g_charts_type_box) {
        g_state_charts[len].charts.push(new g_charts_type_box[j](dataBox.position[j]));
        g_state_charts[len].charts[j].green = g_state_charts[len].value.green = dataBox.data.green;
        g_state_charts[len].charts[j].amber = g_state_charts[len].value.amber = dataBox.data.amber;
        g_state_charts[len].charts[j].red = g_state_charts[len].value.red = dataBox.data.red;
    }
}

function setPageText(txt){
    let surTit = $('#surveys-tit');
    let topicTit = $('#cur-topic-tit');
    let topicIdx = $('#cur-index');
    let topicAmt = $('#topics-amount');

    surTit.innerHTML = txt.surveys_name;
    topicTit.innerHTML = txt.topic_name;
    topicIdx.innerHTML = txt.idx+1;
    topicAmt.innerHTML = txt.amount;
}

function bindOperation(txt){
    let btnPrev = $('#opera-btn-prev');
    let btnNext = $('#opera-btn-next');
    let btnDown = $('#stat-download');

    let linkPrev = 'client-stat';
    let linkNext = linkPrev;
    let linkDown = 'client-down'

    let par = {
        surveys_id: txt.surveys_id,
        client_id: txt.client_id,
        topic_idx: txt.idx,
        jump_type: ''
    };

    btnDown.href = linkMaker(linkDown, par);
    btnPrev.addEventListener('click', ()=>{
        par.topic_idx -= 1;
        par.jump_type = 'prev'

        window.location.href = linkMaker(linkPrev, par);
    });
    btnNext.addEventListener('click', ()=>{
        par.topic_idx += 1;
        par.jump_type = 'next'

        window.location.href = linkMaker(linkNext, par);
    });

    if(!txt.idx)
        btnPrev.style.display = 'none';
     else if(txt.idx === txt.amount-1)
        btnPrev.style.display = 'none';

}

function initPage(data){
    /**
     * @type {Topic} stat = {
     *                  id: '',
     *                  tit: '',
     *                  idx: '',
     *                  data:{
     *                      green: 1000,
     *                      amber: 500,
     *                      red: 250,
     *                  }, position:['bar-chart-1', 'pie-chart-1']
     *               }
     */
    let stat = data.stat; //p_surveys.topices[0];
    let txt = data.txt;

    setStat(stat);
    setPageText(txt);
    bindOperation(txt);
}

/**
 * @param
 */
window.onload = function(){
    // let try_jsp_data = [{
    //     id: '',
    //     tit: '',
    //     idx: '',
    //     data:{
    //         green: 1000,
    //         amber: 500,
    //         red: 250,
    //     }, position:['bar-chart-0', 'pie-chart-0']
    // }];

    // 原始数据
    let _jsp = g_jsp_data;
    //页面数据
    let p_data = new DataStat(_jsp);

    initPage(p_data);
}
