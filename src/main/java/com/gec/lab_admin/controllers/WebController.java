package com.gec.lab_admin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class WebController {

    @RequestMapping("/")
    @ResponseBody
    public String index() {
        return "Welcome";
    }
    @RequestMapping("/hello")
    public String welcome(){
        return "Hello World";
    }

    @RequestMapping("/teacher_login.html")
    public String login() {
        return "teacher_login.html";
    }

}
