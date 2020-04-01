package com.gec.lab_admin.controllers;

import com.gec.lab_admin.services.ScreenPlayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WebController {


    @Autowired
    ScreenPlayer screenPlayer;

    @RequestMapping("/")
    @ResponseBody
    public String index() {
        screenPlayer.addAdapters();
        return "Welcome";
    }

    @RequestMapping("/hello")
    @ResponseBody
    public String welcome(){
        return "Hello World";
    }

    @RequestMapping("/login")
    //@ResponseBody
    public String login() {
        return "login_page";
    }

    @RequestMapping("/teacherDashboard")
    //@ResponseBody
    public String teacherDashboard() {
        return "teacher_dashboard";
    }

}
