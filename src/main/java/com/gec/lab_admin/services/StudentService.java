package com.gec.lab_admin.services;

import com.gec.lab_admin.db.models.AttendanceRecord;
import com.gec.lab_admin.db.models.Student;
import com.gec.lab_admin.db.repositories.AttendanceRepository;
import com.gec.lab_admin.db.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Optional<Student> login(String studentId) {
        return studentRepository.findById(studentId);
    }

//    public void getAttendance(AttendanceRecord attendanceRecord,String studentId) {
//        List<AttendanceRecord> studentList = studentRepository.getAttendance(studentId);
//        attendanceRecord.setPresence(true);
//        attendanceRepository.save(attendanceRecord);
////        return null;
//    }

    public void updateAttendance(String subjectId, String studentId) {
        studentRepository.updateAttendance(subjectId,studentId);
    }

//    public void update(Student sd, String studentID) {
//        studentRepository.save(sd);
//    }

}
