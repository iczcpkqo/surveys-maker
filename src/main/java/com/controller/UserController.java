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

    @RequestMapping("register/register")
    public String register(HttpServletRequest request, HttpServletResponse response) {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        if (StringUtils.isEmpty(email) || StringUtils.isEmpty(password)) {
            return "register/register";
        }

        Result result = userService.saveUser(email, password);
        request.getSession().setAttribute("status", result.getStatus());
        request.getSession().setAttribute("message", result.getMessage());
        //TODO
//        request.getSession().setAttribute("id", result.getData().get("id"));
        request.getSession().setAttribute("email", email);
        return "surveys/surveysList";
    }

    //login
    @RequestMapping("login/userLogin")
    public String login(HttpServletRequest request, HttpServletResponse response) {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        if (StringUtils.isEmpty(email) || StringUtils.isEmpty(password)) {
            request.getSession().setAttribute("type", "../register/register");
            request.getSession().setAttribute("tit", "please register");
            request.getSession().setAttribute("des", "email or password error");

        }
        Result result = userService.login(email, password);

        request.getSession().setAttribute("tit", result.getStatus());
        request.getSession().setAttribute("des", result.getMessage());
        if ("login successful".equals(result.getStatus())) {
            request.getSession().setAttribute("type", "../surveys/surveysList");
        }
        request.getSession().setAttribute("type", "../register/register");
        return "jump/tip";
    }

    @RequestMapping("login/login")
    public void loginPage(HttpServletRequest request) {
    }

    @RequestMapping("jump/tip")
    public void tip(HttpServletRequest request){
    }
}
