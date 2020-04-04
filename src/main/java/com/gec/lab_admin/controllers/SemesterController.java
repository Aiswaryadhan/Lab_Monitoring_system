package com.gec.lab_admin.controllers;

import com.gec.lab_admin.services.SemesterService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

public class SemesterController {
    SemesterService semesterService;
    @RequestMapping("/insertSem")
    public List<String> generateSemester() {
        return semesterService.getSemester();
    }
}
