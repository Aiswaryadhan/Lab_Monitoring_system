package com.gec.lab_admin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WebController {

//    @RequestMapping("/")
//    @ResponseBody
//    public String index() {
//        return "Welcome";
//    }

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

    @RequestMapping("/student_login")
    //@ResponseBody
    public String studentLogin() {
        return "student_login";
    }

    @RequestMapping("/student_home")
    //@ResponseBody
    public String studentHome() {
        return "student_home";
    }

    @RequestMapping("/student_doubts")
    //@ResponseBody
    public String studentDoubts() {
        return "student_doubts";
    }

    @RequestMapping("/home")
    //@ResponseBody
    public String home() {
        return "admin_dashboard";
    }

    @RequestMapping("/teacherDashboard")
    //@ResponseBody
    public String teacherDashboard() {
        return "teacher_dashboard";
    }

    @RequestMapping("/semesters")
    //@ResponseBody
    public String semesterInsertion() {
        return "insert_semester";
    }

    @RequestMapping("/subjects")
    //@ResponseBody
    public String subjectInsertion() {
        return "insert_subject";
    }

    @RequestMapping("/students")
    //@ResponseBody
    public String studentInsertion() {
        return "insert_student";
    }

    @RequestMapping("/teachers")
    //@ResponseBody
    public String teacherInsertion() {
        return "insert_teacher";
    }

    @RequestMapping("/monitor")
    //@ResponseBody
    public String studentMonitor() {
        return "student_monitoring";
    }


}
