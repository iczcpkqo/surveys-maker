package com.controller;

import com.po.Result;
import com.service.SurveyService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class TopicController {

    @Autowired
    private SurveyService surveyService;

    @RequestMapping("topics/topicList")
    public String topicList(HttpServletRequest request) {
        String page = request.getParameter("page");
        Result result = surveyService.queryAllDocumentPage("topics", Integer.valueOf(page), 10);
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        request.getSession().setAttribute("data", result.getData());
        request.getSession().setAttribute("total", result.getData().get("total"));
        return "topics/topicList";
    }


    @RequestMapping("topics/topics-view")
    public String topicView(HttpServletRequest request) {
        String topicId = request.getParameter("topic-id");
        Result result = surveyService.getTopicById(topicId);
        request.getSession().setAttribute("data", result.getData());
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        return "surveys/surveys-view";
    }

    @RequestMapping("topics/saveTopic")
    public String saveTopic(HttpServletRequest request, HttpServletResponse response){
        String topicName = request.getParameter("topics-tit");
        String[] questions = request.getParameterValues("sel-question");
        if (StringUtils.isEmpty(topicName) || questions == null) {
            return "topics/topics-detail";
        }

        Result result = surveyService.saveTopic(topicName,questions);
        request.getSession().setAttribute("id", result.getData().get("id"));
        try {
            request.getRequestDispatcher("topics/topics-view").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            return "topics/topics-detail";
        }
        return "topics/topics-view";
    }
}
