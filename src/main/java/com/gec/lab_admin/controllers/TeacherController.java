package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.*;
import com.gec.lab_admin.services.AttendanceService;
import com.gec.lab_admin.services.TeacherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class TeacherController {
    @Autowired
    TeacherService teacherService;

    AttendanceReport attendanceReport=new AttendanceReport();

    @Autowired
    AttendanceService attendanceService;
    final Logger logger = LoggerFactory.getLogger(TeacherController.class);

    public static String LOGGED_IN_TEACHER_SUBJECT="";
    public static String LOGGED_IN_TEACHER_NAME="";
    public static String LOGGED_IN_TEACHER_ID="";
    public static Boolean LOGGED_IN_TEACHER_ADMIN;
    @RequestMapping(method = RequestMethod.POST,value = "/login/{subjectId}")
    public String login(@RequestBody Teacher teacher, @PathVariable String subjectId){
        Optional<Teacher> loggedInTeacher = teacherService.login(teacher.getId());
        if(loggedInTeacher.isPresent()){
            if(loggedInTeacher.get().getPassword().equals(teacher.getPassword())){
                LOGGED_IN_TEACHER_SUBJECT = subjectId;
                LOGGED_IN_TEACHER_NAME=loggedInTeacher.get().getName();
                LOGGED_IN_TEACHER_ID=loggedInTeacher.get().getId();
                LOGGED_IN_TEACHER_ADMIN=loggedInTeacher.get().getIs_admin();
                System.out.println(LOGGED_IN_TEACHER_NAME);
                teacherService.getAttendanceRecords(subjectId);
                logger.info("success");
                return "success"+LOGGED_IN_TEACHER_ADMIN;
            }
            else{
                logger.debug("wrong password");
                return "wrong password";
            }
        }
        else{
            logger.error("wrong user name");
            return "wrong user name";
        }
    }

    @RequestMapping("/teacher/idCheck")
    public String idCheck(@RequestBody Teacher teacher) {
        Optional<Teacher> sub = teacherService.idCheck(teacher.getId());
        if(sub.isPresent()){
            return "success";
        }
        else{
            return "failed";
        }

    }

//    @RequestMapping("/teacher/id/{teacher_id}")
//    public List<String> generateSubject(@PathVariable String teacher_id) {
//        return teacherService.getSubjects(teacher_id);
//    }

    @RequestMapping("/teacher/id/{teacher_id}")
    public List<String> generateSubject(@PathVariable String teacher_id) {
        return teacherService.getSubjects(teacher_id);
    }

    @RequestMapping("teacher/getName/{teacherId}")
    public String findTeacher(@PathVariable String teacherId){
        logger.info("finding teacher with id "+ teacherId);
        return teacherService.getTeacherName(teacherId);
    }
    @RequestMapping("teacher/getStudName")
    public List<String> findStudent(){
        logger.info("finding student");
        return teacherService.getStudentName();
    }
    @RequestMapping("teacher_details/getAll")
    public List<String> findTeacherDetails(){
        return teacherService.getTeacherDetails();
    }

    @RequestMapping("/teacher/insert")
    public void insertTeacher(@RequestBody Teacher teacher){
        logger.info("Insert in teacher table");
        teacherService.insertSem(teacher.getId(),teacher.getName(),teacher.getIs_admin());
    }
    @RequestMapping("/teacher/update/{teacherId}")
    public void updateTeacher(@RequestBody Teacher teacher,@PathVariable String teacherId){
        logger.info("Update teacher table");
        teacherService.updateTeacher(teacher.getName(),teacher.getIs_admin(),teacherId);
    }
    @RequestMapping("/teacher/delete/{teacherId}")
    public void deleteTeacher(@PathVariable String teacherId){
        logger.info("Delete teacher table");
        teacherService.deleteTeacher(teacherId);
    }
    @RequestMapping("/teacherSub/insert")
    public void insertTeacherSub(@RequestBody TeacherSubject teacherSubject){
        logger.info("Insert in teachersub table");
        teacherService.insertTeacherSub(teacherSubject.getTeacher_id(),teacherSubject.getSubject_id());
    }
    @RequestMapping("/teacherSub/update/{teacherId}")
    public void updateTeacherSub(@RequestBody TeacherSubject teacherSubject,@PathVariable String teacherId){
        logger.info("Update teacherSubject table");
        teacherService.updateTeacherSub(teacherSubject.getSubject_id(),teacherId);
    }
    @RequestMapping("/teacherSub/delete/{teacherId}")
    public void deleteTeacherSub(@PathVariable String teacherId){
        logger.info("Delete teacherSub table");
        teacherService.deleteTeacherSub(teacherId);
    }
    @RequestMapping("/semester/getAll")
    public List<Semester> getAllSemester(){
        logger.info("Returned semesters");
        return teacherService.getAllSemester();
    }
    @RequestMapping("/semester/insert")
    public void insertSem(@RequestBody Semester semester){
        logger.info("Insert in semester table");
        teacherService.insertSem(semester.getId(),semester.getName());
    }
    @RequestMapping("/semester/update/{semId}")
    public void updateSem(@RequestBody Semester semester,@PathVariable Integer semId){
        logger.info("Update semester table");
        teacherService.updateSem(semester.getName(),semId);
    }
    @RequestMapping("/semester/delete/{semId}")
    public void deleteSem(@PathVariable Integer semId){
        logger.info("Deletion in semester table");
        teacherService.deleteSem(semId);
    }
    @RequestMapping("/loggedStudent/delete")
    public void deleteLoggedStud(){
        teacherService.deleteLoggedStud();
    }
    @RequestMapping("/loggedStudent/delete/{studId}")
    public void deleteLoggedStudent(@PathVariable String studId){
        teacherService.deleteLoggedStudent(studId);
    }


    @RequestMapping("/attendance/generateReport/{sDate}/{eDate}/{sub}")
    public List<AttendanceReport> generateReport(@PathVariable String sDate, @PathVariable String eDate, @PathVariable String sub){
        Integer totalDays=teacherService.getTotalDays(sDate,eDate,sub);
        System.out.println("got total days");
        attendanceReport.setTotal_days(totalDays);
        Integer k=attendanceReport.getTotal_days();
        System.out.println(k);
        List<AttendanceReport> reportList = teacherService.generateReports(sDate,eDate,sub,attendanceReport.getTotal_days());
        return reportList;
    }

}