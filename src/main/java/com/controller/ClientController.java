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


    @RequestMapping("client/transit")
    public void transit(HttpServletRequest request) {

    }

    @RequestMapping("client/client-view")
    public String client(HttpServletRequest request) {
        String clientId = request.getParameter("client_id");
        String topicIdx = request.getParameter("topic_idx");
        Integer topicIndex = null;
        if (StringUtils.isEmpty(topicIdx) || Integer.valueOf(topicIdx) < 0) {
            topicIndex = 0;
        } else {
            topicIndex = Integer.valueOf(topicIdx);
        }

        String jumpType = request.getParameter("jump_type");
        if (StringUtils.isNotEmpty(jumpType) && !"prev".equals(jumpType)) {
            String topicRes = request.getParameter("topic_res");
            if (StringUtils.isNotEmpty(topicRes)) {
                String[] answers = topicRes.split(",");
                surveyService.surveySummit(clientId, topicIndex - 1, answers);
            }
        }

        Result result = surveyService.getPersonalSurveyById(clientId);
        JsonObject jsonObject = (JsonObject) gson.toJsonTree(result.getData());
        request.setAttribute("surveys", jsonObject.get("surveys"));
        request.setAttribute("client_id", jsonObject.get("client_id"));
        request.setAttribute("topic_idx", topicIndex);
        if ("sub".equals(jumpType)) {
            request.setAttribute("tit", result.getStatus());
            request.setAttribute("des", "");
            request.setAttribute("type", "../client/client-stat");
            JsonObject subResult = new JsonObject();
            subResult.addProperty("client_id", jsonObject.get("client_id").toString());
            request.setAttribute("pares", subResult);
            return "jump/tip";
        }
        return "client/client-view";
    }

    @RequestMapping("client/start")
    public String start(HttpServletRequest request) {
        String surveysId = request.getParameter("surveys_id");
        Result result = surveyService.startAnswer(surveysId);
        request.setAttribute("type", "../client/client-view");
        request.setAttribute("tit", result.getStatus());
        request.setAttribute("pares", result.getData());
        request.setAttribute("des", "");
        return "jump/tip";
    }

    @RequestMapping("client/client-stat")
    public void statistics(HttpServletRequest request) {
        String id = request.getParameter("client_id");
        id = id.replace("\"", "");
        String topicIdx = request.getParameter("topic_idx");
        Integer topicIndex = null;
        if (StringUtils.isEmpty(topicIdx) || Integer.valueOf(topicIdx) < 0) {
            topicIndex = 0;
        } else {
            topicIndex = Integer.valueOf(topicIdx);
        }
        Result result = surveyService.getPersonalSurveyById(id);
        JsonObject jsonObject = (JsonObject) gson.toJsonTree(result.getData());
        request.setAttribute("surveys", jsonObject.get("surveys"));
        request.setAttribute("topic_idx", topicIndex);
        request.setAttribute("client_id", id);
    }

    @RequestMapping("client/client-down")
    public String downloadPDF(HttpServletRequest request) {
        String id = request.getParameter("client_id");
        if (StringUtils.isEmpty(id)) {
            return "client-down";
        }
        Result result = surveyService.getPersonalPDF(id);
        request.setAttribute("status", result.getStatus());
        request.setAttribute("message", result.getMessage());
        if (result.getData() != null) {
            JsonObject jsonObject = (JsonObject) gson.toJsonTree(result.getData());
            request.setAttribute("filePath", jsonObject.get("filePath"));
            request.setAttribute("fileName", jsonObject.get("fileName"));
        }
        return "client-down";
    }
}
