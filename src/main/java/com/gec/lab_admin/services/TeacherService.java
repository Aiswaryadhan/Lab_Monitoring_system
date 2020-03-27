package com.gec.lab_admin.services;

import com.gec.lab_admin.db.models.*;
import com.gec.lab_admin.db.repositories.AttendanceRepository;
import com.gec.lab_admin.db.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

//    @PostConstruct
//    public void testing(){
//        this.populateAttendanceRegister("sub01");
//    }


    public List<String> getSubjects(String teacher_id){
        List<Subjects> subjectList=new ArrayList<>();
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
}
