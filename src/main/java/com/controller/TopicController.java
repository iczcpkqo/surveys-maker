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

    @RequestMapping("topic/topicList")
    public String topicList(HttpServletRequest request) {
        String page = request.getParameter("page");
        Result result = surveyService.queryAllDocumentPage("topics", Integer.valueOf(page), 10);
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        request.getSession().setAttribute("data", result.getData());
        //TODO
//        request.getSession().setAttribute("total", result.getData().get("total"));
        return "topic/topicList";
    }


    @RequestMapping("topic/topic-detail")
    public String topicView(HttpServletRequest request) {
        String topicId = request.getParameter("topic-id");
        if(StringUtils.isEmpty(topicId)){
            return "topic/topic-detail";
        }
        Result result = surveyService.getTopicById(topicId);
        request.getSession().setAttribute("data", result.getData());
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        return "topic/topic-detail";
    }

    @RequestMapping("topic/save-topic")
    public String saveTopic(HttpServletRequest request){
        String topicName = request.getParameter("topic-tit");
        String[] questions = request.getParameterValues("quiz-tit");
        request.getSession().setAttribute("des", "");
        if (StringUtils.isEmpty(topicName)) {
            request.getSession().setAttribute("type", "../topic/topic-detail");
            request.getSession().setAttribute("tit", "please enter topic name");
            return "jump/tip";
        }

        Result result = surveyService.saveTopic(topicName,questions);
        if("save successful".equals(result.getStatus())){
            request.getSession().setAttribute("type", "../topic/topic-list");
            request.getSession().setAttribute("tit", result.getStatus());
        }else {
            request.getSession().setAttribute("type", "../topic/topic-detail");
            request.getSession().setAttribute("tit", result.getStatus());
        }
        return "jump/tip";
    }
}
