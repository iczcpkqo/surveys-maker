
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
    // Get DOM
    let liBox = document.getElementsByClassName('box-li')[0];
    let btnAddItem = document.getElementsByClassName('add-topic-btn')[0];
    let subSurveys = document.getElementById('submit-surveys');

    // Bind everything
    btnAddItem.addEventListener('click',function(){
        addTopic(p_data.topics);
    });
    subSurveys.addEventListener('click',function(){
        document.getElementById('surveys-form').submit();
    });

    // Init select list
    for(let i in p_data.sel){
        let li = createTopicsSel(p_data.topics);
        li = setTopicSel(li, p_data.sel[i].id);
        liBox.appendChild(li);
    }
}

/**
 *
 * @param p_data = {
 *                      // 主题库中的所有主题
 *                      'topic': [
 *                          {
 *                              'id': int,
 *                              'tit': String
 *                          }
 *                      ],
 *                      // 该问卷已经选择的主题
 *                      'sel': [
 *                          {
 *                              'id': int,
 *                              'tit': String
 *                          }
 *                      ]
 *
 *                  }
 */
window.onload = function(){
    let p_data = {
        'topics': [
            {
                'id': 111,
                'tit': 'dfsdfsdfsdfsd'
            }, {
                'id': 222,
                'tit': 'hhhhh'
            }
        ],
        'sel': [
            {
                'id': 222,
                'tit': 'dfsdfsdfsdfsd'
            }, {
                'id': 111,
                'tit': 'hhhhh'
            }, {
                'id': 222,
                'tit': 'dfsdfsdfsdfsd'
            }
        ]
    }

    onSurveysPageLoad(p_data);
}
