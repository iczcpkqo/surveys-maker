package com.controller;

import com.po.Result;
import com.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.ExecutionException;


@Controller
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @RequestMapping("surveys/surveys-detail")
    public String index(HttpServletRequest request) throws ExecutionException, InterruptedException {
        Result resultData = surveyService.queryAllSurveys();
        request.getSession().setAttribute("data", resultData.getData());
        request.getSession().setAttribute("status", resultData.getStatus());
        request.getSession().setAttribute("message", resultData.getMessage());
        return "surveys/surveys-detail";
    }

}
