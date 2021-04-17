package com.controller;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
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
        if (StringUtils.isEmpty(surveyName) || topicIds == null) {
            return "surveys/surveys-detail";
        }
        Result result = surveyService.saveSurvey(surveyName, topicIds);
        //TODO
//        request.getSession().setAttribute("id", result.getData().get("id"));
        try {
            request.getRequestDispatcher("surveys/surveys-view").forward(request, response);
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
        if (result.getData() != null) {
            //TODO
            JsonObject jsonObject = (JsonObject) gson.toJsonTree(result.getData());
            request.getSession().setAttribute("filePath", jsonObject.get("filePath"));
            request.getSession().setAttribute("fileName", jsonObject.get("fileName"));
        }

        return "surveys/downloadPDF";
    }

    @RequestMapping("surveys/surveysList")
    public String surveysList(HttpServletRequest request) {
        String page = request.getParameter("page");
        Result result = surveyService.queryAllDocumentPage("surveys", Integer.valueOf(page), 10);
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        request.getSession().setAttribute("data", result.getData());
        //TODO
//        request.getSession().setAttribute("total", result.getData().get("total"));
        return "surveys/surveysList";
    }

    @RequestMapping("surveys/startAnswer")
    public String startAnswer(HttpServletRequest request, HttpServletResponse response) {
        String surveyId = request.getParameter("survey-id");
        if (StringUtils.isEmpty(surveyId)) {
            return null;
        }
        Result result = surveyService.startAnswer(surveyId);
        //TODO
//        request.getSession().setAttribute("clientId", result.getData().get("id"));
        try {
            request.getRequestDispatcher("surveys/surveys-answer").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return "surveys/surveys-answer";
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
        request.getSession().setAttribute("topic-index", topicIndex);
        return "surveys/surveySubmit";
    }
}
