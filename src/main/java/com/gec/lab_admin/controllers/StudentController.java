package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.LoggedStudent;
import com.gec.lab_admin.db.models.Semester;
import com.gec.lab_admin.db.models.Student;
import com.gec.lab_admin.db.models.Subject;
import com.gec.lab_admin.services.StudentService;
import com.gec.lab_admin.services.TeacherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import static com.gec.lab_admin.controllers.TeacherController.LOGGED_IN_TEACHER_ID;
import static com.gec.lab_admin.controllers.TeacherController.LOGGED_IN_TEACHER_NAME;

@RestController
public class StudentController {
    @Autowired
    StudentService studentService;

    //    TeacherService teacherService;
    //    LoggedStudentService logge
//    dStudentService;
    LoggedStudent loggedStudent;
    final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @RequestMapping(method = RequestMethod.POST,value = "/student/login")
    public String login(@RequestBody Student student) throws IOException {
        Optional<Student> loggedInStudent = studentService.login(student.getId());
        if(loggedInStudent.isPresent()){
            if(loggedInStudent.get().getPassword().equals(student.getPassword())){
                logger.info("success");
                studentService.updateAttendance(TeacherController.LOGGED_IN_TEACHER_SUBJECT, student.getId());
                studentService.add(student.getId());
                List<String> s1= studentService.getAllSites(TeacherController.LOGGED_IN_TEACHER_SUBJECT);
                Iterator<String> s1Iterator = s1.iterator();
                while (s1Iterator.hasNext()) {
                    studentService.blockSites(s1Iterator.next());
                }
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

    @RequestMapping("/student/getFilesNum/{sub}/{studId}")
    public Integer getFiles(@PathVariable String sub,@PathVariable String studId){
        return studentService.getFiles(sub,studId);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/student/getTeacherName")
    public String getTeacherName() {

        if (TeacherController.LOGGED_IN_TEACHER_NAME != null && TeacherController.LOGGED_IN_TEACHER_ID!=null && TeacherController.LOGGED_IN_TEACHER_SUBJECT!=null) {
            String res=TeacherController.LOGGED_IN_TEACHER_NAME+","+TeacherController.LOGGED_IN_TEACHER_ID+","+TeacherController.LOGGED_IN_TEACHER_SUBJECT;
            logger.info(res);
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

    @RequestMapping("/student/upload/{studId}/{teacherSub}/{filename}")
    public void insertFiles(@PathVariable String studId,@PathVariable String teacherSub,@PathVariable String filename) {
        studentService.insertFiles(studId,teacherSub,filename);
        System.out.println("Inserted into files!!");
    }

    @RequestMapping(method = RequestMethod.POST, value ="/student/getUploadDetails/{studId}/{teacherSub}")
    public List<String> studDisplayFiles(@PathVariable String studId,@PathVariable String teacherSub) {
        return studentService.studDisplayFiles(studId,teacherSub);
    }

    @RequestMapping(method = RequestMethod.POST, value ="/teacher/getFiles/{sub}")
    public List<String> adminDisplayFiles(@PathVariable String sub) {
        return studentService.adminDisplayFiles(sub);
    }

    @RequestMapping("/student/idCheck")
    public String idCheck(@RequestBody Student student) {
        Optional<Student> loggedInStudent = studentService.login(student.getId());
        if(loggedInStudent.isPresent()){
            return "success";
        }
        else{
            return "failed";
        }

    }
    @RequestMapping("/student/getCount/{user}/{sub}")
    public Integer getCount(@PathVariable String user,@PathVariable String sub) {
        return studentService.getCount(user,sub);
    }
    @RequestMapping("/student/update/{studId}")
    public void updateStud(@RequestBody Student student,@PathVariable String studId) {
        studentService.updateStud(student.getName(),student.getSem(),studId);
    }
    @RequestMapping("/student/delete/{studId}")
    public void deleteStud(@PathVariable String studId){
        studentService.deleteStud(studId);
    }

    @RequestMapping("/student/updateSem")
    public void updateSem(){
        studentService.upDateSem();
    }

    @RequestMapping("/student/deleteFinal")
    public void deleteFinal(){
        studentService.deleteFinal();
    }


    @RequestMapping("/student/getName/{sender}")
    public String findStudent(@PathVariable String sender){
        logger.info("finding student");
        return studentService.getStudentName(sender);
    }

    @RequestMapping("/student/getNotification/{studId}")
    public List<String> getNotification(@PathVariable String studId){
        logger.info("Get Notifications");
        return studentService.getNotification(studId);
    }

    @RequestMapping("/student/getNotificationCount/{studId}")
    public int getNotificationCount(@PathVariable String studId){
        logger.info("Get Notification Count");
        return studentService.getNotificationCount(studId);
    }

    @RequestMapping("/student/updateNotification/{t1}")
    public void updateNotification(@PathVariable Timestamp t1){
        logger.info("Get Notifications");
        studentService.updateNotification(t1);
    }
}