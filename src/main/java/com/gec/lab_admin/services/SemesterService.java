package com.gec.lab_admin.services;

import com.gec.lab_admin.db.models.Semester;
import com.gec.lab_admin.db.models.Subjects;
import com.gec.lab_admin.db.repositories.SemesterRepository;
import com.gec.lab_admin.db.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SemesterService {
    @Autowired
    private SemesterRepository semesterRepository;

    public List<String> getSemester() {
        List<Semester> semesterList=new ArrayList<>();
        return semesterRepository.getSemester();
    }
}
