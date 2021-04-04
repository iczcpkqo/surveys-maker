function addQuiz() {
    let boxLi = document.getElementsByClassName('box-li')[0];
    let li =  createQuizInput('');

    boxLi.appendChild(li);
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
}

function createQuizInput(tit) {
    let li = document.createElement('div');
    let delBox = document.createElement('div');
    let delBtn = document.createElement('a');

    li = addClass(li, 'detail-li');
    delBox = addClass(delBox, 'detail-del');
    delBtn = addClass(delBtn, 'btn-1');

    li.innerHTML += '<div class="detail-input">'
        + '<input class="txt-1" type="text" placeholder="Please input your Question." value="'+ tit +'">'
        + '</div>';
    delBtn.innerHTML = 'Delete';
    delBtn.addEventListener('click', delItem);

    delBox.appendChild(delBtn);
    li.appendChild(delBox);

    return li;
}


/**
 * Page load function
 * @param p_data, json, from page load
 */
function onTopicPageLoad(p_data){
    // Get DOM
    let liBox = document.getElementsByClassName('box-li')[0];
    let btnAddItem = document.getElementsByClassName('add-quiz-btn')[0];
    let subTopic = document.getElementById('submit-topic');
    let topicTit = document.getElementById('topic-tit');

    // Bind everything
    btnAddItem.addEventListener('click',function(){
        addQuiz();
    });
    subTopic.addEventListener('click',function(){
        document.getElementById('topic-form').submit();
    });

    // Init tit
    topicTit.setAttribute('value', p_data.topic_name);
    // Init select list
    for(let i in p_data.quizes){
        let li = createQuizInput(p_data.quizes[i].tit);
        liBox.appendChild(li);
    }

}

/**
 *
 * @param p_data = {
 *                      // 该主题的名字
 *                      'topic_name': String,
 *                      // 该主题中的所有问题
 *                      'quizes': [
 *                          {
 *                              'id': int,
 *                              'tit': String
 *                          }
 *                      ]
 *                  }
 */
window.onload = function(){
    let p_data = {
        'topic_name': 'Legal Compliance',
        'quizes':[
            {
                'id': 1,
                'tit': 'Legal Compliance-1'
            }, {
                'id': 2,
                'tit': 'Hours of Work and Leave-2'
            }, {
                'id': 3,
                'tit': 'Legal Compliance-3'
            }, {
                'id': 4,
                'tit': 'Hours of Work and Leave-4'
            }
        ]
    }

    onTopicPageLoad(p_data);
}
