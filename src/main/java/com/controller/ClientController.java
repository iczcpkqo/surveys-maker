package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ClientController {

    @RequestMapping("client/transit")
    public void transit(HttpServletRequest request) {

    }
}
