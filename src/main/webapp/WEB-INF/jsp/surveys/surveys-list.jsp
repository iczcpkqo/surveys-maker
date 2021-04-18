<!DOCTYPE html>
<html lang="en">
<head>
    <%
        Object data = request.getSession().getAttribute("data");
        Object currentPage = Integer.valueOf(request.getSession().getAttribute("page").toString());
        Object pageAmount = Integer.valueOf(request.getSession().getAttribute("pageAmount").toString());
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
    <!--   page -->
    <link rel="stylesheet" href="../../../static/css/list/list.css">


    <!--    script-->
    <script src="../../../static/js/xiang_control/base.js"></script>
    <script src="../../../static/js/data_processing/data-processing.js"></script>
    <script src="../../../static/js/list/surveys-list.js"></script>
    <script type="text/javascript">
        let g_jsp_data = {
            page: <%= currentPage%>,
            page_amount:<%= pageAmount%>,
            surveys:<%= data%>
        };
    </script>
</head>
<body class="xiang-control list">

<!--导航-->
<div class="bar-top-1">
    <p class="tit">Surveys Maker System</p>
    <div class="account">Xiang.Mao@outlook.com</div>
    <div class="nav-con">
        <a class="nav-li sel">Surveys List</a>
        <a class="nav-li">Topic List</a>
    </div>
</div>

<div class="operation">
    <a class="label-3">Surveys List</a>
    <a class="btn-7" href="">New Surveys</a>
</div>

<!--列表-->
<div class="con-list">

    <div class="table-con">
        <div id="surveys-box" class="tr-con">

<!--            <div class="tr-li">-->
<!--                <div class="tr-left">-->
<!--                    <a>1</a>-->
<!--                </div>-->
<!--                <div class="tr-right">-->
<!--                    <div class="tr-r-con">-->
<!--                        <div class="tr-r-link">-->
<!--                            <a href="surveys-detail.html">Corporate Employee Happiness Survey.</a>-->
<!--                        </div>-->
<!--                        <div class="tr-r-del"></div>-->
<!--                        <div class="tr-r-share"></div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

            <!-- 重复 -->
<!--            <div class="tr-li">-->
<!--                <div class="tr-left">-->
<!--                    <a>1</a>-->
<!--                </div>-->
<!--                <div class="tr-right">-->
<!--                    <div class="tr-r-con">-->
<!--                        <div class="tr-r-link">-->
<!--                            <a>Corporate Employee Happiness Survey.</a>-->
<!--                        </div>-->
<!--                        <div class="tr-r-del"></div>-->
<!--                        <div class="tr-r-share"></div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div class="tr-li">-->
<!--                <div class="tr-left">-->
<!--                    <a>1</a>-->
<!--                </div>-->
<!--                <div class="tr-right">-->
<!--                    <div class="tr-r-con">-->
<!--                        <div class="tr-r-link">-->
<!--                            <a>Corporate Employee Happiness Survey.</a>-->
<!--                        </div>-->
<!--                        <div class="tr-r-del"></div>-->
<!--                        <div class="tr-r-share"></div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div class="tr-li">-->
<!--                <div class="tr-left">-->
<!--                    <a>1</a>-->
<!--                </div>-->
<!--                <div class="tr-right">-->
<!--                    <div class="tr-r-con">-->
<!--                        <div class="tr-r-link">-->
<!--                            <a>Corporate Employee Happiness Survey.</a>-->
<!--                        </div>-->
<!--                        <div class="tr-r-del"></div>-->
<!--                        <div class="tr-r-share"></div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div class="tr-li">-->
<!--                <div class="tr-left">-->
<!--                    <a>1</a>-->
<!--                </div>-->
<!--                <div class="tr-right">-->
<!--                    <div class="tr-r-con">-->
<!--                        <div class="tr-r-link">-->
<!--                            <a>Corporate Employee Happiness Survey.</a>-->
<!--                        </div>-->
<!--                        <div class="tr-r-del"></div>-->
<!--                        <div class="tr-r-share"></div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

            <!-- 重复 END -->

        </div>
    </div>

    <div class="paging-contain">
        <div class="paging-1">
            <div class="paging-previous">

            </div>
            <div id="page-num" class="paging-con">
                <div class="paging-li sel">
                    <a>
                        1
                    </a>
                </div>
                <div class="paging-li">
                    <a>
                        2
                    </a>
                </div>
                <div class="paging-li">
                    <a>
                        3
                    </a>
                </div>
                <div class="paging-li">
                    <a>
                        4
                    </a>
                </div>
            </div>
            <div class="paging-next">

            </div>
        </div>
    </div>
</div>


</body>
</html>