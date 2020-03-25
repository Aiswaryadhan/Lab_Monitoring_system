package com.gec.lab_admin.services;

import com.gec.lab_admin.db.models.AttendanceId;
import com.gec.lab_admin.db.models.AttendanceRecord;
import com.gec.lab_admin.db.models.Student;
import com.gec.lab_admin.db.models.Teacher;
import com.gec.lab_admin.db.repositories.AttendanceRepository;
import com.gec.lab_admin.db.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private TeacherRepository teacherRepository;
//    public void insert(User user) {
//        attendanceRepository.persist(user);
//        return user.getId();
//    }

    public Optional<AttendanceRecord> insert(String subjectId) {

        return attendanceRepository.findById(subjectId);
    }

}

