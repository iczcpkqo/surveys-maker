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
public class ClientController {

    private static Gson gson = new Gson();

    @Autowired
    private SurveyService surveyService;

    @RequestMapping("client/client-view")
    public String startAnswer(HttpServletRequest request, HttpServletResponse response) {
        String surveyId = request.getParameter("surveys_id");
        Result result = surveyService.startAnswer(surveyId);
        JsonObject jsonObject = (JsonObject) gson.toJsonTree(result.getData());
        request.setAttribute("client-id", jsonObject.get("id"));
        return "client/client-view";
    }


    @RequestMapping("surveys/surveySubmit")
    public String surveySubmit(HttpServletRequest request) {
        String clientId = request.getParameter("client-id");
        String topicIndex = request.getParameter("topic-index");
        String answers = request.getParameter("answers");
        String[] answersArray = answers.split(",");
        if (StringUtils.isEmpty(clientId) || StringUtils.isEmpty(topicIndex) || answersArray == null || answersArray.length <= 0) {
            return null;
        }
        Result result = surveyService.surveySummit(clientId, topicIndex, answersArray);
        request.setAttribute("topic-index", topicIndex);
        return "surveys/surveySubmit";
    }

    @RequestMapping("client/transit")
    public void transit(HttpServletRequest request) {

    }
}
