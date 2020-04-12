package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.LoggedStudent;
import com.gec.lab_admin.db.models.Student;
import com.gec.lab_admin.services.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class StudentController {
    @Autowired
    StudentService studentService;
//    LoggedStudentService loggedStudentService;
    LoggedStudent loggedStudent;
    final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @RequestMapping(method = RequestMethod.POST,value = "/student/login")
    public Student login(@RequestBody Student student){
        Optional<Student> loggedInStudent = studentService.login(student.getId());
        if(loggedInStudent.isPresent()){
            if(loggedInStudent.get().getPassword().equals(student.getPassword())){
                logger.info("success");
                studentService.updateAttendance(TeacherController.LOGGED_IN_TEACHER_SUBJECT, student.getId());
                studentService.add(student.getId());
                System.out.println(loggedInStudent.get());
                return loggedInStudent.get();
            }
            else{
                logger.debug("wrong password");
                return null;
            }
        }
        else{
            logger.error("wrong user name");
            return null;
        }
    }

    @RequestMapping("/student/getName/{studId}")
    public String findStudent(@PathVariable String studId){
        return studentService.getStudName(studId);
    }
}