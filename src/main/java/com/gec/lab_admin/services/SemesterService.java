package com.gec.lab_admin.services;

import com.gec.lab_admin.db.repositories.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SemesterService {



    @Autowired
    private SemesterRepository semesterRepository;


}
