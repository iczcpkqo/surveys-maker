<%@page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@page import="java.io.File" %>
<%@page import="java.io.FileInputStream" %>
<%@page import="com.sun.xml.internal.messaging.saaj.util.ByteOutputStream" %>
<%@page import="java.io.OutputStream" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.io.InputStream" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <%
        Object fileName = request.getAttribute("fileName");
        Object filePathObj = request.getAttribute("filePath");
        String filePath = null;
        if(filePathObj!=null){
            filePath = filePathObj.toString();
        }else {
            return;
        }
        String newPath= filePath.replace("\"", "");
        File file = new File(newPath);
        response.setContentLength(Integer.valueOf(((Long) file.length()).toString()));
        FileInputStream fis = new FileInputStream(file);
        int len = -1;
        byte[] data = new byte[1024];
        ByteOutputStream bos = new ByteOutputStream(1024);
        while ((len = fis.read(data)) != -1) {
            bos.write(data, 0, len);
        }
        OutputStream os = response.getOutputStream();
        response.setHeader("content-disposition", "attachment;filename=" + fileName + ".pdf");
        os.write(bos.getBytes());
        os.flush();
        os.close();
        fis.close();
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
    <script src="${pageContext.request.contextPath}/static/js/base.js"></script>
    <script src="${pageContext.request.contextPath}/static/js/detail/detail.js"></script>
    <script src="${pageContext.request.contextPath}/static/js/detail/surveys-detail.js"></script>
    <script type="text/javascript">

    </script>

</head>

</html>