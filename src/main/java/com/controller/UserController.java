package com.controller;

import com.po.Result;
import com.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("user/register")
    public String register(HttpServletRequest request, HttpServletResponse response) {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        if(StringUtils.isEmpty(email) || StringUtils.isEmpty(password)){
            return "user/registerPage";
        }

        Result result = userService.saveUser(email,password);
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        request.getSession().setAttribute("id", result.getData().get("id"));
        request.getSession().setAttribute("email",email);
        return "surveys/surveysList";
    }

    //login
    @RequestMapping("user/login")
    public String login(HttpServletRequest request, HttpServletResponse response){
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        if(StringUtils.isEmpty(email) || StringUtils.isEmpty(password)){
            return "user/registerPage";
        }
        Result result = userService.login(email,password);
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        if("true".equals(result.getStatus())){
            request.getSession().setAttribute("id", result.getData().get("id"));
            request.getSession().setAttribute("email",email);
            return "surveys/surveysList";
        }
        return "user/registerPage";
    }

}
