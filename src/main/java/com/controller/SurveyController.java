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
import java.net.InetAddress;
import java.net.UnknownHostException;

@Controller
public class SurveyController {

    private static Gson gson = new Gson();

    @Autowired
    private SurveyService surveyService;

    @RequestMapping("surveys/surveys-detail")
    public String surveysDetail(HttpServletRequest request) {
        String surveyId = request.getParameter("surveys_id");
        Result result = surveyService.getSurveyByIdandTopics(surveyId);
        request.setAttribute("data", result.getData());
        request.setAttribute("status", result.getStatus());
        request.setAttribute("message", result.getMessage());
        return "surveys/surveys-detail";
    }

    @RequestMapping("surveys/surveys-view")
    public String surveysView(HttpServletRequest request) {
        String surveyId = request.getParameter("surveys_id");
        Result result = surveyService.getSurveyByIdandTopics(surveyId);
        request.setAttribute("data", result.getData());
        request.setAttribute("status", result.getStatus());
        request.setAttribute("message", result.getMessage());
        return "surveys/surveys-view";
    }


    @RequestMapping("surveys/saveSurvey")
    public String saveSurvey(HttpServletRequest request) {
        String surveyName = request.getParameter("surveys-tit");
        String[] topicIds = request.getParameterValues("sel-topic");
        if (StringUtils.isEmpty(surveyName)) {
            request.setAttribute("tit", "please enter survey name");
            request.setAttribute("type", "../surveys/surveys-detail");
            request.setAttribute("des", "");
            return "jump/tip";
        }
        if (topicIds == null) {
            request.setAttribute("tit", "please choose at least one topic");
            request.setAttribute("type", "../surveys/surveys-detail");
            request.setAttribute("des", "");
            return "jump/tip";
        }
        Result result = surveyService.saveSurvey(surveyName, topicIds);
        request.setAttribute("tit", result.getStatus());
        request.setAttribute("des", result.getMessage());
        request.setAttribute("type", "../surveys/surveys-view");
        request.setAttribute("pares", result.getData());
        return "jump/tip";
    }

    @RequestMapping("surveys/surveys-list")
    public String surveysList(HttpServletRequest request) {
        String page = request.getParameter("page");
        if (StringUtils.isEmpty(page)) {
            page = "1";
        }
        Result result = surveyService.queryAllDocumentPage("surveys", Integer.valueOf(page), 20);
        JsonObject data = (JsonObject) gson.toJsonTree(result.getData());
        request.setAttribute("pageAmount", data.get("pageAmount"));
        request.setAttribute("page", Integer.valueOf(page));
        request.setAttribute("data", data.get("data"));
        String localAddr = null;
        try {
            localAddr = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        int serverPort = request.getServerPort();
        request.setAttribute("host", "http://" + localAddr + ":" + serverPort);
        return "surveys/surveys-list";
    }


    @RequestMapping("surveys/surveys-delete")
    public String surveyDelete(HttpServletRequest request) {
        String surveyId = request.getParameter("surveys_id");
        if (StringUtils.isEmpty(surveyId)) {
            request.setAttribute("type", "../surveys/surveys-list");
            request.setAttribute("tit", "please enter survey id");
            return "jump/tip";
        }
        surveyService.deleteSurvey(surveyId);
        request.setAttribute("type", "../surveys/surveys-list");
        request.setAttribute("tit", "delete successful");
        request.setAttribute("des", "");
        return "jump/tip";
    }

    @RequestMapping("surveys/surveys-copy")
    public String surveyCopy(HttpServletRequest request){
        String surveyId = request.getParameter("surveys_id");
        request.setAttribute("tit", "copy successful");
        request.setAttribute("type", "../surveys/surveys-detail");
        request.setAttribute("des", "");
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("surveys_id",surveyId);
        request.setAttribute("pares", jsonObject);
        return "jump/tip";
    }
}
