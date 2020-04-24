package com.gec.lab_admin.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gec.lab_admin.db.models.*;
import com.gec.lab_admin.db.repositories.AttendanceRepository;
import com.gec.lab_admin.db.repositories.SemesterRepository;
import com.gec.lab_admin.db.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private SemesterRepository semesterRepository;

    ObjectMapper mapper = new ObjectMapper();


    public List<String> getSubjects(String teacher_id){
        List<Subject> subjectList=new ArrayList<>();
        return teacherRepository.getSubjects(teacher_id);
    }

    public Optional<Teacher> login(String teacherId) {
        return teacherRepository.findById(teacherId);
    }

    //    @Transactional
    public void getAttendanceRecords(String subjectID){
        List<Map<String, String>> studentList = teacherRepository.getAttendanceRecords(subjectID);
        List<AttendanceRecord> attendanceRecordList = new ArrayList<>();
        AttendanceRecord attendanceRecord = new AttendanceRecord();
        AttendanceId attendanceId = new AttendanceId();
        for (Map<String,String> student: studentList) {
            attendanceId.setStudent_id(student.get("student_id"));
            attendanceId.setSubject_id(student.get("subject_id"));
            attendanceId.setDate(new Date());
            attendanceRecord.setAttendanceId(attendanceId);
            attendanceRecord.setPresence(false);
            attendanceRepository.save(attendanceRecord);
        }
    }

    public String getTeacherName(String teacherId) {
        return teacherRepository.getTeacherName(teacherId);
    }

    public String getStudentName(String sender) { return teacherRepository.getStudentName(sender);
    }


    public List<Semester> getAllSemester() {
        return (List<Semester>) semesterRepository.findAll();
    }

    public void insertSem(Integer id, String name) {
        semesterRepository.insertSem(id,name);
    }

    public void updateSem(String name, Integer semId) {
        semesterRepository.updateSem(name,semId);
    }

    public void deleteSem(Integer semId) {

            semesterRepository.deleteSubSem(semId);
            semesterRepository.deleteSem(semId);

    }

    public List<String> getTeacherDetails() {
        return teacherRepository.getTeacherDetails();
    }

    public void insertSem(String id, String name, Boolean is_admin) {
        teacherRepository.insertTeacher(id,name,is_admin);
    }
    public void updateTeacher(String name, Boolean is_admin, String teacherId) {
        teacherRepository.updateTeacher(name,is_admin,teacherId);
    }
    public void insertTeacherSub(String teacher_id, String subject_id) {
        teacherRepository.insertTeacherSub(teacher_id,subject_id);
    }


    public void updateTeacherSub(String subject_id, String teacherId) {
        teacherRepository.updateTeacherSub(subject_id,teacherId);
    }

    public void deleteTeacher(String teacherId) {
        teacherRepository.deleteById(teacherId);
    }

    public void deleteTeacherSub(String teacherId) {
        teacherRepository.deleteTeacherSub(teacherId);
    }

    public void deleteLoggedStud() {
        teacherRepository.deleteLoggesStud();
    }

    public void deleteLoggedStudent(String studId) {
        teacherRepository.deleteLoggedInStudent(studId);

    }

    public Optional<Teacher> idCheck(String id) {
        return teacherRepository.findById(id);
    }

    public List<AttendanceReport> generateReports(String sDate, String eDate, String sub,Integer totalDays) {
        List<AttendanceReport> attendanceReportList = new ArrayList<>();
        List<Map> objectArrayList = attendanceRepository.generateReports(sDate, eDate, sub, totalDays);
        for ( Map obj: objectArrayList ) {
            attendanceReportList.add(mapper.convertValue(obj, AttendanceReport.class));
        }
        return attendanceReportList;
    }



    public Integer getTotalDays(String sDate, String eDate, String sub) {
        return attendanceRepository.getTotalDays(sDate,eDate,sub);
    }

    public Integer getSubCount(String sub) {
        return teacherRepository.getSubCount(sub);
    }

    public Integer getTimeDiff(String studId) {
        return teacherRepository.getTimeDiff(studId);
    }

    public void updateLogoutAttendance(String loggedInTeacherSubject, String studId) {
        teacherRepository.updateLogoutAttendance(loggedInTeacherSubject,studId);
    }
}