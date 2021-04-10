package com.controller;

import com.google.gson.JsonObject;
import com.po.Result;
import com.service.SurveyService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.concurrent.ExecutionException;


@Controller
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @RequestMapping("surveys/surveys-detail")
    public String surveysDetail(HttpServletRequest request){
        Result result = surveyService.queryAllSurveys("");
        request.getSession().setAttribute("data", result.getData());
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        return "surveys/surveys-detail";
    }

    @RequestMapping("surveys/surveys-view")
    public String surveysView(HttpServletRequest request){
        String surveyId  = request.getParameter("survey-id");
        Result result = surveyService.queryAllSurveys(surveyId);
        request.getSession().setAttribute("data", result.getData());
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        return "surveys/surveys-view";
    }


    @RequestMapping("surveys/saveSurvey")
    public String saveSurvey(HttpServletRequest request,HttpServletResponse response){
        String surveyName = request.getParameter("surveys-tit");
        String[] topicIds = request.getParameterValues("sel-topic");
        if(StringUtils.isEmpty(surveyName) || topicIds == null){
            return "surveys/surveys-detail";
        }
        Result result = surveyService.saveSurvey(surveyName,topicIds);
        request.getSession().setAttribute("id",result.getData().get("id"));
        try {
            request.getRequestDispatcher("surveys/surveys-view") .forward(request,response);
        } catch (Exception e) {
            e.printStackTrace();
            return "surveys/surveys-detail";
        }
        return "surveys/surveys-view";
    }



    @RequestMapping("surveys/downloadPDF")
    public String downloadPDF(HttpServletRequest request) {
        String id = request.getParameter("client-id");
        if (StringUtils.isEmpty(id)) {
            return "surveys/downloadPDF";
        }
        Result result = surveyService.getPersonalPDF(id);
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        if(result.getData()!=null){
            request.getSession().setAttribute("filePath", result.getData().get("filePath"));
            request.getSession().setAttribute("fileName", result.getData().get("fileName"));
        }

        return "surveys/downloadPDF";
    }
}
