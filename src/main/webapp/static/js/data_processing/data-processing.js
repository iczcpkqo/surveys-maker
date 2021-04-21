// TODO:
//      - [ ] 1. 根据新数据格式清洗数据
//      - [ ] 2. 修改quiz格式
//      - [ ] 3. 查看影响范围

class Quiz {
    constructor() {
        this.id = this.idMaker();
        this.tit = '';
        this.idx = '';
        this.green = 0;
        this.amber = 0;
        this.red = 0;
    }

    set green(r) {
        this._green = r?1:0;
    }
    get green(){
        return this._green;
    }

    set amber(r) {
        this._amber = r?1:0;
    }
    get amber(){
        return this._amber;
    }

    set red(r) {
        this._red = r?1:0;
    }
    get red(){
        return this._red;
    }

    idMaker(){
        return ~~(Math.random()*10000000);
    }
}

class Topic {
    constructor() {
        this.id = '';
        this.tit = '';
        this.position = ['bar-chart-', 'pie-chart-'];
        this.idx = 0;
        this.quizes = [];
        this.data = {
            green: 0,
            amber: 0,
            red: 0
        };
    }
    set idx(idx){
        this._idx = idx;

        if(!this.idx)
            return false;

        for (let i in this.position)
            // 一页看一个, 静态模式
            this.position[i] += 1;
            // 一页看完，动态加载
            // this.position[i] += this.idx;
    }
    get idx(){
        return this._idx;
    }
}

class Surveys {
    constructor() {
        this.id = '';
        this.tit = '';
        this.idx = '';
        this.topics = [];
        this.data = {
            green: 0,
            amber: 0,
            red: 0
        };
    }
}

class DataProc {
    constructor() {
    }
    static getJsonArray(obj, i){
        return obj[Object.keys(obj)[i]];
    }
    static convertJsonToArray(obj){
        let arr = [];
        for (let i in obj)
            arr.push(obj[i]);
        return arr;
    }
}

/**
 * Data Obtain
 */
class Dob {
    constructor() {
    }

    /**
     * Cleaning One Quiz In Surveys
     * @param obj
     * @param idx
     * @returns {Quiz}
     */
    static clQuiz(obj, idx=0){
        let type = typeof obj == 'object';
        let quiz = new Quiz();
        quiz.tit = type? obj.quiz_tit: obj;
        quiz.idx = idx;
        quiz.green = type? obj.green.toString() !== '0': 0;
        quiz.amber = type? obj.amber.toString() !== '0': 0;
        quiz.red = type? obj.red.toString() !== '0': 0;

        return quiz;
    }

    /**
     * Cleaning One Topic In Surveys
     * @param obj
     * @param idx
     */
    static clTopic(obj, idx=0){
        let topic = new Topic();
        topic.id = obj.topic_id;
        topic.tit = obj.topic_tit;
        topic.idx = idx;
        topic.quizes = (function(){
            let qs = [];
            for (let i in obj.quizes)
                qs.push(Dob.clQuiz(obj.quizes[i]));
            return qs;
        })(obj);
        topic.data = (function(qs){
            let green = 0;
            let amber = 0;
            let red = 0;
            for(let i in qs){
                green += qs[i].green.toString() !== '0';
                amber += qs[i].amber.toString() !== '0';
                red += qs[i].red.toString() !== '0';
            }
            return {
                green: green,
                amber: amber,
                red: red
            };
        })(topic.quizes);

        return topic;
    }
    /**
     * Cleaning One Surveys In Surveys
     * @param obj
     * @param idx
     */
    static clSurveys(obj){
        let surveys = new Surveys();
        surveys.id = obj.surveys_id;
        surveys.tit = obj.surveys_tit;
        surveys.idx = '';
        surveys.topics = (function(topics){
            let arr = [];
            let j = 0 ;
            for (let i in topics)
                arr.push(Dob.clTopic(topics[i], ++j));
            return arr;
        })(obj.sels_topic);
        // surveys.data = (function(topics){
        //     let d = {
        //         green: 0,
        //         amber: 0,
        //         red: 0
        //     }
        //     for (let i in topics)
        //         for (let j in topics[i].data) {
        //             d[j] += topics[i].data[j];
        //         }
        //     return d;
        // })(surveys.topics);
        // surveys.data = {
        //   green: 100,
        //   amber: 333,
        //     red: 22
        // };

        return surveys;
    }

    /**
     * Cleaning One Topic From Topics
     * @param obj
     * @param idx
     */
    static clOneTopics(obj, idx=0){
        let topic = new Topic();
        topic.id = obj.topic_id;
        topic.tit = obj.topic_tit;
        topic.idx = idx;
        topic.quizes = (function(quizes){
            let qs = [];
            for(let i in quizes){
                qs.push(new Quiz());
                qs[i].tit = quizes[i].quiz_tit;
                qs[i].idx = i;
            }
            return qs;
        })(obj.quizes);
        return topic;
    }

    /**
     * Cleaning All Topics From Topics
     * @param obj
     */
    static clAllTopics(obj){
        let arr = [];
        for (let i in obj)
            arr.push(Dob.clOneTopics(obj[i], i));
        return arr;
    }

    static getTopicIdx(topic, topicBox){
        for (let i in topicBox)
            if (topicBox[i].id === topic.id)
                return i;
    }
}

class DataBase{
    constructor() {
        this.surveys = [];
        this.topics = [];
    }
    set jsp_surveys(data){
        for(let i in data)
            this.surveys.push(Dob.clSurveys(data[i]));
    }
}

class DataLogin {}

//only using in surveys list please
class DataList extends DataBase {
    constructor(jsp_data = '') {
        super();
        this.jsp_surveys = jsp_data.surveys;
        // this.topic_idx = jsp_data.topic_idx;
        this.page = jsp_data.page;
        this.page_amount = jsp_data.page_amount;
        this.host = jsp_data.host;
    }
}

class DataListView extends DataBase {
    constructor(jsp_data = '') {
        super();
        this.jsp_surveys = jsp_data.surveys;
    }
}

class TopicList extends DataBase {
    constructor(jsp_data = '') {
        super();
        this.jsp_topics = jsp_data.topics;
        // this.topic_idx = jsp_data.topic_idx;
        this.page = jsp_data.page;
        this.page_amount = jsp_data.page_amount;

        this.topics = this.jsp_topics;
    }
}

class DataDetail extends DataBase {
    constructor(jsp_data) {
        super();
        this.jsp_surveys = jsp_data.surveys;
        this.jsp_topics = jsp_data.topics;
        this.topics = Dob.clAllTopics(this.jsp_topics);
        for(let i in this.jsp_surveys)
            this.surveys.push(Dob.clSurveys(this.jsp_surveys[i]));
    }
    get p_data(){
        return {
            // surveys_name: this.surveys[0].tit==null? '': this.surveys[0].tit,
            topics: this.topics
            // sels: this.surveys[0].topics==null? '': this.surveys[0].topics
        }
    }
}

class DataView extends DataBase {
    constructor(jsp_data = '') {
        super();
        this.jsp_surveys = jsp_data.surveys;
        this.topic_idx = jsp_data.topic_idx;
    }

    get quizes(){
        let arr = [];
        for (let i in this.surveys[0].topics[this.topic_idx].quizes){
            arr.push(this.surveys[0].topics[this.topic_idx].quizes[i].tit)
        }
        return arr;
    }

    get txt(){
        return {
            surveys_name: this.surveys[0].tit,
            amount: (function (s) {
                let i = 0;
                for (; i < s.topics.length; i++) ;
                return i;
            })(this.surveys[0]),
            idx: this.topic_idx+1,
            topic_name: this.surveys[0].topics[this.topic_idx].tit
        }
    }

    get p_data(){
        return {
            quizes: this.quizes,
            txt: this.txt
        };
    }
}

class DataStat extends DataBase {
    constructor(jsp_data='') {
        super();
        // 获得 surveys
        this.jsp_surveys = jsp_data.surveys;
        // TODO: 第一个主题统计结果，需修改为当前页面展示的。
        console.log(this.surveys);
        this.topic = this.surveys[0].topics[0];
    }
    get stat(){
        return this.topic;
    }
    get txt(){
        return {
            surveys_name: this.surveys[0].tit,
            amount: this.surveys[0].topics.length,
            idx: Dob.getTopicIdx(this.topic, this.surveys[0].topics)+1,
            topic_name: this.topic.tit
        }
    }
}


// var g_jsp_data = {
//     "surveys": [{
//         "selectedTopic": {
//             "wQm8fAHUCtPFrRGCA7md": {
//                 "topicId": "wQm8fAHUCtPFrRGCA7md",
//                 "createTime": {"seconds": 1617490800, "nanos": 0},
//                 "questions": {"0": {"red": 0, "green": 3, "questionTitle": "question1", "amber": 1}},
//                 "topicTitle": "topic1"
//             }
//         },
//         "createTime": {"seconds": 1617490800, "nanos": 0},
//         "id": "ebJcAKNLV52a0okYrXFw",
//         "surveyTitle": "survey1"
//     }],
//     "topics": [{
//         "createTime": {"seconds": 1617490800, "nanos": 0},
//         "questions": {"0": {"questionTitle": "question1"}},
//         "id": "wQm8fAHUCtPFrRGCA7md",
//         "topicTitle": "topic1"
//     }]
// }



// var g_jsp_data = {
//     "surveys": [{
//         "selectedTopic": [{
//             "topicId": "wQfAHUCtPFrRGCA7md",
//             "createTime": {"seconds": 1617490800, "nanos": 0},
//             "questions": [{"red": 0, "green": 3, "questionTitle": "question1", "amber": 1}],
//             "topicTitle": "top22222222"
//         },{
//             "topicId": "wQfAHUCtPFrRGCA7md",
//             "createTime": {"seconds": 1617490800, "nanos": 0},
//             "questions": [{"red": 0, "green": 3, "questionTitle": "question1", "amber": 1}],
//             "topicTitle": "333333333"
//         },{
//             "topicId": "wQfAHUCtPFrRGCA7md",
//             "createTime": {"seconds": 1617490800, "nanos": 0},
//             "questions": [{"red": 0, "green": 3, "questionTitle": "question1", "amber": 1}],
//             "topicTitle": "444444444"
//         }],
//         "createTime": {"seconds": 1617490800, "nanos": 0},
//         "id": "ebJcAKNLV52a0okYrXFw",
//         "surveyTitle": "survey1 js"
//     }],
//     "topics": [{
//         "createTime": {"seconds": 1617490800, "nanos": 0},
//         "questions": [{"questionTitle": "question1"}],
//         "id": "wQm8fAHUCtPFrRGCA7md",
//         "topicTitle": "topic1"
//     },{
//         "createTime": {"seconds": 1617490800, "nanos": 0},
//         "questions": [{"questionTitle": "question1"}],
//         "id": "wQfAHUCtPFrRGCA7md",
//         "topicTitle": "top222222222"
//     }]
// };




// let g_jsp_data = {
//     page: 1,
//     page_amount:1,
//     surveys: [{
//         "surveys_id": "bea93c62-14b0-4084-be48-d180f1664c79",
//         "sels_topic": [{
//             "topic_tit": "topic2",
//             "quizes": ["1", "12", "123"],
//             "topic_id": "f4a50ce4-10ae-4cf5-ba8a-2905532bbea8",
//             "time": {"seconds": 1618865337, "nanos": 351000000}
//         }, {
//             "topic_tit": "Legal Compliance2",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1",
//             "time": {"seconds": 1618857642, "nanos": 138000000}
//         }, {
//             "topic_tit": "Legal Compliance",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0",
//             "time": {"seconds": 1618857625, "nanos": 772000000}
//         }],
//         "surveys_tit": "3242342",
//         "time": {"seconds": 1618871140, "nanos": 551000000}
//     }, {
//         "surveys_id": "4b95afbf-c169-4ab3-98e7-cbf8b7141553",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0",
//             "time": {"seconds": 1618857625, "nanos": 772000000}
//         }],
//         "surveys_tit": "survey1",
//         "time": {"seconds": 1618870957, "nanos": 631000000}
//     }, {
//         "surveys_id": "47fe4dbf-2ba9-4cf0-b1f0-fd8d1f5c5dcc",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0",
//             "time": {"seconds": 1618857625, "nanos": 772000000}
//         }, {
//             "topic_tit": "Legal Compliance2",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1",
//             "time": {"seconds": 1618857642, "nanos": 138000000}
//         }],
//         "surveys_tit": "324234",
//         "time": {"seconds": 1618870882, "nanos": 642000000}
//     }, {
//         "surveys_id": "fb65eb72-f1fc-4f98-a50b-8b2ca6570986",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "time": {"seconds": 1618857625, "nanos": 772000000},
//             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0"
//         }, {
//             "topic_tit": "Legal Compliance2",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1",
//             "time": {"seconds": 1618857642, "nanos": 138000000}
//         }],
//         "time": {"seconds": 1618870854, "nanos": 505000000},
//         "surveys_tit": "32234"
//     }, {
//         "surveys_id": "fb9f6bca-ca69-4806-9144-120377a48a8e",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0",
//             "time": {"seconds": 1618857625, "nanos": 772000000}
//         }],
//         "time": {"seconds": 1618870780, "nanos": 437000000},
//         "surveys_tit": "fdfsdfsdfsf"
//     }, {
//         "surveys_id": "501c9d24-fc35-472b-855c-d338f5098aac",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "time": {"seconds": 1618857625, "nanos": 772000000},
//             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0"
//         }],
//         "surveys_tit": "survey1",
//         "time": {"seconds": 1618870668, "nanos": 78000000}
//     }, {
//         "surveys_id": "1b5591a9-1550-4a75-a164-8a7d92c2bb7a",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "time": {"seconds": 1618857625, "nanos": 772000000},
//             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0"
//         }],
//         "time": {"seconds": 1618870605, "nanos": 511000000},
//         "surveys_tit": "survey1"
//     }, {
//         "surveys_id": "3b5fe450-5179-4ef0-9d25-85e42edad081",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance2",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1",
//             "time": {"seconds": 1618857642, "nanos": 138000000}
//         }],
//         "surveys_tit": "Do you like 3333",
//         "time": {"seconds": 1618870496, "nanos": 493000000}
//     }, {
//         "surveys_id": "68183315-39f0-4d5a-946b-6a591b9c889e",
//         "sels_topic": [{
//             "topic_tit": "Legal Compliance2",
//             "quizes": ["Legal Compliance-1", "Hours of Work and Leave-2", "Legal Compliance-3", "Hours of Work and Leave-4"],
//             "time": {"seconds": 1618857642, "nanos": 138000000},
//             "topic_id": "a162d43e-9b9d-4695-83e4-a5f79b958bf1"
//         }],
//         "time": {"seconds": 1618870220, "nanos": 44000000},
//         "surveys_tit": "Do you like 3333"
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
//         "time": {"seconds": 1618870155, "nanos": 273000000},
//         "surveys_tit": "1231"
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
//             "topic_id": "f4a50ce4-10ae-4cf5-ba8a-2905532bbea8",
//             "time": {"seconds": 1618865337, "nanos": 351000000}
//         }],
//         "time": {"seconds": 1618870092, "nanos": 493000000},
//         "surveys_tit": "Do you 2222"
//     }],
//     host:"http://149.157.104.166:8080"
// };
//