package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class testController {

    @RequestMapping("index")
    public String test(HttpServletRequest request){
        return "index";
    }
}
