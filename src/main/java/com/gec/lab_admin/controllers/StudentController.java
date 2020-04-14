package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.LoggedStudent;
import com.gec.lab_admin.db.models.Semester;
import com.gec.lab_admin.db.models.Student;
import com.gec.lab_admin.db.models.Subject;
import com.gec.lab_admin.services.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.gec.lab_admin.controllers.TeacherController.LOGGED_IN_TEACHER_ID;
import static com.gec.lab_admin.controllers.TeacherController.LOGGED_IN_TEACHER_NAME;

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
                logger.info("success");
                studentService.updateAttendance(TeacherController.LOGGED_IN_TEACHER_SUBJECT, student.getId());
                studentService.add(student.getId());
                System.out.println(loggedInStudent.get());
                String name=loggedInStudent.get().getName();
                int sem=loggedInStudent.get().getSem();
                String res=name+","+sem;
                return res;
            }
            else{
                logger.debug("wrong password");
                return "invalid";
            }
        }
        else{
            logger.error("wrong user name");
            return "invalid";
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "/student/getTeacherName")
    public String getTeacherName() {

        if (TeacherController.LOGGED_IN_TEACHER_NAME != null && TeacherController.LOGGED_IN_TEACHER_ID!=null) {
            String res=TeacherController.LOGGED_IN_TEACHER_NAME+","+TeacherController.LOGGED_IN_TEACHER_ID;
            return res;
        } else {
            return "null";
        }
    }
    @RequestMapping("/student/getAll")
    public List<Student> getAllStudent() {
        return studentService.getAllStudent();
    }
    @RequestMapping("/student/insert")
    public void insertStud(@RequestBody Student student) {
        studentService.insertStud(student.getId(), student.getName(),student.getSem());
    }
    @RequestMapping("/student/update/{studId}")
    public void updateStud(@RequestBody Student student,@PathVariable String studId) {
        studentService.updateStud(student.getName(),student.getSem(),studId);
    }
    @RequestMapping("/student/delete/{studId}")
    public void deleteStud(@PathVariable String studId){
        studentService.deleteStud(studId);
    }

}