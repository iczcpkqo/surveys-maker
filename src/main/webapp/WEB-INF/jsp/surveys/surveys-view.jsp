<!DOCTYPE html>
<html lang="en">
<head>
    <%
        Object data = request.getAttribute("data");
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
    <script src="../../../static/js/view/surveys-view.js"></script>
    <script>
        let g_jsp_data =<%= data%>
        //     {
        //     surveys: [{
        //         "surveys_id": "06dfddfa-dfb9-49d3-b588-69f043d4682e",
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
        //         "surveys_tit": "sur isdfsdfsdfdssdfsdfs",
        //         "time": {"seconds": 1618857671, "nanos": 221000000}
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
<body class="xiang-control view survey" style="display: none;">
<div class="page-contain">
    <div class="bar-top-2 tit-contain">
        <div class="tit tit-bar">
            <div class="tit-label">
                <p id="surveys-tit">
                </p>
            </div>
        </div>
    </div>

    <div class="operation">
        <a class="btn-back-1" onClick="javascript:window.history.back();">Back</a>
        <a id="copy-surveys" class="btn-7 button">Copy</a>
    </div>

    <div class="content-contain">
        <div id="survey-con" class="surveys-con">

            <!--con start-->
            <!--            <div id="chart-0" class="topic-con con-stat red">-->
            <!--                <div class="tit-topic tit">-->
            <!--                    <div class="label-tit-topic label">-->
            <!--                        <p>Hours of Work and Leave</p>-->
            <!--                    </div>-->
            <!--                    <div class="process-tit-topic process">-->
            <!--                        <p>-->
            <!--                            <a>1</a>/<a>8</a>-->
            <!--                        </p>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--                <div class="quiz-con">-->
            <!--                    <div id="topics-list-box" class="quiz-list">-->

            <!--                        <div class="quiz-li">-->
            <!--                            <div class="radio-box-1">-->
            <!--                                <div class="rb-1-tit">-->
            <!--                                    <a class="label-1">-->
            <!--                                        Do you have a process in place to ensure that all employees have the right to work in Ireland?-->
            <!--                                    </a>-->
            <!--                                </div>-->
            <!--                            </div>-->
            <!--                        </div>-->

            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--con end-->

        </div>
    </div>
</div>

<br>
<br>
<br>
</body>
</html>
