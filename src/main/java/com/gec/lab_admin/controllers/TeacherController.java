package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.Semester;
import com.gec.lab_admin.db.models.Teacher;
import com.gec.lab_admin.services.TeacherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TeacherController {
    @Autowired
    TeacherService teacherService;

    final Logger logger = LoggerFactory.getLogger(TeacherController.class);

    public static String LOGGED_IN_TEACHER_SUBJECT="";

    @RequestMapping(method = RequestMethod.POST,value = "/login/{subjectId}")
    public String login(@RequestBody Teacher teacher, @PathVariable String subjectId){
        Optional<Teacher> loggedInTeacher = teacherService.login(teacher.getId());
        if(loggedInTeacher.isPresent()){
            if(loggedInTeacher.get().getPassword().equals(teacher.getPassword())){
                LOGGED_IN_TEACHER_SUBJECT = subjectId;
                teacherService.getAttendanceRecords(subjectId);
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

}