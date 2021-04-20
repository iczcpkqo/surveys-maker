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

@Controller
public class TopicController {

    private static Gson gson = new Gson();

    @Autowired
    private SurveyService surveyService;

    @RequestMapping("topic/topic-list")
    public String topicList(HttpServletRequest request) {
        String page = request.getParameter("page");
        if (StringUtils.isEmpty(page)) {
            page = "1";
        }
        Result result = surveyService.queryAllDocumentPage("topics", Integer.valueOf(page), 10);
        JsonObject data = (JsonObject) gson.toJsonTree(result.getData());
        request.setAttribute("pageAmount", data.get("pageAmount"));
        request.setAttribute("page", Integer.valueOf(page));
        request.setAttribute("topics", data.get("data"));
        return "topic/topic-list";
    }


    @RequestMapping("topic/topic-detail")
    public String topicView(HttpServletRequest request) {
        String topicId = request.getParameter("topic_id");
        if (StringUtils.isEmpty(topicId)) {
            return "topic/topic-detail";
        }
        Result result = surveyService.getTopicById(topicId);
        JsonObject jsonObject = (JsonObject) gson.toJsonTree(result.getData());
        request.setAttribute("topic_name", jsonObject.get("topic_tit"));
        request.setAttribute("quizes", jsonObject.get("quizes"));
        return "topic/topic-detail";
    }

    @RequestMapping("topic/save-topic")
    public String saveTopic(HttpServletRequest request) {
        String topicName = request.getParameter("topic-tit");
        if (StringUtils.isEmpty(topicName)) {
            request.setAttribute("type", "../topic/topic-detail");
            request.setAttribute("tit", "please enter topic name");
            return "jump/tip";
        }

        String[] questions = request.getParameterValues("quiz-tit");
        if (questions == null) {
            request.setAttribute("type", "../topic/topic-detail");
            request.setAttribute("tit", "please enter quesions");
            return "jump/tip";
        }

        String topicId = request.getParameter("topic_id");
        Result result = surveyService.saveOrUpdateTopic(topicId, topicName, questions);
        if ("save successful".equals(result.getStatus())) {
            request.setAttribute("type", "../topic/topic-list");
            request.setAttribute("tit", result.getStatus());
        } else {
            request.setAttribute("type", "../topic/topic-detail");
            request.setAttribute("tit", result.getStatus());
            request.setAttribute("pares", result.getData());
        }
        return "jump/tip";
    }

    @RequestMapping("topic/topic-delete")
    public String surveyDelete(HttpServletRequest request) {
        String surveyId = request.getParameter("topic_id");
        if (StringUtils.isEmpty(surveyId)) {
            request.setAttribute("type", "topic/topic-delete");
            request.setAttribute("tit", "please enter topic id");
            return "jump/tip";
        }
        surveyService.deleteTopic(surveyId);
        return "topic/topic-list";
    }
}
