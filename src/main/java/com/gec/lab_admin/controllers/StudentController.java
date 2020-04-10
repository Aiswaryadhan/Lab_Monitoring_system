package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.LoggedStudent;
import com.gec.lab_admin.db.models.Student;
import com.gec.lab_admin.services.LoggedStudentService;
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
    public String login(@RequestBody Student student){
        Optional<Student> loggedInStudent = studentService.login(student.getId());
        if(loggedInStudent.isPresent()){
            if(loggedInStudent.get().getPassword().equals(student.getPassword())){
                logger.info("succes");
                studentService.updateAttendance(TeacherController.LOGGED_IN_TEACHER_SUBJECT, student.getId());
                studentService.add(student.getId());
                return "success";
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
}