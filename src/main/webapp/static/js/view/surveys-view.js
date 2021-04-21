function getQuiz(tit){
    return '<div class="quiz-li"> <div class="radio-box-1"> <div class="rb-1-tit"> <a class="label-1">'
           + tit
           + '</a> </div> </div> </div>';
    // return '<div>' +
    //     tit +
    //     '</div>'
}

function getTopic(topic, tit, idx, amount){
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

function bindCopySurveys(sur){
    let btnCopy = $('#copy-surveys');
    let linkCopy = 'surveys-copy';
    let parCopy = {
        surveys_id: sur.id
    }

    btnCopy.addEventListener('click',()=>{
        window.location.href = linkMaker(linkCopy, parCopy);
    });
}

function initPage(sur){
    let sur_tit  = $('#surveys-tit');
    let sur_con = $('#survey-con');
    let str_html = '';

    sur_tit.innerHTML = sur.tit;


    for(let i in sur.topics)
        str_html += getTopic(sur.topics[i], sur.topics[i].tit, ++i, sur.topics.length);

    sur_con.innerHTML = str_html;

    bindCopySurveys(sur);
}

window.onload = function(){
    let _jsp = g_jsp_data;
    let p_data = new DataListView(_jsp);

    initPage(p_data.surveys[0]);
    $('body')[0].style.display = 'block';
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


// let g_jsp_data = {
//     "topics": [{
//         "topic_tit": "topic2",
//         "quizes": ["1", "12", "123", "w4235245345"],
//         "time": {"seconds": 1618873940, "nanos": 605000000},
//         "topic_id": "1d1c2787-e62a-476d-a497-decb0d545532",
//         "id": "1d1c2787-e62a-476d-a497-decb0d545532"
//     }, {
//         "topic_tit": "topic2",
//         "quizes": ["1345345", "w4235245345"],
//         "topic_id": "4bf6b1d0-350f-4ddb-8962-2ef86a189f02",
//         "time": {"seconds": 1618873954, "nanos": 853000000},
//         "id": "4bf6b1d0-350f-4ddb-8962-2ef86a189f02"
//     }, {
//         "topic_tit": "Legal Compliance",
//         "quizes": ["1", "2", "3", "4"],
//         "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0",
//         "time": {"seconds": 1618857625, "nanos": 772000000},
//         "id": "5ce874b7-612a-499d-949d-ff041d9eeec0"
//     }, {
//         "topic_tit": "t",
//         "quizes": ["1", "2", "3"],
//         "topic_id": "7bf74f7b-c2e4-43e7-9c23-ed853ae17607",
//         "time": {"seconds": 1618883192, "nanos": 382000000},
//         "id": "7bf74f7b-c2e4-43e7-9c23-ed853ae17607"
//     }, {
//         "topic_tit": "topic2(4)",
//         "quizes": ["you quesion?"],
//         "topic_id": "81591e62-74d1-4084-9c50-a0a5e041b1f9",
//         "time": {"seconds": 1618876783, "nanos": 447000000},
//         "id": "81591e62-74d1-4084-9c50-a0a5e041b1f9"
//     }, {
//         "topic_tit": "Legal Compliance2",
//         "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//         "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1",
//         "time": {"seconds": 1618857642, "nanos": 138000000},
//         "id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1"
//     }, {
//         "topic_tit": "Legal Compliance(2)",
//         "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3"],
//         "time": {"seconds": 1618878253, "nanos": 422000000},
//         "topic_id": "c840b221-d709-4356-8fd8-8684add84775",
//         "id": "c840b221-d709-4356-8fd8-8684add84775"
//     }, {
//         "topic_tit": "topic2",
//         "quizes": ["1", "12", "123"],
//         "time": {"seconds": 1618865337, "nanos": 351000000},
//         "topic_id": "f4a50ce4-10ae-4cf5-ba8a-2905532bbea8",
//         "id": "f4a50ce4-10ae-4cf5-ba8a-2905532bbea8"
//     }]
// }