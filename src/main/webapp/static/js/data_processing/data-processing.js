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
        let quiz = new Quiz();
        quiz.tit = obj.questionTitle;
        quiz.idx = idx;
        quiz.green = obj.green.toString() !== '0';
        quiz.amber = obj.amber.toString() !== '0';
        quiz.red = obj.red.toString() !== '0';

        return quiz;
    }

    /**
     * Cleaning One Topic In Surveys
     * @param obj
     * @param idx
     */
    static clTopic(obj, idx=0){
        let topic = new Topic();
        topic.id = obj.topicId;
        topic.tit = obj.topicTitle;
        topic.idx = idx;
        topic.quizes = (function(){
            let qs = [];
            for (let i in obj.questions)
                qs.push(Dob.clQuiz(obj.questions[i]));
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
        surveys.id = obj.id;
        surveys.tit = obj.surveyTitle;
        surveys.idx = '';
        surveys.topics = (function(topics){
            let arr = [];
            let j = 0 ;
            for (let i in topics)
                arr.push(Dob.clTopic(topics[i], ++j));
            return arr;
        })(obj.selectedTopic);
        surveys.data = (function(topics){
            let d = {
                green: 0,
                amber: 0,
                red: 0
            }
            for (let i in topics)
                for (let j in topics[i].data) {
                    d[j] += topics[i].data[j];
                }
            return d;
        })(surveys.topics);
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
        topic.id = obj.id;
        topic.tit = obj.topicTitle;
        topic.idx = idx;
        topic.quizes = (function(quizes){
            let qs = [];
            for(let i in quizes){
                qs.push(new Quiz());
                qs[i].tit = quizes[i].questionTitle;
                qs[i].idx = i;
            }
            return qs;
        })(obj.questions);
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
}

class DataLogin {}

class DataList extends DataBase {}

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
            surveys_name: this.surveys[0].tit,
            topics: this.topics,
            sels: this.surveys[0].topics
        }
    }
}

class DataView extends DataBase {}

class DataStat extends DataBase {
    constructor(jsp_data='') {
        super();
        this.jsp_surveys = jsp_data.surveys;
        for(let i in this.jsp_surveys)
            this.surveys.push(Dob.clSurveys(this.jsp_surveys[i]));
        console.log(this.surveys[0]);
        // TODO: 第一个主题统计结果，需修改为当前页面展示的。
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

