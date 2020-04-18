package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.*;
import com.gec.lab_admin.services.AttendanceService;
import com.gec.lab_admin.services.TeacherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.lang.StrictMath.round;

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
        reportList.forEach(attendanceReport -> {
           Integer t_days=attendanceReport.getTotal_days();
           Integer p_days=attendanceReport.getPresent_days();
           float percent=((float)p_days/(float)t_days)*100;
            double m= Math.round(percent*100.0)/100.0;
            attendanceReport.setPercentage((float) m);
            if(m<75){
                attendanceReport.setEligibility(false);
            }
            else{
                attendanceReport.setEligibility(true);
            }
        });
        return reportList;
    }

    @RequestMapping(value = "/uploadFile/{studId}/{sub}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> uploadFile(
            @RequestParam("uploadfile") MultipartFile uploadfile,@PathVariable String studId,@PathVariable String sub) {
//        System.out.println(studId);

        try {
            // Get the filename and build the local file path (be sure that the
            // application have write permissions on such directory)
            String filename = uploadfile.getOriginalFilename();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            String today =format.format(new Date());

            String PATH = "/home/aiswarya/";
            String directoryName0 = PATH.concat("Students");
            File directory0 = new File(directoryName0);
            System.out.println(directory0);
            if (!directory0.exists())
                directory0.mkdir();

            String PATH0 = "/home/aiswarya/Students/";
            String directoryName = PATH0.concat(studId);
            File directory1 = new File(directoryName);
            System.out.println(directory1);
            if (!directory1.exists())
                directory1.mkdir();

            String PATH1 = "/home/aiswarya/Students/"+studId+"/";
            String directoryName1 = PATH1.concat(sub);
            File directory2 = new File(directoryName1);
            System.out.println(directory2);
            if (!directory2.exists())
                directory2.mkdir();

            String PATH2 = "/home/aiswarya/Students/"+studId+"/"+sub+"/";
            String directoryName2 = PATH2.concat(today);
            File directory3 = new File(directoryName2);
            System.out.println(directory3);
            if (!directory3.exists())
                directory3.mkdir();

            String directory = "/home/aiswarya/Students/"+studId+"/"+sub+"/"+today+"/";
            String filepath = Paths.get(directory, filename).toString();

            // Save the file locally
            BufferedOutputStream stream =
                    new BufferedOutputStream(new FileOutputStream(new File(filepath)));
            stream.write(uploadfile.getBytes());
            stream.close();
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    } // method uploadFile
}