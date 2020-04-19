package com.gec.lab_admin.services;

import com.gec.lab_admin.db.models.AttendanceRecord;
import com.gec.lab_admin.db.models.Student;
import com.gec.lab_admin.db.models.Subject;
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

    public void updateAttendance(String subjectId, String studentId) {
        studentRepository.updateAttendance(subjectId,studentId);
    }

    public void add(String id) {
        studentRepository.insertLoggedStudent(id);
    }


    public List<Student> getAllStudent() {
        return (List<Student>) studentRepository.findAll();
    }

    public void insertStud(String id, String name, Integer sem) {
        studentRepository.insertStud(id,name,sem);
    }

    public void updateStud(String name, Integer sem, String studId) {
        studentRepository.updateStud(name,sem,studId);
    }

    public void deleteStud(String studId) {
        studentRepository.deleteStud(studId);
    }

    public void updateStudSem() {
        studentRepository.updateStudSem();

    }
}