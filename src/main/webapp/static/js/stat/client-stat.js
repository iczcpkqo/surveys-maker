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
}