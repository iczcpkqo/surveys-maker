package com.controller;

import com.service.SurveyService;
import com.util.firebaseUtil;
import com.po.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;


@RestController
public class test {

    @Autowired
    private SurveyService surveyService;

    @RequestMapping("/surveys")
    public Result survey(){
        return surveyService.queryAllSurveys("surveys");
    }

    @RequestMapping("/personalSurveys")
    public Result personalSurvey(){
        return surveyService.queryAllSurveys("personalSurveys");
    }

    @RequestMapping("/topics")
    public Result topics(){
        return surveyService.queryAllSurveys("topics");
    }

    @RequestMapping("/users")
    public Result users(){
        return surveyService.queryAllSurveys("users");
    }
}
