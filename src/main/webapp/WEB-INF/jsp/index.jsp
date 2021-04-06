<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<br>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Full Layout - jQuery EasyUI Demo</title>
</head>
<br>
query:
<br>
<c:forEach items="${surveys }" var="item">
    <c:forEach items="${item}" var="map">
        ${map.key}---->${map.value}<br>
    </c:forEach>
</c:forEach>
</body>
</br>
add:
<form action="add" method="post">
    survey：<input name="surveyName" value=""/><br>
    <input type="submit" value="submit">
</form>
</html>
<%
    HttpSession sess = request.getSession();
    String status = (String) sess.getAttribute("status");
    String message = (String) sess.getAttribute("message");
    System.out.println(status);
    if (status == "true") {
%>
    <script type="text/javascript">
        alert("add data successful, <%=message %>");
        var a = {
            'sdfsdf': 234,
            'fdgfdg': 'sdfsdf'
        };
    </script>
<%
    } else if(status == "false"){
%>
    <script type="text/javascript">
        alert("failed to add data, <%=message %>");
    </script>

<%

        sess.setAttribute("mes", "");
    }


%>
