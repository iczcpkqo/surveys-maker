package com.controller;

import com.google.gson.JsonObject;
import com.po.Result;
import com.service.SurveyService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.concurrent.ExecutionException;


@Controller
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @RequestMapping("surveys/surveys-detail")
    public String surveysDetail(HttpServletRequest request) throws ExecutionException, InterruptedException {
        Result resultData = surveyService.queryAllSurveys();
        request.getSession().setAttribute("data", resultData.getData());
        request.getSession().setAttribute("status", resultData.getStatus());
        request.getSession().setAttribute("message", resultData.getMessage());
        return "surveys/surveys-detail";
    }


    @RequestMapping("surveys/downloadPDF")
    public String downloadPDF(HttpServletRequest request) {
        String survey_id = request.getParameter("survey_id");
        Result result = surveyService.getPersonalPDF();
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        if(result.getData()!=null){
            request.getSession().setAttribute("filePath", result.getData().get("filePath"));
            request.getSession().setAttribute("fileName", result.getData().get("fileName"));
        }

//        if (StringUtils.isEmpty(survey_id)) {
//            String personal_survey_id = request.getParameter("personal_survey_id");
//            if (StringUtils.isEmpty(personal_survey_id)) {
//                request.getSession().setAttribute("status", "false");
//                request.getSession().setAttribute("message", "survey_id and personal_survey_id both empty");
//                return "surveys/surveys-detail";
//            }else{
//
//            }
//        } else {
//
//        }
        return "surveys/downloadPDF";
    }
}
