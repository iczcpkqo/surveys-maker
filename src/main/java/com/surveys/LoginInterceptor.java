package com.surveys;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class LoginInterceptor implements HandlerInterceptor {

//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//            throws Exception {
//
//        Object email = request.getSession().getAttribute("email");
//        if (email == null){
//
//            response.sendRedirect(request.getContextPath()+"/login/login");
//            return false;
//        }else {
//            return true;
//        }
//
//    }

}
