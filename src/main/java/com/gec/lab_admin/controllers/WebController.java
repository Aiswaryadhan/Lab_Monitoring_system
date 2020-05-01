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
    @RequestMapping("/file_upload")
    //@ResponseBody
    public String fileUpload() {
        return "student_file_upload";
    }

    @RequestMapping("/home")
    //@ResponseBody
    public String home() {
        return "admin_dashboard";
    }

    @RequestMapping("/files_received")
    //@ResponseBody
    public String filesReceived() {
        return "admin_files";
    }

    @RequestMapping("/attendance")
    //@ResponseBody
    public String attendance() {
        return "admin_attendance";
    }

    @RequestMapping("/teacherDashboard")
    //@ResponseBody
    public String teacherDashboard() {
        return "teacher_dashboard";
    }

    @RequestMapping("/teacherMonitor")
    //@ResponseBody
    public String teacherMonitor() {
        return "teacher_monitor";
    }

    @RequestMapping("/teacher_files_received")
    //@ResponseBody
    public String teacherFiles() {
        return "teacher_files";
    }

    @RequestMapping("/semesters")
    //@ResponseBody
    public String semesterInsertion() {
        return "insert_semester";
    }

    @RequestMapping("/blocked")
    //@ResponseBody
    public String siteInsertion() {
        return "admin_block_sites";
    }

    @RequestMapping("/teacher_blocked")
    //@ResponseBody
    public String teacherSiteInsertion() {
        return "teacher_block_sites";
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
    @RequestMapping("/teacher_attendance")
    //@ResponseBody
    public String teacherAttendance() {
        return "teacher_attendance";
    }



}
