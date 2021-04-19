function setTit(txt){
    $('#tip-tit').innerHTML = txt;
}

function setDes(txt){
    $('#tip-des').innerHTML = txt;
}

function setView(idx, type, pares){
    let o = (idx, type, pares) => {
        if(idx < 1)
            pageJump(type, pares);
        $('#tip-view').innerHTML = idx--;
        setTimeout(o, 1000, idx, type, pares);
    }
    o(idx, type, pares);
}

function pageJump(type, pares){
    window.location.replace(linkMaker(type, pares));
}

window.onload = function(){
    let p_data = g_jsp_data;

    setTit(p_data.tit);
    setDes(p_data.des);
    setView(3, p_data.type, p_data.pares);
}






// let g_jsp_data = {
//     page: 1,
//     page_amount:1,
//     surveys: [{
//         "surveys_id": "06dfddfa-dfb9-49d3-b588-69f043d4682e",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0",
//             "time": {"seconds": 1618857625, "nanos": 772000000}
//         }, {
//             "topic_tit": "Legal Compliance2",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "time": {"seconds": 1618857642, "nanos": 138000000},
//             "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1"
//         }],
//         "surveys_tit": "undefined",
//         "time": {"seconds": 1618857671, "nanos": 221000000}
//     }, {
//         "surveys_id": "265f90e5-eecc-4c9c-8b91-b82b6b101b3d",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance2",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "time": {"seconds": 1618857642, "nanos": 138000000},
//             "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1"
//         }, {
//             "topic_tit": "topic2",
//             "quizes": ["1", "12", "123"],
//             "topic_id": "f4a50ce4-10ae-4cf5-ba8a-2905532bbea8",
//             "time": {"seconds": 1618865337, "nanos": 351000000}
//         }, {
//             "topic_tit": "Legal Compliance",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "time": {"seconds": 1618857625, "nanos": 772000000},
//             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0"
//         }],
//         "surveys_tit": "Do you like ahahahha",
//         "time": {"seconds": 1618869964, "nanos": 108000000}
//     }, {
//         "surveys_id": "0ac42bee-796c-4a2e-bc63-685f36ebc46e",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance2",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "time": {"seconds": 1618857642, "nanos": 138000000},
//             "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1"
//         }, {
//             "topic_tit": "topic2",
//             "quizes": ["1", "12", "123"],
//             "time": {"seconds": 1618865337, "nanos": 351000000},
//             "topic_id": "f4a50ce4-10ae-4cf5-ba8a-2905532bbea8"
//         }],
//         "surveys_tit": "Do you 2222",
//         "time": {"seconds": 1618870092, "nanos": 493000000}
//     }, {
//         "surveys_id": "9ea580aa-ca0f-414e-8b94-de1a9ed0368a",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "time": {"seconds": 1618857625, "nanos": 772000000},
//             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0"
//         }, {
//             "topic_tit": "Legal Compliance2",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "time": {"seconds": 1618857642, "nanos": 138000000},
//             "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1"
//         }],
//         "surveys_tit": "1231",
//         "time": {"seconds": 1618870155, "nanos": 273000000}
//     }, {
//         "surveys_id": "68183315-39f0-4d5a-946b-6a591b9c889e",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance2",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1",
//             "time": {"seconds": 1618857642, "nanos": 138000000}
//         }],
//         "time": {"seconds": 1618870220, "nanos": 44000000},
//         "surveys_tit": "Do you like 3333"
//     }, {
//         "surveys_id": "3b5fe450-5179-4ef0-9d25-85e42edad081",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance2",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "time": {"seconds": 1618857642, "nanos": 138000000},
//             "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1"
//         }],
//         "surveys_tit": "Do you like 3333",
//         "time": {"seconds": 1618870496, "nanos": 493000000}
//     }]
// };
