<!DOCTYPE html>
<html lang="en">
<head>

    <%
        Object topic_name = request.getSession().getAttribute("topic_name");
        Object quizes = request.getSession().getAttribute("quizes");
        if (topic_name == null) {
            topic_name = "";
        }
        if (quizes == null) {
            quizes = "[]";
        }
        String replace = topic_name.toString().replace("\"", "");
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
    <!--   page -->
    <link rel="stylesheet" href="../../../static/css/detail/detail.css">
    <link rel="stylesheet" href="../../../static/css/detail/topic-detail.css">

    <!--    script-->
    <script src="../../../static/js/xiang_control/base.js"></script>
    <script src="../../../static/js/detail/detail.js"></script>
    <script src="../../../static/js/detail/topic-detail.js"></script>

    <script type="text/javascript">
        var g_jsp_data = {
            topic_tit: "<%= replace%>",
            quizes: <%= quizes%>
        }
        // var g_jsp_data = {
        //     'topic_id': String,
        //     'topic_tit': String,
        //     'quizes':[String]
        //     'topic_time':String
        // }
    </script>
</head>
<body class="xiang-control detail">

<!--导航-->
<div class="bar-top-1">
    <a class="tit" href="../index.html">Surveys Maker System</a>
    <div class="account">Xiang.Mao@outlook.com</div>
    <div class="nav-con">
        <a class="nav-li" href="../surveys/surveys-list">Surveys List</a>
        <a class="nav-li sel" href="topic-list">Topic List</a>
    </div>
</div>

<div class="operation">
    <a id="submit-topic" class="btn-4">Save</a>
</div>

<!--详情-->
<div class="con-detail">
    <form id="topic-form" class="box-detail" action="save-topic">
        <div class="tit">
            <input name="topic-tit" id="topic-tit" class="txt-2" type="text" placeholder="Please input topic name.">
        </div>

        <div class="box-li">
            <!--            问题结构-->
            <!--            <div class="detail-li">-->
            <!--                <div class="detail-input">-->
            <!--                    <input class="txt-1" type="text" placeholder="Please input your Question.">-->
            <!--                </div>-->
            <!--                <div class="detail-del">-->
            <!--                    <a class="btn-1">Delete</a>-->
            <!--                </div>-->
            <!--            </div>-->
        </div>

        <!--        重复-->
        <!--        重复 END-->

        <div class="detail-add">
            <a class="btn-3 add-quiz-btn">Add A Topic</a>
        </div>
    </form>
</div>


</body>
</html>
