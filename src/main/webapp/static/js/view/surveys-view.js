function getQuiz(tit){
    return '<div class="quiz-li"> <div class="radio-box-1"> <div class="rb-1-tit"> <a class="label-1">'
           + tit
           + '</a> </div> </div> </div>';
    // return '<div>' +
    //     tit +
    //     '</div>'
}

function getTopic(topic, tit, idx, amount){
    console.log(topic);
    return '<div class="topic-con con-stat">' + '<div class="tit-topic tit">' + '<div class="label-tit-topic label">' + '<p>'
        + tit
        + '</p>' + '</div>' + '<div class="process-tit-topic process">' + '<p>' + '<a>'
        + idx
        + '</a>/<a>'
        + amount
        + '</a>' + '</p>' + '</div>' + '</div>' + '<div class="quiz-con">' + '<div class="quiz-list">'
        + ((quizes)=>{
            let str = '';
            for (let i in quizes){
                str += getQuiz(quizes[i].tit);
            }
            return str;
         })(topic.quizes)
        + '</div>' + '</div>' + '</div>';
}

function initPage(sur){
    let sur_tit  = $('#surveys-tit');
    let sur_con = $('#survey-con');
    let str_html = '';

    sur_tit.innerHTML = sur.tit;


    for(let i in sur.topics)
        str_html += getTopic(sur.topics[i], sur.topics[i].tit, ++i, sur.topics.length);

    sur_con.innerHTML = str_html;


}

window.onload = function(){
    let _jsp = g_jsp_data;
    let p_data = new DataListView(_jsp);

    initPage(p_data.surveys[0]);
}
//
// <div className="quiz-li">
//     <div className="radio-box-1">
//         <div className="rb-1-tit">
//             <a className="label-1">
//                 Do you have a process in place to ensure that all employees have the right to work
//                 in Ireland?
//             </a>
//         </div>
//     </div>
// </div>
