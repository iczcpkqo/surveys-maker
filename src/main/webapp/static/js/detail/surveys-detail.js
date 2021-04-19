
function addTopic(topics){
    let boxLi = document.getElementsByClassName('box-li')[0];

    let li = createTopicsSel(topics);
    boxLi.appendChild(li);
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
}

/***
 * Create a select item
 * @param topics = [{
 *                      'id': 88888,
 *                      'tit': 'Topic title',
 *
 *                  }]
 */
function createTopicsSel(topics) {
    let li = document.createElement('div');
    let delBox = document.createElement('div')
    let delBtn = document.createElement('a')

    li = addClass(li, 'detail-li');
    delBox = addClass(delBox, 'detail-del');
    delBtn = addClass(delBtn, 'btn-1');
    delBtn.addEventListener('click', delItem);
    delBtn.innerHTML = 'Delete';
    delBox.appendChild(delBtn);

    let inStr = '<div class="detail-input">'
                     + '<select name="sel-topic" class="sel-1">';
    for(let i in topics)
        inStr += '<option value="'+ topics[i].id +'">'
                          + topics[i].tit
    inStr += '</select>'
                + '</div>';
    li.innerHTML += inStr;
    li.appendChild(delBox);

    return li;
}

function setTopicSel(selObj, val){
    let sel = selObj.firstElementChild.firstElementChild;
    for(let i in sel.options)
        if(sel.options[i].value.toString() === val.toString()) {
                sel.options[i].selected = true;
                break;
            }
    return selObj;
}


/**
 * Page load function
 * @param p_data, json, from page load
 */
function onSurveysPageLoad(p_data){
    console.log(p_data);
    // Get DOM
    let liBox = $('.box-li')[0];
    let btnAddItem = $('.add-topic-btn')[0];
    let subSurveys = $('#submit-surveys');
    let surTit = $('#surveys-tit');

    // Bind everything
    btnAddItem.addEventListener('click',function(){
        addTopic(p_data.topics);
    });
    subSurveys.addEventListener('click',function(){
        $('#surveys-form').submit();
    });

    // Init tit
    surTit.setAttribute('value', p_data.surveys_tit || '');
    // Init select list
    console.log(p_data.topics);
    for(let i in p_data.sels){
        let li = createTopicsSel(p_data.topics);
        li = setTopicSel(li, p_data.sels[i].id);
        liBox.appendChild(li);
    }
}

/**
 *
 * @param p_data = {
 *              'surveys_tit': String,
 *              // 主题库中的所有主题
 *              'topics': [
 *                  {
 *                      'topic_id': int,
 *                      'topic_tit': String
 *                  }
 *              ],
 *              // 该问卷已经选择的主题们
 *              'sels': [
 *                  {
 *                      'topic_id': int,
 *                      'topic_tit': String
 *                  }
 *              ]
 *          }
 */
window.onload = function(){
    let _jsp = g_jsp_data;
    let p_stat = new DataDetail(_jsp);
    let p_data = p_stat.p_data;
    onSurveysPageLoad(p_data);
}



let test_data =
    {
    "topics"
:
    [{
        "topic_tit": "Legal Compliance",
        "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
        "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0",
        "time": {"seconds": 1618857625, "nanos": 772000000},
        "id": "5ce874b7-612a-499d-949d-ff041d9eeec0"
    }, {
        "topic_tit": "Legal Compliance2",
        "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
        "time": {"seconds": 1618857642, "nanos": 138000000},
        "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1",
        "id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1"
    }]
}