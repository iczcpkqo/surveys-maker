<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <%
        Object data = request.getSession().getAttribute("data");
    %>

<!--    control-->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/xiang_control/base.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/xiang_control/bar.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/xiang_control/container.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/xiang_control/button.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/xiang_control/input.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/xiang_control/text.css">
    <!--   page -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/detail/detail.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/detail/surveys-detail.css">

<!--    script-->
    <script src="${pageContext.request.contextPath}/static/js/xiang_control/base.js"></script>
    <script src="${pageContext.request.contextPath}/static/js/data_processing/data-processing.js"></script>
    <script src="${pageContext.request.contextPath}/static/js/detail/detail.js"></script>
    <script src="${pageContext.request.contextPath}/static/js/detail/surveys-detail.js"></script>

    <script type="text/javascript">
        var g_jsp_data = <%=data %>
        // var g_jsp_data = {
        //     'surveys_name': String,
        //     // 主题库中的所有主题
        //     'topics': [
        //         {
        //             'id': int,
        //             'tit': String
        //         }
        //     ],
        //     // 该问卷已经选择的主题们
        //     'sels': [
        //         {
        //             'id': int,
        //             'tit': String
        //         }
        //     ]
        // }
    </script>

</head>
<body class="xiang-control detail">

<!--导航-->
<div class="bar-top-1">
    <a class="tit" href="../index.html">Surveys Maker System</a>
    <div class="account">Xiang.Mao@</div>
    <div class="nav-con">
        <a class="nav-li sel" href="../surveys/surveys-detail.html">Surveys List</a>
        <a class="nav-li" href="../topic/topic-detail.html">Topic List</a>
    </div>
</div>

<div class="operation">
    <a class="btn-2">View Detail</a>
    <a id="submit-surveys" class="btn-4">Save</a>
</div>

<!--详情-->
<div class="con-detail">
    <form id="surveys-form" class="box-detail" action="test.jsp">

        <div class="tit">
            <input id="surveys-tit" class="txt-2" type="text" placeholder="Please input surveys name.">
        </div>

        <div class="box-li">

<!--            列表结构-->
<!--            <div class="detail-li">-->
<!--                <div class="detail-input">-->
<!--                    <select name="sel-topic" class="sel-1">-->
<!--                        <option value="7777">-->
<!--                            Business Operation Survey.-->
<!--                        </option>-->
<!--                        <option>-->
<!--                            Corporate Employee Happiness Survey.-->
<!--                        </option>-->
<!--                        <option>-->
<!--                            Business Operation Survey.-->
<!--                        </option>-->
<!--                        <option>-->
<!--                            Corporate Employee Happiness Survey.-->
<!--                        </option>-->
<!--                        <option>-->
<!--                            Business Operation Survey.-->
<!--                        </option>-->
<!--                        <option>-->
<!--                            Corporate Employee Happiness Survey.-->
<!--                        </option>-->
<!--                        <option>-->
<!--                            Business Operation Survey.-->
<!--                        </option>-->
<!--                        <option>-->
<!--                            Corporate Employee Happiness Survey.-->
<!--                        </option>-->
<!--                    </select>-->
<!--                </div>-->
<!--                <div class="detail-del">-->
<!--                    <a class="btn-1">Delete</a>-->
<!--                </div>-->
<!--            </div>-->
        </div>

<!--        重复-->
<!--        重复 END-->

        <div class="detail-add">
            <input type="button" class="btn-3 add-topic-btn" value="Add A Topic">
        </div>
    </form>
</div>
</body>
</html>