package com.controller;

import com.firebase.firebaseUtil;
import com.po.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;


@Controller
public class test {

    @Autowired
    private firebaseUtil firebaseUtil;

//    @RequestMapping("/index")
//    public String index(HttpServletRequest request) throws ExecutionException, InterruptedException {
//        List<Map<String, Object>> resultData = firebaseUtil.queryByName("surveys");
//        request.setAttribute("surveys", resultData);
//        return "index";
//    }

    @RequestMapping("/add")
    public String add(HttpServletRequest request, HttpServletResponse response) throws ExecutionException, InterruptedException, IOException, ServletException {
        String surveyName = request.getParameter("surveyName");
        Map<String, Object> data = new HashMap<>();
        data.put("surveyName", surveyName);

        Result result = firebaseUtil.addDataToBucket("surveys", data);
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        request.getRequestDispatcher("index").forward(request, response);
        return "index";
    }

}
