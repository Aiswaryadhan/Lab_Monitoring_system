package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.AttendanceRecord;
import com.gec.lab_admin.db.models.Student;
import com.gec.lab_admin.db.models.Teacher;
import com.gec.lab_admin.services.AttendanceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class AttendanceController {
    @Autowired
    AttendanceService attendanceService;

    final Logger logger = LoggerFactory.getLogger(AttendanceController.class);

//    @RequestMapping("/student/getAttendanceRecords/{subjectid}")
//    public List<Student> getAttendanceRecords(@PathVariable String subjectid) {
//
//    return null;
//    }
}
