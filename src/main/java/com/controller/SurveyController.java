package com.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.po.Result;
import com.service.SurveyService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class SurveyController {

    private static Gson gson = new Gson();

    @Autowired
    private SurveyService surveyService;

    @RequestMapping("surveys/surveys-detail")
    public String surveysDetail(HttpServletRequest request) {
        Result result = surveyService.getSurveyByIdandTopics("");
        request.getSession().setAttribute("data", result.getData());
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        return "surveys/surveys-detail";
    }

    @RequestMapping("surveys/surveys-view")
    public String surveysView(HttpServletRequest request) {
        String surveyId = request.getParameter("survey-id");
        Result result = surveyService.getSurveyByIdandTopics(surveyId);
        request.getSession().setAttribute("data", result.getData());
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        return "surveys/surveys-view";
    }


    @RequestMapping("surveys/saveSurvey")
    public String saveSurvey(HttpServletRequest request, HttpServletResponse response) {
        String surveyName = request.getParameter("surveys-tit");
        String[] topicIds = request.getParameterValues("sel-topic");
        if (StringUtils.isEmpty(surveyName)) {
            request.getSession().setAttribute("tit", "please enter survey name");
            request.getSession().setAttribute("type", "../surveys/surveys-detail");
            return "surveys/surveys-detail";
        }
        if (topicIds == null) {
            request.getSession().setAttribute("tit", "please choose at least one topic");
            request.getSession().setAttribute("type", "../surveys/surveys-detail");
            return "surveys/surveys-detail";
        }
        Result result = surveyService.saveSurvey(surveyName, topicIds);
        request.getSession().setAttribute("tit", result.getStatus());
        request.getSession().setAttribute("des", result.getMessage());
        request.getSession().setAttribute("type", "../surveys/surveys-view");
        request.getSession().setAttribute("pares", result.getData());
        return "jump/tip";
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
        if (result.getData() != null) {
            JsonObject jsonObject = (JsonObject) gson.toJsonTree(result.getData());
            request.getSession().setAttribute("filePath", jsonObject.get("filePath"));
            request.getSession().setAttribute("fileName", jsonObject.get("fileName"));
        }
        return "surveys/downloadPDF";
    }

    @RequestMapping("surveys/surveys-list")
    public String surveysList(HttpServletRequest request) {
        String page = request.getParameter("page");
        if (StringUtils.isEmpty(page)) {
            page = "1";
        }
        Result result = surveyService.queryAllDocumentPage("surveys", Integer.valueOf(page), 20);
        JsonObject data = (JsonObject) gson.toJsonTree(result.getData());
        request.getSession().setAttribute("pageAmount", data.get("pageAmount"));
        request.getSession().setAttribute("page", Integer.valueOf(page));
        request.getSession().setAttribute("data", data.get("data"));
        return "surveys/surveys-list";
    }


    @RequestMapping("surveys/surveys-delete")
    public String surveyDelete(HttpServletRequest request) {
        String surveyId = request.getParameter("survey-id");
        if (StringUtils.isEmpty(surveyId)) {
            request.getSession().setAttribute("type", "../surveys/surveys-list");
            request.getSession().setAttribute("tit", "please enter survey id");
            return "jump/tip";
        }
        surveyService.deleteSurvey(surveyId);
        return "surveys-list";
    }
}
