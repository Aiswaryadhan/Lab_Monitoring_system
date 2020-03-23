package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.Teacher;
import com.gec.lab_admin.services.TeacherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class TeacherController {
    @Autowired
    TeacherService teacherService;

    final Logger logger = LoggerFactory.getLogger(TeacherController.class);

    @RequestMapping(method = RequestMethod.POST,value = "/login")
    public String login(@RequestBody Teacher teacher){
        Optional<Teacher> loggedInTeacher = teacherService.login(teacher.getId());
        if(loggedInTeacher.isPresent()){
            if(loggedInTeacher.get().getPassword().equals(teacher.getPassword())){
                logger.info("succes");

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
    @RequestMapping("/login/{teacherid}")
    public List<Teacher> generateSubject(@PathVariable String teacherid) {
        List<Teacher> subjectList = new ArrayList<>();
        subjectList = teacherService.generateSubject(teacherid);
        subjectList.forEach(subject -> {
//            logger.info("Fetched subjectid :" + subject.getId());
//            logger.info("Fetched subject :" + subject.getSubject());
        });
        return subjectList;
    }
}
