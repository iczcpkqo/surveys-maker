<!DOCTYPE html>
<html lang="en">
<head>
    <%
        Object surveys = request.getAttribute("surveys");
        Object topicIdx = request.getAttribute("topic_idx");
        Object clientId = request.getAttribute("client_id");
    %>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--    control-->
    <link rel="stylesheet" href="../../../static/css/xiang_control/base.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/bar.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/container.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/button.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/input.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/text.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/label.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/ico.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/chart.css">

    <!--   page -->
    <link rel="stylesheet" href="../../../static/css/client/client.css">
    <link rel="stylesheet" href="../../../static/css/view/view.css">

    <!-- js -->
    <script src="../../../static/js/xiang_control/base.js"></script>
    <script src="../../../static/js/data_processing/data-processing.js"></script>
    <script src="../../../static/js/xiang_control/xiang_chart.js"></script>
    <script src="../../../static/js/view/client-view.js"></script>
    <script>
        let g_jsp_data = {
            topic_idx:<%= topicIdx%>,
            client_id:<%= clientId%>,
            surveys:<%= surveys%>
        }
        //     topic_idx: 1,
        //     surveys: [{
        //         "surveys_id": "06dfddfa-dfb9-49d3-b588-69f043d4682e",
        //         "surveys_tit": "tets_=69f043d4682e",
        //         "time": {"seconds": 1618857671, "nanos": 221000000},
        //         "sels_topic": [{
        //             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0",
        //             "topic_tit": "Legal Compliance",
        //             "time": {"seconds": 1618857625, "nanos": 772000000},
        //             "quizes": [{
        //                 quiz_tit: 'qqqqqqqqq1111111111',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             },{
        //                 quiz_tit: '2222qqqqqq3222222',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             },{
        //                 quiz_tit: '333333qqqqqqqqqqq',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             }]
        //         },{
        //             "topic_id": "612a-499d-949d-ff041d9ee",
        //             "topic_tit": "Legal 222222222222222",
        //             "time": {"seconds": 1618857625, "nanos": 772000000},
        //             "quizes": [{
        //                 quiz_tit: 'sdfsdfsdfsd234234324f',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             },{
        //                 quiz_tit: '2222q2sldfjsklfjsldkj',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             },{
        //                 quiz_tit: '33333sdfs2lkj234',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             }]
        //         }],
        //     },{
        //         "surveys_id": "ddfa-dfb9-49d3-b5sff043d4682e",
        //         "surveys_tit": "sur isdfsdfsdfdssdfsdfs",
        //         "time": {"seconds": 1618857671, "nanos": 221000000},
        //         "sels_topic": [{
        //             "topic_id": "5ce874b7-612a-499d-949d-ff041d9eeec0",
        //             "topic_tit": "Legal Compliance",
        //             "time": {"seconds": 1618857625, "nanos": 772000000},
        //             "quizes": [{
        //                 quiz_tit: 'qqqqqqqqq1111111111',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             },{
        //                 quiz_tit: '2222qqqqqq3222222',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             },{
        //                 quiz_tit: '333333qqqqqqqqqqq',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             }]
        //         },{
        //             "topic_id": "612a-499d-949d-ff041d9ee",
        //             "topic_tit": "Legal 222222222222222",
        //             "time": {"seconds": 1618857625, "nanos": 772000000},
        //             "quizes": [{
        //                 quiz_tit: 'sdfsdfsdfsd234234324f',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             },{
        //                 quiz_tit: '2222q2sldfjsklfjsldkj',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             },{
        //                 quiz_tit: '33333sdfs2lkj234',
        //                 green: 0,
        //                 amber: 0,
        //                 red: 0
        //             }]
        //         }]
        //     }]
        // }
    </script>
</head>
<body class="xiang-control view client">
<div class="page-contain">
    <div class="bar-top-2 tit-contain">
        <div class="tit tit-bar">
            <div class="tit-label">
                <p id="surveys-tit">
                </p>
            </div>
        </div>
    </div>

    <div class="content-contain">
        <div class="surveys-con">
            <div id="chart-0" class="topic-con con-stat">
                <div class="tit-topic tit">
                    <div class="label-tit-topic label">
                        <p id="cur-topic-tit">
                        </p>
                    </div>
                    <div class="process-tit-topic process">
                        <p>
                            <a id="cur-index"></a>/<a id="topics-amount"></a>
                        </p>
                    </div>
                </div>
                <div class="quiz-con">
                    <div id="topics-list-box" class="quiz-list">


                        <!--                        <div class="quiz-li">-->
                        <!--                            <div class="radio-box-1">-->
                        <!--                                <div class="rb-1-tit">-->
                        <!--                                    <a class="label-1">-->
                        <!--                                        Do you have a process in place to ensure that all employees have the right to work in Ireland?-->
                        <!--                                    </a>-->
                        <!--                                </div>-->
                        <!--                                <div class="rb-1-con">-->
                        <!--                                    <div class="rb-1-li sel-radio">-->
                        <!--                                        <div class="rb-1-left">-->
                        <!--                                            <a class="ico-1-green"> </a>-->
                        <!--                                        </div>-->
                        <!--                                        <div class="rb-1-right">-->
                        <!--                                            <a class="label-2">-->
                        <!--                                                My business has this in place / I am happy with our approach / I feel that I have sufficient knowledge.-->
                        <!--                                            </a>-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="rb-1-li">-->
                        <!--                                        <div class="rb-1-left">-->
                        <!--                                            <a class="ico-1-amber"></a>-->
                        <!--                                        </div>-->
                        <!--                                        <div class="rb-1-right">-->
                        <!--                                            <a class="label-2">-->
                        <!--                                                My business has something in place, but I feel it could be improved / i feel that i would need some support if this situation arose.-->
                        <!--                                            </a>-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="rb-1-li">-->
                        <!--                                        <div class="rb-1-left">-->
                        <!--                                            <a class="ico-1-red"></a>-->
                        <!--                                        </div>-->
                        <!--                                        <div class="rb-1-right">-->
                        <!--                                            <a class="label-2">-->
                        <!--                                                My business does not have provision for this / I feel unprepared for this situation.-->
                        <!--                                            </a>-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                        </div>-->


                    </div>

                    <div class="opera-quiz">
                        <div class="previous-opera">
                            <a id="opera-btn-prev" class="btn-6">Previous</a>
                        </div>
                        <div class="next-opera">
                            <a id="opera-btn-next" class="btn-6">Next</a>
                            <a id="opera-btn-submit" class="btn-6">Submit</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<br>
<br>
<br>
</body>
</html>
