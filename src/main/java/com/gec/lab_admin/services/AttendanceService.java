package com.gec.lab_admin.services;

import com.gec.lab_admin.db.models.AttendanceRecord;
import com.gec.lab_admin.db.repositories.AttendanceRepository;
import com.gec.lab_admin.db.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private TeacherRepository teacherRepository;
//
//    public Optional<AttendanceRecord> insert(String subjectId) {
//
//        return attendanceRepository.findById(subjectId);
//    }

}

