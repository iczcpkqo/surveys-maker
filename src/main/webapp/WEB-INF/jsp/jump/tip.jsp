<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <%
        Object type = request.getSession().getAttribute("type");
        Object tit = request.getSession().getAttribute("tit");
        Object des = request.getSession().getAttribute("des");
        Object pares = request.getSession().getAttribute("pares");
    %>
    <!--    control-->
    <link rel="stylesheet" href="../../../static/css/xiang_control/base.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/bar.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/container.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/button.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/input.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/text.css">
    <link rel="stylesheet" href="../../../static/css/xiang_control/label.css">


    <!--   page -->
    <link rel="stylesheet" href="../../../static/css/jump/tip.css">

    <!--js-->


    <script>
        var g_jsp_data = {
            type:"<%= type%>",
            tit:"<%= tit%>",
            des:"<%= des%>",
            pares:"<%= pares%>"
        }
    </script>

</head>
<body>
    <div class="contain">
    <div id="tip-tit" class="tit">

    </div>
    <div id="tip-des" class="des">

    </div>
    <div id="tip-view" class="view">

    </div>
    </div>
    <input id="temp" type="button" value="临时按钮" >
</body>
<script src="../../../static/js/xiang_control/base.js"></script>
<script src="../../../static/js/jump/tip.js"></script>
</html>